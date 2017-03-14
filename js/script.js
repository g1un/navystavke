$(document).ready(function() {

	//aside
	(function() {

		//cache Dom
		var $window = $(window);
		var $document = $(document);
		var $header = $document.find('.header');
		var $aside = $document.find('.js-aside');

		fixAside();

		//bind events
		$window.scroll(fixAside);

		//fixAside
		function fixAside() {
			var windowScroll = $window.scrollTop();
			var headerHeight = $header.height();
			var asideTop = 116; //css top

			if(windowScroll <= (asideTop - headerHeight)) {
				$aside.removeClass('_fixed');
			} else {
				$aside.addClass('_fixed');
			}
		}
	})();

	//slider
	(function() {

		//cache Dom
		var $slider = $('.js-slider');

		//getOptions
		function getOptions($slider) {
			var slide = '#' + $slider.getAttribute('id') + ' .js-slider-item';
			var slidesToShow = $slider.getAttribute('data-slides');

			return {
				slide: slide,
				slidesToShow: slidesToShow ? slidesToShow : '1',
				prevArrow: '<button type="button" class="slider-nav _prev"></button>',
				nextArrow: '<button type="button" class="slider-nav _next"></button>'
			};
		}

		//slick
		for(var i = 0; i < $slider.length; i++) {
			$($slider[i]).slick(getOptions($slider[i]));
		}
	})();

	//calendar slider
	(function() {

		//cache Dom
		var $el = $('.js-calendar-slider');

		$el.dateRangeSlider();
		console.log('fere');
	})();

});