/**
 * bipolar-data.js
 *
 * Original, non-diagnostic self-reflection questionnaire about mood episodes.
 * Items are informed by clinical symptom domains and published bipolar
 * screening research, but are not copied or adapted from validated scales.
 * Scores and interpretation bands have not been clinically validated.
 */

window.QuizData = window.QuizData || {};

window.QuizData.bipolar = {
    id: "bipolar",
    title: "Bipolar Mood Patterns Self-Assessment",
    description:
        "Reflect on distinct changes in mood, energy, sleep, and activity. This original questionnaire is for education and self-reflection; it is not a validated screening test or diagnosis.",
    instructions:
        "Think about distinct periods in your life that felt noticeably different from your usual self. For each statement, choose the answer that best fits.",

    scaleLabels: [
        "No",
        "Not sure",
        "Yes"
    ],

    questions: [
        {
            id: "q1",
            dimension: "moodChanges",
            text: "Have you had a distinct period when your mood felt unusually elevated, energized, or persistently irritable compared with your usual self?"
        },
        {
            id: "q2",
            dimension: "moodChanges",
            text: "During such a period, did you need much less sleep than usual while still feeling rested or unusually energetic?"
        },
        {
            id: "q3",
            dimension: "moodChanges",
            text: "During such a period, did your thoughts feel unusually fast, or did you speak much more or faster than usual?"
        },
        {
            id: "q4",
            dimension: "moodChanges",
            text: "During such a period, did you feel unusually confident, powerful, or capable of taking on far more than usual?"
        },
        {
            id: "q5",
            dimension: "moodChanges",
            text: "During such a period, did you become much more active, sociable, productive, or driven to start new projects?"
        },
        {
            id: "q6",
            dimension: "moodChanges",
            text: "During such a period, did you take unusual risks or make impulsive choices involving spending, sex, driving, or other important decisions?"
        },
        {
            id: "q7",
            dimension: "impact",
            text: "Did other people notice that your mood, energy, sleep, or behavior had changed significantly?"
        },
        {
            id: "q8",
            dimension: "impact",
            text: "Did these periods ever cause serious problems in your relationships, work or school, finances, safety, or daily responsibilities?"
        },
        {
            id: "q9",
            dimension: "lowMood",
            text: "Have you had a separate period lasting around two weeks or longer when you felt persistently low, empty, or hopeless, or lost interest in most things?"
        },
        {
            id: "q10",
            dimension: "lowMood",
            text: "During a low period, did changes in sleep, appetite, energy, concentration, or feelings of worthlessness make daily life harder?"
        },
        {
            id: "q11",
            dimension: "moodChanges",
            text: "Have these higher-energy or low-mood periods happened as noticeable episodes, with your mood or energy returning closer to your usual level between them?"
        },
        {
            id: "q12",
            dimension: "context",
            text: "Have you ever been unsure whether these changes might be related to medication, alcohol or other substances, a medical condition, or major sleep disruption?"
        }
    ],

    dimensions: [
        {
            id: "moodChanges",
            name: "Higher-energy mood patterns",
            icon: "mood-happy",
            interpretation: [
                { min: 0, max: 4, label: "Few patterns endorsed in this section" },
                { min: 5, max: 9, label: "Some patterns endorsed in this section" },
                { min: 10, max: 14, label: "Several patterns endorsed in this section" }
            ]
        },
        {
            id: "lowMood",
            name: "Low-mood patterns",
            icon: "mood-sad",
            interpretation: [
                { min: 0, max: 1, label: "Few patterns endorsed in this section" },
                { min: 2, max: 2, label: "Some patterns endorsed in this section" },
                { min: 3, max: 4, label: "Several patterns endorsed in this section" }
            ]
        },
        {
            id: "impact",
            name: "Impact on daily life",
            icon: "activity",
            interpretation: [
                { min: 0, max: 1, label: "Few concerns endorsed in this section" },
                { min: 2, max: 3, label: "Some concerns endorsed in this section" },
                { min: 4, max: 4, label: "Several concerns endorsed in this section" }
            ]
        },
        {
            id: "context",
            name: "Possible contributing factors to discuss",
            icon: "message-circle",
            interpretation: [
                { min: 0, max: 0, label: "No uncertainty selected in this section" },
                { min: 1, max: 2, label: "You selected uncertainty about possible contributing factors" }
            ]
        }
    ],

    attribution:
        "This original questionnaire is informed by published research on bipolar disorder and screening tools, including the Mood Disorder Questionnaire (MDQ), Hypomania Checklist-32 (HCL-32), Bipolar Spectrum Diagnostic Scale (BSDS), and Rapid Mood Screener (RMS). Its questions, scoring, and interpretation bands are not validated and do not reproduce those instruments. A positive or concerning response cannot establish a diagnosis; only a qualified clinician can assess bipolar disorder. Sources: NIMH, Bipolar Disorder; Hirschfeld et al. (2000), American Journal of Psychiatry; Angst et al. (2005), Journal of Affective Disorders; Carvalho et al. (2015), Journal of Affective Disorders; McIntyre et al. (2021), Current Medical Research and Opinion."
};
