$(function(){
	setTimeout(function(){
		$('.js-shadow').addClass('on');
	});

	$('.nav-icon').on('click',function(){
		$(this).fadeOut(800);
		$('.nav-icon2').fadeIn(800);
		$('.sideber').addClass('on');
	});

	$('.nav-icon2').on('click',function(){
		$(this).fadeOut(800);
		$('.nav-icon').fadeIn(800);
		$('.sideber').removeClass('on');
	});
	// スクロールトップの動き
	$('.top-button').on('click',function(){
		$('body , html').animate({scrollTop:0},500);
	});

	// モーダルの表示の関数化
	$('.col-4 img').on('click',function(){

		// imgのsrcとtitle　の取得
		var imgSrc = $(this).attr('src');
		var title = $(this).siblings().text();

		$('.mordal-img').children().attr('src', imgSrc);
		$('.mordal-title').text(title);
		$('.mordal').fadeIn();
		$('body, html').css('overflow-y', 'hidden');
	});

	// モーダルを閉じる
	$('.mordal-close').on('click',function(){
		$('.mordal').fadeOut();
		$('body,html').css('overflow-y', 'visible');
	});





});