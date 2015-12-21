(function() {
	var slideBlock = document.querySelector('.custom_slider');
	var slides = document.querySelectorAll('.slider-item');
	var pings = document.querySelector('.slider-pages');
	var ping = document.querySelectorAll('.slider-pages-item');
	var texts = document.querySelectorAll('.text_item');
	var left = document.querySelector('.left');
	var right = document.querySelector('.right');


	var SliderApp = function(defaultItem) {
		var imgs = [],
			globalId,
			index,
			timer,
			slidesLength = slides.length;

		if (defaultItem) {
			slide(+defaultItem);
		}

		this.next = function() {
			index = globalId + 1;
			if (index < slidesLength) {
				slide(index);
			} else {
				index = 0;
				slide(index);
			}
		}

		this.prev = function() {
			index = globalId - 1;
			if (index >= 0) {
				slide(index);
			} else {
				index = slidesLength - 1;
				slide(index);
			}
		}

		function removeActiveClass(items, customClass) {
			[].forEach.call(items, function(item) {
				item.classList.remove(customClass);
			});
		}

		function slide(number) {
			number = +number;
			globalId = number;
			removeActiveClass(ping, 'active');
			[].forEach.call(slides, function(item, i, arrSlider) {

				if (i < number) {
					arrSlider[i].style.zIndex = i;
					arrSlider[i].style.width = '100%';
					arrSlider[i].style.height = '100%';
					arrSlider[i].style.margin = '0px';
					arrSlider[i].style.opacity = '0';
					arrSlider[i].style.webkitTransform = 'translateX(-267px)';
					texts[i].style.visibility = 'hidden';
				} 

				if (i === number) {
					arrSlider[i].classList.add('activeItem');
						arrSlider[i].style.width = '100%';
						arrSlider[i].style.height = '100%';
						arrSlider[i].style.margin = '0px';
						arrSlider[i].style.opacity = '1';
						arrSlider[i].style.webkitTransform = 'translateX(-267px)';
						texts[i].style.visibility = 'visible';
						ping[i].classList.add ('active');
				}

				if (i > number) {
					 	arrSlider[i].setAttribute('style', '');
					 	arrSlider[i].style.opacity = '0';
					 	arrSlider[i].style.zIndex = slidesLength - i;
					 	if (i === (number+1)) {
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
			if (target.className === 'slider-pages-item') {
				var pageNumber = target.getAttribute('data-slide-to');
				target.classList.add ('active');
				slide(pageNumber);
			}

			if ((target.parentNode.className === 'left')||(target.parentNode.className === 'right')) {
				var action = target.parentNode.getAttribute('data-slidecontrol');
				if (action) {
					self[action]();
		  		}
			}
		});
	}

document.addEventListener('DOMContentLoaded', function() {
	new SliderApp('0');
});
})();