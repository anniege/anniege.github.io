(function( $ ){
	var defaults = {
		offsetX: 0.05,
		offsetY: 0.08,
		count: 4
	}

	var options;

	$.fn.acarousel = function(params) {

		options = $.extend({}, defaults, options, params);

		var $widthElem = $('.acarousel-element').css('width');
		$widthElem = parseInt($widthElem) + 25;

		var $widthContainer = options.count * $widthElem - 25;
		$('.acarousel-container').css("width", $widthContainer);
		$('.acarousel-hider').css("width", $widthContainer);

		var $page_y = $(window).height(),
			$page_x = $(window).width();

		var $elems = this;
		var $leftControl = $('.acarousel-arrow-left'),
			$rightControl = $('.acarousel-arrow-right');

		var $pixelsOffset = $widthElem;
		var $currentLeftValue = 0;
		var $elementsCount = $elems.find('li').length;
		var $minimumOffset = - (($elementsCount - options.count) * $pixelsOffset);
		var $maximumOffset = 0;
	 
		$leftControl.click(function() {    
			if ($currentLeftValue != $maximumOffset) {
				$currentLeftValue += $widthElem;
				$elems.animate({ left : $currentLeftValue + "px"}, 500);
			}        
		});
	 
		$rightControl.click(function() {  
			if ($currentLeftValue != $minimumOffset) {
				$currentLeftValue -= $widthElem;
				$elems.animate({ left : $currentLeftValue + "px"}, 500);
			}        
		});

		this.on('click', function(e) {
			var e = e&&event || event.srcElement;
			var $target = $(e.target);
			var $parent = $target.parent();

			if (($parent)&&($parent.hasClass('acarousel-element'))) {
				var $widthImg = $page_x-options.offsetX*$page_x;
				var $heightImg = $page_y-options.offsetY*$page_y;
				var marginLeftImg = $widthImg/2 - ($widthImg/2)%1;
				var marginTopImg = $heightImg/2 - ($heightImg/2)%1;
				var $newImg = $('<div class="acarousel-large"><img src="'+ $parent.find('img').attr('src')+'" style= "width:'+ $widthImg +'px; max-height:'+ $heightImg +'px; margin-left:-'+ marginLeftImg +'px; margin-top:-'+ marginTopImg +'px"></div>');
				$('body').append($newImg);
				$newImg.on('click', function() {
					$newImg.remove();
				});
			}
		});

		return this;
  };

})(jQuery);


