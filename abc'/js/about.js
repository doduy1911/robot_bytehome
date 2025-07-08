document.addEventListener('DOMContentLoaded', () => {
  const swiperContainer = document.querySelector('.swiper-intro');

  const swiper = new Swiper('.swiper-intro', {
    speed: 1000,
    direction: 'vertical',
    pagination: {
      clickable: true
    },
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: false
    },
    slidesPerView: 1,
    simulateTouch: true,
    touchReleaseOnEdges: true,
    effect: 'slide',
    allowSlidePrev: false,
    allowSlideNext: false,
    on: {
      slideChange: (swiper) => {
        document.querySelectorAll('.title-left-area').forEach((el) => {
          el.classList.remove('active');
        });

        const titleLeft = document.querySelector('.title-left');
        const lineRight = document.querySelector('.line-right');

        if (swiper.activeIndex === 0) {
          titleLeft.children[1].classList.add('active');
          lineRight.style.width = 'calc(45% - 166px)';
        } else if (swiper.activeIndex === 1) {
          titleLeft.children[2].classList.add('active');
          lineRight.style.width = 'calc(45% - 250px)';
        }
      }
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.enable();
          swiper.params.allowSlidePrev = true;
          swiper.params.allowSlideNext = true;
        } else {
          swiper.disable();
          swiper.params.allowSlidePrev = false;
          swiper.params.allowSlideNext = false;
        }
      });
      swiper.update();
    },
    { threshold: 1.0 }
  );

  observer.observe(swiperContainer);

  function checkSwiperInViewport() {
    const rect = swiperContainer.getBoundingClientRect();
    const isFullyVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth;

    if (isFullyVisible) {
      swiper.params.mousewheel.enabled = true;
      swiper.params.allowSlidePrev = true;
      swiper.params.allowSlideNext = true;
    } else {
      swiper.params.mousewheel.enabled = false;
      swiper.params.allowSlidePrev = false;
      swiper.params.allowSlideNext = false;
    }

    swiper.update();
    requestAnimationFrame(checkSwiperInViewport);
  }

  requestAnimationFrame(checkSwiperInViewport);

  swiper.on('slideChange', function () {
    setTimeout(function () {
      swiper.params.mousewheel.releaseOnEdges = false;
    }, 500);
  });

  swiper.on('reachEnd', function () {
    setTimeout(function () {
      swiper.params.mousewheel.releaseOnEdges = true;
    }, 1000);
  });

  var section = new Swiper('.section-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    speed: 500
  });
});
