export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'workflow' | 'prompts' | 'rubrics' | 'differences';
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Workflow questions
  {
    id: 'q1',
    question: 'In an LMArena task, how many model responses do you compare?',
    options: [
      'One model response',
      'Two model responses (Model 1 and Model 2)',
      'Three model responses',
      'It varies by task',
    ],
    correctIndex: 1,
    explanation: 'LMArena tasks always present two model responses side by side (Model 1 and Model 2) for you to compare and evaluate.',
    category: 'workflow',
  },
  {
    id: 'q2',
    question: 'After comparing both model responses, which preference options allow you to proceed with creating a rubric?',
    options: [
      'Only Model 1',
      'Only Model 2',
      'Model 2 or Neither',
      'Any of the three options (Model 1, Model 2, or Neither)',
    ],
    correctIndex: 2,
    explanation: 'You can only proceed if your preferred response is Model 2 or Neither. If Model 1 is preferred, you cannot continue with that task.',
    category: 'workflow',
  },
  {
    id: 'q3',
    question: 'What is the Golden Scaffolding in an LMArena task?',
    options: [
      'A template for writing prompts',
      'Bullet points outlining key elements an ideal response should include',
      'The final rubric with all criteria scored',
      'A summary of the model comparison',
    ],
    correctIndex: 1,
    explanation: 'The Golden Scaffolding is a set of bullet points that outline the key elements an ideal ("Golden") response should include, covering core requirements, quality factors, and strong elements the preferred model may have included.',
    category: 'workflow',
  },
  {
    id: 'q4',
    question: 'What must you include in the Model Choice Justification?',
    options: [
      'Just select the preferred model, no justification needed',
      'A 20-100 word explanation of why your preferred response is superior',
      'A score from 1-10 for each model',
      'A list of rubric criteria',
    ],
    correctIndex: 1,
    explanation: 'You must provide a 20-100 word justification explaining why your preferred model response is superior to the other.',
    category: 'workflow',
  },
  // Prompt questions
  {
    id: 'q5',
    question: 'What type of tasks are ALL LMArena tasks classified as?',
    options: [
      'Coding tasks',
      'LLM Power User tasks',
      'Creative writing tasks',
      'Data analysis tasks',
    ],
    correctIndex: 1,
    explanation: 'All LMArena tasks are LLM Power User tasks. This is a key distinction from other task types in the project.',
    category: 'prompts',
  },
  {
    id: 'q6',
    question: 'Which of the following is the BEST example of an LMArena prompt?',
    options: [
      'Write a Python function that implements binary search with O(log n) complexity and handles edge cases for empty arrays.',
      'What should I consider when choosing between a gas and electric stove for my kitchen?',
      'Translate the following legal contract from English to Mandarin, preserving all technical terminology.',
      'Generate a 2000-word essay analyzing the geopolitical implications of NATO expansion.',
    ],
    correctIndex: 1,
    explanation: 'LMArena prompts should focus on everyday consumer topics like home & household, lifestyle, and personal finance. The stove comparison is a realistic consumer question someone would naturally ask an AI assistant.',
    category: 'prompts',
  },
  {
    id: 'q7',
    question: 'Which topic areas should LMArena prompts focus on?',
    options: [
      'Advanced software engineering and system design',
      'Home & household, lifestyle, and (simple) personal finance',
      'Academic research and scientific papers',
      'Legal and medical advice',
    ],
    correctIndex: 1,
    explanation: 'LMArena prompts should focus on home & household, lifestyle, and simple personal finance topics — the kinds of things an average person would ask an AI assistant.',
    category: 'prompts',
  },
  {
    id: 'q8',
    question: 'What characterizes a good LMArena prompt?',
    options: [
      'Long and highly specific with many constraints',
      'Simple, open-ended, using natural phrasing that mimics real-world use',
      'Technical and domain-specific to challenge the model',
      'Deliberately ambiguous to trick the model',
    ],
    correctIndex: 1,
    explanation: 'Good LMArena prompts are simple, open-ended, and use natural phrasing — they should sound like something a person would actually type into ChatGPT or another AI assistant. The best prompts are 3-5 sentences, under 100 words, with fewer than 5 constraints.',
    category: 'prompts',
  },
  // Rubric questions
  {
    id: 'q9',
    question: 'How do LMArena rubrics differ from regular Project Snowman rubrics?',
    options: [
      'They use a completely different scoring system',
      'They are more preference-based and can capture personal perspectives',
      'They have fewer criteria',
      'They don\'t require any objective criteria',
    ],
    correctIndex: 1,
    explanation: 'LMArena rubrics are more preference-based than regular rubrics. They can capture personal perspectives and expertise, reflecting what makes a response helpful in addition to checking for correct reasoning.',
    category: 'rubrics',
  },
  {
    id: 'q10',
    question: 'What is the acceptable failure range for the autograder score on LMArena tasks?',
    options: [
      '30-70% (same as regular tasks)',
      'Less than 75%',
      'Less than 50%',
      'Exactly 50%',
    ],
    correctIndex: 1,
    explanation: 'For LMArena tasks, the failure range is anything less than 75% (compared to the usual 30-70% for regular tasks). You should still try to include criteria that boost the score above 0%.',
    category: 'rubrics',
  },
  {
    id: 'q11',
    question: 'What change was made to the "Major" weight category for LMArena rubrics?',
    options: [
      'Major criteria were removed entirely',
      'Major criteria can now include elements not explicitly asked for but that would make the response much more useful',
      'Major criteria are now worth more points',
      'Major criteria are now the same as Critical criteria',
    ],
    correctIndex: 1,
    explanation: 'For LMArena tasks, Major criteria can now include elements that aren\'t explicitly asked for in the prompt but would make the response much more useful or helpful. This reflects the preference-based nature of these tasks.',
    category: 'rubrics',
  },
  {
    id: 'q12',
    question: 'Which model\'s response should all rubric criteria be graded against?',
    options: [
      'The preferred model\'s response',
      'Both models\' responses equally',
      'The client model\'s response (Model 1)',
      'An ideal response you write yourself',
    ],
    correctIndex: 2,
    explanation: 'All rubric criteria should be graded based on the client model\'s response (Model 1), since that is the response being evaluated. The rubric captures what makes the other model better.',
    category: 'rubrics',
  },
  // Differences questions
  {
    id: 'q13',
    question: 'Where do you find and claim LMArena tasks?',
    options: [
      'The same "Unclaimed Tasks" dashboard as regular tasks',
      'A separate "LMArena Unclaimed Tasks" dashboard in Mercor Studio',
      'Tasks are automatically assigned to you',
      'You create new tasks from scratch',
    ],
    correctIndex: 1,
    explanation: 'LMArena tasks have their own dedicated dashboards: "LMArena Unclaimed Tasks" for writing and "[R] LMArena Review Queue" for reviewing. These are separate from the regular task dashboards.',
    category: 'differences',
  },
  {
    id: 'q14',
    question: 'What is the core goal of LMArena tasks compared to regular Snowman tasks?',
    options: [
      'To write harder prompts that all models fail on',
      'To capture and compare rubrics of Model 1 (the client model)',
      'To generate creative writing samples',
      'To test model speed and latency',
    ],
    correctIndex: 1,
    explanation: 'The goal of LMArena tasks is to "capture and compare rubrics of Model 1" — you evaluate how the client model performs against a competing model on consumer-focused prompts.',
    category: 'differences',
  },
  {
    id: 'q15',
    question: 'Which of the following is a key similarity between LMArena and regular tasks?',
    options: [
      'Both require comparing two model responses',
      'Both use the same rubric weight categories (Critical, Major, Minor)',
      'Both focus on consumer topics',
      'Both have the same failure range for scores',
    ],
    correctIndex: 1,
    explanation: 'Both LMArena and regular tasks use the same rubric weight categories: Critical, Major, and Minor. The definitions of Critical and Minor remain the same, though Major has been expanded for LMArena tasks.',
    category: 'differences',
  },
];

export const PASSING_SCORE = 0.8; // 80% to pass
