//= partials/isotope.pkgd.min.js
//= partials/tmpl.js

(function($){
	
	var images = [],
		defaults = [
		{ url: "dist/img/gallery_1.jpg", word: "Sport and Activity" },
		{ url: "dist/img/gallery_2.jpg", word: "Wellnes and Health" },
		{ url: "dist/img/gallery_3.jpg", word: "Extreme Sports and Expeditions"},
		{ url: "dist/img/gallery_4.jpg", word: "Games"},
		{ url: "dist/img/gallery_5.jpg", word: "Culture and Education"},
		{ url: "dist/img/gallery_6.jpg", word: "Relaxation"},
		{ url: "dist/img/gallery_7.jpg", word: "Travelling"}];


	//RENDER IMAGES BY REQUEST
	function getUserRequest() {
		var userWord = $('.activity-form__input').val();
		$('.activity-form__input').val("");
		initRequest(userWord);
	}

	function initRequest(userWord) {
		// RENDER USER REQUEST
		var word = encodeURIComponent(userWord);
		var result = 'http://api.pixplorer.co.uk/image?word=' + word + '&amount=7&size=s';
		$.ajax({
			type: "GET",
			dataType: "json",
			cache: false,
			url: result,
			success: function(data) {
				if ( data.status !== 'failed' ) {
					if (data.images.length > 0) {
						localStorage.setItem("word", userWord);
						var i = 0;
						while(i < 7) {
							images[i].url = data.images[i].imageurl;
							images[i].word = data.images[i].word;
							i++;
						}
					} else {
						if (localStorage.word) {
							$.each(images, function(i, img) {
								img.word = localStorage.word;
							});
						}
					}
				} else {
					images = copy(defaults);
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

	function copy(arrOld) {
		var arrNew = [];
		$.each(arrOld, function(i) {
			arrNew[i] = $.extend({}, arrOld[i]);
		});
		return arrNew;
	}

	$(function() {
		slidersCreate();

		images = copy(defaults);

		if(typeof(Storage) !== "undefined") {

			var savedWord = localStorage.getItem("word");

			if (savedWord) {
				initRequest(savedWord);
			} else {
				initRequest('');
			}

		} else {
			// alert('Local storage isn\'t supported by current browser.');
				var renderTmpl = function() {
					return render(images);
				}

				$.when(renderTmpl()).done(function() {
					IsotopeInit();
				});
		}
	});
	

	$('#form-activity').submit(function(e){
		e.preventDefault();
		$('.activity').isotope('destroy');
		$('.activity').html("");
		getUserRequest();
	});

})(jQuery);

