/**
 * find-the-triplicate.js
 *
 * "Find the Triplicate" — tap the number/word that appears exactly 3
 * times among the distractors, across 3 increasingly large rounds.
 *
 * This is a standalone game script (not part of quiz-engine.js, since
 * this isn't a questionnaire). Game rules and round configuration are
 * unchanged from the original draft; only DOM/class handling was
 * rewritten to use the site's own CSS classes instead of Tailwind.
 */

(function () {

    // Word library for Round 2 & Round 3 options
    const WORD_POOLS = [
        ["EAGLE", "FALCON", "HAWK", "OWL", "HERON", "ROBIN", "SWAN", "LARK"],
        ["NEPTUNE", "SATURN", "JUPITER", "MARS", "VENUS", "URANUS", "MERCURY", "PLUTO"],
        ["RUBY", "AMBER", "TOPAZ", "OPAL", "JADE", "ONYX", "GARNET", "PEARL"],
        ["ORBIT", "SOLAR", "LUNAR", "COMET", "NOVA", "PULSAR", "COSMOS", "QUASAR"]
    ];

    // Game configuration per round
    const ROUND_CONFIGS = [
        { round: 1, gridCount: 9, gridColsClass: "", type: "number", title: "Tap the number that appears 3 times." },
        { round: 2, gridCount: 12, gridColsClass: "game-grid-4col", type: "word", title: "Tap the word that appears 3 times." },
        { round: 3, gridCount: 15, gridColsClass: "game-grid-5col", type: "mixed", title: "Tap the item that appears 3 times." }
    ];

    // Global state
    let currentRoundIndex = 0;
    let score = 0;
    let timerInterval = null;
    let elapsedSeconds = 0;
    let activeGridData = [];
    let targetValue = null;
    let selectedIndices = [];
    let isProcessing = false;

    // DOM elements (resolved once the game page has loaded)
    let gridContainer, roundText, timerText, scoreText, progressBar,
        instructionBody, foundCountEl, btnRestart, modalOverlay,
        modalCard, finalTimeEl, finalScoreEl, btnPlayAgain,
        gameIntro, gamePlay, btnStart;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    function startTimer() {
        stopTimer();
        elapsedSeconds = 0;
        timerText.textContent = formatTime(elapsedSeconds);
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            timerText.textContent = formatTime(elapsedSeconds);
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function generateRoundData(config) {
        const totalTiles = config.gridCount;
        const items = [];

        if (config.type === "number") {
            const target = getRandomInt(11, 99);
            targetValue = target;
            items.push(target, target, target);

            const distractorPool = [];
            while (distractorPool.length < 10) {
                const candidate = getRandomInt(11, 99);
                if (candidate !== target && !distractorPool.includes(candidate)) {
                    distractorPool.push(candidate);
                }
            }

            let poolIdx = 0;
            while (items.length < totalTiles) {
                const distractor = distractorPool[poolIdx % distractorPool.length];
                items.push(distractor, distractor);
                poolIdx++;
            }
        } else if (config.type === "word") {
            const randomPool = WORD_POOLS[Math.floor(Math.random() * WORD_POOLS.length)];
            const shuffledPool = shuffleArray([...randomPool]);

            const target = shuffledPool[0];
            targetValue = target;
            items.push(target, target, target);

            let distIdx = 1;
            while (items.length < totalTiles) {
                const distractor = shuffledPool[(distIdx % (shuffledPool.length - 1)) + 1];
                items.push(distractor, distractor);
                distIdx++;
            }
        } else {
            // Mixed (Round 3): randomly choose numbers or words
            const isWords = Math.random() > 0.5;

            if (isWords) {
                const pool = WORD_POOLS[Math.floor(Math.random() * WORD_POOLS.length)];
                const shuffled = shuffleArray([...pool]);
                targetValue = shuffled[0];
                items.push(targetValue, targetValue, targetValue);

                let idx = 1;
                while (items.length < totalTiles) {
                    const item = shuffled[(idx % (shuffled.length - 1)) + 1];
                    items.push(item);
                    if (items.length < totalTiles) items.push(item);
                    idx++;
                }
            } else {
                targetValue = getRandomInt(10, 99);
                items.push(targetValue, targetValue, targetValue);

                const used = new Set([targetValue]);
                while (items.length < totalTiles) {
                    let candidate = getRandomInt(10, 99);
                    while (used.has(candidate)) candidate = getRandomInt(10, 99);
                    used.add(candidate);
                    items.push(candidate);
                    if (items.length < totalTiles) items.push(candidate);
                }
            }
        }

        return shuffleArray(items.slice(0, totalTiles));
    }

    function tileClassFor(val) {
        const typeClass = typeof val === "string" ? "game-tile-word" : "game-tile-number";
        return `game-tile ${typeClass}`;
    }

    function renderBoard() {
        const config = ROUND_CONFIGS[currentRoundIndex];

        roundText.textContent = `ROUND ${config.round} / 3`;
        progressBar.style.width = `${(config.round / 3) * 100}%`;

        const isNum = typeof targetValue === "number";
        instructionBody.innerHTML = `Tap the ${isNum ? "number" : "word"} that appears <span class="game-highlight">3 times</span>.`;

        gridContainer.className = `game-grid ${config.gridColsClass}`;
        gridContainer.innerHTML = "";

        selectedIndices = [];
        foundCountEl.textContent = "0";

        activeGridData.forEach((val, index) => {
            const btn = document.createElement("button");
            btn.dataset.index = index;
            btn.className = tileClassFor(val);
            btn.textContent = val;
            btn.addEventListener("click", () => handleTileClick(index, btn));
            gridContainer.appendChild(btn);
        });
    }

    function handleTileClick(index, btnElement) {
        if (isProcessing) return;
        if (selectedIndices.includes(index)) return;

        const clickedVal = activeGridData[index];

        if (clickedVal === targetValue) {
            selectedIndices.push(index);
            foundCountEl.textContent = selectedIndices.length;
            btnElement.classList.add("game-tile-correct");

            if (selectedIndices.length === 3) {
                isProcessing = true;
                score += 100;
                scoreText.textContent = score;

                setTimeout(() => {
                    advanceRound();
                }, 600);
            }
        } else {
            isProcessing = true;
            btnElement.classList.add("game-tile-incorrect");

            setTimeout(() => {
                btnElement.classList.remove("game-tile-incorrect");
                resetBoardSelection();
                isProcessing = false;
            }, 600);
        }
    }

    function resetBoardSelection() {
        selectedIndices = [];
        foundCountEl.textContent = "0";

        gridContainer.querySelectorAll(".game-tile").forEach((tile) => {
            const val = activeGridData[tile.dataset.index];
            tile.className = tileClassFor(val);
        });
    }

    function advanceRound() {
        isProcessing = false;
        currentRoundIndex++;

        if (currentRoundIndex < ROUND_CONFIGS.length) {
            activeGridData = generateRoundData(ROUND_CONFIGS[currentRoundIndex]);
            renderBoard();
        } else {
            stopTimer();
            showCompletionModal();
        }
    }

    function showCompletionModal() {
        finalTimeEl.textContent = formatTime(elapsedSeconds);

        const speedBonus = Math.max(0, 300 - elapsedSeconds * 5);
        finalScoreEl.textContent = `${score + speedBonus} pts`;

        modalOverlay.classList.remove("hidden");
        requestAnimationFrame(() => {
            modalOverlay.classList.add("visible");
        });
    }

    function hideCompletionModal() {
        modalOverlay.classList.remove("visible");
        setTimeout(() => {
            modalOverlay.classList.add("hidden");
        }, 250);
    }

    function initGame() {
        currentRoundIndex = 0;
        score = 0;
        isProcessing = false;
        scoreText.textContent = "0";
        hideCompletionModal();

        activeGridData = generateRoundData(ROUND_CONFIGS[currentRoundIndex]);
        renderBoard();
        startTimer();
    }

    document.addEventListener("DOMContentLoaded", () => {
        gridContainer = document.getElementById("grid-container");
        roundText = document.getElementById("round-text");
        timerText = document.getElementById("timer-text");
        scoreText = document.getElementById("score-text");
        progressBar = document.getElementById("progress-bar");
        instructionBody = document.getElementById("instruction-body");
        foundCountEl = document.getElementById("found-count");
        btnRestart = document.getElementById("btn-restart");
        modalOverlay = document.getElementById("modal-overlay");
        modalCard = document.getElementById("modal-card");
        finalTimeEl = document.getElementById("final-time");
        finalScoreEl = document.getElementById("final-score");
        btnPlayAgain = document.getElementById("btn-play-again");
        gameIntro = document.getElementById("game-intro");
        gamePlay = document.getElementById("game-play");
        btnStart = document.getElementById("btn-start");

        if (!gridContainer) return; // not on the game page

        btnRestart.addEventListener("click", initGame);
        btnPlayAgain.addEventListener("click", initGame);

        // The timer only starts once the player presses Start — the game
        // board stays hidden behind the intro screen until then.
        btnStart.addEventListener("click", () => {
            gameIntro.classList.add("hidden");
            gamePlay.classList.remove("hidden");
            initGame();
        });
    });

})();
