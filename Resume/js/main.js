function isElementVisible(el) {
				var rect = el.getBoundingClientRect(),
				vWidth = window.innerWidth || doc.documentElement.clientWidth,
				vHeight = window.innerHeight || doc.documentElement.clientHeight,
				efp = function (x, y) { return document.elementFromPoint(x, y) };     

				// Return false if it's not in the viewport
				if (rect.right < 0 || rect.bottom < 0 
					|| rect.left > vWidth || rect.top > vHeight)
					return false;
				// Return true if any of its four corners are invisible
				return (
					el.contains(efp(rect.left,  rect.top))
					&&   el.contains(efp(rect.right, rect.top))
					&&   el.contains(efp(rect.right, rect.bottom+20))
					&&   el.contains(efp(rect.left,  rect.bottom+20))
					);
			}

//------------------------bar toggle BEGIN------------------------
var content = document.getElementById('content');
var flag = false;
content.addEventListener('click', clickDataBar);

function toggle(elems, target, flag) {
	var fl = flag;
	for (var i = elems.length - 1; i >= 0; i--) {
		if (elems[i].classList.contains('invisible')) {
			elems[i].classList.remove('invisible');
			target.classList.add('blackBgrd');
			flag = true;
			if (!isElementVisible(elems[i])) { window.scrollBy(0, elems[i].clientHeight);}
			console.log(elems[i].parentNode.id);
			if (elems[i].parentNode.id === "skills") {	svgDraw(); }
		} else {
			elems[i].classList.add('invisible');
			target.classList.remove('blackBgrd');
			flag = false;
		}
	}
	return fl;
}

function clickDataBar (e) {
	var e = e && event || event.srcElement;
	var target = e.target;
	console.log(target);
	if (target.tagName == 'P') {
		var data = target.getAttribute('class');
		if ((data != 'sectionHeader lobster') && (data != 'sectionHeader lobster blackBgrd')) {
			return;
		}
		var elems = target.parentNode.querySelectorAll('.data');
		flag = toggle(elems, target, flag);
	}
}
		// ----------------------bar toggle END-----------------------------

var menu;
menu = document.getElementById('menu');
menu.addEventListener('click', function(e) {
	var e = e && event || event.srcElement;
	var target = e.target;
	var i, str, elems, sections;
	if (target.tagName != 'A') { return; }
	if (target.href) {
		i = target.href.indexOf('#'); 
		str = target.href.slice(++i);
		sections = document.querySelectorAll('.sectionHeader');
		[].forEach.call(sections, function(item) {
				if (item.classList.contains('blackBgrd')) {
					console.log(item.parentNode);
					item.classList.remove('blackBgrd');
				}
				var dts = item.parentNode.querySelectorAll('.data');
				[].forEach.call(dts, function(i) {
					i.classList.add('invisible');
				});
		});
		elems = document.getElementById(str).querySelectorAll('.data');
		[].forEach.call(elems, function(item) {
				if (item.classList.contains('invisible')) {
					item.classList.remove('invisible');
					item.parentNode.querySelector('.sectionHeader').classList.add('blackBgrd');
					if (!isElementVisible(item)) { window.scrollBy(0, item.clientHeight);}
					if (item.parentNode.id === "skills") {	svgDraw(); }
				}
		});
	}
});