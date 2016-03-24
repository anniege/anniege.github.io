(function(){
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
		wordArr.forEach(function(word, i) {
			(i != 0) ? requestStr = requestStr + '+' + word : requestStr = requestStr + word;
		});
		requestStr = requestStr + '&image_type=photo&orientation=horizontal&min_width=310&min_height=410';

		function successFunc(data) {
			var i = 0;
			while(i < 7) {
				images.photos[i].url = data.hits[i].webformatURL;
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
		for (var i = images.photos.length - 1; i >= 0; i--) {
			images.photos[i].word = inputActivity.value;
		}
		getImagesByRequest();
	}

	// SLIDERS
	function slidersCreate() {
		// Array.prototype.slice.call(document.querySelectorAll('.js_slider')).forEach(function (element, index) {
		// 	lory(element, {
		// 		infinite: 1,
		// 		enableMouseEvents: true
		// 	});
		// });

		var sliders = document.querySelectorAll('.js_slider');
		for (var i = sliders.length - 1; i >= 0; i--) {
			lory(sliders[i], {
				infinite: 1,
				enableMouseEvents: true
			});
		}
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

			function reLeyout() {
				iso.layout();
			}

			addEvent('resize', window, reLeyout);
	}

	function render() {
		// var activity = document.querySelector('.activity');
		// activity.innerHTML = "";

		// var source = document.getElementById('template').innerHTML;
		// var template = Handlebars.compile(source);

		// var htmlResult = template(images);
		
		// activity.innerHTML = htmlResult;

		// var activity = document.querySelector('.activity');
		// activity.innerHTML = "";

		// var source = document.getElementById('_template').innerHTML;
		// activity.innerHTML = tmpl(source, images);

		var source = $('#_template').html();
		$('.activity').html(tmpl(source, images));
	}

	function init() {
		render();
		slidersCreate();
		IsotopeInit();
		// getImagesByRequest();
		formActivity.addEventListener('submit', getUserQuery);
	}

	addEvent('DOMContentLoaded', document, init);
})();

