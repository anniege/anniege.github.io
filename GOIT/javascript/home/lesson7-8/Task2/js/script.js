$(function() {

	$("[title]").hover(function(event) {
		event.preventDefault();
	});
	$("[title]").mouseenter(function(event){
		event.preventDefault();
		var x=event.clientX;
		console.log(x);
		var y=-event.clientY;
		console.log(y);
		var search =  $(this).siblings("p.tooltip").length;
		if (search) {
			$(this).siblings("p.tooltip").stop().animate({ "opacity": 1 },100);
		} else {
			var msg = $(this).attr("title");
			var tooltip = $("<p></p>").text(msg).addClass("tooltip");
			// tooltip.css("", "");
			// .css({"top": "x", "right": "y"})
			$(this).after(tooltip);
			$(".tooltip").css("top", "611px")
			$(".tooltip").css("left", 0)
			console.log($(".tooltip").css("top"));
			console.log($(".tooltip").css("left"));
		}
	}).mouseleave(function(event) {
		event.preventDefault();
			var self = this;
			setTimeout(function() {
				$(self).siblings("p.tooltip").stop().animate({ "opacity": 0 },100);
			}, 500);
	});

	$("<button>").text("Show help").click(function() {
		var check = $(".tooltip").length;
		if (check > 0) {
			$(".tooltip").animate({ "opacity": 1 },300);
			setTimeout(function() {
				$(".tooltip").stop().animate({ "opacity": 0 },300);
			}, 1500);
		} else {
			$("[title]").after("<p>");
			$("p").addClass("tooltip");
			 [].forEach.call($("[title]"), function(item) {
				var msg = $(item).attr("title");
				$(item).siblings("p.tooltip").text(msg);
				setTimeout(function() {
					$(".tooltip").stop().animate({ "opacity": 0 },100);
				}, 1500);
			});
		}
	}).insertAfter("form");
});