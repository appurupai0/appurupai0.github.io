$(function(){
	// ページの切り替えをタブメニューの応用で作る
	$('.header-menu li a').on('click',function(){
		console.log($(this).text());

		// この処理でページ内リンクの余計な処理をなくす
		if($(this).hasClass('active')){
			return false;
		}

		// class="active"と指定されていないときにおなう処理
		$('.header-menu li a').removeClass('active');
		$(this).addClass('active');

		console.log(this.hash);
		$('.content-page > div').removeClass('active');
		$('.content-page > div').filter(this.hash).addClass('active');

		

	});
	// ページの切り替え処理終わり

	$('.toggle-gallery-menu').on('click',function(){
		$('#toggle-js-gallery').toggleClass('on');
  		$('.rotate').toggleClass('on');
	});

	// ページ０の動き処理
	setTimeout(function(){
		$('.img-bg').animate({opacity:.6},3000);
	});

	setTimeout(function(){
		$('.main-title').fadeIn(2000);
	});

	$(window).on('scroll',function(){
		// let position = $('.main-title').offset().top
		// let scrollNow = $(window).scrollTop
		// console.log(scrollNow);
		// if(){
			$('.fixed').addClass('on');
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
  spaceBetween: 50,
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