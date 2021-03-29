var now = new Date();

var yeare = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();

var day = now.getDay();　//0~6の数字でココはあらわされているから配列に値を入れてあげる必要がある
// 曜日の配列
var youbi = ['日', '月', '火', '水', '木', '金', '土'];

var houer = now.getHours();


// 日付もリアルタイムで表示するしたい

// dateID = setInterval('day()',500);

// function day(){
// 	document.getElementById('nowDay').innerHTML = getday(nowday);
// }

// function getday(nowday){
// 	var now = new Date();

// 	var yeare = now.getFullYear();
// 	var month = now.getMonth() + 1;
// 	var date = now.getDate();

// 	var day = now.getDay();　//0~6の数字でココはあらわされているから配列に値を入れてあげる必要がある
// 	// 曜日の配列
// 	var youbi = ['日', '月', '火', '水', '木', '金', '土'];

// 	var nowday = yeare + '年' + month + '月' + date + '日' + '(' + youbi[day] + ')';
// 	console.log(nowday);
// 	return nowday;
// }

let today = yeare + '年' + month + '月' + date + '日' + '(' + youbi[day] + ')';
	console.log(today);

let yeare_tag = document.querySelector('#nowDay');
yeare_tag.textContent = today;

// リアルタイムで時刻を表示する処理
timerID = setInterval('clock()',500); //0.5秒毎にclock()を実行

function clock() {
	document.getElementById('nowTime').innerHTML = getNow();
}

function getNow() {
	var now = new Date();

	var houer = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();

	if(min < 10){min = '0' + min;}
	if(sec < 10){sec = '0' + sec;}

	//出力用
	var s = houer + ":" + min; 
	return s;
}

// 次の日時を表示
// 条件付き（現在時刻が6時前だったらその日を表示、それ以降なら次の日を表示）
// let nextMonth = month + 1;
let nextDate = date + 1; 
let nextday = day + 1;

console.log(nextDate);
if(houer < 6){
	let next_Day = month + '月' + date + '日' + '(' + youbi[day] + ')';
	next_Day_list = document.querySelector('#nextDay');
	next_Day_list.textContent = next_Day;
}else{
	let next_Days = month + '月' + nextDate + '日' + '(' + youbi[nextday] + ')';
	next_Day_list = document.querySelector('#nextDay');
	next_Day_list.textContent = next_Days;
}


// ローカルストレージの定義
// let data;

// if(localStorage.getItem('nextTask')){
// 	data = JSON.parse(localStorage.getItem('nextTask'));
// }else{
// 	// localStorageに何も存在しない場合空の配列を入れる
// 	data = [];
// }

// // 保存されたデータを、画面に表示する
// for(let displayList of data){
// 	create_list(displayList);
// }

// 一言目標の欄
// 作動しないよ………
var target = document.getElementById('oneword');
console.log(target);
target.addEventListener('click',function(){
	let input_target = document.getElementById('input_one');
	console.log(input_target);
	if(input_target.value != ''){
		let output_target = document.querySelector('#target');
		output_target.textContent = input_target.value;
	}
});

// ココも作動しないよ……
var add_oneword = document.querySelector('#addbotton');
console.log(add_oneword);
add_oneword.addEventListener('click',function(){
	let input_oneword = document.querySelector('#input_one');
	console.log(input_oneword.value);
	if(input_oneword.value != ''){
		// リストタグを生成
		let list_parent = document.querySelector('#js-content');
		let add_li = ducument.createElement('p');
		add_li.textContent = input_oneword.value;
		add_li.classList.add('ml-3','mb-0');

		list_parent.appendChild(add_li);
	}
});


// // inputタグを入力してaddボタンが追加された時
// var add_li = document.querySelector('#addbotton');
// add_li.addEventListener('click',function(){
// 	// 入力文字の取得
// 	let input_msg = document.querySelector('.addlist');
// 	console.log(input_msg);
// 	if(input_msg.value != ''){
// 		// create_listの処理へ移動しリストを作成
// 		create_list(input_msg.value);

// 		// 配列に、入力された値を追加
// 		data.push(input_msg.value);

// 		// localStorageに入れる値を追加
// 		localStorage.setItem('nextTask',JSON.stringify(data));


// 		input_msg.value = '';
// 	}
// });


// // リストを追加表示する処理の関数
// function create_list(create_text){

// 	// js-contentのタグの生成
// 	let text_list = document.querySelector('#js-content');

// 	let add_checkbox = document.createElement('input');
// 		add_checkbox.type = 'checkbox';
// 		add_checkbox.value = 'on';
// 		add_checkbox.classList.add('checkbox');

// 	let text_task = document.createElement('p');
// 		text_task.textContent = create_text;
// 		text_task.classList.add('ml-3');
// 		text_task.classList.add('mb-0');
// 		console.log(task_text);

// 		text_list.appendChild(add_checkbox);
// 		text_list.appendChild(text_task);

// 	// js-deleteのタグの生成と処理
// 	let text_delete = document.querySelector('#js-delete');
// 	let yet_tag = document.createElement('p');
// 		yet_tag.classList.add('border', 'border-success',
// 				'rounded','pl-2','pr-2','text-success','mb-0');
// 		yet_tag.textContent = 'yet';
// }



	
