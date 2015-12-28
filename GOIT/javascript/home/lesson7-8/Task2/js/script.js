$(function() {
	var t0, t1, x0, y0, x1, y1;

	$("input").each(function(){
		var msg = $(this).attr("title");
		$(this).removeAttr("title");
		var tooltip = $("<p></p>").text(msg).addClass("tooltip");
		$(this).after(tooltip);
	});
	

$("input").mouseenter(function(){
		$("fieldset div").css("position", "");
		t0 = new Date();
		x0=event.pageX;
		y0=event.pageY;
		$(".tooltip").stop().animate({ "opacity": 0 }, 0).css({"z-index": -1});
		$(this).siblings(".tooltip").css({"top":y0, "left":x0, "z-index": "999"}).animate({ "opacity": 1 },100); 

	}).mousemove(function(){
		t1 = new Date();
		x1=event.pageX;
		y1=event.pageY;
		var delta = t1-t0;
		var speed = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2)) / delta;
		if (speed < 0.1) {
			$(this).siblings(".tooltip").css({"top":y1, "left":x1, "z-index": "999"}).animate({ "opacity": 1 }, 400); 
			var self = this;
			setTimeout(function() {
				$(self).siblings(".tooltip").stop().animate({ "opacity": 0 }, 200).stop().css({"z-index": -1});
			}, 700);
		}

	}).mouseleave(function() {
		$(this).siblings(".tooltip").animate({ "opacity": 0 }, 0).stop().css({"z-index": -1});
	});


	$("<button>").text("Show help").insertAfter("form").click(function() {
		$("fieldset div").css("position","relative");
		setTimeout(function(){
			$(".tooltip").each(function(){
				$(this).stop().css({"top":" -5px", "left": "260px", "z-index": "999"}).css("opacity", 1);
				var self = this;
				setTimeout(function() {
					$(self).stop().animate({ "opacity": 0 }, 0).css("z-index", "-1");
				}, 1500);
			});
		}, 500);
	});
});