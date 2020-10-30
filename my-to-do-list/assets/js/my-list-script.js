// モックファイルをコメントアウトする
// 1．入力文字チェック
// ボタンが押されたra
// 2. 3つあるうちのどのボタンが押されたのか、ボタンが押された時の処理をする(for ofを使って処理<textContentがないから判別できな>,,,一個づつ作る？？)
// 何も入力されていなかったら何もしない
// 3．文字が入力されていたら、新しいリストに追加する
// 4．新しいリストの左側にdeleteボタンを追加する

var icon_btn = document.querySelectorAll('.icon-btn');
console.log(icon_btn);
// 押されたボタンの判別
for(let icon_each of icon_btn){
	console.log(icon_each);
	icon_each.addEventListener('click',function(){
		console.log(icon_each);
		// 入力文字の取得
		let input_task = document.querySelector('.input-msg');
		if(input_task.value != ''){
			let task_day_parent = document.querySelector('.task-day');
			let task_day_add_li = document.createElement('li');
			task_day_add_li.textContent = input_task.value;
			task_day_add_li.classList.add('list');
			let delete_icon = document.createElement('i');
			delete_icon.classList.add('far fa-trash-alt');
			task_day_add_li.appendChild(delete_icon);
			task_day_parent.appendChild(task_day_add_li);

		}
	});
}