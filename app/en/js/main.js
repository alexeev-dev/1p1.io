$(document).ready(function() {

	$(".js-carousel").owlCarousel({
		items: 1,
		nav: false,
		dotsClass: 'navigation'
	});
});

$(window).load(function() {
	$('.preloader').fadeOut();
	$('body').removeClass('on-load');
});