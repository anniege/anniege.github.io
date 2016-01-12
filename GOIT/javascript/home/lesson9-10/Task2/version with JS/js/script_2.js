(function() {
	function showDropMenu(e) {
		e = e&&event|| window.event;
		var target = e.target || e.srcElement;
		target = target.closest('li');
		if (target&&target.classList.contains('submenu')) {
			var el = target.querySelectorAll('.inner')[0];
			if ((el) && (!el.classList.contains('visible'))) {
				el.classList.add('visible');
				el.addEventListener('mouseleave', function showDrop() {
					this.classList.remove('visible');
					this.removeEventListener('mouseleave', showDrop);
				});
			}
		} else {
			if (target) {
				var elems = target.parentNode.querySelectorAll('.inner');
				[].forEach.call(elems, function(item) {
					if (item.classList.contains('visible')) {
						item.classList.remove('visible');
					}
				});
			}
		}
	}

	function hideDropMenu() {
		var list = this.querySelectorAll('inner');
		[].forEach.call(list, function(item){
			if (item.classList.contains('visible')) {
					item.classList.remove('visible');
				}
		});
	}

var menu = document.getElementsByClassName('menu')[0];
menu.addEventListener('mouseenter', showDropMenu, true);
menu.addEventListener('mouseleave', hideDropMenu, true); 
})();