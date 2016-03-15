(function(){
	var images = {
		photos: [],
		word: 'Sport and Activity',
		captions: [
		"Sport and Activity", 
		"Wellnes and Health",
		"Extreme Sports and Expeditions",
		"Games",
		"Culture and Education",
		"Relaxation",
		"Travelling"
		]
	}

	var inputActivity = document.querySelector('.activity-form__input');
	var formActivity = document.querySelector('.activity-form');

	function getImagesByRequest() {
			images.photos = [];
			var wordArr = images.word.split(" ");
			console.log(wordArr);
			var requestStr = 'https://pixabay.com/api/?key=2223288-d10240586d6b3acc79b68cd15&q=';
			wordArr.forEach(function(word, i) {
				(i != 0) ? requestStr = requestStr + '+' + word : requestStr = requestStr + word;
			});
			requestStr = requestStr + '&image_type=photo';

			
			function successFunc(data) {
					console.log(data);
					var i = 0;
					while(i <= 7) {
						images.photos.push(data.hits[i].webformatURL);
						// console.log(data.hits[i].webformatURL);
						i++;
					}
						console.log(images.photos);
						console.log(images.word);
						render();

				}



			var promise = $.ajax({
				url: requestStr
				// success: 
			});

			promise.done(successFunc);

			console.log("photos = ", images.photos);
			console.log("word = ", images.word);

	}

	//GET IMAGES BY REQUEST
	function getUserQuery(event) {
		event.preventDefault();
		
		images.word = inputActivity.value;
		// if (inputText) images.word = inputText;

		getImagesByRequest();

	}

	// SLIDERS
	function slidersCreate() {
		var slider1 = new IdealImageSlider.Slider({
			selector: '#slider1',
			maxHeight: 239,
			interval: 4000
		});
		slider1.start();

		var slider2 = new IdealImageSlider.Slider({
			selector: '#slider2',
			maxHeight: 239,
			interval: 4000
		});
		slider2.start();

		var slider3 = new IdealImageSlider.Slider({
			selector: '#slider3',
			maxHeight: 239,
			interval: 4000
		});
		slider3.start();
	}

		// ISOOPE
	function IsotopeInit() {
		var elem = document.querySelector('.activity');
		var iso = new Isotope( elem, {
		itemSelector: '.activity__link',
		transitionDuration: '0.8s',
		masonry: {
			columnWidth: 300,
			gutter: 10,
			isFitWidth: true
			}
		});
	}

	function render() {
		var source = $("#template").html();
		console.log("source = ", source);
		var template = Handlebars.compile(source);
		// console.log("template = ", template);
		console.log("images = ", images);
		var html = template(images);
		console.log("html= ", html);
		var element = document.querySelector('.activity');
		element.innerHTML = html;
	}

	function init() {
		slidersCreate();
		getImagesByRequest();
					console.log("photos = ", images.photos);
			console.log("word = ", images.word);
		// render();
		IsotopeInit();

		formActivity.addEventListener('submit', getUserQuery);
	}

	document.addEventListener('DOMContentLoaded', init);
})();

function GoogleCallback(func, data){
	window[func](data);
}
