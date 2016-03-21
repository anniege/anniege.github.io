(function(){
	var images = {
		word: 'Sport and Activity',
		preload: 'dist/img/preloader.gif',
		captions: [
		"Sport and Activity", 
		"Wellnes and Health",
		"Extreme Sports and Expeditions",
		"Games",
		"Culture and Education",
		"Relaxation",
		"Travelling"
		],
		photos: [
		"dist/img/gallery_1.jpg",
		"dist/img/gallery_2.jpg",
		"dist/img/gallery_3.jpg",
		"dist/img/gallery_4.jpg",
		"dist/img/gallery_5.jpg",
		"dist/img/gallery_6.jpg",
		"dist/img/gallery_7.jpg"
		]
	}

	var inputActivity = document.querySelector('.activity-form__input');
	var formActivity = document.querySelector('.activity-form');

	function getImagesByRequest() {
			images.photos = [];
			var wordArr = images.word.split(" ");
			var requestStr = 'https://pixabay.com/api/?key=2223288-d10240586d6b3acc79b68cd15&q=';
			wordArr.forEach(function(word, i) {
				(i != 0) ? requestStr = requestStr + '+' + word : requestStr = requestStr + word;
			});
			requestStr = requestStr + '&image_type=photo';

			function successFunc(data) {
					var i = 0;
					while(i < 7) {
						images.photos.push(data.hits[i].webformatURL);
						i++;
					}
						render();
						IsotopeInit();
				}

			var promise = $.ajax({
				url: requestStr
			});
			promise.done(successFunc);
	}

	//GET IMAGES BY REQUEST
	function getUserQuery(event) {
		event.preventDefault();
		images.word = inputActivity.value;
		getImagesByRequest();

	}

	// SLIDERS
	function slidersCreate() {
		// var slider1 = new IdealImageSlider.Slider({
		// 	selector: '#slider1',
		// 	// maxHeight: 239,
		// 	interval: 4000
		// });
		// slider1.start();

		// var slider2 = new IdealImageSlider.Slider({
		// 	selector: '#slider2',
		// 	// maxHeight: 239,
		// 	interval: 4000
		// });
		// slider2.start();

		// var slider3 = new IdealImageSlider.Slider({
		// 	selector: '#slider3',
		// 	// maxHeight: 239,
		// 	interval: 4000
		// });
		// slider3.start();



			Array.prototype.slice.call(document.querySelectorAll('.js_slider')).forEach(function (element, index) {
				lory(element, {
					infinite: 1,
					enableMouseEvents: true
				});
			});
	}

		// ISOOPE
	function IsotopeInit() {
		var elem = document.querySelector('.activity');
		var iso = new Isotope( elem, {
		layoutMode: 'masonry',
		itemSelector: '.activity__link',
		percentPosition: true,
		transitionDuration: '0.8s',
		masonry: {
			columnWidth: '.activity__sizer',
			gutter: '.activity__gutter',
			// gutter: 10,
			isFitWidth: true
			}
		});

	// 	imagesLoaded( elem, function() {
	// // layout Isotope after each image loads
	// 		iso.layout();
	// 	});

		imagesLoaded(elem).on('always',function() {
			iso.leyout();
		});

		imagesLoaded(elem).on('progress',function() {
			iso.leyout();
		});
	}

	function render() {
		var source = $("#template").html();
		var template = Handlebars.compile(source);
		var html = template(images);
		var element = document.querySelector('.activity');
		element.innerHTML = html;
	}

	function init() {
		slidersCreate();
		render();
		IsotopeInit();
		// getImagesByRequest();
		formActivity.addEventListener('submit', getUserQuery);
	}

	document.addEventListener('DOMContentLoaded', init);
})();

