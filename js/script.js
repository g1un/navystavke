$(document).ready(function() {

	//aside
	(function() {

		//cache Dom
		var $window = $(window);
		var $document = $(document);
		var $header = $document.find('.header');
		var $aside = $document.find('.js-aside');
		var $footer = $document.find('.footer');
		var $down = $aside.find('.js-aside-down');
		var $wrapper = $aside.find('.js-aside-wrapper');

		fixAside();

		//bind events
		$window.scroll(fixAside);
		$window.resize(fixAside);
		$down.hover(removeHover, addHover);

		//fixAside
		function fixAside() {
			var windowScroll = $window.scrollTop();

			//footer
			var footerHeight = $footer.height();
			var windowHeight = $window.height();
			var docHeight = $document.height();

			bottomAside(windowHeight, windowScroll, docHeight, footerHeight);

			//header
			var headerHeight = $header.height();
			var asideTop = 116; //css top

			if(windowScroll <= (asideTop - headerHeight)) {
				$aside.removeClass('_fixed');
			} else {
				$aside.addClass('_fixed');
			}
		}

		//bottomAside
		function bottomAside(windowHeight, windowScroll, docHeight, footerHeight) {
			if($window.width() < 800) return;

			//padding
			var downBottom = $down[0].getBoundingClientRect().bottom;
			var paddingBottom = windowHeight - downBottom;

			if((windowScroll + windowHeight + 20) >= (docHeight - footerHeight)) {
				if($aside.hasClass('_bottomed')) return;
				$aside.addClass('_bottomed');
				$aside.css({
					'top': 'auto',
					'bottom': footerHeight + 20 + 'px',
					'z-index': '1',
					'padding-bottom': paddingBottom + 'px'
				});
			} else {
				$aside.removeClass('_bottomed');
				$aside.removeAttr('style');
			}
		}

		//removeHover
		function removeHover(e) {
			$aside.removeClass('_hover-on');
		}

		//addHover
		function addHover(e) {
			$aside.addClass('_hover-on');
		}
	})();

	//aside links
	(function() {

		//cache Dom
		var $doc = $(document);
		var $item = $doc.find('.js-aside-item');
		var $exhibition = $item.find('.js-aside-exhibtion');

		//bind events
		$item.on('touchend', toggleExhibition);
		$doc.on('touchstart', hideExhibition);

		//toggleExhibition
		function toggleExhibition(e) {
			e.preventDefault();
			var $clicked = $(e.target);
			if(!$clicked.closest('.js-aside-exhibtion').length) {
				$exhibition.toggle();
			}
		}

		//hideExhibition
		function hideExhibition(e) {
			var $clicked = $(e.target);
			if(!$clicked.closest('.js-aside-exhibtion').length) {
				$exhibition.hide();
			}
		}
	})();

	//sandwich
	(function() {

		//cache Dom
		var $doc = $(document);
		var $sandwich = $doc.find('.js-sandwich');
		var $aside = $doc.find('.js-aside');
		var $close = $aside.find('.js-aside-close');

		//bind events
		$sandwich.on('click', showMenu);
		$close.on('click', hideMenu);
		$doc.on('touchstart', hideMenu);

		//showMenu
		function showMenu() {
			$aside.addClass('_show');
		}

		//hideMenu
		function hideMenu(e) {
			var $clicked = $(e.target);
			if(!$clicked.closest('.js-aside').length || $clicked.hasClass('js-aside-close')) {
				$aside.removeClass('_show');
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

		// options
		var options = {
			arrows: false,
			bounds:
			{
				min: new Date(2017, 0, 9),
				max: new Date(2017, 1, 5)
			},
			defaultValues:
			{
				min: new Date(2017, 0, 9),
				max: new Date(2017, 1, 5)
			},
			range:{
				min: {days: 1}
			},
			symmetricPositionning: true,
			step:{
				days: 1
			},
			formatter: function(val){
				var days = val.getDate(),
					month = val.getMonth() + 1,
					year = val.getFullYear();
				return days + "." + month + "." + year;
			}
		};

		//cache Dom
		var $el = $('.js-calendar-slider');

		$el.dateRangeSlider(options);
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

	//calendar tooltip
	(function() {

		var options = {
			items: '.js-calendar-tooltip',
			content: function() {
				var $this = $(this);
				return $(this).find('.js-calendar-tooltip-data').clone().show();
			},
			position: {
				my: "left bottom-16",
				at: "left top"
			},
			classes: {
				"ui-tooltip": "event-tooltip__wrapper js-event-tooltip-wrapper"
			}
		};

		//cache Dom
		var $tooltip = $('.js-calendar-tooltip');

		//bind events
		// $tooltip.hover(
		// 	function() { console.log(this); $(this).tooltip(options) },
		// 	function() { $(this).tooltip('destroy') }
		// );
		$tooltip.on('mouseenter', function() {
			// console.log($tooltip.tooltip('option', 'position'));

		});

		$tooltip.tooltip(options);
	})();
});