import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnterKey } from '../hooks/useEnterKey';

interface LearnModuleProps {
  onContinue: () => void;
  onBack: () => void;
}

interface Slide {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

function ComparisonRow({ label, old, new: newVal }: { label: string; old: string; new: string }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 py-2.5 border-b border-white/5 last:border-0">
      <span className="text-xs font-semibold text-white/70">{label}</span>
      <span className="text-xs text-white/40">{old}</span>
      <span className="text-xs text-accent-light font-medium">{newVal}</span>
    </div>
  );
}

function Bullet({ color = 'accent', children }: { color?: 'accent' | 'green' | 'amber'; children: React.ReactNode }) {
  const dotColor = color === 'green' ? 'text-emerald-400' : color === 'amber' ? 'text-amber-400' : 'text-accent-light';
  const dot = color === 'green' ? '\u2713' : color === 'amber' ? '!' : '\u2022';
  return (
    <li className="flex items-start gap-2.5 text-xs text-white/60 leading-relaxed">
      <span className={`${dotColor} mt-px shrink-0 ${color === 'amber' ? 'font-bold' : ''}`}>{dot}</span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

function StepCard({ number, title, description, image }: { number: number; title: string; description: string; image?: string }) {
  return (
    <div className="space-y-2.5">
      <div className="flex gap-3 items-start">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/20 text-accent-light text-sm font-bold shrink-0">
          {number}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white/90 mb-0.5">{title}</p>
          <p className="text-xs text-white/50 leading-relaxed">{description}</p>
        </div>
      </div>
      {image && (
        <div className="ml-11 rounded-xl overflow-hidden border border-white/10">
          <img src={image} alt={title} className="w-full" />
        </div>
      )}
    </div>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-white/80 font-semibold">{children}</strong>;
}

const slides: Slide[] = [
  // ─── Slide 1: What are LMArena Tasks? ───
  {
    title: 'What are LMArena Tasks?',
    subtitle: 'A new type of task in Project Snowman',
    content: (
      <div className="space-y-5">
        <div className="glass-subtle rounded-xl p-4 space-y-3">
          <p className="text-sm text-white/70 leading-relaxed">
            LMArena tasks are a new task type where you <B>compare two AI model responses</B> side by side and evaluate which one is better. This is fundamentally different from regular tasks where you evaluate a single model's output.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            The goal is to <B>evaluate the client model (Model 1)</B> by comparing it against a competing model (Model 2), building a rubric that captures where Model 1 falls short.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-[11px] font-semibold text-accent-light uppercase tracking-wider mb-3">Key Facts</p>
          <ul className="space-y-2.5">
            <Bullet>All LMArena tasks are classified as <B>LLM Power User</B> tasks</Bullet>
            <Bullet>Tasks are found in dedicated <B>LMArena dashboards</B>, separate from regular task queues</Bullet>
            <Bullet>After claiming, they appear in your regular Writing/Reviewing dashboards</Bullet>
            <Bullet>The Studio UI labels models as <B>Model 1</B> and <B>Model 2</B> (examples may also say Model A/B — same thing: Model 1 = Model A = client)</Bullet>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Writing Dashboard</p>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="/images/unclaimed-tasks.png" alt="LMArena Unclaimed Tasks Dashboard" className="w-full" />
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Review Queue</p>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="/images/review-queue.png" alt="LMArena Review Queue" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ─── Slide 2: The LMArena Workflow ───
  {
    title: 'The LMArena Workflow',
    subtitle: '5 steps to complete a task',
    content: (
      <div className="space-y-5">
        <StepCard
          number={1}
          title="Submit Your Prompt & Compare Responses"
          description="Enter your prompt in the Conversation tab. Two model responses appear (Model 1 and Model 2). Read both carefully to determine which is stronger."
          image="/images/conversation-tab.png"
        />
        <StepCard
          number={2}
          title="Record Your Preference"
          description="Select your preferred model and confidence level. Write a 20-100 word justification. You can only proceed if you select Model 2 or Neither — if Model 1 is better, you cannot continue with that task."
          image="/images/model-preference.png"
        />
        <StepCard
          number={3}
          title="Create the Golden Scaffolding"
          description="Write bullet points outlining what an ideal response should include: core prompt requirements, quality factors, and strong elements from the preferred response that the client model missed."
          image="/images/golden-scaffolding.png"
        />
        <StepCard
          number={4}
          title="Generate & Review the Rubric"
          description="Click 'Generate Rubric' to auto-create criteria from your scaffolding. Review descriptions, verify tags (weight, category, type), and grade each criterion against Model 1's (the client's) response."
          image="/images/rubric-table.png"
        />
        <StepCard
          number={5}
          title="Submit the Task"
          description="Ensure all submission requirements are met: preference is Model 2 or Neither, justification is 20-100 words, at least 3 criteria with at least 1 Critical and 1 Major, rubric score is less than 75% (note: Studio UI may still show 30-70% — for LMArena, anything under 75% is acceptable), and autograder has been run."
          image="/images/submission-requirements.png"
        />
      </div>
    ),
  },

  // ─── Slide 3: Prompt Guidelines ───
  {
    title: 'Prompt Guidelines',
    subtitle: 'What makes a good LMArena prompt',
    content: (
      <div className="space-y-5">
        <p className="text-sm text-white/70 leading-relaxed">
          LMArena prompts should reflect <B>realistic consumer requests</B> — the kind of thing an average person would naturally ask an AI assistant. The simpler the better: the best prompts are 3-5 sentences, under 100 words, with fewer than 5 constraints.
        </p>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-[11px] font-semibold text-accent-light uppercase tracking-wider mb-3">Key Principles</p>
          <ul className="space-y-2.5">
            <Bullet color="green"><B>Realistic consumer requests (EC8):</B> Mimic real-world situations where someone would turn to an AI. Suggested areas include home &amp; household, lifestyle, and personal finance, but not limited to these.</Bullet>
            <Bullet color="green"><B>Simple and open-ended (EC9):</B> Under 100 words, fewer than 5 constraints. Avoid rigid formatting requirements or excessive instructions — this is enforced more strictly for LMArena.</Bullet>
            <Bullet color="green"><B>Use natural phrasing:</B> Should sound like something a person would actually type into ChatGPT or another AI assistant</Bullet>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-subtle rounded-xl p-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Good Examples</p>
            <ul className="space-y-1.5 text-[11px] text-white/60 leading-relaxed">
              <li>"Is it worth buying noise-cancelling headphones for studying?"</li>
              <li>"What's the difference between ceramic and stainless steel cookware?"</li>
              <li>"How do I choose a good mattress?"</li>
              <li>"What does SPF actually mean in sunscreen?"</li>
            </ul>
          </div>
          <div className="glass-subtle rounded-xl p-3">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Avoid</p>
            <ul className="space-y-1.5 text-[11px] text-white/60 leading-relaxed">
              <li>Overly technical or domain-specific prompts</li>
              <li>Rigid formatting requirements or excessive constraints</li>
              <li>Prompts requiring specialized professional knowledge</li>
              <li>Prompts designed to trick or confuse the model</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },

  // ─── Slide 4: Rubric Changes ───
  {
    title: 'Rubric Changes',
    subtitle: 'How LMArena rubrics differ from regular rubrics',
    content: (
      <div className="space-y-5">
        <p className="text-sm text-white/70 leading-relaxed">
          LMArena rubrics are <B>more preference-based</B> than regular rubrics. The guiding principle is that rubrics can capture <B>personal perspectives and expertise</B>, reflecting what makes a response genuinely helpful — not just checking for correct reasoning.
        </p>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-[11px] font-semibold text-accent-light uppercase tracking-wider mb-3">What Changed</p>
          <ul className="space-y-3">
            <Bullet color="amber"><B>Rubric score range (EC4):</B> The acceptable score is now anything less than 75% (regular tasks require 30-70%). Even if below 30%, try to include criteria the client model does meet so the score isn't 0%.</Bullet>
            <Bullet color="amber"><B>Major criteria expanded (EC5):</B> Can now include elements that aren't explicitly asked for in the prompt but would make the response much more useful or helpful. This is the biggest change.</Bullet>
            <Bullet color="amber"><B>Reflect the preferred response (EC13):</B> Beyond-prompt criteria are valid if they capture why the preferred response was better. Rubric/prompt mismatch rules apply more loosely for LMArena.</Bullet>
          </ul>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-3">What Stayed the Same</p>
          <ul className="space-y-2.5">
            <Bullet color="green"><B>Critical &amp; Minor weights:</B> Same definitions as regular tasks</Bullet>
            <Bullet color="green"><B>Grade against the client model:</B> All criteria are scored against Model 1's response</Bullet>
            <Bullet color="green"><B>Rubric structure:</B> Same weight categories (Critical 5pts, Major 3pts, Minor 1pt), same tags, same Objective/Subjective classification</Bullet>
          </ul>
        </div>
      </div>
    ),
  },

  // ─── Slide 5: Example — Prompt & Responses ───
  {
    title: 'Example: Delta SkyMiles',
    subtitle: 'Walkthrough — prompt, responses, and preference',
    content: (
      <div className="space-y-4">
        <div className="glass-subtle rounded-xl p-4">
          <p className="text-[10px] font-semibold text-accent-light uppercase tracking-wider mb-2">Prompt</p>
          <p className="text-sm text-white/90 leading-relaxed italic">
            "I have 127,073 Delta miles available, is this good, or bad and what could I get for it?"
          </p>
          <p className="text-[11px] text-white/40 mt-2">
            A natural, conversational consumer question — exactly the style LMArena tasks call for.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-subtle rounded-xl p-4">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Model 1 / A (Client)</p>
            <ul className="space-y-1.5 text-[11px] text-white/50 leading-relaxed list-disc list-inside">
              <li>Says it "depends on your travel goals"</li>
              <li>Lists flight options, seat upgrades, merchandise</li>
              <li>Warns gift cards offer lower value per mile</li>
              <li className="text-white/70 font-medium">Never directly answers: is 127,073 miles good or bad?</li>
            </ul>
          </div>
          <div className="glass-subtle rounded-xl p-4">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Model 2 / B (Preferred)</p>
            <ul className="space-y-1.5 text-[11px] text-white/50 leading-relaxed list-disc list-inside">
              <li className="text-white/70 font-medium">Directly answers: "This is very good"</li>
              <li>Puts it in perspective with average ticket costs</li>
              <li>Explains options: domestic trips, international, premium upgrades</li>
              <li>Addresses the user's question first, then adds detail</li>
            </ul>
          </div>
        </div>

        <div className="glass rounded-xl p-4 border-blue-500/20 bg-blue-500/5">
          <p className="text-xs font-semibold text-blue-300 mb-1">Preference: Model 2 (Model B)</p>
          <p className="text-[11px] text-white/50 leading-relaxed">
            <span className="text-white/70 font-medium">Justification:</span> Response B not only provides information on what can be redeemed but also on how to get the best deal. It more clearly answers the direct question before offering nice-to-have context. Its formatting and order of information are easier to understand.
          </p>
        </div>
      </div>
    ),
  },

  // ─── Slide 6: Example — The Rubric ───
  {
    title: 'Example: The Rubric',
    subtitle: 'Delta SkyMiles — notice how criteria go beyond the prompt',
    content: (
      <div className="space-y-4">
        <p className="text-xs text-white/50 leading-relaxed">
          All 9 criteria graded against <span className="text-white/70 font-medium">Model 1</span> (the client). <span className="text-amber-300">Highlighted rows</span> are Major criteria that go beyond what the user asked.
        </p>

        {/* Rubric table */}
        <div className="glass-subtle rounded-xl overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-2.5 py-2 text-left font-semibold text-white/40 uppercase tracking-wider w-8">#</th>
                <th className="px-2.5 py-2 text-left font-semibold text-white/40 uppercase tracking-wider">Description</th>
                <th className="px-2.5 py-2 text-left font-semibold text-white/40 uppercase tracking-wider w-16">Weight</th>
                <th className="px-2.5 py-2 text-left font-semibold text-white/40 uppercase tracking-wider w-20">Tag</th>
                <th className="px-2.5 py-2 text-left font-semibold text-white/40 uppercase tracking-wider w-16">Grade</th>
              </tr>
            </thead>
            <tbody>
              {([
                { n: 1, desc: 'States that 127,073 Delta SkyMiles is good.', w: 'Critical', tag: 'Final Answer', g: 'Not Met', hl: false },
                { n: 2, desc: 'States miles can be redeemed for flights.', w: 'Critical', tag: 'Final Answer', g: 'Met', hl: false },
                { n: 3, desc: 'States miles can be redeemed for upgrades.', w: 'Critical', tag: 'Final Answer', g: 'Met', hl: false },
                { n: 4, desc: 'Miles redeemable for non-flight options (merchandise, hotels, car rentals).', w: 'Major', tag: 'Final Answer', g: 'Met', hl: true },
                { n: 5, desc: 'How to get best value (off-peak dates, booking early, partner airlines).', w: 'Major', tag: 'Reasoning', g: 'Not Met', hl: true },
                { n: 6, desc: 'Presents results in clear, organized format.', w: 'Minor', tag: 'Style', g: 'Met', hl: false },
                { n: 7, desc: 'Estimates for flight redemptions (domestic, international).', w: 'Major', tag: 'Reasoning', g: 'Met', hl: true },
                { n: 8, desc: 'Estimates for upgrade redemptions (first class, business, premium).', w: 'Major', tag: 'Reasoning', g: 'Met', hl: true },
                { n: 9, desc: 'Recommends against non-flight redemptions (lower value).', w: 'Minor', tag: 'Reasoning', g: 'Met', hl: false },
              ] as const).map((row) => {
                const bgClass = row.hl ? 'bg-amber-500/5' : '';
                const wColor = row.w === 'Critical' ? 'bg-red-500/20 text-red-300' : row.w === 'Major' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-white/50';
                const gColor = row.g === 'Not Met' ? 'text-red-400' : 'text-emerald-400';
                return (
                  <tr key={row.n} className={`border-b border-white/5 ${bgClass}`}>
                    <td className="px-2.5 py-2 text-white/50">{row.n}</td>
                    <td className="px-2.5 py-2 text-white/70">{row.desc}</td>
                    <td className="px-2.5 py-2"><span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${wColor}`}>{row.w}</span></td>
                    <td className="px-2.5 py-2 text-white/50">{row.tag}</td>
                    <td className={`px-2.5 py-2 font-semibold ${gColor}`}>{row.g}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3 border-amber-500/20 bg-amber-500/5">
            <p className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider mb-1.5">Key Takeaway</p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Criteria #4-5, #7-8 are Major criteria <span className="text-white/70 font-medium">beyond what the user asked</span> — like best-value strategies and redemption estimates. In traditional tasks these wouldn't qualify as Major.
            </p>
          </div>
          <div className="glass rounded-xl p-3 border-accent/20 bg-accent/5">
            <p className="text-[10px] font-semibold text-accent-light uppercase tracking-wider mb-1.5">Score Breakdown</p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Model 1 scores <span className="text-white/70 font-medium">21/29 = 72%</span>. This is <span className="text-white/70 font-medium">below 75%</span>, so it passes LMArena — but would fail regular tasks (above 70%).
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ─── Slide 7: Key Differences Summary ───
  {
    title: 'Key Differences Summary',
    subtitle: 'Regular tasks vs. LMArena tasks at a glance',
    content: (
      <div className="space-y-4">
        <div className="glass-subtle rounded-xl p-4 overflow-x-auto">
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 pb-2 mb-1 border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Aspect</span>
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Regular Tasks</span>
            <span className="text-[10px] font-semibold text-accent-light uppercase tracking-wider">LMArena Tasks</span>
          </div>
          <ComparisonRow label="Model responses" old="Evaluate 1 model" new="Compare 2 models side by side" />
          <ComparisonRow label="Prompt focus" old="Any domain (per expertise)" new="Consumer-focused everyday use cases" />
          <ComparisonRow label="Prompt style" old="Targets 30-70% score range" new="Simple, natural, open-ended" />
          <ComparisonRow label="Rubric approach" old="Objective grading" new="Preference-based + objective" />
          <ComparisonRow label="Acceptable score" old="30-70%" new="Less than 75%" />
          <ComparisonRow label="Major criteria" old="Only explicitly asked elements" new="Can include helpful extras" />
          <ComparisonRow label="Task type" old="Various domain types" new="All LLM Power User" />
          <ComparisonRow label="Dashboard" old="Unclaimed Tasks" new="LMArena Unclaimed Tasks" />
          <ComparisonRow label="Preference step" old="None" new="Must pick Model 2 or Neither" />
        </div>

        <div className="glass rounded-xl p-4 border-emerald-500/20 bg-emerald-500/5">
          <p className="text-xs font-semibold text-emerald-300 mb-1">What stays the same</p>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Same Mercor Studio platform, same rubric structure (Critical 5pts / Major 3pts / Minor 1pt), same golden scaffolding process, same review workflow, same project (Snowman).
          </p>
        </div>
      </div>
    ),
  },
];

export default function LearnModule({ onContinue, onBack }: LearnModuleProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const isLast = slideIndex === slides.length - 1;

  const handleNext = useCallback(() => {
    if (isLast) {
      onContinue();
    } else {
      setSlideIndex((i) => i + 1);
    }
  }, [isLast, onContinue]);

  const handlePrev = useCallback(() => {
    if (slideIndex === 0) {
      onBack();
    } else {
      setSlideIndex((i) => i - 1);
    }
  }, [slideIndex, onBack]);

  useEnterKey(handleNext);

  const slide = slides[slideIndex];

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-16 pb-12">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-white/40 font-medium">Learning Module</span>
          <span className="text-[11px] text-white/30 font-mono">{slideIndex + 1} / {slides.length}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-purple-400"
            animate={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              {slide.subtitle && (
                <p className="text-[11px] font-medium text-accent-light uppercase tracking-wider mb-1">{slide.subtitle}</p>
              )}
              <h2 className="text-2xl font-bold text-white tracking-tight">{slide.title}</h2>
            </div>

            <div className="glass rounded-2xl p-6">
              {slide.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-2xl flex items-center justify-between mt-8">
        <button
          onClick={handlePrev}
          className="px-6 py-3 rounded-2xl text-sm font-semibold bg-white/8 text-white/60 border border-white/10 hover:bg-white/12 hover:text-white/80 transition-all duration-300"
        >
          Back
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === slideIndex ? 'bg-accent w-6' : i < slideIndex ? 'bg-accent/40' : 'bg-white/15'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl text-sm font-semibold bg-gradient-to-r from-accent to-purple-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {isLast ? 'Start Assessment' : 'Next'}
        </button>
      </div>

      <p className="mt-4 text-[11px] text-white/20 text-center">Press Enter to continue</p>
    </div>
  );
}
