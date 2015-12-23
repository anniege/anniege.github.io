$(function(){
	$("#tabs").find("#tabs-1").animate({ opacity: 1, backgroundColor: jQuery.Color({ alpha: 0.1 }) }, 1000);
	$("[href = '#tabs-1']").addClass('current');


	$("[href]").click(function(){
		$("#tabs").find("[id |= 'tabs']").animate({ opacity: 0, backgroundColor: '#7BA05B' }, 0);
		$("#tabs a").removeClass('current');
		var targetPage = "#" + $(this).attr("href").slice(1);
		$(this).addClass('current');
		$("#tabs").find(targetPage).animate({ opacity: 1, backgroundColor: jQuery.Color({ alpha: 0.1 }) }, 1000);
		
	});
});