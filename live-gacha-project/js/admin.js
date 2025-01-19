const prizeForm = document.getElementById("prize-form");
const prizeList = document.getElementById("prize-list");
const remainingProbabilityElement = document.getElementById("remaining-probability");
const errorMessageElement = document.getElementById("error-message");
const editForm = document.getElementById("edit-form");
const editPrizeNameInput = document.getElementById("edit-prize-name");
const editPrizeProbabilityInput = document.getElementById("edit-prize-probability");
const editPrizeRankInput = document.getElementById("edit-prize-rank");
const updateButton = document.getElementById("update-button");
const cancelButton = document.getElementById("cancel-button");
let editingIndex = null;

// 初期表示
function loadPrizes() {
    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");

    // ソート処理: ランク優先、同じランク内では確率が低い順
    prizes.sort((a, b) => {
        const rankOrder = ["SS", "S", "R", "N"]; // ランクの優先順位
        const rankDiff = rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
        if (rankDiff !== 0) {
            return rankDiff; // ランクが異なる場合、ランク順でソート
        }
        return a.probability - b.probability; // 同じランクの場合、確率が低い順でソート
    });

    prizeList.innerHTML = ""; // 現在のリストをクリア
    let totalProbability = 0;
    let currentRank = null;
    let rankCount = 0;

    // テーブルヘッダーを作成
    const headerRow = document.createElement("tr");
    headerRow.classList.add('header-border'); // ヘッダーの境目にボーダーを追加
    headerRow.innerHTML = "<th>ランク</th><th>名前</th><th>確率</th><th>操作</th>";
    prizeList.appendChild(headerRow);

    prizes.forEach((prize, index) => {
        const row = document.createElement("tr");

        // ランクが変わった場合、新しいランクのセルを作成
        if (prize.rank !== currentRank) {
            currentRank = prize.rank;
            rankCount = 0; // ランクを変更した場合、カウントをリセット
        }

        // ランクセルが最初のアイテムであれば、表示（それ以外は作成しない）
        const rankCell = document.createElement("td");
        if (rankCount === 0) {
            rankCell.textContent = prize.rank;
            rankCell.rowSpan = prizes.filter(p => p.rank === prize.rank).length; // 同じランクの景品数分結合
			rankCell.classList.add("rank")
            row.appendChild(rankCell);
        }

        // アイテム情報をセルに追加
        const nameCell = document.createElement("td");
        nameCell.textContent = prize.name;
        row.appendChild(nameCell);

        const probabilityCell = document.createElement("td");
        probabilityCell.textContent = `${prize.probability}%`;
        row.appendChild(probabilityCell);

        // 操作ボタンをセルに追加
        const actionCell = document.createElement("td");

        // 編集ボタン
        const editButton = document.createElement("button");
        editButton.textContent = "編集";
        editButton.addEventListener("click", () => {
            editPrize(index);
        });
        actionCell.appendChild(editButton);

        // 削除ボタン
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", () => {
            deletePrize(index);
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        prizeList.appendChild(row);

        totalProbability += prize.probability;
        rankCount++; // ランク内のアイテムをカウント

        // ランク境目のボーダーを追加
        if (rankCount === 1) {
            row.classList.add("rank-border");
        }
    });

    // 残りの確率を計算して表示
    const remainingProbability = (100 - totalProbability).toFixed(2);
    remainingProbabilityElement.textContent = `残りの確率: ${remainingProbability}%`;

    // 確率が100を超えないようにエラー表示
    if (remainingProbability < 0) {
        errorMessageElement.textContent = "確率の合計が100%を超えています。";
    } else {
        errorMessageElement.textContent = "";
    }
}


function deletePrize(index) {
    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
    prizes.splice(index, 1);
    localStorage.setItem("prizes", JSON.stringify(prizes));
    loadPrizes();
}

// 編集フォームの表示
function editPrize(index) {
    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
    const prize = prizes[index];
    editingIndex = index;
    
    // フォームに現在の値を設定
    editPrizeNameInput.value = prize.name;
    editPrizeProbabilityInput.value = prize.probability;
    editPrizeRankInput.value = prize.rank;

    // 編集フォームを表示
    editForm.style.display = "block";
}

// キャンセルボタン
cancelButton.addEventListener("click", () => {
    editForm.style.display = "none";  // 編集フォームを非表示
    editingIndex = null;  // 編集中のインデックスをリセット
});

// 更新ボタン
updateButton.addEventListener("click", () => {
    const name = editPrizeNameInput.value;
    const probability = parseFloat(editPrizeProbabilityInput.value);
    const rank = editPrizeRankInput.value;

    // ローカルストレージから景品のデータを取得
    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
    const totalProbability = prizes.reduce((sum, prize, index) => {
        if (index !== editingIndex) {
            return sum + prize.probability;
        }
        return sum;
    }, 0);

    if (totalProbability + probability > 100) {
        errorMessageElement.textContent = "確率の合計が100%を超えます。";
        return;
    } else {
        errorMessageElement.textContent = "";
    }

    // 景品データを更新
    prizes[editingIndex] = { name, probability, rank };
    localStorage.setItem("prizes", JSON.stringify(prizes));

    // 編集フォームを非表示にし、リストを再読み込み
    editForm.style.display = "none";
    editingIndex = null;
    loadPrizes();
});

// 景品追加
function addPrize(event) {
    event.preventDefault();  // Prevent form submission
    const name = document.getElementById("prize-name").value;
    const probability = parseFloat(document.getElementById("prize-probability").value);
    const rank = document.getElementById("prize-rank").value;

    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");

    // 確率合計を計算
    let totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);

    // 新しい景品の確率を追加して、合計が100%を超える場合はエラー
    if (totalProbability + probability > 100) {
        errorMessageElement.textContent = "確率の合計が100%を超えます。";
        return;
    } else {
        errorMessageElement.textContent = "";
    }

    prizes.push({ name, probability, rank });
    localStorage.setItem("prizes", JSON.stringify(prizes));
    prizeForm.reset();
    loadPrizes();
}

// Form submit event listener
prizeForm.addEventListener("submit", addPrize);  // Added this line to ensure prize addition works

// 初期表示
loadPrizes();
