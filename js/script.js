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
		var $window = $(window);
		var $slider = $('.js-slider');

		runSlick();

		//bind events
		$window.on('resize', reslick);

		//getOptions
		function getOptions($slider) {
			var slide = '#' + $slider.getAttribute('id') + ' .js-slider-item';
			var slidesToShow = $slider.getAttribute('data-slides');

			return {
				slide: slide,
				slidesToShow: slidesToShow ? slidesToShow : '1',
				prevArrow: '<button type="button" class="slider-nav _prev"></button>',
				nextArrow: '<button type="button" class="slider-nav _next"></button>',
				responsive: [
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: slidesToShow ? slidesToShow - 1 : '1'
						}
					},
					{
						breakpoint: 800,
						settings: "unslick"
					}
				]
			};
		}

		//run slick
		function runSlick() {
			for(var i = 0; i < $slider.length; i++) {
				$($slider[i]).slick(getOptions($slider[i]));
			}
		}

		//reslick
		function reslick() {
			if ($window.width() < 800) {
				if ($slider.hasClass('slick-initialized')) {
					$slider.slick('unslick');
				}
				return
			}

			if (!$slider.hasClass('slick-initialized')) {
				runSlick();
			}
		}
	})();

	//calendar slider
	(function() {

		//cache Dom
		var $el = $('.js-calendar-slider');

		$el.dateRangeSlider();
	})();

	//controls search
	(function() {

		//cache Dom
		var $doc = $(document);
		var $form = $doc.find('.js-controls-form');
		var $input = $form.find('.js-controls-input');
		var $reset = $form.find('.js-controls-reset');
		var $submit = $form.find('.js-controls-submit');

		//bind events
		$submit.on('click', showInput);
		// $input.on('blur', hideInput);
		$doc.on('click', hideInput);
		$input.on('change keyup paste mouseup input', showReset);
		$reset.on('click', hideReset);

		showReset();

		//showInput
		function showInput(e) {
			if(!$form.hasClass('_active')) {
				e.preventDefault();
				$form.addClass('_active');
				$input.focus();

				showReset();
			}
		}

		//hideInput
		function hideInput(e) {
			var $clicked = $(e.target);
			if($clicked.closest('.js-controls-form').length && $form.hasClass('_active')) return;
			$form.removeClass('_active');
		}

		//showReset
		function showReset() {
			if(!$form.hasClass('_active')) return;

			if($input.val() != '') {
				$reset.addClass('_show');
			} else {
				$reset.removeClass('_show');
			}
		}

		//hideReset
		function hideReset() {
			$reset.removeClass('_show');
			$input.focus();
		}
	})();

});