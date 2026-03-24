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
            The goal is to <strong className="text-white/90">capture and compare rubrics of Model 1</strong> (the client model) against a competing model, helping identify where the client model falls short.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-3">Key Facts</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5">&#x2022;</span>
              All LMArena tasks are classified as <strong className="text-white/80">LLM Power User</strong> tasks
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5">&#x2022;</span>
              Tasks are found in dedicated <strong className="text-white/80">LMArena dashboards</strong>, separate from regular task queues
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-accent-light mt-0.5">&#x2022;</span>
              After claiming, they appear in your regular Writing/Reviewing dashboards
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
      <div className="space-y-3">
        <StepCard
          number={1}
          title="Submit Your Prompt & Compare Responses"
          description="Enter your prompt in the Conversation tab. Two model responses appear side by side (Model 1 and Model 2). Read both carefully to determine which is stronger."
          image="/images/conversation-tab.png"
        />
        <StepCard
          number={2}
          title="Record Your Preference"
          description="In the Annotation tab, select your preferred model and confidence level (High/Medium/Low). Write a 20-100 word justification. You can only proceed if you select Model 2 or Neither."
          image="/images/model-preference.png"
        />
        <StepCard
          number={3}
          title="Create the Golden Scaffolding"
          description="Write bullet points outlining what an ideal response should include: core requirements, quality factors, and strong elements from the preferred response that the client model missed."
          image="/images/golden-scaffolding.png"
        />
        <StepCard
          number={4}
          title="Generate & Review the Rubric"
          description="Click 'Generate Rubric' to auto-create criteria from your scaffolding. Review descriptions, verify tags (weight, category, type), and grade each criterion against the client model's response."
          image="/images/rubric-table.png"
        />
        <StepCard
          number={5}
          title="Submit the Task"
          description="Ensure all submission requirements are met (completed turn, preference selected, at least 3 criteria, score between acceptable range, etc.), then submit for review."
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
          <p className="text-sm text-white/70 leading-relaxed mb-3">
            LMArena prompts should reflect <strong className="text-white/90">realistic consumer requests</strong> — the kind of thing an average person would naturally ask an AI assistant for help with.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-3">Key Principles</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5">&#x2713;</span>
              Suggested focus areas include <strong className="text-white/80">home & household, lifestyle, and (simple) personal finance</strong>, but not limited to these
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5">&#x2713;</span>
              Keep them <strong className="text-white/80">simple and open-ended</strong> — avoid rigid constraints
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5">&#x2713;</span>
              Use <strong className="text-white/80">natural phrasing</strong> — should sound like a real person asking
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5">&#x2713;</span>
              Best prompts are <strong className="text-white/80">3-5 sentences, under 100 words, fewer than 5 constraints</strong>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-subtle rounded-xl p-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Good Examples</p>
            <ul className="space-y-1.5 text-[11px] text-white/60">
              <li>"What's the difference between ceramic and stainless steel cookware?"</li>
              <li>"How can I stay productive when working from home?"</li>
              <li>"What should I pack for a 3-day hiking trip?"</li>
            </ul>
          </div>
          <div className="glass-subtle rounded-xl p-3">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Avoid</p>
            <ul className="space-y-1.5 text-[11px] text-white/60">
              <li>Overly technical or domain-specific prompts</li>
              <li>Prompts with rigid formatting requirements</li>
              <li>Prompts that require specialized knowledge</li>
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
            LMArena rubrics are <strong className="text-white/90">more preference-based</strong> than regular rubrics. They capture personal perspectives and expertise, reflecting what makes a response <em>helpful</em> in addition to checking for correct reasoning.
          </p>
        </div>

        <div className="glass-subtle rounded-xl p-4">
          <p className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-3">Key Changes</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-amber-400 mt-0.5 font-bold">!</span>
              <div>
                <strong className="text-white/80">Acceptable failure range:</strong> Now anything less than 75% (previously 30-70%). Still try to include criteria that boost the score above 0%.
              </div>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-amber-400 mt-0.5 font-bold">!</span>
              <div>
                <strong className="text-white/80">Major criteria expanded:</strong> Can now include elements that aren't explicitly asked for but would make the response much more useful or helpful.
              </div>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5">&#x2713;</span>
              <div>
                <strong className="text-white/80">Critical & Minor:</strong> Same definitions as regular tasks (unchanged).
              </div>
            </li>
            <li className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-emerald-400 mt-0.5">&#x2713;</span>
              <div>
                <strong className="text-white/80">Grade against client model:</strong> All criteria are graded against Model 1's response (the client model being evaluated).
              </div>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Example Walkthrough: The Prompt & Responses',
    subtitle: 'Delta SkyMiles — a real LMArena example',
    content: (
      <div className="space-y-4">
        <div className="glass-subtle rounded-xl p-4">
          <p className="text-[10px] font-semibold text-accent-light uppercase tracking-wider mb-2">Prompt</p>
          <p className="text-sm text-white/90 leading-relaxed italic">
            "I have 127,073 Delta miles available, is this good, or bad and what could I get for it?"
          </p>
          <p className="text-[11px] text-white/40 mt-2">
            Notice: this is a natural, consumer-focused question — exactly the style LMArena tasks call for. Simple, conversational, and something a real person would ask.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-subtle rounded-xl p-4">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Model A (Client)</p>
            <ul className="space-y-1.5 text-[11px] text-white/50 leading-relaxed">
              <li>Says it "depends on your travel goals"</li>
              <li>Lists domestic flights (25-30k miles), international (60-80k), Asia (120k+)</li>
              <li>Covers seat upgrades (10-20k domestic, 30-60k international)</li>
              <li>Mentions merchandise/gift cards but warns of lower value</li>
              <li>Never directly answers: <strong className="text-white/70">is 127,073 miles good or bad?</strong></li>
            </ul>
          </div>
          <div className="glass-subtle rounded-xl p-4">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Model B (Preferred)</p>
            <ul className="space-y-1.5 text-[11px] text-white/50 leading-relaxed">
              <li><strong className="text-white/70">Directly answers: "This is very good"</strong></li>
              <li>Puts it in perspective with average ticket costs</li>
              <li>Explains what you can get: multiple domestic trips, an international economy ticket, or a premium cabin upgrade</li>
              <li>Concise and clearly organized</li>
              <li>Addresses the user's actual question first, then provides detail</li>
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
              <p className="text-xs font-semibold text-blue-300 mb-1">Preference: Model B</p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                <strong className="text-white/70">Justification:</strong> Response B not only provides information on what can be redeemed for the miles accumulated but also on how to get the best deal. Response B also more clearly answers the direct question before offering the nice-to-have context. Its formatting and order of information are also easier to understand.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Example Walkthrough: The Rubric',
    subtitle: 'Delta SkyMiles — how the rubric criteria differ from traditional tasks',
    content: (
      <div className="space-y-4">
        <p className="text-xs text-white/50 leading-relaxed">
          Below is the rubric for the Delta SkyMiles example. Notice how criteria include both objective requirements <em>and</em> preference-based elements that weren't explicitly asked for but make the response more helpful. All criteria are graded against <strong className="text-white/70">Model A</strong> (the client model).
        </p>

        <div className="glass-subtle rounded-xl overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-3 gap-y-0 text-[10px]">
            {/* Header */}
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">#</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Description</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Weight</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Type</div>
            <div className="px-3 py-2 font-semibold text-white/40 uppercase tracking-wider border-b border-white/10 bg-white/5">Grade</div>

            {/* Row 1 - Critical */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">1</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">States that accumulating 127,073 Delta SkyMiles miles is good.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">Critical</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-red-400 font-semibold">Not Met</span></div>

            {/* Row 2 */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">2</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">States that miles can be redeemed for flights.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">Critical</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>

            {/* Row 3 */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">3</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">States that miles can be redeemed for upgrades.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">Critical</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>

            {/* Row 4 - Major, not asked for */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">4</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">States that miles can be redeemed for non-flight options, such as merchandise, hotels, or car rentals.</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>

            {/* Row 5 - Major, not asked for */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">5</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">Provides information on how to get the best value for your miles (off-peak dates, booking early, partner airlines).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-red-400 font-semibold">Not Met</span></div>

            {/* Row 6 - Minor */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">6</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5">Presents results in a clear, organized manner, such as a table or bullet points.</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-semibold">Minor</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5">Subjective</div>
            <div className="px-3 py-2.5 border-b border-white/5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>

            {/* Row 7 */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">7</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">Provides estimates for what flights can be redeemed for (domestic, international).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>

            {/* Row 8 */}
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">8</div>
            <div className="px-3 py-2.5 text-white/70 border-b border-white/5 bg-amber-500/5">Provides estimates for upgrades (first class, business class, premium cabin).</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Major</span></div>
            <div className="px-3 py-2.5 text-white/50 border-b border-white/5 bg-amber-500/5">Objective</div>
            <div className="px-3 py-2.5 border-b border-white/5 bg-amber-500/5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>

            {/* Row 9 */}
            <div className="px-3 py-2.5 text-white/50">9</div>
            <div className="px-3 py-2.5 text-white/70">Recommends against redeeming miles for non-flight options since these are typically lower value.</div>
            <div className="px-3 py-2.5"><span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-semibold">Minor</span></div>
            <div className="px-3 py-2.5 text-white/50">Objective</div>
            <div className="px-3 py-2.5"><span className="text-emerald-400 font-semibold">Fully Met</span></div>
          </div>
        </div>

        <div className="glass rounded-xl p-4 border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" className="mt-0.5 shrink-0">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-amber-300 mb-1">Notice the highlighted rows</p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Criteria #4, #5, #7, #8 are <strong className="text-white/70">Major</strong> criteria that go <strong className="text-white/70">beyond what the user explicitly asked</strong> — like recommending best-value strategies or providing specific redemption estimates. In a <em>traditional</em> task, these would not qualify as Major. In LMArena tasks, they capture what makes a response genuinely <em>more helpful</em>, reflecting personal expertise and preference.
              </p>
            </div>
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
          <ComparisonRow label="Prompt focus" old="Any domain (per your expertise)" new="Consumer-focused (e.g. home, lifestyle, finance)" />
          <ComparisonRow label="Prompt style" old="Designed to cause model failure" new="Simple, natural, open-ended" />
          <ComparisonRow label="Rubric approach" old="Objective grading" new="Preference-based + objective" />
          <ComparisonRow label="Failure range" old="30-70%" new="Less than 75%" />
          <ComparisonRow label="Major criteria" old="Explicitly asked elements" new="Can include helpful extras" />
          <ComparisonRow label="Task type" old="Various" new="All LLM Power User" />
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
                Same Mercor Studio platform, same rubric structure (Critical/Major/Minor), same golden scaffolding process, same review workflow, same project (Snowman).
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
