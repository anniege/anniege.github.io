$(function() {
	$("[title]").mouseenter(function(){
		var search =  $(this).siblings("p.tooltip").length;
		if (search) {
			$(this).siblings("p.tooltip").stop().animate({ "opacity": 1 },300);
		} else {
			var msg = $(this).attr("title");
			var tooltip = $("<p></p>").text(msg).addClass("tooltip");
			$(this).after(tooltip);
		}
	}).mouseleave(function() {
			var self = this;
			setTimeout(function() {
				$(self).siblings("p.tooltip").stop().animate({ "opacity": 0 },300);
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
					$(".tooltip").stop().animate({ "opacity": 0 },300);
				}, 1500);
			});
		}
	}).insertAfter("form");
});