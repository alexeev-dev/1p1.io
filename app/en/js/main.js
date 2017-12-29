'use strict';

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

	// catalog navigation
	$('.js-catalog-nav a').click(function(e) {
		e.preventDefault();

		if(!$(this).parent().hasClass('active')) {
			$('.js-catalog-nav ul li').removeClass('active');
			$(this).parent().addClass('active');
			$('.wr-header').addClass('active');
		} else {
			($('.wr-header').hasClass('active')) ? $('.wr-header').removeClass('active') : $('.wr-header').addClass('active');
		}
	});

	// user category masonry
	$('.js-masonry-catalog').masonry({
		columnWidth: 'li',
		itemSelector: 'li',
		percentPosition: true
	});
	// brands category masonry
	$('.js-masonry-brands').masonry({
		columnWidth: '.grid-sizer',
		itemSelector: 'li',
		percentPosition: true
	});

	// sidebar filter list
	$('.js-sidebar-list > li > a').click(function(e) {
		e.preventDefault();

		$(this).toggleClass('active').next().slideToggle();
	});

	// video popup
	$('.js-popup-btn').click(function(e) {
		e.preventDefault();

		var popup = $(this).attr('href');

		$(popup).bPopup();
	});
});

$(window).load(function() {
	$('.preloader').fadeOut();
	$('body').removeClass('on-load');
});