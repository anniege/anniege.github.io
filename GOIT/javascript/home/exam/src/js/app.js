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

	//GET IMAGES BY REQUEST

		function getUserQuery(event) {
			event.preventDefault();
			(keyWord)
			var inputText = inputActivity.value;
			if (inputText) images.word = inputText;
			var wordArr = inputText.split(" ");
			var requestStr = 'https://pixabay.com/api/?key=2223288-d10240586d6b3acc79b68cd15&q=';
			wordArr.forEach(function(word, i) {
				(i != 0) ? requestStr = requestStr + '+' + word : requestStr = requestStr + word;
			});
			requestStr = requestStr + '&image_type=photo';

			$.ajax({
				url: requestStr,
				success: function (data) {
					var i = 0;
					while(i <= 7) {
						images.photos.push(data[i].webformatURL);
						i++;
					}
				}
			});
		}

		// SLIDERS
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

		// ISOOPE
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

function render(images) {
	var source = $("#template").html();
	var template = Handlebars.compile(source);
	var html = template(images);
	var element = document.querySelector('.activity-section__gallery');
	element.appendChild(html);
}

function init() {
	var inputActivity = document.querySelector('.activity-form__input');
	var formActivity = document.querySelector('.activity-form');
	formActivity.addEventListener('submit', getUserQuery);

}

document.addEventListener('DOMContentLoaded', init);

})();

function GoogleCallback(func, data){
	window[func](data);
}
