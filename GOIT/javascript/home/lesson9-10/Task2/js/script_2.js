(function() {
	var elem;
	function showDropMenu(e) {
		e = e&&event|| window.event;
		var target = e.target || e.srcElement;
		target = target.closest('li');
		if (target&&target.classList.contains('submenu')) {
			var el = target.querySelector('.inner');
			if ((el) && (!el.classList.contains('visible'))) {
				el.classList.add('visible');
				el.addEventListener('mouseleave', function showDrop() {
					this.classList.remove('visible');
					this.removeEventListener('mouseleave', showDrop);
				});
			}
		}
	}

	// function hideDropMenu(e) {
	// 	e = e&&event|| window.event;
	// 	var target = e.target || e.srcElement;
	// 	if (!target.classList.contains('submenu')) {
	// 		var innerItem  = target.closest('li');
	// 		if (innerItem) {
	// 				console.log(innerItem);
	// 				console.log('==============================');
	// 			var parent = innerItem.parentNode;
	// 			if (parent) {
	// 				console.log(parent);
	// 				var el = parent.querySelector('.inner');
	// 				if ((el) && (el.classList.contains('visible'))) {
	// 					el.classList.remove('visible');
	// 				}
	// 			}
	// 		}
	// 	}
	// }


	function hideDropMenu(e) {
		var list = this.querySelectorAll('inner');
		[].forEach.call(list, function(item){
if(item.classList.contains('visible')){
		item.classList.remove('visible');
	}
		});
		// e = e&&event|| window.event;
		// var target = e.target || e.srcElement;
		// if ((elem) && (elem.classList.contains('visible'))) {
		// 		elem.classList.remove('visible');}
	}

var menu = document.getElementsByClassName('menu')[0];
menu.addEventListener('mouseenter', showDropMenu, true);
menu.addEventListener('mouseleave', hideDropMenu, true); 



})();