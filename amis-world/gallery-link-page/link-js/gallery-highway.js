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





});