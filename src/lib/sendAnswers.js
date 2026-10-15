import { NOTIFY_EMAIL } from '../config'

// Sends the quiz answers to NOTIFY_EMAIL using FormSubmit (https://formsubmit.co),
// a free form-to-email service that works from a static site (no backend needed).
// NOTE: the very first submission triggers an "Activate Form" email to NOTIFY_EMAIL.
// Click the activation link once; after that all answers arrive in the inbox.
//
// Email layout (one block per question, question on top, answer below):
//   1. <question>
//   Jibu: <answer>
export async function sendAnswers(answers) {
  const message = answers
    .map((a, n) => {
      const reply = [a.choice, a.written && `Aliandika: ${a.written}`].filter(Boolean).join('\n')
      return `${n + 1}. ${a.question}\nJibu: ${reply}`
    })
    .join('\n\n')

  const body = {
    _subject: '💌 Majibu ya Asia (Mama Riah) — Maswali ya Moyoni',
    _template: 'basic',
    _captcha: 'false',
    Muda: new Date().toLocaleString('sw-TZ', { timeZone: 'Africa/Dar_es_Salaam' }),
    Majibu: '\n\n' + message,
  }

  const res = await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === 'false' || data.success === false) {
    throw new Error(data.message || 'Send failed')
  }
}
