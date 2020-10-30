// モックファイルをコメントアウトする
// 1．入力文字チェック
// ボタンが押されたra
// 2. 3つあるうちのどのボタンが押されたのか、ボタンが押された時の処理をする(for ofを使って処理<textContentがないから判別できな>,,,一個づつ作る？？)
// 何も入力されていなかったら何もしない
// 3．文字が入力されていたら、新しいリストに追加する
// 4．新しいリストの左側にdeleteボタンを追加する


// 期日と科目名への処理
var task_day_icon = document.querySelector('#task-day-icon');
task_day_icon.addEventListener('click',function(){
	// 入力文字の取得
	let input_msg = document.querySelector('.input-msg');
	if(input_msg.value != ''){
		let parent_taskDay = document.querySelector('.task-day');
		let add_li = document.createElement('li');
		add_li.textContent = input_msg.value;
		add_li.classList.add('list');
		console.log(add_li);
		// deleteボタンの追加
		let delete_btn = document.createElement('i')
		// let className = ['far', 'fa-trash-alt', 'delete'];
		delete_btn.classList.add('far');
		delete_btn.classList.add('fa-trash-alt');
		delete_btn.classList.add('delete');
		delete_btn.addEventListener('click',function(){
		 	let hantei = confirm('この課題は終わりましたか？')
		 	if(hantei == true){
		 		this.parentElement.remove();
		 	}
		});
		add_li.appendChild(delete_btn);
		parent_taskDay.appendChild(add_li);

		// 入力された文字を空にする
		input_msg.value = '';
	}
});


// 課題内容の処理
var content_icon = document.querySelector('#contents-icon');
content_icon.addEventListener('click',function(){
	let input_msg = document.querySelector('.input-msg');
	if(input_msg.value != ''){
		let contents = document.querySelector('.contents');
		let contents_add_li = document.createElement('li');
		contents_add_li.textContent = input_msg.value;
		contents_add_li.classList.add('list');
		// deleteボタンの追加
		let delete_btn = document.createElement('i')
		delete_btn.classList.add('far');
		delete_btn.classList.add('fa-trash-alt');
		delete_btn.classList.add('delete');
		delete_btn.addEventListener('click',function(){
			let hantei = confirm('この課題は終わりましたか？');
			if(hantei == true){
				this.parentElement.remove();
			}
		});

		contents_add_li.appendChild(delete_btn);
		contents.appendChild(contents_add_li);

		// 入力欄を空にする
		input_msg.value = '';
	}
});

// Wantの処理
var want_icon = document.querySelector('#want-icon');
want_icon.addEventListener('click',function(){
	let input_msg = document.querySelector('.input-msg');
	if(input_msg.value != ''){
		let want = document.querySelector('.want-box');
		let want_add_li = document.createElement('li');
		want_add_li.textContent = input_msg.value;
		want_add_li.classList.add('list');

		// deleteボタンの追加
		let check_btn = document.createElement('i');
		check_btn.classList.add('far','fa-check-circle','delete');
		check_btn.addEventListener('click',function(){
			let hantei = confirm('本当に完了しましたか？Completeへ移行してもいいですか？');
			if(hantei = true){
				console.log(hantei)
				// このリストの削除
				this.parentElement.remove();
				// complete への移行処理
				let complete = document.querySelector('.complete');
				let complete_add_li = document.createElement('li');
				complete_add_li.textContent = want_add_li.textContent;
				complete_add_li.classList.add('list');
				// completeのボタンの作成と分岐
				let delete_btn = document.createElement('i');
				delete_btn.classList.add('far', 'fa-trash-alt', 'delete');
				delete_btn.addEventListener('click',function(){
					let judgment = confirm('データを完全に削除することになります。本当に削除しますか？');
					if(judgment == true){
						this.parentElement.remove();
					}
				});
				complete_add_li.appendChild(delete_btn);
				complete.appendChild(complete_add_li);
			} //ここに何かそのままをキープ的なことを書かないと、キャンセルを押しても completeへ移行してしまう。なぜだろうか？？
		});

		want_add_li.appendChild(check_btn);
		want.appendChild(want_add_li);

		// 入力欄を空にする
		input_msg.value = '';
	}
});