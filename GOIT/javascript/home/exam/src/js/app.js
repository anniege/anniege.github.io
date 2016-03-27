(function($){
	$.support.cors = true;
	var images = {
		preload: 'dist/img/preloader.gif',
		photos: [
		{ url: "dist/img/gallery_1.jpg", word: "Sport and Activity" },
		{ url: "dist/img/gallery_2.jpg", word: "Wellnes and Health" },
		{ url: "dist/img/gallery_3.jpg", word: "Extreme Sports and Expeditions"},
		{ url: "dist/img/gallery_4.jpg", word: "Games"},
		{ url: "dist/img/gallery_5.jpg", word: "Culture and Education"},
		{ url: "dist/img/gallery_6.jpg", word: "Relaxation"},
		{ url: "dist/img/gallery_7.jpg", word: "Travelling"}]
	}

	function addEvent(evnt, elem, func) {
		if (elem.addEventListener)  
			elem.addEventListener(evnt,func,false);
		else if (elem.attachEvent) { 
			elem.attachEvent("on"+evnt, func);
	}
	else { 
		elem[evnt] = func;
		}
	}

	var inputActivity = document.querySelector('.activity-form__input');
	var formActivity = document.querySelector('.activity-form');


	function getImagesByRequest() {
		var wordArr = images.photos[0].word.split(" ");
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
				console.log(data.hits.length);
				if (!data.hits.length) return;
				var i = 0;
				while(i < 7) {
					images.photos[i].url = data.hits[i].webformatURL;
					i++;
				}
				render();
			},
			error: function() {
				alert('ajax not support');
			}
		}).done(function(){
					IsotopeInit();
		});
	}

	//GET IMAGES BY REQUEST
	function getUserQuery() {
		for (var i = images.photos.length - 1; i >= 0; i--) {
			images.photos[i].word =  encodeURIComponent($('.activity-form__input').val());
		}
		getImagesByRequest();
	}

	// SLIDERS
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
					// isFitWidth: true
				}
			});
	}

	function render() {
		var html = tmpl($('#_template').html(), images);
		$('.activity').html(html);
		console.log('render');
	}

	$(function() {

		slidersCreate();
		IsotopeInit();

	});

	$('#form-activity').submit(function(e){
		e.preventDefault();
		// $('.activity').fadeOut(100);
		$('.activity').isotope('destroy');
	$('.activity').html("");
		getUserQuery();
	
	});

	render();
})(jQuery);

