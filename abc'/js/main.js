(function ($) {
  'use strict';

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.header-color-animate')
        .addClass('shadow-sm tw-bg-white !tw-text-black')
        .css('top', '0px');

      $('.nav-link-full').addClass('!tw-text-black');
      $('.header-color-not-animate').addClass('shadow-sm').css('top', '0px');
    } else {
      $('.header-color-animate')
        .removeClass('shadow-sm tw-bg-white !tw-text-black')
        .css('top', '-150px');
      $('.nav-link-full').removeClass('!tw-text-black');
      $('.header-color-not-animate').addClass('shadow-sm').css('top', '-150px');
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    items: 1,
    autoplay: true,
    smartSpeed: 1000,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>'
    ]
  });
})(jQuery);
