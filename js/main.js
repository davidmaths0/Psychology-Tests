/**
 * main.js
 * Lógica de la página principal: anima las barras de la vista previa
 * de resultados con porcentajes de ejemplo.
 */

// Configuración
const MIN_PERCENTAGE = 35;
const MAX_PERCENTAGE = 95;
const ANIMATION_DELAY_MS = 150;

/**
 * Devuelve un entero aleatorio entre min y max (ambos incluidos).
 */
function getRandomPercentage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Actualiza el texto y la barra de un resultado individual.
 */
function renderResult(resultElement, percentage) {
    const percentageElement = resultElement.querySelector(".result-percentage");
    const bar = resultElement.querySelector(".bar-fill");

    if (!percentageElement || !bar) return;

    percentageElement.textContent = `${percentage}%`;

    // Pequeño retraso para que la animación CSS se note
    setTimeout(() => {
        bar.style.width = `${percentage}%`;
    }, ANIMATION_DELAY_MS);
}

/**
 * Inicializa la vista previa de resultados.
 */
function initResultsPreview() {
    const results = document.querySelectorAll(".result-item");

    results.forEach((result) => {
        const percentage = getRandomPercentage(MIN_PERCENTAGE, MAX_PERCENTAGE);
        renderResult(result, percentage);
    });
}

initResultsPreview();
