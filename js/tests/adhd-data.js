/**
 * adhd-data.js
 *
 * Data for an ADHD symptom self-assessment.
 *
 * Questions q1-q6 are the official ASRS v1.1 6-question Screener (Part A),
 * reproduced UNALTERED as required by its license:
 *
 *   Kessler, R.C., Adler, L., Ames, M., et al. (2005). The World Health
 *   Organization Adult ADHD Self-Report Scale (ASRS): a short screening
 *   scale for use in the general population. Psychological Medicine, 35(2),
 *   245-256.
 *   ASRS v1.1 Screener © World Health Organization / New York University
 *   and President and Fellows of Harvard College.
 *   Free to use for the 6-question screener; not altered; copyright
 *   notice retained, as required by the license.
 *
 * Questions q7-q18 are ORIGINAL, written for this project (not copied
 * from any copyrighted scale), to extend the two official ASRS symptom
 * domains with more items for a fuller, non-clinical profile.
 *
 * This file only defines DATA. All rendering/scoring logic lives in
 * js/quiz-engine.js.
 */

window.QuizData = window.QuizData || {};

window.QuizData.adhd = {

    id: "adhd",
    title: "ADHD Symptom Self-Assessment",
    description:
        "A self-assessment exploring attention and activity-level patterns, " +
        "partly based on a scientifically validated screening tool.",
    instructions:
        "Think about the last 6 months. How often has each of these applied to you?",

    // Value of each option = its index (0, 1, 2, 3, 4) — matches the
    // original ASRS v1.1 response scale.
    scaleLabels: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very Often"
    ],

    questions: [

        // ---- Official ASRS v1.1 Screener (Part A) — unaltered wording ----
        {
            id: "q1",
            origin: "ASRS v1.1 (official)",
            dimensions: ["total", "inattention"],
            text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?"
        },
        {
            id: "q2",
            origin: "ASRS v1.1 (official)",
            dimensions: ["total", "inattention"],
            text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?"
        },
        {
            id: "q3",
            origin: "ASRS v1.1 (official)",
            dimensions: ["total", "inattention"],
            text: "How often do you have problems remembering appointments or obligations?"
        },
        {
            id: "q4",
            origin: "ASRS v1.1 (official)",
            dimensions: ["total", "inattention"],
            text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?"
        },
        {
            id: "q5",
            origin: "ASRS v1.1 (official)",
            dimensions: ["total", "hyperactivity"],
            text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?"
        },
        {
            id: "q6",
            origin: "ASRS v1.1 (official)",
            dimensions: ["total", "hyperactivity"],
            text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
        },

        // ---- Original items — extending "Inattention" ----
        {
            id: "q7",
            origin: "original",
            dimensions: ["inattention"],
            text: "How often do you lose track of a conversation because your mind wandered elsewhere?"
        },
        {
            id: "q8",
            origin: "original",
            dimensions: ["inattention"],
            text: "How often do you misplace everyday items like your keys, phone, or wallet?"
        },
        {
            id: "q9",
            origin: "original",
            dimensions: ["inattention"],
            text: "How often do you find it hard to follow instructions all the way through, even when you want to?"
        },
        {
            id: "q10",
            origin: "original",
            dimensions: ["inattention"],
            text: "How often do you get pulled into unrelated thoughts while trying to focus on a task?"
        },
        {
            id: "q11",
            origin: "original",
            dimensions: ["inattention"],
            text: "How often do you leave tasks half-finished before moving on to something else?"
        },
        {
            id: "q12",
            origin: "original",
            dimensions: ["inattention"],
            text: "How often do you have to re-read something because you realize you weren't really taking it in?"
        },

        // ---- Original items — extending "Hyperactivity / Impulsivity" ----
        {
            id: "q13",
            origin: "original",
            dimensions: ["hyperactivity"],
            text: "How often do you interrupt others before they finish speaking?"
        },
        {
            id: "q14",
            origin: "original",
            dimensions: ["hyperactivity"],
            text: "How often do you feel restless or on edge, even when you're supposed to be relaxing?"
        },
        {
            id: "q15",
            origin: "original",
            dimensions: ["hyperactivity"],
            text: "How often do you make quick decisions without fully thinking through the consequences?"
        },
        {
            id: "q16",
            origin: "original",
            dimensions: ["hyperactivity"],
            text: "How often do you talk more than you feel you probably should in social or work settings?"
        },
        {
            id: "q17",
            origin: "original",
            dimensions: ["hyperactivity"],
            text: "How often do you feel impatient while waiting in line or in traffic?"
        },
        {
            id: "q18",
            origin: "original",
            dimensions: ["hyperactivity"],
            text: "How often do you switch activities or plans suddenly, without finishing what you started?"
        }

    ],

    // Three dimensions:
    //  - "total" uses ONLY the 6 official ASRS items, so its raw score
    //    stays comparable to the published instrument (0-24).
    //  - "inattention" / "hyperactivity" mix official + original items,
    //    so their bands are intentionally NOT presented as clinical —
    //    just a descriptive, non-diagnostic frequency read.
    dimensions: [
        {
            id: "total",
            name: "Overall screening score",
            icon: "🧠",
            interpretation: [
                { min: 0, max: 8, label: "Low frequency of symptoms" },
                { min: 9, max: 16, label: "Moderate frequency of symptoms" },
                { min: 17, max: 24, label: "High frequency of symptoms" }
            ]
        },
        {
            id: "inattention",
            name: "Inattention",
            icon: "🧩",
            interpretation: [
                { min: 0, max: 13, label: "Low frequency of symptoms" },
                { min: 14, max: 26, label: "Moderate frequency of symptoms" },
                { min: 27, max: 40, label: "High frequency of symptoms" }
            ]
        },
        {
            id: "hyperactivity",
            name: "Hyperactivity / Impulsivity",
            icon: "⚡",
            interpretation: [
                { min: 0, max: 10, label: "Low frequency of symptoms" },
                { min: 11, max: 21, label: "Moderate frequency of symptoms" },
                { min: 22, max: 32, label: "High frequency of symptoms" }
            ]
        }
    ],

    attribution:
        "Questions 1-6 are the official ASRS v1.1 Screener (Part A), used under its free-use license, unaltered. " +
        "Source: Kessler et al. (2005), Psychological Medicine, 35(2), 245-256. " +
        "ASRS v1.1 © World Health Organization / New York University and President and Fellows of Harvard College. " +
        "Remaining questions were written independently for this project and are not part of the official scale. " +
        "This is a screening tool only, not a diagnostic instrument."

};
