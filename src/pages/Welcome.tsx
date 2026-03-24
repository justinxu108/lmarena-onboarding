import { motion } from 'framer-motion';
import { useEnterKey } from '../hooks/useEnterKey';

interface WelcomeProps {
  onContinue: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  useEnterKey(onContinue);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
            Estimated time: ~15 minutes
          </span>
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          LMArena Task Onboarding
        </h1>
        <p className="text-base text-white/50 leading-relaxed mb-3">
          We're introducing a new type of task: <strong className="text-white/80">LMArena tasks</strong>. This onboarding will teach you the key differences from regular Project Snowman tasks and assess your understanding.
        </p>
        <p className="text-sm text-white/35 leading-relaxed mb-10">
          You'll go through an interactive learning module covering the LMArena workflow, prompt guidelines, and rubric changes, followed by a short assessment. You need to score 80% or higher to pass.
        </p>

        <motion.button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-accent to-purple-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Get Started
        </motion.button>

        <motion.p
          className="mt-6 text-[11px] text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Press Enter or click the button to continue
        </motion.p>
      </motion.div>
    </div>
  );
}
