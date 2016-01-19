(function( $ ){
	var defaults = {
		offsetX: 0.05,
		offsetY: 0.08,
		count: 4,
		scrollWrap: false,
		animate: false,
		animateSpeed: 3000
	}

	var options;

	$.fn.acarousel = function(params) {

		//extend the default options with custom
		options = $.extend({}, defaults, options, params);

		var $timerId,
			$flag = false;

		//calculation the width of acarousel-container depending on quantity of vivsible elements
		var $widthElem = $('.acarousel-element').css('width');
		$widthElem = parseInt($widthElem) + 25;

		var $widthContainer = options.count * $widthElem - 25;
		$('.acarousel-container').css("width", $widthContainer);
		$('.acarousel-hider').css("width", $widthContainer);
		
		var $elems = this;

		$elems.find('img').each(function(){
			var realsrc = $(this).attr('data-src');
			$(this).one('load', function(){
				$(this).addClass('acarousel-img').animate({opacity: 1}, 500);
			});
			$(this).attr('src', realsrc);
		});

		//scroll with click on LEFT and RIGHT controls
		var $leftControl = $('.acarousel-arrow-left'),
			$rightControl = $('.acarousel-arrow-right');

		var $pixelsOffset = $widthElem;
		var $currentLeftValue = 0;
		var $elementsCount = $elems.find('li').length;
		var $minimumOffset = - (($elementsCount - options.count) * $pixelsOffset);
		var $maximumOffset = 0;
	 
		var scrollLeft = function() {    
			if ($currentLeftValue != $maximumOffset) {
				$currentLeftValue += $widthElem;
				$elems.animate({ left : $currentLeftValue + "px"}, 500);
			} else {
				if (options.scrollWrap === true) {
					$currentLeftValue = - (($elementsCount - options.count) * $pixelsOffset);
					$elems.animate({ left : $currentLeftValue + "px"}, 300);
				}
			}       
		}

		var scrollRight = function() {  
			if ($currentLeftValue != $minimumOffset) {
				$currentLeftValue -= $widthElem;
				$elems.animate({ left : $currentLeftValue + "px"}, 500);
			}  else {
				if (options.scrollWrap === true) {
					$currentLeftValue = 0;
					$elems.animate({ left : $currentLeftValue + "px"}, 300);
				}
			}      
		}
	 
		$leftControl.click(function() {
			pauseAnimation(scrollLeft);
		});

		$rightControl.click(function() {
			pauseAnimation(scrollRight);
		});


		//animation with the autoscroll from right to left
		function startAnimation() { 
			$timerId = setTimeout(function tick() {
			scrollRight();
			$timerId = setTimeout(tick, options.animateSpeed);
			}, options.animateSpeed);
		}

		function stopAnimation() {
			if ($timerId) clearTimeout($timerId);
		}

		function pauseAnimation(customFunction) {
			if ((options.animate)&&($timerId)) {
				stopAnimation();
			}
			customFunction();
			if (options.animate) {
				startAnimation();
			}
		}

		if (options.animate === true) {
			startAnimation();
			flag = true;
		} else {
			stopAnimation();
			flag = false;
		}


		//show large preview of the photo within click on it
		var $page_y = $(window).height(),
			$page_x = $(window).width();
			
		this.on('click', function(e) {
			var e = e&&event || event.srcElement;
			var $target = $(e.target);
			var $parent = $target.parent();

			if (($parent)&&($parent.hasClass('acarousel-element'))) {
				if ((options.animate)&&($timerId)) {
					stopAnimation();
				}
				var $widthImg = $page_x-options.offsetX*$page_x;
				var $heightImg = $page_y-options.offsetY*$page_y;
				var $marginLeftImg = $widthImg/2 - ($widthImg/2)%1;
				var $marginTopImg = $heightImg/2 - ($heightImg/2)%1;
				var $newImg = $('<div class="acarousel-large"><img src="'+ $parent.find('img').attr('src')+'" style= "width:'+ $widthImg +'px; max-height:'+ $heightImg +'px; margin-left:-'+ $marginLeftImg +'px; margin-top:-'+ $marginTopImg +'px"></div>');
				$('body').append($newImg);
				$newImg.on('click', function() {
					$newImg.remove();
					if (options.animate) {
						startAnimation();
					}
				});
			}
		});


		return this;
	};

})(jQuery);


