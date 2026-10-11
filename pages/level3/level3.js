const modalContentByCategory = {
    semak: {
        title: 'SEMAK',
        message: '<p>Semak dan asing ubat yang telah rosak dan melepasi tarihk luput.</p>'
    },
    hapus: {
        title: 'HAPUS',
        message: '<p>Hapus label keselamatan hologram dan maklumat peribadi pada pembungkusan ubat.</p>'
    },
    bungkus: {
        title: 'BUNGKUS',
        message: '<p>Bungkus ubat dalam bekas yang bersesuaian tanpa perlu dikeluarkan daripada bekas asal.</p>'
    },
    lupus: {
        title: 'LUPUS',
        message: '<p>Bawa ubat tersebut ke lokasi pengumpulan ubat.</p>'
    },
    imbas: {
        title: 'IMBAS',
        message: '<p>Imbas kod QR pada bin pengumpulan ubat dan jawab soalan tinjauan.</p>'
    }
};

let finalMatch = false;
const itemContainer = document.getElementById("items");
const items = [...itemContainer.querySelectorAll(".item")];
for (let index = items.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
}
items.forEach(item => {
    const image = item.querySelector("img");
    if (image) image.setAttribute("draggable", "false");
    item.addEventListener("dragstart", event => event.preventDefault());
    itemContainer.appendChild(item);
});

const bins = document.querySelectorAll(".bin");
const feedback = document.getElementById("feedback");
const modal = document.getElementById("info-modal");
const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");
const closeBtn = document.getElementById("close-modal");
const finalModal = document.getElementById("final-modal");
const closeFinalBtn = document.getElementById("close-final-modal");
let selectedItem = null;
let sortedCount = 0;
let activeDrag = null;
let suppressClick = false;

function showInfo(category) {
    const content = modalContentByCategory[category];
    if (!content) return;

    infoTitle.textContent = content.title;
    infoText.innerHTML = content.message;

    modal.style.display = "flex";
    requestAnimationFrame(() => {
        modal.classList.add("show");
    });
}

function closeInfoModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";

        if (finalMatch && typeof completeLevel === "function") {
            finalMatch = false;
            finalModal.style.display = "flex";
            requestAnimationFrame(() => {
                finalModal.classList.add("show");
            });
        }
    }, 400);
}

closeFinalBtn.addEventListener("click", () => {
    finalModal.classList.remove("show");
    setTimeout(() => {
        finalModal.style.display = "none";
        if (typeof completeLevel === "function") {
            completeLevel();
        }
    }, 400);
});

function setFeedback(message, type = "") {
    feedback.textContent = message;
    feedback.className = type;
}

function sortItem(item, bin) {
    if (!item || item.classList.contains("sorted")) return;

    if (item.dataset.category !== bin.dataset.category) {
        item.classList.remove("selected");
        selectedItem = null;
        setFeedback("That item belongs in a different category. Try again.", "error");
        return;
    }

    const placedItem = document.createElement("div");
    placedItem.className = "sorted-item";

    const itemImage = document.createElement("img");
    itemImage.src = item.dataset.image || "";
    itemImage.alt = item.dataset.label || "Sorted item";
    placedItem.appendChild(itemImage);

    bin.classList.add("correct");
    bin.appendChild(placedItem);
    item.classList.add("sorted");
    item.classList.remove("selected");
    selectedItem = null;
    sortedCount += 1;

    showInfo(bin.dataset.category);

    if (sortedCount === items.length) {
        setFeedback("All items sorted correctly. Read the final message to continue.", "success");
        finalMatch = true;
    } else {
        setFeedback(`${sortedCount} of ${items.length} items sorted correctly.`, "success");
    }
}

closeBtn.addEventListener("click", closeInfoModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeInfoModal();
    }
});

items.forEach(item => {
    item.addEventListener("pointerdown", event => {
        if (!event.isPrimary || event.button !== 0) return;
        activeDrag = {
            item,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            preview: null,
            target: null
        };
    });

    item.addEventListener("click", event => {
        if (suppressClick && event.detail > 0) {
            event.preventDefault();
            suppressClick = false;
            return;
        }
        items.forEach(otherItem => otherItem.classList.remove("selected"));
        selectedItem = item;
        item.classList.add("selected");
        setFeedback("Now click the category where this item belongs.");
    });
});

document.addEventListener("pointermove", event => {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;

    const distance = Math.hypot(event.clientX - activeDrag.startX, event.clientY - activeDrag.startY);
    if (!activeDrag.preview && distance < 8) return;

    event.preventDefault();
    if (!activeDrag.preview) {
        activeDrag.preview = activeDrag.item.cloneNode(true);
        activeDrag.preview.classList.remove("selected");
        activeDrag.preview.classList.add("drag-preview");
        activeDrag.item.classList.add("dragging");
        document.body.appendChild(activeDrag.preview);
    }

    activeDrag.preview.style.left = `${event.clientX}px`;
    activeDrag.preview.style.top = `${event.clientY}px`;

    const bin = document.elementFromPoint(event.clientX, event.clientY)?.closest(".bin") || null;
    if (activeDrag.target !== bin) {
        activeDrag.target?.classList.remove("over");
        activeDrag.target = bin;
        activeDrag.target?.classList.add("over");
    }
});

function finishDrag(event, shouldDrop) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;

    const drag = activeDrag;
    activeDrag = null;
    drag.item.classList.remove("dragging");
    drag.preview?.remove();
    drag.target?.classList.remove("over");

    if (drag.preview) {
        suppressClick = true;
        setTimeout(() => {
            suppressClick = false;
        }, 0);
        if (shouldDrop) {
            const bin = document.elementFromPoint(event.clientX, event.clientY)?.closest(".bin");
            if (bin) sortItem(drag.item, bin);
        }
    }
}

document.addEventListener("pointerup", event => finishDrag(event, true));
document.addEventListener("pointercancel", event => finishDrag(event, false));

bins.forEach(bin => {
    bin.addEventListener("click", () => {
        sortItem(selectedItem, bin);
    });

    bin.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            sortItem(selectedItem, bin);
        }
    });
});