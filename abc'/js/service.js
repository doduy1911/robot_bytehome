document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.mySwiper', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    },
    mousewheel: true,
    autoplay: false,
    keyboard: true,
    on: {
      init: function () {
        handleSlideChange(this);
      },
      slideChange: function () {
        handleSlideChange(this);
      }
    }
  });

  function handleSlideChange(swiper) {
    document.querySelectorAll('.video-player').forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });

    let activeSlide = swiper.slides[swiper.activeIndex];
    let activeVideo = activeSlide.querySelector('video');

    if (activeVideo) {
      activeVideo.play();

      activeVideo.onended = function () {
        swiper.slideNext();
      };
    } else {
      console.log('No video found, setting timer...');
      myInterval = setTimeout(() => {
        swiper.slideNext();
      }, 5000);
    }
  }
});

const images = [
  'https://images.samsung.com/is/image/samsung/assets/us/smartthings/12112024/05_Entertainment-01_Game_pc.jpg?$684_684_JPG$',
  'https://images.samsung.com/is/image/samsung/assets/us/smartthings/11152024/2024_SmartThings_Overview_05_Inspiration_02_Family-care_pc_684x684.jpg?$684_684_JPG$',
  'https://images.samsung.com/is/image/samsung/assets/us/smartthings/12112024/2024_SmartThings_Overview_05_Inspiration_pc.png?$684_684_PNG$',
  'https://images.samsung.com/is/image/samsung/assets/us/smartthings/11152024/2024_SmartThings_Overview_05_Inspiration_03_Security_pc_684x684.jpg?$684_684_JPG$'
];

let lastHoveredElement = null;

function changeImage(index) {
  document.getElementById('previewImage').src = images[index];
}

document.querySelectorAll('.half-teaser-list').forEach((item, index) => {
  item.addEventListener('mouseenter', function () {
    changeImage(index);

    if (lastHoveredElement && lastHoveredElement !== this) {
      lastHoveredElement.querySelector(
        '.half-teaser-list__content'
      ).style.maxHeight = '0';
      lastHoveredElement.querySelector('a').classList.add('tw-hidden');
      lastHoveredElement.classList.remove('tw-border-t');
    }

    this.querySelector('.half-teaser-list__content').style.maxHeight = '100px';
    this.querySelector('a').classList.remove('tw-hidden');
    this.classList.add('tw-border-t');

    lastHoveredElement = this;
  });
});

document.querySelector('.tw-flex').addEventListener('mouseleave', function () {
  if (lastHoveredElement) {
    lastHoveredElement.querySelector(
      '.half-teaser-list__content'
    ).style.maxHeight = '100px';
    lastHoveredElement.querySelector('a').classList.remove('tw-hidden');
    lastHoveredElement.classList.add('tw-border-t');
  }
});
