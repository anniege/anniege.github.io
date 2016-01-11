(function() {
	function showDropMenu(e) {
		e = e&&event|| window.event;
		var target = e.target || e.srcElement;
		if (target.classList.contains('submenu')) {
			var el = target.querySelector('.inner');
			if ((el) && (!el.classList.contains('visible'))) {
				el.classList.add('visible');
			}
		}
	}

	function hideDropMenu(e) {
		e = e&&event|| window.event;
		var target = e.target || e.srcElement;
		if (!target.classList.contains('submenu')) {
			var innerItem  = target.closest('li');
			var parent = innerItem.parentNode;
			var el = parent.querySelector('.inner');
			if ((el) && (el.classList.contains('visible'))) {
				el.classList.remove('visible');
			}
		}
	}

var menu = document.getElementsByClassName('menu')[0];
menu.addEventListener('mouseenter', showDropMenu, true);
menu.addEventListener('mouseleave', hideDropMenu, true);



})();