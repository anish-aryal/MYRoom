var $ = jQuery.noConflict();

(function ($) {
	if ($('.owl-carousel:not(.owl-carousel--custom)').length) {
		$('.owl-carousel:not(.owl-carousel--custom)').each(function () {
			startCarousel($(this))
		})
	}
})(jQuery);

function startCarousel(carousel) {
	var dots, nav, mediaSmall, mediaMedium, mediaBig, mediaHuge, autoPlay;

	dots = !carousel.hasClass('owl-carousel--no-dots');
	nav = carousel.hasClass('owl-carousel--nav');
	autoPlay = !carousel.hasClass('owl-carousel--no-auto-play');

	if (carousel.hasClass('owl-carousel--visible-1')) {
		mediaSmall = 1;
		mediaMedium = 1;
		mediaBig = 1;
		mediaHuge = 1;
	} else if (carousel.hasClass('owl-carousel--visible-2')) {
		mediaSmall = 1;
		mediaMedium = 2;
		mediaBig = 2;
		mediaHuge = 2;
	} else if (carousel.hasClass('owl-carousel--visible-3')) {
		mediaSmall = 1;
		mediaMedium = 2;
		mediaBig = 2;
		mediaHuge = 3;
	} else if (carousel.hasClass('owl-carousel--visible-4')) {
		mediaSmall = 1;
		mediaMedium = 2;
		mediaBig = 2;
		mediaHuge = 4;
	} else if (carousel.hasClass('owl-carousel--visible-5')) {
		mediaSmall = 1;
		mediaMedium = 2;
		mediaBig = 3;
		mediaHuge = 5;
	}

	carousel.on('initialized.owl.carousel', function () {
		var elements = [
			'.mh-agent__content',
			'.mh-testimonial__text',
			'.mh-post-grid__inner',
			'.mh-estate-vertical__content',
			'.mh-compare__column__content__top'
		]
		$.each(elements, function (i, element) {
			var height = 0
			var results = $(this).find(element)
			$.each(results, function (i, result) {
				var resultHeight = $(result).height()
				if (resultHeight > height) {
					height = resultHeight
				}
			}.bind(this))
			results.css('height', height + 'px')
		}.bind(this))
	})

	var responsive
	if (carousel.hasClass('mh-clients')
		&& (carousel.hasClass('owl-carousel--visible-3') || carousel.hasClass('owl-carousel--visible-4')
		|| carousel.hasClass('owl-carousel--visible-5'))) {
		responsive = {
			0   : {
				items: 2
			},
			768 : {
				items: 3
			},
			1024: {
				items: mediaHuge - 1
			},
			1200: {
				items: mediaHuge
			}
		}
	} else {
		responsive = {
			0   : {
				items: mediaSmall
			},
			768 : {
				items: mediaMedium
			},
			1024: {
				items: mediaBig
			},
			1200: {
				items: mediaHuge
			}
		}
	}

	carousel.owlCarousel({
		rtl               : $('html').attr('dir') === 'rtl',
		loop              : true,
		margin            : 12,
		dots              : dots,
		autoplay          : autoPlay,
		nav               : nav,
		navText           : [
			'<i class="fa fa-angle-left" aria-hidden="true"></i>',
			'<i class="fa fa-angle-right" aria-hidden="true"></i>'
		],
		autoplayTimeout   : 4000,
		autoplayHoverPause: true,
		responsive        : responsive
	})
}

$(window).on('load', function () {
	if (jQuery('.compose-mode').length) {
		setInterval(function () {
			if ($('.owl-carousel').length > $('.owl-carousel-vc').length) {
				$('.owl-carousel:not(.owl-carousel-vc)').each(function () {
					$(this).addClass('owl-carousel-vc');
					startCarousel($(this))
				})
			}
		}, 1000)
	}
})