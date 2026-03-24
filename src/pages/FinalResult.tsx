import { motion } from 'framer-motion';
import { PASSING_SCORE } from '../data/questions';

interface FinalResultProps {
  score: number;
  totalQuestions: number;
}

export default function FinalResult({ score, totalQuestions }: FinalResultProps) {
  const passed = score >= PASSING_SCORE;
  const correctCount = Math.round(score * totalQuestions);
  const percentage = Math.round(score * 100);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-24 pb-12">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.div
          className={`w-20 h-20 rounded-full ${passed ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-red-500/15 border-red-500/25'} border flex items-center justify-center mb-6 mx-auto`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 15 }}
        >
          {passed ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-3">
          {passed ? 'You Passed!' : 'Not Quite'}
        </h2>

        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center">
              <p className={`text-3xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>{percentage}%</p>
              <p className="text-[11px] text-white/40 mt-1">Score</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white/80">{correctCount}/{totalQuestions}</p>
              <p className="text-[11px] text-white/40 mt-1">Correct</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${passed ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[11px] text-white/30 mt-2">Passing score: {Math.round(PASSING_SCORE * 100)}%</p>
        </div>

        {passed ? (
          <div className="space-y-3">
            <p className="text-sm text-white/50 leading-relaxed">
              You've demonstrated a solid understanding of LMArena tasks. Your result has been recorded.
            </p>
            <p className="text-xs text-white/30 leading-relaxed">
              You're now ready to start working on LMArena tasks. Look for them in the dedicated LMArena dashboards in Mercor Studio.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-white/50 leading-relaxed">
              Your score didn't meet the {Math.round(PASSING_SCORE * 100)}% passing threshold. Your result has been recorded.
            </p>
            <p className="text-xs text-white/30 leading-relaxed">
              Please review the LMArena workflow document and the learning material again before reattempting.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
