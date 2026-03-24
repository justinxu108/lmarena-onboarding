import { GOOGLE_SCRIPT_URL } from './config';

export async function checkEmailUsed(email: string): Promise<{ exists: boolean }> {
  if (!GOOGLE_SCRIPT_URL) return { exists: false };
  try {
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=checkEmail&email=${encodeURIComponent(email)}`);
    const data = await res.json();
    return { exists: data.exists === true };
  } catch {
    return { exists: false };
  }
}

export async function submitResults(payload: {
  email: string;
  passed: boolean;
  score: number;
  totalQuestions: number;
  answers: unknown;
  elapsedSeconds?: number;
}): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) return;
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'submit', ...payload, timestamp: new Date().toISOString() }),
    });
  } catch {
    // fail silently
  }
}
