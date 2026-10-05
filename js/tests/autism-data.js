/**
 * autism-data.js
 *
 * Data for an Autism traits self-assessment.
 *
 * IMPORTANT — COPYRIGHT NOTE:
 * All 20 questions in this file are ORIGINAL — written independently for
 * this project. None of them reproduce, paraphrase closely, or adapt any
 * existing autism screening instrument (e.g. the Cambridge Autism-Spectrum
 * Quotient / AQ / AQ-10, which remains copyrighted by the Autism Research
 * Centre, University of Cambridge, and restricted to non-commercial use).
 *
 * The four question domains below were chosen because they are commonly
 * described, publicly documented research domains in autism research —
 * not because any single cited source's wording was used. See the
 * `attribution` field at the bottom of this file for the exact source
 * per domain.
 *
 * This file only defines DATA. All rendering/scoring logic lives in
 * js/quiz-engine.js.
 */

window.QuizData = window.QuizData || {};

window.QuizData.autism = {

    id: "autism",
    title: "Autism Traits Self-Assessment",
    description:
        "An original self-assessment exploring common autism-related trait " +
        "domains described in autism research.",
    instructions:
        "Think about your everyday life. How often does each of these apply to you?",

    scaleLabels: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very Often"
    ],

    questions: [

        // ---- Social Communication ----
        {
            id: "q1",
            origin: "original",
            dimensions: ["social"],
            text: "How often do you find it hard to tell when someone in a conversation wants you to stop talking or change the subject?"
        },
        {
            id: "q2",
            origin: "original",
            dimensions: ["social"],
            text: "How often do you prefer spending time alone over socializing, even with people you like?"
        },
        {
            id: "q3",
            origin: "original",
            dimensions: ["social"],
            text: "How often do you find small talk or casual conversation draining or hard to navigate?"
        },
        {
            id: "q4",
            origin: "original",
            dimensions: ["social"],
            text: "How often has someone told you that you took a comment too literally, when it wasn't meant that way?"
        },
        {
            id: "q5",
            origin: "original",
            dimensions: ["social"],
            text: "How often do you plan or rehearse a conversation in your head before having it?"
        },

        // ---- Attention to Detail / Focused Interests ----
        {
            id: "q6",
            origin: "original",
            dimensions: ["focus"],
            text: "How often do you notice small details, patterns, or inconsistencies that other people seem to miss?"
        },
        {
            id: "q7",
            origin: "original",
            dimensions: ["focus"],
            text: "How often do you become deeply absorbed in a specific topic or hobby, wanting to learn everything about it?"
        },
        {
            id: "q8",
            origin: "original",
            dimensions: ["focus"],
            text: "How often do you prefer tasks that require precision and careful attention over broad, big-picture tasks?"
        },
        {
            id: "q9",
            origin: "original",
            dimensions: ["focus"],
            text: "How often do you keep returning to the same subject in a conversation, even when others seem ready to move on?"
        },
        {
            id: "q10",
            origin: "original",
            dimensions: ["focus"],
            text: "How often do you find yourself organizing or categorizing information in a very specific, particular way?"
        },

        // ---- Need for Routine & Predictability ----
        {
            id: "q11",
            origin: "original",
            dimensions: ["routine"],
            text: "How often do unexpected changes to your plans leave you feeling unsettled, even when the change is minor?"
        },
        {
            id: "q12",
            origin: "original",
            dimensions: ["routine"],
            text: "How often do you rely on a consistent daily routine to get through your day comfortably?"
        },
        {
            id: "q13",
            origin: "original",
            dimensions: ["routine"],
            text: "How often do you feel more at ease when you know exactly what to expect from a situation?"
        },
        {
            id: "q14",
            origin: "original",
            dimensions: ["routine"],
            text: "How often do you do things in the same order or the same way every time, even when it isn't strictly necessary?"
        },
        {
            id: "q15",
            origin: "original",
            dimensions: ["routine"],
            text: "How often does not knowing what will happen next make it hard for you to focus on anything else?"
        },

        // ---- Sensory Sensitivity ----
        {
            id: "q16",
            origin: "original",
            dimensions: ["sensory"],
            text: "How often do certain sounds, lights, textures, or smells feel more intense to you than they seem to for other people?"
        },
        {
            id: "q17",
            origin: "original",
            dimensions: ["sensory"],
            text: "How often do you need to step away from a loud or crowded environment because it becomes overwhelming?"
        },
        {
            id: "q18",
            origin: "original",
            dimensions: ["sensory"],
            text: "How often are you bothered by the tags, seams, or textures of your clothing?"
        },
        {
            id: "q19",
            origin: "original",
            dimensions: ["sensory"],
            text: "How often do you notice background sounds (a humming fridge, a ticking clock) that others don't seem to notice?"
        },
        {
            id: "q20",
            origin: "original",
            dimensions: ["sensory"],
            text: "How often do you feel physically uncomfortable in environments with bright or flickering lights?"
        }

    ],

    // Four non-clinical, descriptive dimensions. Bands are simple frequency
    // tertiles, NOT clinical cutoffs — nothing here has been validated as a
    // diagnostic instrument, unlike the GAD-7 or the ASRS.
    dimensions: [
        {
            id: "social",
            name: "Social Communication",
            icon: "💬",
            interpretation: [
                { min: 0, max: 6, label: "Low frequency of traits" },
                { min: 7, max: 13, label: "Moderate frequency of traits" },
                { min: 14, max: 20, label: "High frequency of traits" }
            ]
        },
        {
            id: "focus",
            name: "Attention to Detail & Focused Interests",
            icon: "🔎",
            interpretation: [
                { min: 0, max: 6, label: "Low frequency of traits" },
                { min: 7, max: 13, label: "Moderate frequency of traits" },
                { min: 14, max: 20, label: "High frequency of traits" }
            ]
        },
        {
            id: "routine",
            name: "Need for Routine & Predictability",
            icon: "📋",
            interpretation: [
                { min: 0, max: 6, label: "Low frequency of traits" },
                { min: 7, max: 13, label: "Moderate frequency of traits" },
                { min: 14, max: 20, label: "High frequency of traits" }
            ]
        },
        {
            id: "sensory",
            name: "Sensory Sensitivity",
            icon: "🔊",
            interpretation: [
                { min: 0, max: 6, label: "Low frequency of traits" },
                { min: 7, max: 13, label: "Moderate frequency of traits" },
                { min: 14, max: 20, label: "High frequency of traits" }
            ]
        }
    ],

    attribution:
        "All 20 questions in this test are original and were not copied, closely " +
        "paraphrased, or adapted from any existing autism screening instrument — " +
        "including the Cambridge Autism-Spectrum Quotient (AQ/AQ-10), which " +
        "remains copyrighted by the Autism Research Centre, University of " +
        "Cambridge, and restricted to non-commercial use. The four trait domains " +
        "explored here were informed by the following publicly documented " +
        "research, cited explicitly by domain: " +
        "Social Communication — conceptually informed by Baron-Cohen, S., " +
        "Wheelwright, S., Skinner, R., Martin, J., & Clubley, E. (2001). The " +
        "Autism-Spectrum Quotient (AQ): Evidence from Asperger Syndrome/" +
        "High-Functioning Autism, Males and Females, Scientists and " +
        "Mathematicians. Journal of Autism and Developmental Disorders, 31(1), " +
        "5-17 (Autism Research Centre, University of Cambridge), and the UC " +
        "Davis MIND Institute Autism Phenome Project (Nordahl, C.W. et al., " +
        "University of California, Davis), which documents social communication " +
        "difficulties as a core autism characteristic. " +
        "Attention to Detail & Focused Interests — conceptually informed by " +
        "Baron-Cohen et al. (2001), as above, and by the UC Davis MIND " +
        "Institute Autism Phenome Project, which documents intense focused " +
        "interests as a core autism characteristic. " +
        "Need for Routine & Predictability — conceptually informed by the UNC " +
        "TEACCH Autism Program (Schopler, E. & Reichler, R.J., University of " +
        "North Carolina at Chapel Hill), whose Structured Teaching model " +
        "describes a characteristic desire for routine and predictability in " +
        "autism, and by Fung, L. (Stanford Neurodiversity Project, Stanford " +
        "University School of Medicine), whose work on autism and prediction " +
        "describes a heightened need for predictability. " +
        "Sensory Sensitivity — conceptually informed by the UC Davis MIND " +
        "Institute Autism Phenome Project, which documents sensory experiences " +
        "as a core autism characteristic, and by Fung, L. (Stanford " +
        "Neurodiversity Project, Stanford University School of Medicine), " +
        "whose work describes sensory hypersensitivity in autism. " +
        "None of the sources above were quoted or used as question text — only " +
        "as references for the general symptom domains explored in this test. " +
        "This is a screening tool only, not a diagnostic instrument."

};
