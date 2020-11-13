$(function(){
	setTimeout(function(){
		$('.img-bg').animate({opacity:.6},3000);
	});

	setTimeout(function(){
		$('.main-title').fadeIn(2000);
	});

	$(window).on('scroll',function(){
		let position = $('.js-amis').offset().top;
		let wh = $(window).height();
		let scrollNow = $(window).scrollTop();

		if(position <= wh + scrollNow){
			$('.right-animate').addClass('on');
			$('.js-amis').fadeIn(3500);
			$('.js-first-text').animate({opacity:1},2500);
		}
	});

	$(window).on('scroll',function(){
		let position = $('.js-second-text').offset().top;
		let wh = $(window).height();
		let scrollNow = $(window).scrollTop();

		if(position <= wh + scrollNow){
			$('.left-animate').addClass('on');
			$('.js-amis02').fadeIn(3500);
			$('.js-second-text').animate({opacity:1},2500);
		}
	});




})

// スライドショーのjsコード
var mySwiper = new Swiper ('.swiper-container', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 10,
  centeredSlides : true,
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