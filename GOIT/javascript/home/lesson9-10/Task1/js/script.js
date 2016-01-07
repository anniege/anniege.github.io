$(function(){

	$('.jcarousel').jcarousel();

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

	 // $('.jcarousel').jcarouselAutoscroll({
  //     interval: 3000,
  //     target: '+=1',
  //     autostart: true
  // 	});


	$('.mySelectBoxClass').customSelect();

	$('.mySelectBoxClass').change(function(){
		var index = $(this).find('option:selected').val();
		if (+index) $('.jcarousel').jcarousel('scroll', index-1);
	});

// var params = {
// 		changedEl: "select"
// 	}
// 	cuSel(params);

 $('.myCheckbox').styler();

});