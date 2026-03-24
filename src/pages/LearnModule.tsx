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

function StepCard({ number, title, description, image }: { number: number; title: string; description: string; image?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3 items-start">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/20 text-accent-light text-sm font-bold shrink-0">
          {number}
        </span>
        <div>
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

const slides: Slide[] = [
  {
    title: 'What are LMArena Tasks?',
    subtitle: 'A new type of task in Project Snowman',
    content: (
      <div className="space-y-4">
        <div className="glass-subtle rounded-xl p-4">
          <p className="text-sm text-white/70 leading-relaxed mb-3">
            LMArena tasks are a new task type where you <strong className="text-white/90">compare two AI model responses</strong> side by side and evaluate which one is better. This is fundamentally different from regular tasks where you evaluate a single model's output.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            The goal is to <strong className="text-white/90">evaluate the client model (Model 1)</strong> by comparing it against a competing model (Model 2), building a rubric that captures where Model 1 falls short.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-3">Key Facts</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5 shrink-0">&#x2022;</span>
              All LMArena tasks are classified as <strong className="text-white/80">LLM Power User</strong> tasks
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5 shrink-0">&#x2022;</span>
              Tasks are found in dedicated <strong className="text-white/80">LMArena dashboards</strong>, separate from regular task queues
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5 shrink-0">&#x2022;</span>
              After claiming, they appear in your regular Writing/Reviewing dashboards
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5 shrink-0">&#x2022;</span>
              The Studio UI labels models as <strong className="text-white/80">Model 1</strong> and <strong className="text-white/80">Model 2</strong> (examples may also use Model A/B — these are the same thing: Model 1 = Model A = client)
            </li>
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
          description="In the Annotation tab, select your preferred model and confidence level. Write a 20-100 word justification explaining why. You can only proceed if you select Model 2 or Neither — if Model 1 is better, you cannot continue with that task."
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
          description="Ensure all submission requirements are met: preference is Model 2 or Neither, justification is 20-100 words, at least 3 criteria with at least 1 Critical and 1 Major, rubric score is within the acceptable range, and autograder has been run."
          image="/images/submission-requirements.png"
        />
      </div>
    ),
  },
  {
    title: 'Prompt Guidelines',
    subtitle: 'What makes a good LMArena prompt',
    content: (
      <div className="space-y-4">
        <div className="glass-subtle rounded-xl p-4">
          <p className="text-sm text-white/70 leading-relaxed">
            LMArena prompts should reflect <strong className="text-white/90">realistic consumer requests</strong> — the kind of thing an average person would naturally ask an AI assistant for help with. The simpler the better: some of the best prompts are 3-5 sentences long, under 100 words, with fewer than 5 constraints.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-3">Key Principles</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
              <span><strong className="text-white/80">Focus on everyday use cases</strong> — mimic real-world situations where someone would turn to an AI. Suggested areas include home & household, lifestyle, and personal finance, but not limited to these.</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
              <span><strong className="text-white/80">Keep them simple and open-ended</strong> — avoid overly rigid constraints, artificial formatting requirements, or excessive instructions</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
              <span><strong className="text-white/80">Use natural phrasing</strong> — should sound like something a person would actually type into ChatGPT or another AI assistant</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-subtle rounded-xl p-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Good Examples</p>
            <ul className="space-y-1.5 text-[11px] text-white/60">
              <li>"Is it worth buying noise-cancelling headphones for studying?"</li>
              <li>"What's the difference between ceramic and stainless steel cookware?"</li>
              <li>"How do I choose a good mattress?"</li>
              <li>"What does SPF actually mean in sunscreen?"</li>
            </ul>
          </div>
          <div className="glass-subtle rounded-xl p-3">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Avoid</p>
            <ul className="space-y-1.5 text-[11px] text-white/60">
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
  {
    title: 'Rubric Changes',
    subtitle: 'How LMArena rubrics differ from regular rubrics',
    content: (
      <div className="space-y-4">
        <div className="glass-subtle rounded-xl p-4">
          <p className="text-sm text-white/70 leading-relaxed">
            LMArena rubrics are <strong className="text-white/90">more preference-based</strong> than regular rubrics. The guiding principle is that rubrics can capture <strong className="text-white/90">personal perspectives and expertise</strong>, reflecting what makes a response genuinely <em>helpful</em> — not just checking for correct reasoning.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-3">What Changed</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-amber-400 mt-0.5 font-bold">!</span>
              <div>
                <strong className="text-white/80">Rubric score range:</strong> The acceptable score is now anything <strong className="text-white/80">less than 75%</strong> (regular tasks require 30-70%). Even though a score below 30% is technically allowed, try to include criteria the client model <em>does</em> meet so the score isn't 0%.
              </div>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-amber-400 mt-0.5 font-bold">!</span>
              <div>
                <strong className="text-white/80">Major criteria expanded:</strong> Can now include elements that <strong className="text-white/80">aren't explicitly asked for</strong> in the prompt but would make the response much more useful or helpful. This is the biggest change.
              </div>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-amber-400 mt-0.5 font-bold">!</span>
              <div>
                <strong className="text-white/80">Reflect the preferred response:</strong> The rubric should capture elements from the non-client model's response that improved quality — what made it better.
              </div>
            </li>
          </ul>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">What Stayed the Same</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
              <span><strong className="text-white/80">Critical & Minor weights:</strong> Same definitions as regular tasks</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
              <span><strong className="text-white/80">Grade against the client model:</strong> All criteria are scored against Model 1's response</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
              <span><strong className="text-white/80">Rubric structure:</strong> Same weight categories (Critical 5pts, Major 3pts, Minor 1pt), same tags (Knowledge, Reasoning, Style, Final Answer), same Objective/Subjective classification</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
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
            <ul className="space-y-1.5 text-[11px] text-white/50 leading-relaxed">
              <li>Says it "depends on your travel goals"</li>
              <li>Lists flight options, seat upgrades, and merchandise</li>
              <li>Warns that gift cards offer lower value per mile</li>
              <li><strong className="text-white/70">Never directly answers: is 127,073 miles good or bad?</strong></li>
            </ul>
          </div>
          <div className="glass-subtle rounded-xl p-4">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Model 2 / B (Preferred)</p>
            <ul className="space-y-1.5 text-[11px] text-white/50 leading-relaxed">
              <li><strong className="text-white/70">Directly answers: "This is very good"</strong></li>
              <li>Puts it in perspective with average ticket costs</li>
              <li>Explains options: domestic trips, international economy, or premium cabin upgrades</li>
              <li>Addresses the user's question first, then adds detail</li>
            </ul>
          </div>
        </div>

        <div className="glass rounded-xl p-4 border-blue-500/20 bg-blue-500/5">
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" className="mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-blue-300 mb-1">Preference: Model 2 (Model B)</p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                <strong className="text-white/70">Justification:</strong> Response B not only provides information on what can be redeemed but also on how to get the best deal. It more clearly answers the direct question before offering nice-to-have context. Its formatting and order of information are easier to understand.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Example: The Rubric',
    subtitle: 'Delta SkyMiles — notice how criteria go beyond the prompt',
    content: (
      <div className="space-y-4">
        <p className="text-xs text-white/50 leading-relaxed">
          All 9 criteria are graded against <strong className="text-white/70">Model 1</strong> (the client). Highlighted rows are <strong className="text-amber-300">Major criteria that go beyond what the user asked</strong> — this is what makes LMArena rubrics different.
        </p>

        <div className="glass-subtle rounded-xl overflow-x-auto">
          <div className="grid grid-cols-[2rem_1fr_4.5rem_3rem_4.5rem] gap-x-2 gap-y-0 text-[10px] min-w-[500px]">
            {/* Header */}
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">#</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Description</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Weight</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Type</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Grade</div>

            {/* Row 1 - Critical, Not Met */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">1</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">States that 127,073 Delta SkyMiles is good.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">Critical</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-red-400 font-semibold">Not Met</span></div>

            {/* Row 2 - Critical, Fully Met */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">2</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">States miles can be redeemed for flights.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">Critical</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-emerald-400 font-semibold">Met</span></div>

            {/* Row 3 - Critical, Fully Met */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">3</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">States miles can be redeemed for upgrades.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">Critical</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-emerald-400 font-semibold">Met</span></div>

            {/* Row 4 - Major highlight */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">4</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">Miles can be redeemed for non-flight options (merchandise, hotels, car rentals).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-emerald-400 font-semibold">Met</span></div>

            {/* Row 5 - Major highlight, Not Met */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">5</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">How to get best value (off-peak dates, booking early, partner airlines).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-red-400 font-semibold">Not Met</span></div>

            {/* Row 6 - Minor */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">6</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">Presents results in clear, organized format (table/bullets).</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-semibold">Minor</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Subj</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-emerald-400 font-semibold">Met</span></div>

            {/* Row 7 - Major highlight */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">7</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">Estimates for flight redemptions (domestic, international).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-emerald-400 font-semibold">Met</span></div>

            {/* Row 8 - Major highlight */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">8</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">Estimates for upgrade redemptions (first class, business, premium).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Obj</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-emerald-400 font-semibold">Met</span></div>

            {/* Row 9 - Minor */}
            <div className="px-3 py-2.5 text-white/50">9</div>
            <div className="px-3 py-2.5 text-white/70">Recommends against non-flight redemptions (lower value).</div>
            <div className="px-3 py-2.5"><span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-semibold">Minor</span></div>
            <div className="px-3 py-2.5 text-white/50">Obj</div>
            <div className="px-3 py-2.5"><span className="text-emerald-400 font-semibold">Met</span></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3 border-amber-500/20 bg-amber-500/5">
            <p className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider mb-1.5">Key Takeaway</p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Criteria #4-5, #7-8 are <strong className="text-white/70">Major criteria beyond what the user asked</strong> — like best-value strategies and specific redemption estimates. In traditional tasks these wouldn't qualify as Major. In LMArena, they reflect what makes a response genuinely more helpful.
            </p>
          </div>
          <div className="glass rounded-xl p-3 border-accent/20 bg-accent/5">
            <p className="text-[10px] font-semibold text-accent-light uppercase tracking-wider mb-1.5">Score Breakdown</p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Model 1 scores <strong className="text-white/70">21/29 = 72%</strong> (3 Critical at 5pts, 5 Major at 3pts, 2 Minor at 1pt). This is <strong className="text-white/70">below 75%, so it passes</strong> under LMArena rules — but would <em>fail</em> under the regular 30-70% range since it's above 70%.
            </p>
          </div>
        </div>
      </div>
    ),
  },
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
          <ComparisonRow label="Prompt style" old="Designed to cause 30-70% failure" new="Simple, natural, open-ended" />
          <ComparisonRow label="Rubric approach" old="Objective grading" new="Preference-based + objective" />
          <ComparisonRow label="Acceptable score" old="30-70%" new="Less than 75%" />
          <ComparisonRow label="Major criteria" old="Only explicitly asked elements" new="Can include helpful extras" />
          <ComparisonRow label="Task type" old="Various domain types" new="All LLM Power User" />
          <ComparisonRow label="Dashboard" old="Unclaimed Tasks" new="LMArena Unclaimed Tasks" />
          <ComparisonRow label="Preference step" old="None" new="Must pick Model 2 or Neither" />
        </div>

        <div className="glass rounded-xl p-4 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="mt-0.5 shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-emerald-300 mb-1">What stays the same</p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Same Mercor Studio platform, same rubric structure (Critical 5pts / Major 3pts / Minor 1pt), same golden scaffolding process, same review workflow, same project (Snowman).
              </p>
            </div>
          </div>
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
