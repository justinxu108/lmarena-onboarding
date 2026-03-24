import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSESSMENT_QUESTIONS } from '../data/questions';
import type { Question } from '../data/questions';

interface AssessmentProps {
  onComplete: (answers: Record<string, number>, score: number) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  workflow: 'Workflow',
  prompts: 'Prompts',
  rubrics: 'Rubrics',
  differences: 'Differences',
};

const CATEGORY_COLORS: Record<string, string> = {
  workflow: 'bg-blue-500/20 text-blue-300 border-blue-500/20',
  prompts: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20',
  rubrics: 'bg-amber-500/20 text-amber-300 border-amber-500/20',
  differences: 'bg-purple-500/20 text-purple-300 border-purple-500/20',
};

export default function Assessment({ onComplete }: AssessmentProps) {
  const [questions] = useState(() => {
    const shuffled = [...ASSESSMENT_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question: Question = questions[currentIndex];
  const isCorrect = selectedOption === question.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;

  const answeredCount = useMemo(() => Object.keys(answers).length + (showFeedback ? 1 : 0), [answers, showFeedback]);
  const correctCount = useMemo(() => {
    let count = 0;
    for (const [qId, ansIdx] of Object.entries(answers)) {
      const q = questions.find((qq) => qq.id === qId);
      if (q && ansIdx === q.correctIndex) count++;
    }
    if (showFeedback && isCorrect) count++;
    return count;
  }, [answers, questions, showFeedback, isCorrect]);

  const handleSelect = useCallback((optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  }, [showFeedback]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedOption === null) return;
    setShowFeedback(true);
  }, [selectedOption]);

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;
    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      let correct = 0;
      for (const [qId, ansIdx] of Object.entries(newAnswers)) {
        const q = questions.find((qq) => qq.id === qId);
        if (q && ansIdx === q.correctIndex) correct++;
      }
      onComplete(newAnswers, correct / questions.length);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  }, [selectedOption, answers, question.id, isLastQuestion, questions, onComplete]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-16 pb-12">
      {/* Progress */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-white/40 font-medium">Assessment</span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-emerald-400 font-medium">{correctCount} correct</span>
            <span className="text-[11px] text-white/30 font-mono">{answeredCount} / {questions.length}</span>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-purple-400"
            animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] text-white/30 font-mono">Q{currentIndex + 1}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${CATEGORY_COLORS[question.category]}`}>
                {CATEGORY_LABELS[question.category]}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight mb-6 leading-snug">
              {question.question}
            </h2>

            <div className="space-y-2.5">
              {question.options.map((option, i) => {
                let borderClass = 'border-transparent hover:bg-white/5';
                if (showFeedback) {
                  if (i === question.correctIndex) {
                    borderClass = 'border-emerald-500/40 bg-emerald-500/10';
                  } else if (i === selectedOption && i !== question.correctIndex) {
                    borderClass = 'border-red-500/40 bg-red-500/10';
                  } else {
                    borderClass = 'border-transparent opacity-40';
                  }
                } else if (selectedOption === i) {
                  borderClass = 'border-accent/40 bg-accent/15';
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full flex items-start gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 border glass ${borderClass}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    disabled={showFeedback}
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold shrink-0 mt-0.5 ${
                      showFeedback && i === question.correctIndex
                        ? 'bg-emerald-500 text-white'
                        : showFeedback && i === selectedOption && i !== question.correctIndex
                        ? 'bg-red-500 text-white'
                        : selectedOption === i
                        ? 'bg-accent text-white'
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-white/80 leading-relaxed">{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0 }}
                  className="mt-4"
                >
                  <div className={`glass rounded-xl p-4 ${isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="mt-0.5 shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="mt-0.5 shrink-0">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      )}
                      <div>
                        <p className={`text-xs font-semibold mb-1 ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className="text-[11px] text-white/50 leading-relaxed">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-2xl flex justify-end mt-8">
        {!showFeedback ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-2xl text-sm font-semibold bg-gradient-to-r from-accent to-purple-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
