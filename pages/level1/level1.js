let finalMatch = false;
// Ubah data dekat sini
const pairs = [
    {
        id: "termometer",
        cards: [
            {
                image: "../../assets/img/termometer.png",
                alt: "🌡️"
            },
            {
                image: "../../assets/img/termometer.png",
                alt: "🌡️"
            }
        ],
        title: "termometer",
        message: "<p>Suhu ubat mengikut suhu yang dinyatakan:</p><ul><li><b>Suhu 2°C - 8°C:</b> Ruang tengah peti sejuk.</li><li><b>Suhu 30°C ke bawah:</b> Suhu bilik</li></ul>"
    },
    {
        id: "tablet",
        cards: [
            {
                image: "../../assets/img/pills.png",
                alt: "💊"
            },
            {
                image: "../../assets/img/pills.png",
                alt: "💊"
            }
        ],
        title: "pills",
        message: "<p>Simpan ubat dalam bekas asal atau sampul ubat berserta label yang lengkap.</p>"
    },
    {
        id: "cahaya",
        cards: [
            {
                image: "../../assets/img/cahaya.png",
                alt: "☀️"
            },
            {
                image: "../../assets/img/cahaya.png",
                alt: "☀️"
            }
        ],
        title: "cahaya",
        message: "<p>Jauhkan ubat daripada cahaya matahari.</p><ul><li>Contoh: Meletakkan ubat-ubatan di tepi tingkap.</li></ul>"
    },
    {
        id: "firstAid",
        cards: [
            {
                image: "../../assets/img/first-aid.png",
                alt: "🩹"
            },
            {
                image: "../../assets/img/first-aid.png",
                alt: "🩹"
            }
        ],
        title: "first-aid",
        message: "<ul><li>Asingkan ubat makan daripada ubat kegunaan luar.</li><li>Jangan simpan ubat yang luput, rosak, atau tidak berlabel.</li></ul>"
    },
    {
        id: "fridge",
        cards: [
            {
                image: "../../assets/img/fridge.png",
                alt: "🧊"
            },
            {
                image: "../../assets/img/fridge.png",
                alt: "🧊"
            }
        ],
        title: "fridge",
        message: "<p>Jangan simpan ubat di dalam peti sejuk kecuali diarah berbuat demikian.</p>"
    }
];


let cards = [];
pairs.forEach(pair => {
    pair.cards.forEach(content => {
        cards.push({
            pairId: pair.id,
            content: typeof content === "string" ? { label: content } : content,
            title: pair.title,
            message: pair.message
        });
    });
});

// Shuffle
cards = cards.sort(() => Math.random() - 0.5);

const board = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Build cards
cards.forEach((data, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.pairId = data.pairId;

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");
    if (data.content.image) {
        const image = document.createElement("img");
        image.src = data.content.image;
        image.alt = data.content.alt || data.content.label || "Card image";
        front.appendChild(image);
    } else {
        front.textContent = data.content.label || "";
    }

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = "";

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    board.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
});

function flipCard(card) {
    if (lockBoard) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

function checkMatch() {
    const firstData = cards[firstCard.dataset.index];
    const secondData = cards[secondCard.dataset.index];

    if (firstData.pairId === secondData.pairId) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        showInfo(firstData.title, firstData.message);
        resetTurn();

        // Check if this was the final pair
        const matchedCards = document.querySelectorAll(".card.matched").length;
        if (matchedCards === cards.length) {
            finalMatch = true; // mark that the last modal is showing
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 900);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Modal
const modal = document.getElementById("info-modal");
const infoImg = document.getElementById("info-img");
const infoText = document.getElementById("info-text");
const closeBtn = document.getElementById("close-modal");

function showInfo(title, message) {
    const imageName = title || "info";
    const imageSrc = `../../assets/img/${imageName}.png`;

    if (typeof setLevelControlsDisabled === "function") {
        setLevelControlsDisabled(true);
    }

    infoImg.innerHTML = `
        <img
            src="${imageSrc}"
            alt="Info Image"
            style="width: min(10vw, 8vw); object-fit: contain;"
            onerror="this.onerror=null; this.src='../../assets/img/info.png'; this.alt='Info fallback';"
        >
    `;
    infoText.innerHTML = message;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    modal.classList.remove("show");
    requestAnimationFrame(() => {
        modal.classList.add("show");
    });
}

function hideInfoModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");

        if (typeof setLevelControlsDisabled === "function") {
            setLevelControlsDisabled(false);
        }

        if (finalMatch && typeof completeLevel === "function") {
            completeLevel();
            finalMatch = false;
        }
    }, 400);
}

closeBtn.addEventListener("click", hideInfoModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        hideInfoModal();
    }
});