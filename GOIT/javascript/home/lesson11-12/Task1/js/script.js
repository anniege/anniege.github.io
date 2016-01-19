$(function() {

$('.acarousel-list').imageloader(
	  {
		selector: '.acarousel-element img',
		callback: function (elm) {
		  $(elm).fadeIn();
		}
	  }
	).acarousel({
	offsetX: 0.5,
	count: 3,
	scrollWrap: true,
	animate: true,
	animateSpeed: 2000
});

});