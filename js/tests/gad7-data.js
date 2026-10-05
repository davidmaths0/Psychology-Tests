/**
 * gad7-data.js
 *
 * Data for the GAD-7 (Generalized Anxiety Disorder 7-item scale).
 * Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006).
 * A brief measure for assessing generalized anxiety disorder: the GAD-7.
 * Archives of Internal Medicine, 166(10), 1092-1097.
 *
 * Freely available for use and reproduction.
 *
 * This file only defines DATA. All rendering/scoring logic lives in
 * js/quiz-engine.js, which this data is designed to plug into.
 */

window.QuizData = window.QuizData || {};

window.QuizData.gad7 = {

    id: "gad7",
    title: "Generalized Anxiety Disorder Test (GAD-7)",
    description:
        "A brief, widely used screening test for symptoms of generalized anxiety.",
    instructions:
        "Over the last 2 weeks, how often have you been bothered by the following problems?",

    // Value of each option = its index (0, 1, 2, 3)
    scaleLabels: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day"
    ],

    questions: [
        { id: "q1", dimension: "anxiety", text: "Feeling nervous, anxious, or on edge" },
        { id: "q2", dimension: "anxiety", text: "Not being able to stop or control worrying" },
        { id: "q3", dimension: "anxiety", text: "Worrying too much about different things" },
        { id: "q4", dimension: "anxiety", text: "Trouble relaxing" },
        { id: "q5", dimension: "anxiety", text: "Being so restless that it's hard to sit still" },
        { id: "q6", dimension: "anxiety", text: "Becoming easily annoyed or irritable" },
        { id: "q7", dimension: "anxiety", text: "Feeling afraid, as if something awful might happen" }
    ],

    // A single dimension for GAD-7. Future personality tests can define
    // several (e.g. Communication, Empathy, Boundaries...).
    dimensions: [
        {
            id: "anxiety",
            name: "Anxiety",
            icon: "😰",
            // Official GAD-7 cutoffs, based on the RAW score (0-21), not %.
            interpretation: [
                { min: 0, max: 4, label: "Minimal anxiety" },
                { min: 5, max: 9, label: "Mild anxiety" },
                { min: 10, max: 14, label: "Moderate anxiety" },
                { min: 15, max: 21, label: "Severe anxiety" }
            ]
        }
    ]

};
