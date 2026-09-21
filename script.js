function getCurrentLevelFromPath() {
    const match = window.location.pathname.match(/level(\d+)/i);
    return match ? Number(match[1]) : 0;
}

let currentLevel = Number(sessionStorage.getItem("currentLevel")) || getCurrentLevelFromPath();
const SPLASH_DURATION_MS = 3000;

let progress = JSON.parse(localStorage.getItem("progress")) || {
    level1: false,
    level2: false,
    level3: false
};

let win = document.getElementById('splashScreen');

document.addEventListener("contextmenu", event => {
    event.preventDefault();
});

function hideAll() {
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.add("hidden");
    });
}

function getActiveMusicElement() {
    if (window.location.pathname.includes("level1")) {
        return document.getElementById("lvl1");
    }
    if (window.location.pathname.includes("level2")) {
        return document.getElementById("lvl2");
    }
    if (window.location.pathname.includes("level3")) {
        return document.getElementById("lvl3");
    }
    if (window.location.pathname.includes("levelBoss")) {
        return document.getElementById("lvlBoss");
    }
    return document.getElementById("backgroundMusic");
}

function playBackgroundMusic() {
    const music = getActiveMusicElement();
    if (music) {
        music.currentTime = 0;
        music.play().catch(() => {});
    }
}

function pauseBackgroundMusic() {
    const music = getActiveMusicElement();
    if (music) {
        music.pause();
    }
}

function showHub() {
    hideAll();
    document.getElementById("hub").classList.remove("hidden");
    playBackgroundMusic();
    updateUI();
}

function playLevel(level) {
    pauseBackgroundMusic();
    sessionStorage.setItem("currentLevel", level);
    switch (level) {
        case 1:
            window.location.href = "pages/level1/level1.html";
            break;
        case 2:
            window.location.href = "pages/level2/level2.html";
            break;
        case 3:
            window.location.href = "pages/level3/level3.html";
            break;
    }
}

function completeLevel() {
    const level = currentLevel || getCurrentLevelFromPath();
    if (!level) return;

    progress["level" + level] = true;
    localStorage.setItem("progress", JSON.stringify(progress));
    sessionStorage.setItem("showHubAfterLoad", "true");
    if (win != null) {
        win.style.display = 'block';
        win.style.opacity = '0';

        requestAnimationFrame(() => {
            win.style.opacity = '1';

            setTimeout(function() {
                win.style.opacity = '0';
                setTimeout(function() {
                    win.style.display = 'none';
                    window.location.href = "../../index.html";
                }, 400);
            }, SPLASH_DURATION_MS);
        });
    } else {
        alert("Level Completed!");
        window.location.href = "../../index.html";
    }
}

function updateUI() {
    for (let i = 1; i <= 3; i++) {
        let status = document.getElementById("status" + i);
        if (progress["level" + i]) {
            status.innerHTML = "✔ Completed";
            status.className = "completed";
        } else {
            status.innerHTML = "Not Completed";
            status.className = "";
        }
    }

    let boss = document.getElementById("bossBtn");

    if (progress.level1 && progress.level2 && progress.level3) {
        boss.disabled = false;
        boss.innerHTML = "Play Boss Level";
    } else {
        boss.disabled = true;
        boss.innerHTML = "Boss Level Locked!";
    }
}

function playBoss() {
    pauseBackgroundMusic();
    sessionStorage.setItem("currentLevel", 4);
    window.location.href = "pages/levelBoss/levelBoss.html";
}

function resetProgress() {
    progress = {
        level1: false,
        level2: false,
        level3: false
    };
    localStorage.removeItem("progress");
    updateUI();
}

function showHubFromOutside() {
    sessionStorage.setItem("showHubAfterLoad", "true");
    window.location.href = "../../index.html";
}

if (sessionStorage.getItem("showHubAfterLoad") === "true") {
    sessionStorage.removeItem("showHubAfterLoad");
    showHub();
} else {
    updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
    playBackgroundMusic();
});