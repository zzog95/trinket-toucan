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
            // Source: Kenali Ubat Anda booklet
            word: 'KOSMETIK',
            title: 'Apakah itu Kosmetik?',
            image: '../../assets/img/kosmetik.png',
            text: '<p>Kosmetik merujuk kepada persediaan yang digunakan pada bahagian luaran tubuh badan manusia (termasuk kulit, rambut,'
                + ' kuku, bibir, dan bahagian luar alat kelamin) atau gigi dan membran mukus mulut bagi tujuan membersih, mewangi,'
                + ' mengubah penampilan, menambah baik bau badan, melindungi, atau memeliharanya dalam keadaan baik.</p>'
        },
        {
            // Source: https://pharmacy.moh.gov.my/ms/entri/perihal-kami.html
            word: 'FARMASI',
            title: 'Program Perkhidmatan Farmasi',
            image: '../../assets/img/meditips.png',
            text: '<p>Program Perkhidmatan Farmasi adalah salah satu program di bawah Kementerian Kesihatan Malaysia (KKM)' 
                + ' yang bertanggungjawab untuk memastikan orang awam mendapat keluaran farmaseutikal yang berkualiti, selamat' 
                + ' dan berkesan, melindungi kepentingan mereka melalui penguatkuasaan undang-undang yang berkaitan,' 
                + ' serta memastikan ubat-ubatan digunakan oleh penyedia perkhidmatan kesihatan dan juga pesakit secara wajar.</p>'
        },
        {
            // Source: https://pharmacy.moh.gov.my/ms/berita/24-mei-2018/vaksin-pelengkap-ketahanan.html
            word: 'VAKSIN',
            title: 'Vaksin',
            image: '../../assets/img/vaksin.png',
            text: '<p>Vaksin adalah sediaan biologi yang dihasilkan menggunakan bakteria atau virus daripada `strain` tertentu yang diketahui sebagai penyebab penyakit' 
                + ' berjangkit berbahaya.<br>Sebahagian atau seluruh komponen mikroorganisma yang diguna sebagai asas dalam penghasilan vaksin sudah dilemahkan atau' 
                + ' dimatikan  melalui proses tertentu untuk merangsang antibodi melawan serangan patogen iaitu kuman penyebab sesuatu penyakit.</p>'
        },
        {
            // Source: Kenali Ubat Anda booklet
            word: 'ALERGI',
            title: 'Alergi atau Alahan Ubat',
            image: '../../assets/img/alahan.png',
            text: '<p>Alergi atau alahan ubat adalah kesan yang tidak diingini berpunca daripada kesan hipersensitiviti terhadap ubat yang diambil.</p>'
                + '<ul><li>Alahan ubat tidak berlaku kepada semua pesakit.</li>'
                + '<li>Contoh kesan alahan biasa ialah ruam, gatal-gatal pada kulit, bengkak pada muka, lidah dan bibir.'
                + ' Contoh alahan serius ialah sukar bernafas.</li></ul>'
                + '<p><br>Kad alahan ubat akan diberikan sekiranya alahan telah disahkan oleh doktor di fasiliti kerajaan.' 
                + '<br><strong>Sentiasa bawa kad alahan ubat. Tunjukkan kepada anggota kesihatan setiap kali mendapatkan rawatan atau bekalan ubat.</strong></p>'
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
            // Source: Kenali Ubat Anda booklet
            word: 'MYUBAT',
            title: 'MyUBAT',
            image: '../../assets/img/myubat.png',
            text: '<p>MyUBAT merupakan sistem perkhidmatan pembekalan ubat susulan pesakit Kementerian Kesihatan Malaysia (KKM).</p>'
                + '<strong>Perkhidmatan pembekalan ubat susulan yang disediakan melalui MyUBAT</strong>'
                + '<ul><li><strong>Janji Temu di Kaunter</strong><br>Bekalan ubat disediakan sebelum pesakit hadir ke kaunter farmasi.</li>'
                + '<li><strong>Ubat Melalui Pos</strong><br>Bekalan ubat dihantar terus ke lokasi pilihan pesakit dengan caj tertentu.</li>' // Kena update based on Belanjawan 2027
                + '<li><strong>Lokar Ubat</strong><br>Bekalan ubat boleh diambil pada masa yang lebih fleksibel.</li>'
                + '<li><strong>Farmasi Pandu Lalu</strong><br>Bekalan ubat diambil melalui kaunter farmasi pandu lalu.</li></ul>'
                + '<p>Ketersediaan perkhidmatan adalah bergantung kepada fasiliti kesihatan masing-masing.'
                + ' Muat turun aplikasi MyUBAT untuk pembekalan ubat susulan dengan mudah dan cepat.</p>'
        },
        {
            // Source: Kenali Ubat Anda booklet
            word: 'ANTIBIOTIK',
            title: 'Antibiotik',
            image: '../../assets/img/first-aid.png',
            text: '<p>Antibiotik adalah ubat yang digunakan untuk merawat jangkitan bakteria'
                + ' sahaja.<br><br>Antibiotik tidak perlu diambil jika pesakit demam, batuk, selsema,'
                + ' atau sakit tekak yang disebabkan jangkitan virus. Antibiotik juga bukan ubat'
                + ' untuk menguatkan imuniti badan.</p>'
        },
        {
            // Source: Kenali Ubat Anda booklet
            word: 'INTERAKSI',
            title: 'Interaksi Ubat',
            image: '../../assets/img/interaksi.png',
            text: '<p>Interaksi ubat boleh berlaku antara:</p>'
                + '<ul><li>Ubat dengan ubat</li><li>Ubat dengan makanan</li><li>Ubat dengan penyakit</li></ul>'
                + '<p><strong>Beritahu doktor atau ahli farmasi sekiranya sedang mengambil sebarang ubat, produk kesihatan,'
                + ' atau produk tradisional. Patuhi arahan penggunaan ubat.</strong></p>'
        },
        {
            // Source: Kenali Ubat Anda booklet & https://pharmacy.moh.gov.my/ms/dokumen/formulari-ubat-kementerian-kesihatan-malaysia.html
            word: 'PRESKRIPSI',
            title: 'Preskripsi',
            image: '../../assets/img/fridge.png',
            text: '<p>Preskripsi merupakan arahan bertulis berkaitan ubat daripada doktor.</p><br>Kategori preskriber yang boleh memulakan preskripsi:'
                + '<ul><li><strong>A* : </strong>Pakar Perunding / Pakar bagi Indikasi yang Spesifik sahaja</li>' 
                + '<li><strong>A : </strong>Pakar Perunding / Pakar</li>' 
                + '<li><strong>A/KK : </strong>Pakar Perunding / Pakar / Pakar Perubatan Keluarga</li>'
                + '<li><strong>B : </strong>Pakar Perunding / Pakar / Pakar Perubatan Keluarga / Pegawai Perubatan</li>'
                + '<li><strong>C : </strong>Pakar Perunding / Pakar / Pakar Perubatan Keluarga / Pegawai Perubatan / Anggota Paramedik</li>'
                + '<li><strong>C+ : </strong>Pakar Perunding / Pakar / Pakar Perubatan Keluarga / Pegawai Perubatan / Anggota Paramedik/ Anggota Paramedik Perbidanan</li></ul>'
                + '<p><br>Nota:  Bagi bidang pergigian, Pakar Perunding Kanan/Pakar Perunding serta Pegawai Perubatan Pergigian adalah termasuk dalam kategori' 
                + ' preskriber seperti di atas namun hanya bagi ubat-ubatan yang digunakan dalam rawatan pergigian.</p>'
        },
        {
            // Source: Kenali Ubat Anda booklet
            word: 'HOLOGRAM',
            title: 'Label Keselamatan Hologram',
            image: '../../assets/img/bungkus.png',
            text: '<p>Semua ubat perlu mempunyai label keselamatan hologram FarmaTag® yang tulen. Terdapat 3 versi label keselamatan hologram yang ada di pasaran:</p>'
                + '<ul><li>FarmaTag® versi 1</li><li>FarmaTag® versi 2</li><li>FarmaTag® versi 2.1</li></ul>'
                + '<p><br>Ketulenan label keselamatan hologram FarmaTag® boleh disahkan melalui:</p>'
                + '<ul><li>FarmaTag® EZ-Checker yang terdapat di farmasi komuniti</li>'
                + '<li>Aplikasi telefon pintar MyUBAT-FarmaChecker®</li></ul>'
        },
        {
            // Source: Kenali Ubat Anda booklet
            word: 'ARAHAN',
            title: 'Arahan Pengambilan Ubat',
            image: '../../assets/img/arahan.png',
            text: '<ul><li>Ambil ubat sebelum makan.<br>' 
                + '<strong>Ubat perlu diambil 30 minit hingga 1 jam sebelum makan. Sekiranya terlupa dan sudah mengambil makanan,' 
                + ' ubat boleh diambil 2 jam selepas makan.</strong><br>*Untuk sesetengah ubat antidiabetes dan ubat tahan muntah,' 
                + ' perlu ambil 30 minit sebelum makan.</li>' 
                + '<li>Ambil ubat bersama-sama makanan.<br><strong>Ubat perlu diambil atau dikunyah bersama-sama makanan.</strong></li>' 
                + '<li>Ambil ubat selepas makan.<br><strong>Ubat perlu diambil sejurus selepas mengambil makanan.</strong></li></ul>'
        },
        {
            // Source: Kenali Ubat Anda booklet
            word: 'DAFTAR',
            title: 'Nombor Pendaftaran',
            image: '../../assets/img/ubat-daftar.png',
            text: '<p>Dimulakan dengan MAL, diikuti dengan 8 digit dan huruf A, B, X, T, atau N.</p>' 
                + '<ul><li><strong>MAL23456789<span style="color: purple;">A</span> : </strong> Ubat Terkawal</li>'
                + '<li><strong>MAL23456789<span style="color: purple;">B</span> : </strong> Produk semula jadi dengan tuntutan terapeutik</li>'
                + '<li><strong>MAL23456789<span style="color: purple;">X</span> : </strong> Ubat am (OTC)</li>'
                + '<li><strong>MAL23456789<span style="color: purple;">T</span> : </strong> Produk semula jadi (ubat tradisional dan homeopati)</li>'
                + '<li><strong>MAL23456789<span style="color: purple;">N</span> : </strong> Suplemen kesihatan</li></ul>'
                + '<p><br>Status pendaftaran boleh disemak melalui Laman web Bahagian Regulatori Farmasi Negara (NPRA)<br><a href="https://npra.gov.my" target="_blank">https://npra.gov.my</a></p>'
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

        infoImg.innerHTML = '';
        infoText.innerHTML = `
            <h3>${info.title}</h3>
            <div class="info-visual">
                <img src="${info.image}" alt="${info.title}" onerror="this.onerror=null;this.src='../../assets/img/meditips.png';">
            </div>
            <div class="info-body">${info.text}</div>
        `;

        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'false');
        modal.inert = false;
        modal.style.display = 'flex';

        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    function hideWordInfo() {
        if (document.activeElement && modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            modal.inert = true;

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
        if (typeof setLevelControlsDisabled === 'function') {
            setLevelControlsDisabled(false);
        }
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