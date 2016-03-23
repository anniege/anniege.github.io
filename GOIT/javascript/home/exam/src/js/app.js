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

	function addEvent(evnt, elem, func) {
		if (elem.addEventListener)  // W3C DOM
			elem.addEventListener(evnt,func,false);
		else if (elem.attachEvent) { // IE DOM
			elem.attachEvent("on"+evnt, func);
	}
	else { // No much to do
		elem[evnt] = func;
		}
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
		requestStr = requestStr + '&image_type=photo&orientation=horizontal&min_width=310&min_height=410';

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
				isResizeBound: true,
				transitionDuration: '0.8s',
				masonry: {
					columnWidth: '.activity__sizer',
					gutter: '.activity__gutter',
					isFitWidth: true
				}
			});

			imagesLoaded('.activity', { 
				background: '.activity__link'
			}, function(imgLoad) {
				var imgs = elem.querySelectorAll('.activity__link');

				for (var i = imgs.length - 1; i >= 0; i--) {
					imgs[i].style.backgroundImage = "url('"+ imgs[i].getAttribute("data-src") +"')";
					imgs[i].style.backgroundSize = "cover";
					imgs[i].style.backgroundPosition = "center right";
				}

				iso.layout();
			});

			addEvent('resize', window, function() {
				iso.leyout();
			});
	// 		if(window.attachEvent) {
	// 			window.attachEvent('onresize', function() {
	// 				alert('attachEvent - resize');
	// 				iso.layout();
	// });
	// 		}
	// 		else if(window.addEventListener) {
	// 			window.addEventListener('resize', function() {
	// 				console.log('addEventListener - resize');
	// 				iso.layout();
	// }, true);
	// 		}
	// 		else {
	// 			console.log('The browser does not support Javascript event binding');
			// }
	}

	function render() {
		var activity = document.querySelector('.activity');
		activity.innerHTML = "";
		var source = $("#template").html();
		var template = Handlebars.compile(source);
		// console.log(template);
		var html = template(images);
		// console.log(html);
		var element = document.querySelector('.activity');
		// element.innerHTML = html;
		$(element).html(html);
	}

	function init() {
		slidersCreate();
		render();
		IsotopeInit();
		// getImagesByRequest();
		formActivity.addEventListener('submit', getUserQuery);
	}

	addEvent('DOMContentLoaded', document, init);
	// document.addEventListener('DOMContentLoaded', init);
})();

