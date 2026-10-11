(function () {
    const WORD_BANK = [
        {
            word: 'TABLET',
            title: 'Tablet',
            image: '../../assets/img/pills.png',
            text: '<p>Tablet perlu disimpan di tempat yang kering dan bersih.</p><ul><li>Pastikan bekas tertutup rapat.</li><li>Jauhkan daripada haba dan kelembapan.</li></ul>'
        },
        {
            word: 'KAPSUL',
            title: 'Kapsul',
            image: '../../assets/img/pills.png',
            text: '<p>Kapsul biasanya sensitif kepada kelembapan.</p><ul><li>Simpan di tempat yang sejuk dan kering.</li><li>Elakkan daripada terkena cahaya matahari langsung.</li></ul>'
        },
        {
            word: 'KOSMETIK',
            title: 'Kosmetik',
            image: '../../assets/img/semak.png',
            text: '<p>Produk kosmetik mesti disimpan mengikut arahan pembungkusan.</p><ul><li>Pastikan bekas tertutup.</li><li>Jangan gunakan jika sudah rosak atau luput tarikh.</li></ul>'
        },
        {
            word: 'FARMASI',
            title: 'Farmasi',
            image: '../../assets/img/meditips.png',
            text: '<p>Farmasi adalah tempat untuk mendapatkan ubat yang betul.</p><ul><li>Semak label dan dos sebelum mengambil.</li><li>Rujuk pegawai farmasi jika ragu-ragu.</li></ul>'
        },
        {
            word: 'VAKSIN',
            title: 'Vaksin',
            image: '../../assets/img/semak.png',
            text: '<p>Vaksin perlu disimpan pada suhu yang betul.</p><ul><li>Ikut arahan syarat penyimpanan.</li><li>Elakkan perubahan suhu yang mendadak.</li></ul>'
        },
        {
            word: 'ALERGI',
            title: 'Alergi',
            image: '../../assets/img/cahaya.png',
            text: '<p>Alergi boleh terjadi jika ubat disimpan atau digunakan dengan tidak betul.</p><ul><li>Semak bahan aktif dan kesesuaian.</li><li>Berhati-hati dengan tanda reaksi alergi.</li></ul>'
        },
        {
            word: 'GENERIK',
            title: 'Generik',
            image: '../../assets/img/meditips.png',
            text: '<p>Ubat generik sama aktifnya dengan ubat berjenama.</p><ul><li>Semak nama dan dos yang tepat.</li><li>Baca label dengan teliti sebelum guna.</li></ul>'
        },
        {
            word: 'INSULIN',
            title: 'Insulin',
            image: '../../assets/img/termometer.png',
            text: '<p>Insulin perlu disimpan pada suhu yang sesuai.</p><ul><li>Jangan simpan dalam suhu terlalu panas.</li><li>Gunakan mengikut jadual yang ditetapkan.</li></ul>'
        },
        {
            word: 'MYUBAT',
            title: 'MyUBAT',
            image: '../../assets/img/meditips.png',
            text: '<p>MyUBAT membantu anda memantau penggunaan ubat dengan lebih selamat.</p><ul><li>Semak maklumat ubat secara berkala.</li><li>Pastikan jadual penggunaan konsisten.</li></ul>'
        },
        {
            word: 'ANTIBIOTIK',
            title: 'Antibiotik',
            image: '../../assets/img/first-aid.png',
            text: '<p>Antibiotik perlu diambil mengikut dos dan tempoh yang ditetapkan.</p><ul><li>Jangan hentikan tanpa nasihat doktor.</li><li>Elakkan penggunaan berlebihan.</li></ul>'
        },
        {
            word: 'INTERAKSI',
            title: 'Interaksi',
            image: '../../assets/img/semak.png',
            text: '<p>Interaksi ubat boleh menjejaskan keberkesanan rawatan.</p><ul><li>Maklumkan doktor atau pegawai farmasi.</li><li>Semak ubat lain yang sedang digunakan.</li></ul>'
        },
        {
            word: 'PRESKRIPSI',
            title: 'Preskripsi',
            image: '../../assets/img/fridge.png',
            text: '<p>Preskripsi penting untuk memastikan ubat yang betul pada dos yang betul.</p><ul><li>Semak arahan doktor sebelum membeli.</li><li>Pastikan label jelas dan lengkap.</li></ul>'
        },
        {
            word: 'HOLOGRAM',
            title: 'Hologram',
            image: '../../assets/img/bungkus.png',
            text: '<p>Hologram membantu memastikan pembungkusan ubat adalah asli.</p><ul><li>Semak ciri keselamatan pada pembungkusan.</li><li>Jangan beli ubat yang pembungkusan tidak lengkap.</li></ul>'
        },
        {
            word: 'ARAHAN',
            title: 'Arahan',
            image: '../../assets/img/imbas.png',
            text: '<p>Sentiasa baca arahan dengan teliti sebelum mengambil ubat.</p><ul><li>Ikut masa dan dos yang disyorkan.</li><li>Elakkan penyimpanan di luar panduan.</li></ul>'
        },
        {
            word: 'DAFTAR',
            title: 'Daftar',
            image: '../../assets/img/meditips.png',
            text: '<p>Mendaftar maklumat ubat membantu anda menjejak penggunaan dengan betul.</p><ul><li>Catat nama ubat dan dos.</li><li>Semak tarikh luput secara berkala.</li></ul>'
        }
    ];
    const WORDS_PER_GAME = 8;

    const GRID_SIZE = 10;
    const DIRECTIONS = [
        { dr: 0, dc: 1 }, // horizontal right
        { dr: 1, dc: 0 }, // vertical down
        { dr: 1, dc: 1 } // diagonal down-right
    ];

    let grid, placedWords, gameWords, foundWords, selecting, selectionPath, startCell, timerInterval, secondsElapsed;
    let completionPending = false;

    const gridEl = document.getElementById('grid');
    const wordlistEl = document.getElementById('wordlist');
    const progressEl = document.getElementById('progress');
    const timerEl = document.getElementById('timer');
    const splashScreen = document.getElementById('splashScreen');
    const modal = document.getElementById('info-modal');
    const infoImg = document.getElementById('info-img');
    const infoText = document.getElementById('info-text');
    const closeModalBtn = document.getElementById('close-modal');

    function randInt(n) { return Math.floor(Math.random() * n); }
    function randLetter() { return String.fromCharCode(65 + randInt(26)); }

    function getShorterReplacement(word, usedWords) {
        const uniqueWords = [...new Set(WORD_BANK.map(candidate => candidate.word.trim().toUpperCase()))]
            .filter(candidate => candidate.length > 0 && candidate.length <= GRID_SIZE)
            .filter(candidate => candidate.length < word.length && !usedWords.includes(candidate));

        return uniqueWords.sort((a, b) => a.length - b.length || a.localeCompare(b))[0] || null;
    }

    function tryPlaceWord(word) {
        for (let attempts = 0; attempts < 400; attempts++) {
            const dir = DIRECTIONS[randInt(DIRECTIONS.length)];
            const maxRow = dir.dr === 1 ? GRID_SIZE - word.length : (dir.dr === -1 ? word.length - 1 : GRID_SIZE - 1);
            const minRow = dir.dr === -1 ? word.length - 1 : 0;
            const maxCol = dir.dc === 1 ? GRID_SIZE - word.length : (dir.dc === -1 ? word.length - 1 : GRID_SIZE - 1);
            const minCol = dir.dc === -1 ? word.length - 1 : 0;

            if (maxRow < minRow || maxCol < minCol) continue;

            const row = minRow + randInt(maxRow - minRow + 1);
            const col = minCol + randInt(maxCol - minCol + 1);

            let ok = true;
            for (let i = 0; i < word.length; i++) {
                const r = row + dir.dr * i;
                const c = col + dir.dc * i;
                const existing = grid[r][c];
                if (existing !== null && existing !== word[i]) { ok = false; break; }
            }
            if (!ok) continue;

            for (let i = 0; i < word.length; i++) {
                const r = row + dir.dr * i;
                const c = col + dir.dc * i;
                grid[r][c] = word[i];
            }

            return { word, row, col, dir };
        }

        return null;
    }

    function buildGrid() {
        grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
        placedWords = [];

        const wordsToPlace = [...gameWords].sort((a, b) => b.length - a.length);

        for (let index = 0; index < wordsToPlace.length; index++) {
            let word = wordsToPlace[index];
            let placement = null;

            while (!placement) {
                placement = tryPlaceWord(word);
                if (placement) break;

                const replacement = getShorterReplacement(word, wordsToPlace);
                if (!replacement) {
                    console.warn('Could not place word:', word);
                    break;
                }

                console.warn(`Word "${word}" could not be placed; using shorter replacement "${replacement}" instead.`);
                wordsToPlace[index] = replacement;
                word = replacement;
            }

            if (placement) {
                placedWords.push({ word: placement.word, row: placement.row, col: placement.col, dir: placement.dir });
            }
        }

        gameWords = wordsToPlace;

        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] === null) grid[r][c] = randLetter();
            }
        }
    }

    function renderGrid() {
        gridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
        gridEl.innerHTML = '';
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = grid[r][c];
                cell.dataset.row = r;
                cell.dataset.col = c;
                gridEl.appendChild(cell);
            }
        }
    }

    function renderWordlist() {
        wordlistEl.innerHTML = '';
        for (const word of gameWords) {
            const li = document.createElement('li');
            li.textContent = word;
            li.dataset.word = word;
            wordlistEl.appendChild(li);
        }
        updateProgress();
    }

    function updateProgress() {
        progressEl.textContent = `${foundWords.size} / ${gameWords.length} ditemukan`;
    }

    function cellAt(r, c) {
        return gridEl.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    }

    function clearSelectionStyles() {
        gridEl.querySelectorAll('.cell.selecting').forEach(el => el.classList.remove('selecting'));
    }

    function getLineCells(start, end) {
        const rowDiff = Math.abs(end.row - start.row);
        const colDiff = Math.abs(end.col - start.col);
        const isHorizontal = rowDiff === 0 && colDiff > 0;
        const isVertical = colDiff === 0 && rowDiff > 0;
        const isDiagonal = rowDiff === colDiff && rowDiff > 0;

        if (!isHorizontal && !isVertical && !isDiagonal) return null;

        const dr = Math.sign(end.row - start.row) || 0;
        const dc = Math.sign(end.col - start.col) || 0;
        const steps = Math.max(rowDiff, colDiff);
        const cells = [];
        for (let i = 0; i <= steps; i++) {
            cells.push({ row: start.row + dr * i, col: start.col + dc * i });
        }
        return cells;
    }

    function startSelection(row, col) {
        selecting = true;
        startCell = { row, col };
        selectionPath = [{ row, col }];
        clearSelectionStyles();
        cellAt(row, col).classList.add('selecting');
    }

    function updateSelection(row, col) {
        if (!selecting) return;
        const line = getLineCells(startCell, { row, col });
        clearSelectionStyles();
        if (!line) {
            selectionPath = [];
            return;
        }
        selectionPath = line;
        for (const cell of line) {
            cellAt(cell.row, cell.col).classList.add('selecting');
        }
    }

    function showWordInfo(word) {
        const info = WORD_BANK.find(entry => entry.word === word) || {
            word,
            title: word,
            image: '../../assets/img/meditips.png',
            text: '<p>Maklumat lanjut tentang istilah ini akan dipaparkan di sini.</p>'
        };

        infoImg.innerHTML = `<img src="${info.image}" alt="${info.title}" onerror="this.onerror=null;this.src='../../assets/img/meditips.png';">`;
        infoText.innerHTML = `<h3>${info.title}</h3>${info.text}`;

        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';

        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    function hideWordInfo() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');

            if (completionPending) {
                completionPending = false;
                stopTimer();
                splashScreen.classList.add('show');
                if (typeof completeLevel === 'function') {
                    completeLevel();
                }
            }
        }, 180);
    }

    function endSelection() {
        if (!selecting) return;
        selecting = false;
        clearSelectionStyles();

        if (selectionPath.length > 1) {
            const letters = selectionPath.map(p => grid[p.row][p.col]).join('');
            const reversedLetters = letters.split('').reverse().join('');
            const match = gameWords.find(w => !foundWords.has(w) && (w === letters || w === reversedLetters));
            if (match) {
                const colorIndex = foundWords.size % PALETTE.length;
                foundWords.add(match);
                drawFoundLine(selectionPath[0], selectionPath[selectionPath.length - 1], colorIndex);
                const li = wordlistEl.querySelector(`li[data-word="${match}"]`);
                if (li) li.classList.add('done');
                updateProgress();
                showWordInfo(match);
                checkWin();
            }
        }
        selectionPath = [];
    }

    const PALETTE = [
        'rgba(217,142,43,0.55)',
        'rgba(91,64,124,0.5)',
        'rgba(198,93,93,0.5)',
        'rgba(90,120,199,0.5)',
        'rgba(150,110,190,0.5)',
        'rgba(144,104,174,0.5)',
        'rgba(199,150,60,0.55)',
        'rgba(80,150,160,0.5)'
    ];

    function cellCenter(row, col) {
        return {
            x: ((col + 0.5) / GRID_SIZE) * 100,
            y: ((row + 0.5) / GRID_SIZE) * 100
        };
    }

    function drawFoundLine(start, end, colorIndex) {
        const svg = document.getElementById('highlight-svg');
        const a = cellCenter(start.row, start.col);
        const b = cellCenter(end.row, end.col);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', a.x);
        line.setAttribute('y1', a.y);
        line.setAttribute('x2', b.x);
        line.setAttribute('y2', b.y);
        line.setAttribute('stroke', PALETTE[colorIndex]);
        line.setAttribute('stroke-width', (100 / GRID_SIZE) * 0.8);
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('class', 'found-line');
        svg.appendChild(line);
    }

    function checkWin() {
        if (foundWords.size === gameWords.length) {
            completionPending = true;
        }
    }

    function attachEvents() {
        gridEl.addEventListener('mousedown', e => {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            startSelection(+cell.dataset.row, +cell.dataset.col);
        });
        gridEl.addEventListener('mouseover', e => {
            if (!selecting) return;
            const cell = e.target.closest('.cell');
            if (!cell) return;
            updateSelection(+cell.dataset.row, +cell.dataset.col);
        });
        document.addEventListener('mouseup', endSelection);

        gridEl.addEventListener('touchstart', e => {
            const touch = e.touches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const cell = el && el.closest('.cell');
            if (!cell) return;
            e.preventDefault();
            startSelection(+cell.dataset.row, +cell.dataset.col);
        }, { passive: false });

        gridEl.addEventListener('touchmove', e => {
            if (!selecting) return;
            e.preventDefault();
            const touch = e.touches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const cell = el && el.closest('.cell');
            if (!cell) return;
            updateSelection(+cell.dataset.row, +cell.dataset.col);
        }, { passive: false });

        gridEl.addEventListener('touchend', endSelection);
    }

    function startTimer() {
        if (!timerEl) return;
        secondsElapsed = 0;
        timerEl.textContent = '00:00';
        stopTimer();
        timerInterval = setInterval(() => {
            secondsElapsed++;
            const m = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
            const s = String(secondsElapsed % 60).padStart(2, '0');
            timerEl.textContent = `${m}:${s}`;
        }, 1000);
    }
    function stopTimer() {
        if (timerInterval) clearInterval(timerInterval);
    }

    function newGame() {
        const eligibleWords = [...new Set(WORD_BANK.map(item => item.word.trim().toUpperCase()))]
            .filter(word => word.length > 0 && word.length <= GRID_SIZE);
        for (let i = eligibleWords.length - 1; i > 0; i--) {
            const randomIndex = randInt(i + 1);
            [eligibleWords[i], eligibleWords[randomIndex]] = [eligibleWords[randomIndex], eligibleWords[i]];
        }
        gameWords = eligibleWords.slice(0, WORDS_PER_GAME);
        foundWords = new Set();
        selecting = false;
        selectionPath = [];
        completionPending = false;
        splashScreen.classList.remove('show');
        document.getElementById('highlight-svg').innerHTML = '';
        buildGrid();
        renderGrid();
        renderWordlist();
        startTimer();
    }

    document.getElementById('restart-btn').addEventListener('click', newGame);
    splashScreen.addEventListener('click', () => splashScreen.classList.remove('show'));
    closeModalBtn.addEventListener('click', hideWordInfo);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideWordInfo();
        }
    });

    attachEvents();
    newGame();
})();