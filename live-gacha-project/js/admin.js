const selectUserForm = document.getElementById("select-user-form");
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

const userSelect = document.getElementById("user");
const userDisplay = document.getElementById("user-display");
const userButton = document.getElementById("user-button");
// ユーザーIDから名前を取得するマッピング
const userNames = {
	"1": "井上",
	"2": "鶴ハルナ",
	"100": "デフォルト",
};

// 初期表示
function loadPrizes() {
    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");

    // ソート処理: ランク優先、同じランク内では確率が低い順
    prizes.sort((a, b) => {
        const rankOrder = ["SS", "S", "R", "N"];
        const rankDiff = rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
        return rankDiff !== 0 ? rankDiff : a.probability - b.probability;
    });

    prizeList.innerHTML = ""; 
    let totalProbability = 0;
    let currentRank = null;
    let rankCount = 0;

    const headerRow = document.createElement("tr");
    headerRow.classList.add('header-border');
    headerRow.innerHTML = "<th>ランク</th><th>名前</th><th>確率</th><th>操作</th>";
    prizeList.appendChild(headerRow);

    prizes.forEach((prize) => {
        const row = document.createElement("tr");

        if (prize.rank !== currentRank) {
            currentRank = prize.rank;
            rankCount = 0;
        }

        const rankCell = document.createElement("td");
        if (rankCount === 0) {
            rankCell.textContent = prize.rank;
            rankCell.rowSpan = prizes.filter(p => p.rank === prize.rank).length;
            rankCell.classList.add("rank");
            row.appendChild(rankCell);
        }

        const nameCell = document.createElement("td");
        nameCell.textContent = prize.name;
        row.appendChild(nameCell);

        const probabilityCell = document.createElement("td");
        probabilityCell.textContent = `${prize.probability}%`;
        row.appendChild(probabilityCell);

        const actionCell = document.createElement("td");

        // 編集ボタン
        const editButton = document.createElement("button");
        editButton.textContent = "編集";
        editButton.dataset.id = prize.id;
        editButton.addEventListener("click", () => editPrize(prize.id));
        actionCell.appendChild(editButton);

        // 削除ボタン
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.dataset.id = prize.id;
        deleteButton.addEventListener("click", () => deletePrize(prize.id));
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        prizeList.appendChild(row);

        totalProbability += prize.probability;
        rankCount++;
    });

    const remainingProbability = (100 - totalProbability).toFixed(2);
    remainingProbabilityElement.textContent = `残りの確率: ${remainingProbability}%`;
    errorMessageElement.textContent = remainingProbability < 0 ? "確率の合計が100%を超えています。" : "";
}

// 削除処理
function deletePrize(id) {
    let prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
    prizes = prizes.filter(prize => prize.id !== id);
    localStorage.setItem("prizes", JSON.stringify(prizes));
    loadPrizes();
}

// 編集フォームの表示
function editPrize(id) {
    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");
    const prize = prizes.find(p => p.id === id);
    if (!prize) return;

    editingId = id;
    editPrizeNameInput.value = prize.name;
    editPrizeProbabilityInput.value = prize.probability;
    editPrizeRankInput.value = prize.rank;
    editForm.style.display = "block";
}

// 更新ボタンの処理
updateButton.addEventListener("click", () => {
    const name = editPrizeNameInput.value;
    const probability = parseFloat(editPrizeProbabilityInput.value);
    const rank = editPrizeRankInput.value;

    let prizes = JSON.parse(localStorage.getItem("prizes") || "[]");

    const totalProbability = prizes.reduce((sum, prize) => prize.id !== editingId ? sum + prize.probability : sum, 0);

    if (totalProbability + probability > 100) {
        errorMessageElement.textContent = "確率の合計が100%を超えます。";
        return;
    }

    const index = prizes.findIndex(p => p.id === editingId);
    if (index !== -1) {
        prizes[index] = { id: editingId, name, probability, rank };
        localStorage.setItem("prizes", JSON.stringify(prizes));
    }

    editForm.style.display = "none";
    editingId = null;
    loadPrizes();
});

// キャンセルボタンの処理
cancelButton.addEventListener("click", () => {
    editForm.style.display = "none"; // 編集フォームを非表示
    editingId = null; // 編集中のIDをリセット
});

// 景品追加処理
function addPrize(event) {
    event.preventDefault();
    const name = document.getElementById("prize-name").value;
    const probability = parseFloat(document.getElementById("prize-probability").value);
    const rank = document.getElementById("prize-rank").value;

    const prizes = JSON.parse(localStorage.getItem("prizes") || "[]");

    let totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    if (totalProbability + probability > 100) {
        errorMessageElement.textContent = "確率の合計が100%を超えます。";
        return;
    }

    prizes.push({ id: crypto.randomUUID(), name, probability, rank });
    localStorage.setItem("prizes", JSON.stringify(prizes));
    prizeForm.reset();
    loadPrizes();
}

// Form submit event listener
prizeForm.addEventListener("submit", addPrize);  // Added this line to ensure prize addition works


// ユーザー選択
function selectUser(event) {
	event.preventDefault();
	const userId = document.getElementById("user").value;

	if (userId) {
		localStorage.setItem("user", userId);
		displaySelectedUser(userId); // 選択されたユーザー名を表示
		updateButtonLabel(userId); // ボタンのラベルを更新
		alert("ユーザーを保存しました！");
	} else {
		alert("ユーザーを選択してください！");
	}

}

// 選択されたユーザーを表示
function displaySelectedUser(userId) {
	userDisplay.innerHTML = ""; // 既存の内容をクリア
	if (userId && userNames[userId]) {
		const p = document.createElement("p");
		p.textContent = `選択されたユーザー: ${userNames[userId]}`;
		userDisplay.appendChild(p);
	}
}

// ボタンのラベルを更新
function updateButtonLabel(userId) {
	if (userId) {
		userButton.textContent = "ユーザーを変更";
	} else {
		userButton.textContent = "ユーザーを選択";
	}
}

// ページ読み込み時にローカルストレージからユーザー情報を取得＆表示
const savedUser = localStorage.getItem("user");
if (savedUser) {
	userSelect.value = savedUser;
	displaySelectedUser(savedUser);
	updateButtonLabel(savedUser);
}

selectUserForm.addEventListener("submit", selectUser);

// 初期表示
loadPrizes();
