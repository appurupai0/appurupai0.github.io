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

// ガチャボタンのクリックイベント
document.getElementById("gacha-button").addEventListener("click", () => {
    const animationArea = document.getElementById("animation-area");
    const resultArea = document.querySelector(".result");
    const resultText = document.getElementById("result-text");
    const resultRank = document.getElementById("result-rank");
	const gachaBGM = document.getElementById("gacha-bgm");
	// ガチャのランクと対応する画像パス
	const gachaResults = {
		SS: 'assets/image/yumekawa_angel_tenshi.png',
		S: 'assets/image/yumekawa_baby.png',
		R: 'assets/image/character_manekineko.png',
		N: 'assets/image/snowman_yukidaruma_toketa.png'
	};
	const resultImage = document.getElementById("result-image");
	const gachaButton = document.getElementById("btn-container");

    // アニメーション表示
    animationArea.classList.remove("hidden");
    resultArea.classList.add("hidden");
	gachaButton.classList.add("hidden");

	// ガチャBGM表示
	gachaBGM.currentTime = 1.2;
	gachaBGM.play();

    setTimeout(() => {
        const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
        const result = performGacha(prizes);

        // 結果表示
        if (result) {
			resultImage.src = gachaResults[result.rank];
            resultText.textContent = result.name;
            resultRank.textContent = result.rank;
        } else {
            resultText.textContent = "景品がありません";
            resultRank.textContent = "";
        }

        // 表示切り替え
        animationArea.classList.add("hidden");
        resultArea.classList.remove("hidden");
		gachaButton.classList.remove("hidden");
    }, 2000);
});

// 検証用のガチャ試行
const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
const trials = 10000; // 試行回数
testGacha(prizes, trials);
