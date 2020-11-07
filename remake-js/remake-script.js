$(function(){
	$('.js-hamburger').on('click', function(){

	// 要素.hasClass(チェックしたいクラス名)　チェックしたいクラス名がついてたら、true　ついていなかったらfalse
    let isActive = $(this).hasClass('on');
    toggleDrower(isActive);
  });

	// 関数を使って処理を行っている
  function toggleDrower(isActive) {
    $('.js-hamburger')
    if (isActive) {
    	// onになっていた時、背景を表示
      $('#drower-bg').fadeOut(600);
    } else {
    	// on を外した時、背景を非表示
      $('#drower-bg').fadeIn(600);
    }
    $('.js-hamburger').toggleClass('on');
    $('.js-drower').toggleClass('on');
  }

});