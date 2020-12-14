$(function(){
	setTimeout(function(){
		$('.js-shadow').addClass('on');
	});

	$('.nav-icon').on('click',function(){
		$(this).addClass('none');
		$('.nav-icon2').addClass('block');
		$('.sideber').addClass('on');
	});

	$('.nav-icon2').on('click',function(){
		$(this).removeClass('block');
		$('.nav-icon').removeClass('none')
		$('.sideber').removeClass('on');
	});






});