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
        //  let judgment = confirm('データを完全に削除することになります。本当に削除しますか？');
        //  if(judgment == true){
        //    this.parentElement.remove();
        //  }
        // });
        // complete_add_li.appendChild(delete_btn);
        // complete.appendChild(complete_add_li);
      } 
    });

    want_add_li.appendChild(check_btn);
    want.appendChild(want_add_li);
}

// contentボタンが押された時
// contents_tag(input_msg.value);  
create_tag(input_msg.value,'.content');

// wantボタンが押された時
// want_tag(input_msg.value);
create_tag(input_msg.value,'.want-box');

function create_tag(display_text,parent_class_name){
     // let contents = document.querySelector('.contents');
     // let want = document.querySelector('.want-box');
     let parent = document.querySelector(parent_class_name);

     let contents_add_li = document.createElement('li');
    contents_add_li.textContent = contents_text;
    contents_add_li.classList.add('list');

    // deleteボタンの追加
    let delete_btn = document.createElement('i')
    delete_btn.classList.add('far');

    if (parent_class_name=='.contents'){
        delete_btn.classList.add('fa-trash-alt');
    }else{
        delete_btn.classList.add('fa-check-circle');
    }
    
    delete_btn.classList.add('delete');
}
