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
    question: 'You select "Neither" as your preference because both model responses are inadequate. How should you approach the rubric?',
    options: [
      'You cannot proceed — "Neither" blocks task submission',
      'Copy the rubric from whichever model scored higher',
      'Write a rubric capturing the essential aspects of a good response that neither model adequately provides',
      'Write a rubric that only captures what both models got wrong',
    ],
    correctIndex: 2,
    explanation: '"Neither" is a valid preference that allows you to proceed (alongside Model 2). When neither response is adequate, your rubric should capture what a good response would include — the essential elements both models failed to deliver. You still grade all criteria against Model 1 (the client).',
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
    explanation: 'LMArena prompts should be natural, consumer-focused questions a real person would ask an AI assistant. The Delta miles question is conversational, open-ended, and relates to everyday life. The others are too technical, specialized, or over-constrained (EC8/EC9).',
    category: 'prompts',
  },
  {
    id: 'q5',
    question: 'A writer submits the prompt: "Provide a 500-word analysis of the thermodynamic properties of phase-change materials used in spacecraft thermal management systems. Include at least 8 specific materials with melting points." What is the primary issue?',
    options: [
      'The prompt is too long',
      'It\'s not consumer-focused and has too many rigid constraints — violates EC8 (non-consumer) and EC9 (excessive complexity)',
      'It needs more constraints to properly test the model',
      'The topic is fine, but it should be phrased more casually',
    ],
    correctIndex: 1,
    explanation: 'This prompt violates EC8 (contrived/non-consumer request) and EC9 (excessive complexity). LMArena prompts should be realistic consumer requests with natural phrasing, under 100 words, and fewer than 5 constraints. No amount of casual rephrasing fixes a fundamentally non-consumer topic.',
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
    explanation: 'For LMArena tasks, the client model\'s score just needs to be less than 75% (EC4 adjusted). However, you should still include criteria the model meets so the score isn\'t 0% — find something it got right.',
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
    explanation: 'The biggest rubric change (EC5 adjusted): Major criteria can now capture elements that aren\'t explicitly asked for in the prompt but would make the response much more useful or helpful. This reflects the preference-based nature of LMArena tasks — your personal expertise about what\'s helpful matters.',
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
    question: 'Model 1 gives a factually thorough answer, but Model 2 is better organized, directly addresses the user\'s core question first, and includes practical tips the user didn\'t ask for. You prefer Model 2. What should your rubric prioritize?',
    options: [
      'Only the factual content that both models covered — ignore the organizational and practical differences',
      'Only the practical tips from Model 2, since that\'s what made it preferred',
      'The quality factors that made Model 2 preferred (organization, directness, practical tips) as well as factual requirements — grading all criteria against Model 1',
      'An even split of criteria from each model\'s strengths, graded against both',
    ],
    correctIndex: 2,
    explanation: 'The rubric should capture both the core prompt requirements (factual content) AND the quality factors that made Model 2 preferred — directness, organization, helpful extras. But all criteria are graded against Model 1 (the client). This means Model 1 may score well on factual criteria but poorly on the preference-based ones, which is exactly how LMArena rubrics work (EC13 applied loosely for beyond-prompt criteria).',
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
  {
    id: 'q11',
    question: 'Model 1 gives a factually accurate but poorly organized answer. Model 2 is well-organized but contains a minor factual error. You prefer Model 2. What should the rubric prioritize?',
    options: [
      'Factual accuracy, since Model 1 was stronger there',
      'The quality factors that made Model 2 preferred, while grading factual criteria as Fully Met against Model 1',
      'Only the elements explicitly requested in the prompt',
      'Both models equally, comparing their strengths side by side',
    ],
    correctIndex: 1,
    explanation: 'The rubric should capture what made Model 2 preferred — organization, clarity, directness — as criteria. Factual accuracy criteria should still be included but graded against Model 1 (the client). If Model 1 got the facts right, those criteria are marked "Fully Met." The rubric reflects the full picture: Model 1 may pass factual criteria but fail on the quality/preference criteria that made Model 2 better.',
    category: 'rubrics',
  },
];

export const PASSING_SCORE = 0.81; // 9/11 correct (81.8%) passes
