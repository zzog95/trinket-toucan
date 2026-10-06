(function () {
    const WORD_BANK = [
        "TABLET", "KAPSUL", "DOS", "FARMASI",
        "VAKSIN", "ALERGI", "GENERIK", "INSULIN",
        "SUHU", "ANTIBIOTIK", "UBAT", "PRESKRIPSI"
    ];
    const WORDS_PER_GAME = 8;

    const GRID_SIZE = 10;
    const DIRECTIONS = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 }
    ];

    let grid, placedWords, gameWords, foundWords, selecting, selectionPath, startCell, timerInterval, secondsElapsed;

    const gridEl = document.getElementById('grid');
    const wordlistEl = document.getElementById('wordlist');
    const progressEl = document.getElementById('progress');
    const timerEl = document.getElementById('timer');
    const splashScreen = document.getElementById('splashScreen');

    function randInt(n) { return Math.floor(Math.random() * n); }
    function randLetter() { return String.fromCharCode(65 + randInt(26)); }

    function buildGrid() {
        grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
        placedWords = [];

        const wordsToPlace = [...gameWords].sort((a, b) => b.length - a.length);

        for (const word of wordsToPlace) {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 400) {
                attempts++;
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
                placedWords.push({ word, row, col, dir });
                placed = true;
            }
            if (!placed) {
                console.warn('Could not place word:', word);
            }
        }

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
        const dr = Math.sign(end.row - start.row);
        const dc = Math.sign(end.col - start.col);
        const rowDiff = Math.abs(end.row - start.row);
        const colDiff = Math.abs(end.col - start.col);
        if ((rowDiff > 0 && colDiff > 0) || end.row < start.row || end.col < start.col) return null;
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

    function endSelection() {
        if (!selecting) return;
        selecting = false;
        clearSelectionStyles();

        if (selectionPath.length > 1) {
            const letters = selectionPath.map(p => grid[p.row][p.col]).join('');
            const match = gameWords.find(w => w === letters && !foundWords.has(w));
            if (match) {
                const colorIndex = foundWords.size % PALETTE.length;
                foundWords.add(match);
                drawFoundLine(selectionPath[0], selectionPath[selectionPath.length - 1], colorIndex);
                const li = wordlistEl.querySelector(`li[data-word="${match}"]`);
                if (li) li.classList.add('done');
                updateProgress();
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
            stopTimer();
            splashScreen.classList.add('show');
            if (typeof completeLevel === "function") {
                completeLevel();
            }
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
        const eligibleWords = [...new Set(WORD_BANK.map(word => word.trim().toUpperCase()))]
            .filter(word => word.length > 0 && word.length <= GRID_SIZE);
        for (let i = eligibleWords.length - 1; i > 0; i--) {
            const randomIndex = randInt(i + 1);
            [eligibleWords[i], eligibleWords[randomIndex]] = [eligibleWords[randomIndex], eligibleWords[i]];
        }
        gameWords = eligibleWords.slice(0, WORDS_PER_GAME);
        foundWords = new Set();
        selecting = false;
        selectionPath = [];
        splashScreen.classList.remove('show');
        document.getElementById('highlight-svg').innerHTML = '';
        buildGrid();
        renderGrid();
        renderWordlist();
        startTimer();
    }

    document.getElementById('restart-btn').addEventListener('click', newGame);
    splashScreen.addEventListener('click', () => splashScreen.classList.remove('show'));

    attachEvents();
    newGame();
})();