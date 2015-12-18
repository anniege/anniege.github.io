(function() {
	var slideBlock = document.querySelector('.custom_slider');
	var slides = document.querySelectorAll('.slider-item');
	var pings = document.querySelector('.slider-pages');
	var ping = document.querySelectorAll('.slider-pages-item');
	var texts = document.querySelectorAll('.text_item');

	// [].reverse.call(slides);
	// console.log(document.querySelector('.slider-inner').innerHTML);

	var SliderApp = function(defaultItem) {
		var imgs = [],
		globalId,
			timer;

		var slidesLength = slides.length;

		if (defaultItem) {
			slide(+defaultItem);
		}

		// function startAnimSliders() {
		// 	timer = setInterval(function(){

		// 	}, 1000);
		// }
		this.next = function() {
			var index = globalId + 1;
			if (index < slidesLength) {
				slide(index);
			} else {
				index = 0
			}
		}

		this.prev = function() {
			console.log('index = ' + index);
			var index = globalId - 1;
			if (index >= 0) {
				slide(index);
			} else {
				index = slidesLength - 1;
			}
		}


		function removeActiveClass(items, customClass) {
			[].forEach.call(items, function(item, i, arrSlider) {
				item.classList.remove(customClass);
			});
		}

		function slide(number) {
			number = +number;
			globalId = number;
			console.log();
				removeActiveClass(ping, 'active');
			[].forEach.call(slides, function(item, i, arrSlider) {

				if (i < number) {
					arrSlider[i].style.zIndex = i;
					arrSlider[i].style.width = '100%';
					arrSlider[i].style.height = '100%';
					arrSlider[i].style.margin = '0px';
					arrSlider[i].style.opacity = '0';
					arrSlider[i].style.webkitTransform = 'translateX(-190px)';
					texts[i].style.visibility = 'hidden';
				} 

				if (i === number) {
					arrSlider[i].classList.add('activeItem');
						// console.log('i = ' + i + ', ' + 'z-index = ' + arrSlider[i].style.zIndex);
						arrSlider[i].style.width = '100%';
						arrSlider[i].style.height = '100%';
						arrSlider[i].style.margin = '0px';
						arrSlider[i].style.opacity = '1';
						arrSlider[i].style.webkitTransform = 'translateX(-190px)';
						texts[i].style.visibility = 'visible';
						ping[i].classList.add ('active');
				}

				if (i > number) {
					 	arrSlider[i].setAttribute('style', '');
					 	arrSlider[i].style.opacity = '0';
					 	arrSlider[i].style.zIndex = slidesLength - i;
					 	if (i == (number+1)) {
					 		arrSlider[i].style.opacity = '1';
					 	}
					 	texts[i].style.visibility = 'hidden';
				}
			})
		}

		var self = this;
		slideBlock.addEventListener('click', function(e) {
			e = e&&event || window.event;
			var target = e.target || e.srcElement;
				// console.log(target);
				// console.log(target.className);
			if (target.className === 'slider-pages-item') {
				var pageNumber = target.getAttribute('data-slide-to');
				target.classList.add ('active');
				slide(pageNumber);
			}

			console.log(target);
			if ((target.parentNode.className === 'left')||(target.parentNode.className === 'right')) {
				var action = target.parentNode.getAttribute('data-slidecontrol');
					console.log(target);
					console.log(action);
				if (action) {
					self[action]();
		  		}
			}
			// console.log(pageNumber);
		});
	}

document.addEventListener('DOMContentLoaded', function() {

	new SliderApp('0');
});
})();