/**
 * timeline.js
 *
 * Generic engine for the horizontal "slide" timelines on the Learn page.
 * It auto-detects every `.timeline-section` on the page and wires each
 * one up independently (dots, prev/next, bounds-checking). Because it
 * uses classes instead of IDs, you can drop in as many timelines as you
 * want (one per condition) without touching this file.
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

        // Build one dot per card
        cards.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function update() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            cards.forEach((card, i) => card.classList.toggle("active", i === currentIndex));
            dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));

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

        update();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".timeline-section").forEach(initTimeline);
    });

})();
