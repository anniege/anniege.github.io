$(function(){
	$('.submenu').on('mouseenter', function(){
		$(this).find('.inner').eq(0).stop().slideDown('fast').animate({
			 backgroundColor:"#E14B4B",
 			}, 300 );
	}).on('mouseleave', function(){
		$(this).find('.inner').eq(0).stop().animate({
			 backgroundColor:"rgba(255,123,0,.5)",
 			}, 100 ).slideUp(100);
	});
});