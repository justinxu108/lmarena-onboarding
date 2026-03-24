import { useState, useRef } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Welcome from './pages/Welcome';
import EmailEntry from './pages/EmailEntry';
import LearnModule from './pages/LearnModule';
import Assessment from './pages/Assessment';
import FinalResult from './pages/FinalResult';
import { submitResults } from './api';
import { ASSESSMENT_QUESTIONS } from './data/questions';

type Step = 'welcome' | 'email' | 'learn' | 'assessment' | 'final';

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [email, setEmail] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const startTimeRef = useRef<number>(0);

  return (
    <>
      <AnimatedBackground />

      {step === 'welcome' && (
        <Welcome onContinue={() => setStep('email')} />
      )}

      {step === 'email' && (
        <EmailEntry
          onBack={() => setStep('welcome')}
          onContinue={(e) => {
            setEmail(e);
            startTimeRef.current = Date.now();
            setStep('learn');
          }}
        />
      )}

      {step === 'learn' && (
        <LearnModule
          onBack={() => setStep('email')}
          onContinue={() => setStep('assessment')}
        />
      )}

      {step === 'assessment' && (
        <Assessment
          onComplete={(answers, score) => {
            setFinalScore(score);
            setStep('final');
            submitResults({
              email,
              passed: score >= 0.8,
              score,
              totalQuestions: ASSESSMENT_QUESTIONS.length,
              answers,
              elapsedSeconds: Math.round((Date.now() - startTimeRef.current) / 1000),
            });
          }}
        />
      )}

      {step === 'final' && (
        <FinalResult
          score={finalScore}
          totalQuestions={ASSESSMENT_QUESTIONS.length}
          onRetry={finalScore < 0.8 ? () => {
            startTimeRef.current = Date.now();
            setStep('learn');
          } : undefined}
        />
      )}
    </>
  );
}
