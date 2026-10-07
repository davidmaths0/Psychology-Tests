/**
 * accordion.js
 *
 * Generic accordion toggle. Auto-detects every `.accordion-item` on the
 * page and wires up its trigger/panel independently — each item opens
 * and closes on its own (not mutually exclusive), so reading one
 * condition's history doesn't force-close another you had open.
 *
 * Expected markup per item:
 *
 *   <div class="accordion-item">
 *     <button class="accordion-trigger" aria-expanded="false" aria-controls="panel-x">
 *       <h2>Title</h2>
 *       <span class="accordion-icon">+</span>
 *     </button>
 *     <div class="accordion-panel" id="panel-x">
 *       <div class="accordion-panel-inner">...content...</div>
 *     </div>
 *   </div>
 */

(function () {

    function initAccordionItem(item) {
        const trigger = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");

        if (!trigger || !panel) {
            console.warn("accordion.js: an .accordion-item is missing a trigger or panel.", item);
            return;
        }

        trigger.addEventListener("click", () => {
            const isOpen = panel.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".accordion-item").forEach(initAccordionItem);
    });

})();
