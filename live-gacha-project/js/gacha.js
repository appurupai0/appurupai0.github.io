// 確率テーブルを生成する関数
function createProbabilityTable(prizes) {
    const probabilityTable = [];
    prizes.forEach(prize => {
        const timesToAdd = Math.round(prize.probability * 100); // 確率を整数化
        for (let i = 0; i < timesToAdd; i++) {
            probabilityTable.push({ name: prize.name, rank: prize.rank });
        }
    });
    return probabilityTable;
}

// ガチャを実行する関数
function performGacha(prizes) {
    const probabilityTable = createProbabilityTable(prizes);
    if (probabilityTable.length === 0) return null; // 景品がない場合

    const randomIndex = Math.floor(Math.random() * probabilityTable.length);
    return probabilityTable[randomIndex];
}

// 検証用関数
function testGacha(prizes, trials) {
    const testResults = {};

    for (let i = 0; i < trials; i++) {
        const result = performGacha(prizes);
        if (result) {
            testResults[result.name] = (testResults[result.name] || 0) + 1;
        }
    }

    // 結果をコンソールに表示
    console.log(`確率検証結果（試行回数：${trials}）`);
    Object.entries(testResults).forEach(([name, count]) => {
        const probability = (count / trials) * 100;
        console.log(`${name}: ${count}回 (${probability.toFixed(2)}%)`);
    });
}


// ガチャボタン押下時の要素を事前に取得
const h1 = document.querySelector('h1');
const resultArea = document.querySelector(".result");
const resultText = document.getElementById("result-text");
const resultRank = document.getElementById("result-rank");
const gachaBGM = document.getElementById("gacha-bgm");
const resultImage = document.getElementById("result-image");
const gachaButton = document.getElementById("btn-container");


// ガチャボタンのクリックイベント
document.getElementById("playButton").addEventListener("click", () => {
	// ガチャの抽選
	const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
	const result = performGacha(prizes);

	// 結果がない場合は処理を終了し、アラートを表示
	if (!result) {
		alert("景品データがありません。景品を登録してください！");
		gachaButton.classList.remove("hidden"); // ボタンを再表示
		return;
	}
	
	// 見出し・結果欄を非表示
	h1.classList.add("hidden")
	resultArea.classList.add("hidden");
	gachaButton.classList.add("hidden");

	// ガチャのランクと対応する画像パス
	const ResultsImg = {
		SS: 'assets/image/yumekawa_angel_tenshi.png',
		S: 'assets/image/yumekawa_baby.png',
		R: 'assets/image/character_manekineko.png',
		N: 'assets/image/snowman_yukidaruma_toketa.png'
	};
	const selectResultImg = ResultsImg[result.rank]

    // ガチャのランクと対応するビデオパス
	const videoPaths = {
		SS: "assets/videos/3tr006ガチャレア虹.mp4",
		S: "assets/videos/3tr005ガチャレア金.mp4",
		R: "assets/videos/3tr004ガチャレア銀.mp4",
		N: "assets/videos/normal.mp4",
	};
	const selectedVideo = videoPaths[result.rank];

	// すでにビデオタグが存在している場合は再生を開始
	let player = document.getElementById("player");
	if (player) {
	  player.src = selectedVideo; // 動画のソースを更新
	  player.play();
	} else {
	  // 動画タグを作成して挿入
	  const videoHTML = document.createElement("video");
	  videoHTML.id = "player";
	  videoHTML.preload = "auto";

	  videoHTML.setAttribute("playsinline", "true"); // PiP防止
	  videoHTML.setAttribute("webkit-playsinline", "true"); // iOS対応

	  const source = document.createElement("source");
	  source.src = selectedVideo; // 選択された動画を設定
	  source.type = "video/mp4";

	  videoHTML.appendChild(source);
	  document.body.appendChild(videoHTML);

	  player = document.getElementById("player");

	  // ビデオを全画面表示で再生
	  player.play();
	  if (player.requestFullscreen) {
		player.requestFullscreen();
	  } else if (player.webkitRequestFullscreen) {
	    player.webkitRequestFullscreen();
	  } else if (player.mozRequestFullScreen) {
		player.mozRequestFullScreen();
	  } else if (player.msRequestFullscreen) {
		player.msRequestFullscreen();
	  } else if (player.webkitEnterFullscreen) { // iOS / iPadOS ではこちらを試す
		player.webkitEnterFullscreen();
	  }

	  // 動画終了時の処理
	  player.addEventListener("ended", function () {
		player.remove(); // ビデオタグを削除
		// 表示切り替え
		h1.classList.remove("hidden");
		resultArea.classList.remove("hidden");
		gachaButton.classList.remove("hidden");
	  });
	}

	// 結果表示
	if (result) {
		resultImage.src = selectResultImg;
		resultText.textContent = result.name;
		resultRank.textContent = result.rank;
	} else {
		resultText.textContent = "景品がありません";
		resultRank.textContent = "";
	}
});

// 検証用のガチャ試行
const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
const trials = 10000; // 試行回数
testGacha(prizes, trials);
