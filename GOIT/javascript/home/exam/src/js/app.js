//= partials/jquery.min.js
//= partials/jquery.jcarousel.min.js
//= partials/jquery.xdomainrequest.min.js
//= partials/isotope.pkgd.min.js
//= partials/tmpl.js


(function($){
	
	var images = [
	{ url: "dist/img/gallery_1.jpg", word: "Sport and Activity" },
	{ url: "dist/img/gallery_2.jpg", word: "Wellnes and Health" },
	{ url: "dist/img/gallery_3.jpg", word: "Extreme Sports and Expeditions"},
	{ url: "dist/img/gallery_4.jpg", word: "Games"},
	{ url: "dist/img/gallery_5.jpg", word: "Culture and Education"},
	{ url: "dist/img/gallery_6.jpg", word: "Relaxation"},
	{ url: "dist/img/gallery_7.jpg", word: "Travelling"}
	];

	function renderImagesByRequest() {
		var wordArr = images[0].word.split(" ");
		var requestStr = 'https://pixabay.com/api/?key=2223288-d10240586d6b3acc79b68cd15&q=';
		for (var i = 0; i < wordArr.length; i++) {
			
			if (i != 0) {
				requestStr = requestStr + '+' + wordArr[i];
			} else { 
				requestStr = requestStr + wordArr[i];
			}
		}
		requestStr = requestStr + '&image_type=photo&orientation=horizontal&min_width=310&min_height=410';

		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: requestStr,
			success: function(data) {
				if ( data.status !== 'failed' ) {
					var i = 0;
					while(i < 7) {
						images[i].url = data.hits[i].webformatURL;
						i++;
					}
				} 
				render(images);
			},
			error: function() {
				alert('Ajax not support by current browser.');
			}
		}).done(function(){
			IsotopeInit();
		});
	}

	//RENDER IMAGES BY REQUEST
	function getUserRequest() {
		for (var i = images.length - 1; i >= 0; i--) {
			images[i].word =  $('.activity-form__input').val();
		}

		//CALL FUNC TO GET AND RENDER USER REQUEST
		renderImagesByRequest();
	}

	// SLIDERS INIT
	function slidersCreate() {

		$('.jcarousel').jcarousel({
			animation: 'slow',
			wrap: 'circular'
		})

		.jcarouselAutoscroll({
			interval: 5000,
			target: '+=1',
			autostart: true
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
	}

	// ISOOPE
	function IsotopeInit() {
		$('.activity').isotope({
			layoutMode: 'masonry',
			itemSelector: '.activity__link',
			masonry: {
				gutter: 20
			}
		});
	}

	//RENDER TEMPLATE
	function render(images) {
		var html = tmpl($('#_template').html(), { data:images });
		$('.activity').html(html);
	}

	$(function() {
		slidersCreate();

		var renderTmpl = function() {
			return render(images);
		}

		$.when(renderTmpl()).done(function() {
			IsotopeInit();
		});
	});
	

	$('#form-activity').submit(function(e){
		e.preventDefault();
		$('.activity').isotope('destroy');
		$('.activity').html("");
		getUserRequest();
	});

})(jQuery);

