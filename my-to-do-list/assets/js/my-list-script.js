// モックファイルをコメントアウトする
// 1．入力文字チェック
// ボタンが押されたra
// 2. 3つあるうちのどのボタンが押されたのか、ボタンが押された時の処理をする(for ofを使って処理<textContentがないから判別できな>,,,一個づつ作る？？)
// 何も入力されていなかったら何もしない
// 3．文字が入力されていたら、新しいリストに追加する
// 4．新しいリストの左側にdeleteボタンを追加する

// task,contents,want,complete、全部が入っているデータは配列（それぞれ、別キーで配列が入っている）
let data;
let data_contents;
let data_want
let data_complete

// taskのデータのとき
if(localStorage.getItem('taskList')){
	data = JSON.parse(localStorage.getItem('taskList'));
}else{
	// localStrageに何も存在しない場合空の入れるを挿入する
	data = [];
}

// 保存されたデータを、画面に表示する
for(let displayText of data){
	task_tag(displayText);
}

// contentsのデータのとき
if(localStorage.getItem('contentsList')){
	data_contents = JSON.parse(localStorage.getItem('contentsList'));
}else{
	data_contents = [];
}

for(let displayText_contents of data_contents){
	contents_tag(displayText_contents);
}

// wantのデータのとき
if(localStorage.getItem('wantList')){
	data_want = JSON.parse(localStorage.getItem('wantList'));
}else{
	data_want = [];
}

for(let displayText_want of data_want){
	want_tag(displayText_want);
}

// completeのデータのとき
if(localStorage.getItem('completeList')){
	data_complete = JSON.parse(localStorage.getItem('completeList'));
}else{
	data_complete = [];
}

for(let display_complete of data_complete){
	complete_tag(display_complete);
}




// 期日と科目名への処理
var task_day_icon = document.querySelector('#task-day-icon');
task_day_icon.addEventListener('click',function(){
	// 入力文字の取得
	let input_msg = document.querySelector('.input-msg');
	if(input_msg.value != ''){

		// task_tagの関数へ移行させる記述
		task_tag(input_msg.value);

		// 配列に入力された値を追加
		data.push(input_msg.value);

		// localStrageに入れるを保存
		localStorage.setItem('taskList',JSON.stringify(data));


		// let parent_taskDay = document.querySelector('.task-day');
		// let add_li = document.createElement('li');
		// add_li.textContent = input_msg.value;
		// add_li.classList.add('list');
		// console.log(add_li);
		// // deleteボタンの追加
		// let delete_btn = document.createElement('i')
		// // let className = ['far', 'fa-trash-alt', 'delete'];
		// delete_btn.classList.add('far');
		// delete_btn.classList.add('fa-trash-alt');
		// delete_btn.classList.add('delete');
		// delete_btn.addEventListener('click',function(){
		//  	let hantei = confirm('この課題は終わりましたか？')
		//  	if(hantei == true){
		//  		this.parentElement.remove();
		//  	}
		// });
		// add_li.appendChild(delete_btn);
		// parent_taskDay.appendChild(add_li);

		// 入力された文字を空にする
		input_msg.value = '';
	}
});


// 課題内容の処理
var content_icon = document.querySelector('#contents-icon');
content_icon.addEventListener('click',function(){
	let input_msg = document.querySelector('.input-msg');
	if(input_msg.value != ''){

		// contentsの関数へ移行する記述
		contents_tag(input_msg.value);	

		// 配列に入力された値を追加
		data_contents.push(input_msg.value);

		// ローカルストレージにセットする
		localStorage.setItem('contentsList',JSON.stringify(data_contents));


		// let contents = document.querySelector('.contents');
		// let contents_add_li = document.createElement('li');
		// contents_add_li.textContent = input_msg.value;
		// contents_add_li.classList.add('list');
		// // deleteボタンの追加
		// let delete_btn = document.createElement('i')
		// delete_btn.classList.add('far');
		// delete_btn.classList.add('fa-trash-alt');
		// delete_btn.classList.add('delete');
		// delete_btn.addEventListener('click',function(){
		// 	let hantei = confirm('この課題は終わりましたか？');
		// 	if(hantei == true){
		// 		this.parentElement.remove();
		// 	}
		// });

		// contents_add_li.appendChild(delete_btn);
		// contents.appendChild(contents_add_li);

		// 入力欄を空にする
		input_msg.value = '';
	}
});

// Wantの処理
var want_icon = document.querySelector('#want-icon');
want_icon.addEventListener('click',function(){
	let input_msg = document.querySelector('.input-msg');
	if(input_msg.value != ''){

		// want_tagへ移行する記述
		want_tag(input_msg.value);

		// 配列に入力された値を追加
		data_want.push(input_msg.value);

		// ローカルストレージをセットする
		localStorage.setItem('wantList',JSON.stringify(data_want));



		// let want = document.querySelector('.want-box');
		// let want_add_li = document.createElement('li');
		// want_add_li.textContent = input_msg.value;
		// want_add_li.classList.add('list');

		// // deleteボタンの追加
		// let check_btn = document.createElement('i');
		// check_btn.classList.add('far','fa-check-circle','delete');
		// check_btn.addEventListener('click',function(){
		// 	let hantei = confirm('本当に完了しましたか？Completeへ移行してもいいですか？');
		// 	if(hantei == true){
		// 		console.log(hantei)
		// 		// このリストの削除
		// 		this.parentElement.remove();
		// 		// complete への移行処理
		// 		let complete = document.querySelector('.complete');
		// 		let complete_add_li = document.createElement('li');
		// 		complete_add_li.textContent = want_add_li.textContent;
		// 		complete_add_li.classList.add('list');
		// 		// completeのボタンの作成と分岐
		// 		let delete_btn = document.createElement('i');
		// 		delete_btn.classList.add('far', 'fa-trash-alt', 'delete');
		// 		delete_btn.addEventListener('click',function(){
		// 			let judgment = confirm('データを完全に削除することになります。本当に削除しますか？');
		// 			if(judgment == true){
		// 				this.parentElement.remove();
		// 			}
		// 		});
		// 		complete_add_li.appendChild(delete_btn);
		// 		complete.appendChild(complete_add_li);
		// 	} //ここに何かそのままをキープ的なことを書かないと、キャンセルを押しても completeへ移行してしまう。なぜだろうか？？
		// });

		// want_add_li.appendChild(check_btn);
		// want.appendChild(want_add_li);

		// 入力欄を空にする
		input_msg.value = '';
	}
});




// 期日と科目名の関数
function task_tag(task_text){
	let parent_taskDay = document.querySelector('.task-day');
		let add_li = document.createElement('li');
		add_li.textContent = task_text;
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
		 		let del_text = this.parentElement.textContent;
		 		data.splice(data.indexOf(del_text),1);

		 		this.parentElement.remove();

		 		// 削除済みの配列を全体的にローカルストレージに上書き保存
		 		localStorage.setItem('taskList',JSON.stringify(data));
		 	}
		});
		add_li.appendChild(delete_btn);
		parent_taskDay.appendChild(add_li);
}


// 課題内容の処理の関数
function contents_tag(contents_text){
	let contents = document.querySelector('.contents');
		let contents_add_li = document.createElement('li');
		contents_add_li.textContent = contents_text;
		contents_add_li.classList.add('list');
		// deleteボタンの追加
		let delete_btn = document.createElement('i')
		delete_btn.classList.add('far');
		delete_btn.classList.add('fa-trash-alt');
		delete_btn.classList.add('delete');
		delete_btn.addEventListener('click',function(){
			let hantei = confirm('この課題は終わりましたか？');
			if(hantei == true){

				let del_text = this.parentElement.textContent;
				data_contents.splice(data_contents.indexOf(del_text),1);

				this.parentElement.remove();

				localStorage.setItem('contentsList',JSON.stringify(data_contents));
			}
		});

		contents_add_li.appendChild(delete_btn);
		contents.appendChild(contents_add_li);
}


// wantの処理の関数
function want_tag(want_text){
	let want = document.querySelector('.want-box');
		let want_add_li = document.createElement('li');
		want_add_li.textContent = want_text;
		want_add_li.classList.add('list');

		// deleteボタンの追加
		let check_btn = document.createElement('i');
		check_btn.classList.add('far','fa-check-circle','delete');
		check_btn.addEventListener('click',function(){
			let hantei = confirm('本当に完了しましたか？Completeへ移行してもいいですか？');
			if(hantei == true){
				console.log(hantei)
				// このリストの削除

				let del_text = this.parentElement.textContent;
				data_want.splice(data_want.indexOf(del_text),1);

				this.parentElement.remove();

				localStorage.setItem('wantList',JSON.stringify(data_want));

				// complete_tagの関数へ移行する記述
				complete_tag(want_text)

				// 配列にwantから移行してきた値を追加
				data_complete.push(want_text);

				// ローカルストレージに追加
				localStorage.setItem('completeList',JSON.stringify(data_complete));



				// let complete_add_li = document.createElement('li');
				// complete_add_li.textContent = want_add_li.textContent;
				// complete_add_li.classList.add('list');
				// // completeのボタンの作成と分岐
				// let delete_btn = document.createElement('i');
				// delete_btn.classList.add('far', 'fa-trash-alt', 'delete');
				// delete_btn.addEventListener('click',function(){
				// 	let judgment = confirm('データを完全に削除することになります。本当に削除しますか？');
				// 	if(judgment == true){
				// 		this.parentElement.remove();
				// 	}
				// });
				// complete_add_li.appendChild(delete_btn);
				// complete.appendChild(complete_add_li);
			} 
		});

		want_add_li.appendChild(check_btn);
		want.appendChild(want_add_li);
}

// completeの処理の関数
function complete_tag(complete_text){
	// complete への移行処理
	let complete = document.querySelector('.complete');
	let complete_add_li = document.createElement('li');
	complete_add_li.textContent = complete_text;
	complete_add_li.classList.add('list');
	console.log(complete_add_li);
	// completeのボタンの作成と分岐
	let delete_btn = document.createElement('i');
	delete_btn.classList.add('far', 'fa-trash-alt', 'delete');
	delete_btn.addEventListener('click',function(){
		let judgment = confirm('データを完全に削除することになります。本当に削除しますか？');
		if(judgment == true){

			let del_text = this.parentElement.textContent;
			data_complete.splice(data_complete.indexOf(del_text),1);
			this.parentElement.remove();

			localStorage.setItem('completeList',JSON.stringify(data_complete));
		}
	});
	complete_add_li.appendChild(delete_btn);
	complete.appendChild(complete_add_li);
}