$(function() {
	var t0, t1, x0, y0, x1, y1;

	$("input").each(function(){
		var msg = $(this).attr("title");
		$(this).removeAttr("title");
		var tooltip = $("<p></p>").text(msg).addClass("tooltip");
		$(this).after(tooltip);
	});

$("input").mouseenter(function(){
	// if ($("fieldset div").prop("position")) {
		$("fieldset div").css("position", "");
	// }
		t0 = new Date();
		x0=event.pageX;
		y0=event.pageY;
		$(".tooltip").stop().animate({ "opacity": 0 },0).css({"opacity": "0", "z-index": -1});
	}).mousemove(function(){
		t1 = new Date();
		x1=event.pageX;
		y1=event.pageY;
		var delta = t1-t0;
		var speed = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2)) / delta;
		if (speed === 0) {
			console.log(speed);
			$(this).siblings(".tooltip").css({"top":y1, "left":x1, "z-index": "999"}).stop().animate({ "opacity": 1 },400); 
			var self = this;
			setTimeout(function() {
				$(self).siblings(".tooltip").stop().animate({ "opacity": 0 }, 0).css({"opacity": "0", "z-index": -1});
			}, 1000);
		}
	}).mouseleave(function() {
		$(this).siblings(".tooltip").stop().animate({ "opacity": 0 }, 0).css({"opacity": "0", "z-index": -1});
	});



	$("<button>").text("Show help").click(function() {
		$("fieldset div").css("position","relative");
		var check = $(".tooltip").length;
		if (check > 0) {
			$(".tooltip").animate({ "opacity": 1 },300).css({"top":" -5px", "left": "225px", "z-index": "999"});
			setTimeout(function() {
				$(".tooltip").stop().animate({ "opacity": 0 }, 1).css("z-index", "-1");
					$("fieldset div").removeProp("position");
			}, 1500);
		} else {
			$("[title]").after("<p>");
			$("p").addClass("tooltip");
			 [].forEach.call($("[title]"), function(item) {
				var msg = $(item).attr("title");
				$(item).siblings("p.tooltip").text(msg);
				setTimeout(function() {
					$(".tooltip").css({"top": -5, "left": 25, "z-index": "999"}).stop().animate({ "opacity": 0 },1);
						$("fieldset div").removeProp("position");
				}, 1500);
			});
		}
	}).insertAfter("form");
});