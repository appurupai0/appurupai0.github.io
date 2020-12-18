$(function(){
	// ローディング
	let $window = $(window),
        $load = $('#load_animation'),
        $load_in = $load.find('img');

    //ロゴとLoadingGIFをフェードイン
	$load_in.delay(500).fadeIn('slow');
	$('body, html').css('overflow-y', 'hidden');

    //ウィンドウに対してloadイベントを設定
    //全ての要素をロードが終わったら，HideLoadingScreen()を実行する
    $window.on('load',function(){
        HideLoadingScreen();
    })
    
    //５秒後に強制的にHideLoadingScreen()を実行
    setTimeout(function(){
        HideLoadingScreen();
    },5000);

    //ロード画面を非表示にする関数
    function HideLoadingScreen(){
		$load.delay(1500).fadeOut("slow");
		$('body, html').css('overflow-y', 'auto');
    }

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

	$('.col-4').on('mouseover',function(){
		$(this).addClass('shadow-on');
	});

	$('.col-4').on('mouseleave',function(){
		$(this).removeClass('shadow-on');
	});





});