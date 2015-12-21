(function() {

	var tabPanel = document.querySelector('#tabs'),
		tabsItems = document.querySelectorAll('#tabs ul li a');
		textTabs = document.querySelectorAll('#tabs ul ~ div');

	var App = function(defaultTabNumber) {
		var defaultTab = true;

		if (defaultTab) {
			textTabs[defaultTabNumber].style.visibility = 'visible';
		} else {
			defaultTab = 'false';
		}
		function toggleClassCurrent(currTab) {
			[].forEach.call(tabsItems, function(item) {
				if (item.classList.contains('current')&&(item !== currTab)) {
					item.classList.remove('current');
				}
			});
			currTab.classList.add('current');
		}

		function switchTextTabs(id) {
			[].forEach.call(textTabs, function(elem){
				if (elem.style.visibility === 'visible') {
					elem.style.visibility = 'hidden';
				}
			});
			document.querySelector('#'+ id).style.visibility = 'visible';
		}

		function clickTabs(e) {
			var e = e&&event || window.event;
			var target = e.target || e.srcElement;
			if (target.tagName === 'A') {
				toggleClassCurrent(target);
				var name = target.href;
				var tabId = name.slice(name.lastIndexOf('tabs-'));
				switchTextTabs(tabId);
				
			}
		}

		this.tabs = function() {
			if (document.addEventListener) {   
				tabPanel.addEventListener('click', function(e) {
					clickTabs(e);
				}); 
			} else if (document.attachEvent) {
				tabPanel.attachEvent('onclick', function(e) {
					clickTabs(e);
				});
			}
		} 
	}

	document.addEventListener('DOMContentLoaded', function() {
		appTabs = new App(0);
		appTabs.tabs();
	});
})();