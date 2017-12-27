$(document).ready(function() {

	// testimonials type 1
	$(".js-carousel").owlCarousel({
		items: 1,
		nav: false,
		dotsClass: 'navigation'
	});
	// testimonials type 2
	$(".js-testi").owlCarousel({
		items: 1
	});
});

$(window).load(function() {
	$('.preloader').fadeOut();
	$('body').removeClass('on-load');
});