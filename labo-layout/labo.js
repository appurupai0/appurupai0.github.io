var mySwiper = new Swiper ('.swiper-container', {
	effect: "flip",
	loop: true,
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	breakpoints: {
    767: {
      slidesPerView: 1,
      spaceBetween: 0
     }
    }
  })