(function() {
	var slides = document.querySelectorAll('.slider-item');
	var pings = document.querySelector('.slider-indicators');
	var ping = document.querySelectorAll('.slider-indicators li');



	var SliderApp = function(defaultItem) {
		var imgs = [],
			timer;

		if (defaultItem) {
			slide(+defaultItem);
		}

		// function startAnimSliders() {
		// 	timer = setInterval(function(){

		// 	}, 1000);
		// }

		function removeActiveClass(items, customClass) {
			[].forEach.call(items, function(item, i, arr) {
				item.classList.remove(customClass);
			});
		}

		function slide(number) {
			[].forEach.call(slides, function(item, i, arr) {
				if (i === (+number)) {
					arr[i].classList.add('activeItem');
					arr[i].style.width = '100%';
					arr[i].style.height = '100%';
					arr[i].style.margin = '0px';
					arr[i].style.webkitTransform = 'translateX(-190px)';
				} else {
						console.log(arr[i]);
					arr[i].classList.remove('activeItem');
					arr[i].setAttribute('style', '');
				}
			})
		}
		// var self = this;
		pings.addEventListener('click', function(e) {
			e = e&&event || window.event;
			var target = e.target || e.srcElement;
			var pageNumber = target.getAttribute('data-slide-to');
			removeActiveClass(ping, 'active');
			target.classList.add ('active');
			slide(pageNumber);
			// 	if (action) {
			// self[action]();
		 //  }
			// console.log(target);
			// console.log(pageNumber);
		});
	}

	new SliderApp('0');
})();