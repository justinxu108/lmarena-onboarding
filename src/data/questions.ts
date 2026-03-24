export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'workflow' | 'prompts' | 'rubrics' | 'differences';
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // --- Workflow ---
  {
    id: 'q1',
    question: 'What is fundamentally different about LMArena tasks compared to regular Project Snowman tasks?',
    options: [
      'You write longer, more complex prompts',
      'You compare two model responses side by side instead of evaluating one',
      'You use a different rubric weight system',
      'You skip the golden scaffolding step',
    ],
    correctIndex: 1,
    explanation: 'The core difference is that LMArena tasks present two model responses (Model 1 and Model 2) for comparison, whereas regular tasks evaluate a single model\'s output against your rubric.',
    category: 'workflow',
  },
  {
    id: 'q2',
    question: 'After comparing both model responses, which preference selections allow you to proceed with the task?',
    options: [
      'Any preference — Model 1, Model 2, or Neither',
      'Only Model 2',
      'Model 2 or Neither',
      'Model 1 or Model 2 (but not Neither)',
    ],
    correctIndex: 2,
    explanation: 'You can only proceed if your preference is Model 2 or Neither. If Model 1 (the client model) is the better response, you cannot continue — the task requires that the client model is NOT the preferred one.',
    category: 'workflow',
  },
  {
    id: 'q3',
    question: 'Which model\'s response should all rubric criteria be graded against?',
    options: [
      'The preferred model\'s response (Model 2)',
      'Both models\' responses equally',
      'Model 1 — the client model',
      'An ideal response you write yourself',
    ],
    correctIndex: 2,
    explanation: 'All rubric criteria are graded against Model 1 (the client model), since the goal is to evaluate where the client model falls short. The rubric captures what Model 1 got right and wrong.',
    category: 'workflow',
  },

  // --- Prompts ---
  {
    id: 'q4',
    question: 'Which of the following is the BEST example of an LMArena prompt?',
    options: [
      'Write a Python function that implements binary search with O(log n) complexity.',
      'I have 127,073 Delta miles — is this good or bad and what could I get for it?',
      'Translate the following legal contract from English to Mandarin, preserving all terminology.',
      'List exactly 7 advantages and 7 disadvantages of solar panels in a numbered table format.',
    ],
    correctIndex: 1,
    explanation: 'LMArena prompts should be natural, consumer-focused questions a real person would ask an AI assistant. The Delta miles question is conversational, open-ended, and relates to everyday life. The others are too technical, specialized, or over-constrained.',
    category: 'prompts',
  },
  {
    id: 'q5',
    question: 'What characterizes a good LMArena prompt?',
    options: [
      'Long and highly specific with many constraints to challenge the model',
      'Simple, open-ended, and naturally phrased — like something you\'d type into ChatGPT',
      'Technical and domain-specific to test expert knowledge',
      'Deliberately ambiguous to cause model disagreement',
    ],
    correctIndex: 1,
    explanation: 'Good LMArena prompts are simple, open-ended, and use natural phrasing. They should sound like real consumer requests — the best ones are 3-5 sentences, under 100 words, with fewer than 5 constraints. The goal is NOT to trick the model.',
    category: 'prompts',
  },

  // --- Rubrics ---
  {
    id: 'q6',
    question: 'What is the acceptable rubric score range for LMArena tasks?',
    options: [
      '30-70% (same as regular tasks)',
      'Less than 75%, though you should try to keep it above 0%',
      'Exactly between 40-60%',
      'Any score is acceptable',
    ],
    correctIndex: 1,
    explanation: 'For LMArena tasks, the client model\'s score just needs to be less than 75% (regular tasks require 30-70%). However, you should still include criteria the model meets so the score isn\'t 0% — find something it got right.',
    category: 'rubrics',
  },
  {
    id: 'q7',
    question: 'How has the "Major" weight category changed for LMArena rubrics?',
    options: [
      'Major criteria have been removed entirely',
      'Major criteria can now include elements not explicitly asked for that would make the response more useful',
      'Major criteria are now worth 5 points instead of 3',
      'Major criteria can only be Subjective, not Objective',
    ],
    correctIndex: 1,
    explanation: 'The biggest rubric change: Major criteria can now capture elements that aren\'t explicitly asked for in the prompt but would make the response much more useful or helpful. This reflects the preference-based nature of LMArena tasks — your personal expertise about what\'s helpful matters.',
    category: 'rubrics',
  },
  {
    id: 'q8',
    question: 'In the Delta SkyMiles example, criterion #1 ("States that 127,073 miles is good") was marked "Not Met" for the client model. Why is this a Critical criterion?',
    options: [
      'Because it involves a factual claim about Delta\'s rewards program',
      'Because the user directly asked "is this good or bad" — answering that question is a core requirement of the prompt',
      'Because it was the first criterion listed in the rubric',
      'Because all LMArena rubrics must start with a Critical criterion',
    ],
    correctIndex: 1,
    explanation: 'The user explicitly asked "is this good, or bad" — directly answering that question is a core requirement of the prompt. Critical criteria capture essential prompt requirements. Model 1 never gave a direct answer ("depends on your travel goals"), which is why it failed this Critical criterion.',
    category: 'rubrics',
  },
  {
    id: 'q9',
    question: 'In the Delta SkyMiles rubric, criteria like "provides estimates for flight redemptions" and "how to get best value for miles" were classified as Major even though the user didn\'t ask for them. Why is this acceptable in LMArena?',
    options: [
      'It\'s actually not acceptable — these should be Minor criteria',
      'Because LMArena rubrics can include elements that aren\'t explicitly asked for but make the response much more helpful',
      'Because all criteria about flights must be Major',
      'Because the preferred model included them, and you must match every element',
    ],
    correctIndex: 1,
    explanation: 'This is the key LMArena rubric principle: Major criteria can now capture elements that go beyond the prompt but make the response significantly more useful. The user asked about their miles — providing specific redemption estimates and value-maximizing tips reflects expert knowledge that genuinely helps the user, even though they didn\'t specifically request it.',
    category: 'rubrics',
  },

  // --- Differences ---
  {
    id: 'q10',
    question: 'A rubric scores the client model at 72%. Under which task type does this score pass?',
    options: [
      'Regular tasks only (within 30-70%)',
      'LMArena tasks only (below 75%)',
      'Both regular and LMArena tasks',
      'Neither — 72% is too high for both',
    ],
    correctIndex: 1,
    explanation: 'A 72% score is above the regular task ceiling of 70%, so it would fail under regular rules. But it\'s below the LMArena threshold of 75%, so it passes for LMArena tasks. This is exactly the score the Delta SkyMiles example produces (21/29 = 72%).',
    category: 'differences',
  },
];

export const PASSING_SCORE = 0.8; // 80% to pass (8/10 correct)
