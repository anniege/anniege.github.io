$(function(){
var $animateflag = false;

	$('.jcarousel').jcarousel({
				wrap: 'both'
		}).jcarouselAutoscroll({
					interval: 2000,
					target: '+=1',
					autostart: false
		});

		$('.jcarousel-control-prev')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '-=1'
		});

	$('.jcarousel-control-next')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '+=1'
		});

	$('.jcarousel-pagination')
		.on('jcarouselpagination:active', 'a', function() {
			$(this).addClass('active');
		})
		.on('jcarouselpagination:inactive', 'a', function() {
			$(this).removeClass('active');
		})
		.jcarouselPagination();

	$('.animate').click(function() {
		if (!$animateflag) {
			$('.jcarousel').jcarouselAutoscroll('start');
			$(this).text('animate on');
			$animateflag = true;
		} else {
			$('.jcarousel').jcarouselAutoscroll('stop');
			$(this).text('animate off');
			$animateflag = false;
			$('.jcarousel-control').jcarouselControl('reload');
		}
	});

	$('select').selectric();

	$('select').change(function(){
		var index = $(this).find('option:selected').val();
		if (+index) $('.jcarousel').jcarousel('scroll', index-1);
	});

	$('.myCheckbox').styler();
});