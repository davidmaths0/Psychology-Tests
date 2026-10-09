/**
 * timeline.js
 *
 * Generic engine for the horizontal "slide" timelines on the Learn page.
 * It auto-detects every `.timeline-section` on the page and wires each
 * one up independently (dots, prev/next, bounds-checking, and touch
 * swiping). Because it uses classes instead of IDs, you can drop in as
 * many timelines as you want (one per condition) without touching this
 * file.
 *
 * Expected markup per timeline (see learn.html for a full example):
 *
 *   <div class="timeline-section">
 *     <div class="timeline-slider">
 *       <div class="timeline-track">
 *         <div class="timeline-card active">...</div>
 *         <div class="timeline-card">...</div>
 *       </div>
 *     </div>
 *     <div class="timeline-controls">
 *       <button class="control-btn prev-btn">Previous</button>
 *       <div class="timeline-dots"></div>
 *       <button class="control-btn next-btn">Next</button>
 *     </div>
 *   </div>
 */

(function () {

    function initTimeline(section) {
        const track = section.querySelector(".timeline-track");
        const prevBtn = section.querySelector(".prev-btn");
        const nextBtn = section.querySelector(".next-btn");
        const dotsContainer = section.querySelector(".timeline-dots");

        if (!track || !prevBtn || !nextBtn || !dotsContainer) {
            console.warn("timeline.js: a .timeline-section is missing required elements.", section);
            return;
        }

        const cards = Array.from(track.children);
        let currentIndex = 0;

        const MAX_VISIBLE_DOTS = 4;

        function update() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            cards.forEach((card, i) => card.classList.toggle("active", i === currentIndex));

            const visibleDotCount = Math.min(cards.length, MAX_VISIBLE_DOTS);
            const firstVisibleIndex = Math.min(
                Math.max(0, currentIndex - Math.floor(visibleDotCount / 2)),
                cards.length - visibleDotCount
            );
            dotsContainer.replaceChildren();

            for (let index = firstVisibleIndex; index < firstVisibleIndex + visibleDotCount; index++) {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.classList.add("dot");
                dot.classList.toggle("active", index === currentIndex);
                dot.setAttribute("aria-label", `Go to slide ${index + 1} of ${cards.length}`);
                if (index === currentIndex) dot.setAttribute("aria-current", "true");
                dot.addEventListener("click", () => goToSlide(index));
                dotsContainer.appendChild(dot);
            }

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === cards.length - 1;
        }

        function goToSlide(index) {
            currentIndex = index;
            update();
        }

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener("click", () => {
            if (currentIndex < cards.length - 1) goToSlide(currentIndex + 1);
        });

        // ---- Touch / pen swiping --------------------------------------
        // The track follows the finger while dragging; on release it moves
        // to the next/previous slide if the swipe was long enough, or snaps
        // back otherwise. Vertical page scrolling is left to the browser
        // (see `touch-action: pan-y` on .timeline-slider in learn.css).
        // Mouse input is ignored on purpose — desktop uses the buttons.
        const slider = section.querySelector(".timeline-slider");
        const SWIPE_THRESHOLD_PX = 50;
        const EDGE_RESISTANCE = 0.3; // dragging past the first/last slide feels "heavy"

        let isDragging = false;
        let startX = 0;
        let deltaX = 0;

        function onPointerDown(event) {
            if (event.pointerType === "mouse") return;
            isDragging = true;
            startX = event.clientX;
            deltaX = 0;
            track.classList.add("dragging");
        }

        function onPointerMove(event) {
            if (!isDragging) return;

            deltaX = event.clientX - startX;

            const pastStart = currentIndex === 0 && deltaX > 0;
            const pastEnd = currentIndex === cards.length - 1 && deltaX < 0;
            const effectiveDelta = (pastStart || pastEnd) ? deltaX * EDGE_RESISTANCE : deltaX;

            track.style.transform =
                `translateX(calc(-${currentIndex * 100}% + ${effectiveDelta}px))`;
        }

        function onPointerEnd() {
            if (!isDragging) return;
            isDragging = false;
            track.classList.remove("dragging");

            if (deltaX <= -SWIPE_THRESHOLD_PX && currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            } else if (deltaX >= SWIPE_THRESHOLD_PX && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                update(); // not far enough: snap back to the current slide
            }
        }

        if (slider) {
            slider.addEventListener("pointerdown", onPointerDown);
            slider.addEventListener("pointermove", onPointerMove);
            slider.addEventListener("pointerup", onPointerEnd);
            slider.addEventListener("pointercancel", onPointerEnd);
        }

        update();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".timeline-section").forEach(initTimeline);
    });

})();
