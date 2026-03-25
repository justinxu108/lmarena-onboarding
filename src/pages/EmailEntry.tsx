import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { checkEmailUsed } from '../api';

interface EmailEntryProps {
  onContinue: (email: string) => void;
  onBack?: () => void;
}

export default function EmailEntry({ onContinue, onBack }: EmailEntryProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validate = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setError('Please enter your email address.'); return; }
    if (!validate(trimmed)) { setError('Please enter a valid email address.'); return; }
    if (!trimmed.endsWith('@mercor.expert')) {
      if (trimmed.endsWith('@c-mercor.com')) {
        setError('Please use your @mercor.expert email, not your @c-mercor.com email.');
      } else {
        setError('Please use your @mercor.expert email address (e.g., firstname.lastname@mercor.expert).');
      }
      return;
    }

    setError('');
    setLoading(true);
    try {
      const result = await checkEmailUsed(trimmed);
      if (result.exists) {
        setError('This email has already completed the LMArena onboarding. Each email can only be used once.');
        setLoading(false);
        return;
      }
      onContinue(trimmed);
    } catch {
      onContinue(trimmed);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight text-center">
          Enter Your Email
        </h2>
        <p className="text-sm text-white/40 text-center mb-8 leading-relaxed">
          Use your <strong className="text-white/60">@mercor.expert</strong> email address.
        </p>

        <motion.div
          className="glass rounded-2xl p-6 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="glass rounded-2xl p-4 mb-5 border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" className="mt-0.5 shrink-0">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-amber-300 mb-1">Important</p>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Use your <strong className="text-white/70">@mercor.expert</strong> email address (e.g., firstname.lastname@mercor.expert).
                  Do <strong className="text-white/70">not</strong> use a personal email or @c-mercor.com email.
                </p>
              </div>
            </div>
          </div>

          <label className="block text-xs font-semibold text-white/50 mb-2">
            Mercor Expert Email
          </label>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            placeholder="firstname.lastname@mercor.expert"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/25 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
          />

          {error && (
            <motion.p
              className="mt-3 text-xs text-red-400 flex items-center gap-1.5"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </motion.p>
          )}
        </motion.div>

        <div className="flex justify-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl text-sm font-semibold bg-white/8 text-white/60 border border-white/10 hover:bg-white/12 hover:text-white/80 transition-all duration-300"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 rounded-2xl text-sm font-semibold bg-gradient-to-r from-accent to-purple-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Continue'}
          </button>
        </div>

        <p className="mt-6 text-[11px] text-white/20 text-center">
          Press Enter to continue
        </p>
      </motion.div>
    </div>
  );
}
