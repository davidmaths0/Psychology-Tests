/**
 * nav.js
 * Toggles the mobile navigation dropdown. Shared across every page —
 * include it right after the site-header markup.
 */

(function () {

    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("site-nav");

    if (!toggle || !nav) return;

    function setOpen(isOpen) {
        nav.classList.toggle("open", isOpen);
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    }

    toggle.addEventListener("click", () => {
        setOpen(!nav.classList.contains("open"));
    });

    // Closing the menu after picking a link keeps mobile navigation tidy
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });

})();
