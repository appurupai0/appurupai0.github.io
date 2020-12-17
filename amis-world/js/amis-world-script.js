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

	// スマホのドロワーメニューでのタブメニュー
	// ページの切り替えをタブメニューの応用で作る
	$('.jscontent li a').on('click',function(){
		console.log($(this).text());

		// この処理でページ内リンクの余計な処理をなくす
		if($(this).hasClass('active')){
			return false;
		}

		// class="active"と指定されていないときにおなう処理
		$('.jscontent li a').removeClass('active');
		$(this).addClass('active');

		console.log(this.hash);
		$('.content-page > div').removeClass('active');
		$('.content-page > div').filter(this.hash).addClass('active');

		

	});
	// ページの切り替え処理終わり

	$('.toggle-gallery-menu').on('click',function(){
		$('#toggle-js-gallery').toggleClass('on');
	});

	// ページ０の動き処理
	setTimeout(function(){
		$('.img-bg').animate({opacity:.6},3000);
		$('.img-bg2').animate({opacity:.6},3000);
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

	// スクロールトップの動き
	$('.top-button').on('click',function(){
		$('body , html').animate({scrollTop:0},500);
	});

	// ハンバーガーメニュー
	$('.menu-trigger').on('click',function(){
		$(this).toggleClass('active');
		
		let isActive = $(this).hasClass('active');
		toggleDrower(isActive);
	});

	//もっと見るボタンの動き
	var show = 3; //最初に表示する件数
	var num = 3;  //clickごとに表示したい件数
	var contents = '.blog-news-block'; // 対象のlist
	$(contents + ':nth-child(n + ' + (show + 1) + ')').addClass('is-hidden');
	$('.all-blog span').on('click', function () {
	$(contents + '.is-hidden').slice(0, num).removeClass('is-hidden');
		if ($(contents + '.is-hidden').length == 0) {
			$('.all-blog').fadeOut();
			return false;
		}
	});




})


//ハンバーガーメニューでドロップダウン
function toggleDrower(isActive) {
	if (isActive) {
	  // onになっていた時、メニューを表示
	  $('#drower-bg').fadeIn(600);
	} else {
	  // onを外した時、メニューを非表示
	  $('#drower-bg').fadeOut(600);
	}
}

// スライドショーのjsコード
var mySwiper = new Swiper ('.swiper-container', {
  loop: true,
  autoplay: 3000,
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