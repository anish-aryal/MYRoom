$(".propertylist-carousel").owlCarousel({
  loop: false,
  margin: 30,
  dots: false,
  nav: true,
  navText: [
    "<i class='fas fa-arrow-left'></i>",
    "<i class='fas fa-arrow-right'></i>",
  ],
  autoplay: false,
  autoplayTimeout: 5000,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  responsive: {
    0: {
      items: 1,
    },
    425: {
      items: 1,
    },
    600: {
      items: 1,
    },
    991: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});

var partnersCarousel = $(".partnerlist-carousel").owlCarousel({
  loop: false,
  margin: 30,
  dots: false,
  nav: false,
  navText: [
    "<i class='fas fa-arrow-left'></i>",
    "<i class='fas fa-arrow-right'></i>",
  ],
  autoplay: true,
  autoplayTimeout: 10000,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  responsive: {
    0: {
      items: 1,
    },
    425: {
      items: 1,
    },
    600: {
      items: 1,
    },
    991: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

partnersCarousel.on('changed.owl.carousel', function (event) {

  partnersCarousel.goTo(0);
});


