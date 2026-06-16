# Project Spec — AI-Assisted Digital Bank Onboarding

**Working name:** Vincent Onboard AI (extends your existing Vincent Digital Bank project)
**Type:** Portfolio / demo project
**Status:** Spec / not yet built

---

## 1. One-liner

An accessible, multi-step digital-banking onboarding flow with an embedded AI assistant that guides users, extracts data from a (mock) ID document, explains validation errors in plain language, and shows _why_ it made each suggestion — built in Next.js + TypeScript with a strict, compliance-aware guardrail layer.

## 2. Why this project (what it proves to a hiring manager)

This is engineered to map 1:1 onto your positioning, so in an interview you can point at one repo and tick every box:

- **Fintech onboarding** — your signature achievement at Marcus, now publicly demonstrable.
- **AI-application engineering** — LLM integration, streaming, vision/extraction, tool use, evals/guardrails. The skill the market is weighting heavily right now.
- **Design systems** — built on your `practics/ui` library, so it cross-promotes that repo.
- **Accessibility** — WCAG 2.1 AA baked in, your differentiator.
- **Compliance / audit mindset** — the "explainability + guardrails + human-review" layer is the thing most AI demos _don't_ have, and it's exactly your edge.
- **Testing** — Jest + Cypress, backing your coverage claim with a visible badge.

> **Framing rule:** This is a _prototype using synthetic data only_. No real KYC, no real PII, dummy/sample ID documents. State this clearly in the UI and README. It protects you and reinforces the compliance-aware brand.

## 3. Scope — MVP vs. stretch

Build the MVP first and ship it. Treat stretch items as optional.

**MVP (the thing you demo):**

1. 4-step onboarding wizard: Personal details → Address → ID document upload → Review & submit.
2. AI helper panel available on every step (contextual Q&A, streaming).
3. AI document extraction: upload a sample ID image → assistant pre-fills name/DOB/ID number → user confirms or edits.
4. Plain-language validation explanations on field errors.
5. "Why?" explainability popover on every AI suggestion.
6. Full keyboard + screen-reader support, WCAG 2.1 AA.

**Stretch (only if you have time):**

- Confidence scoring on extracted fields; low-confidence fields flagged "needs review."
- A simple admin/audit view showing the AI interaction log for a session.
- Multi-language support (you have bilingual project history — a nice callback).
- Resume-an-application (persisted draft state).

## 4. Core user flow

1. Landing → "Start application." Banner clearly states: _demo, synthetic data only._
2. **Step 1 – Personal details.** Name, DOB, email. AI helper available ("what format should DOB be in?").
3. **Step 2 – Address.** AI helper answers policy-style questions ("what counts as proof of address?") grounded in a small local knowledge file.
4. **Step 3 – ID upload.** User uploads a _sample_ ID image. The assistant extracts fields and pre-fills them. Each extracted field shows a "Why?" affordance and an edit control. Low-confidence fields (stretch) are visually flagged.
5. **Step 4 – Review.** Summary of all data. Validation runs; any errors get a plain-language AI explanation of how to fix them. Submit → success screen (no data leaves the demo).

## 5. AI features (each with what it demonstrates)

| Feature                     | What it does                                                                             | What it signals                                |
| --------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Contextual help (streaming) | Answers onboarding questions per step, grounded in a local policy file (lightweight RAG) | LLM integration, streaming UX, grounding       |
| Document extraction         | Reads a sample ID image, returns structured JSON, pre-fills the form                     | Multimodal/vision, structured output, tool use |
| Validation explainer        | Turns a failed validation into a human-readable fix                                      | Practical AI + UX judgment                     |
| Explainability ("Why?")     | Shows the basis for each suggestion                                                      | Audit/compliance mindset — your edge           |
| Guardrails                  | Refuses off-topic asks, never invents policy, flags uncertainty                          | Production AI maturity                         |

## 6. Architecture

Keep it simple and secure. **The model API key must never touch the client** — all model calls go through a server route.

```
Browser (Next.js app, React + TS, practics/ui components)
   │  fetch (streaming)
   ▼
Next.js Route Handler  /app/api/assist/route.ts   ← holds the API key (env var)
   │  server-side call
   ▼
LLM provider (via Vercel AI SDK — provider-agnostic)
```

- **Frontend:** Next.js (App Router) + TypeScript, components from `practics/ui`.
- **AI layer:** Vercel AI SDK — gives you React streaming hooks (`useChat` / `useObject`) and a provider-agnostic interface, so you can swap models (Claude, GPT, etc.) without rewrites.
- **Knowledge grounding:** a small local markdown/JSON file of "onboarding policies." No vector DB needed at this scale — pass relevant snippets into the prompt. (You can mention "this would become a real RAG/vector store at production scale" as a talking point.)
- **State:** React state + a reducer for the wizard; optional `localStorage` draft (note: works in a real deploy, not inside sandboxed preview tools).
- **Data:** 100% mock. Provide 2–3 sample ID images in `/public/samples`.

Illustrative streaming route shape (keep keys server-side):

```ts
// app/api/assist/route.ts
import { streamText } from "ai";
import { yourProvider } from "@ai-sdk/...";

export async function POST(req: Request) {
  const { messages, step, context } = await req.json();
  const result = streamText({
    model: yourProvider("model-name"),
    system: ONBOARDING_SYSTEM_PROMPT, // see §7
    messages: [{ role: "system", content: context }, ...messages],
  });
  return result.toDataStreamResponse();
}
```

## 7. Guardrails & the compliance angle (your differentiator — don't skip)

A short system prompt + a few rules are what separate this from a toy:

- **Scope lock:** the assistant only helps with _this onboarding_. Off-topic questions get a polite redirect, not an answer.
- **No invented policy:** it answers policy questions _only_ from the provided knowledge file; if the answer isn't there, it says so and suggests contacting support.
- **Extraction honesty:** never fabricate ID fields; if a field is unreadable, return null and flag it for the user rather than guessing.
- **Human in the loop:** every extracted field is editable and must be user-confirmed before submission — the AI assists, it doesn't decide.
- **Audit trail:** log each AI suggestion + its basis to session state (powers the "Why?" popover and the stretch admin view).

Document these five rules in the README under a "Responsible AI" heading. That section alone will stand out to fintech interviewers.

## 8. Accessibility requirements (WCAG 2.1 AA)

- Full keyboard navigation through the wizard and the AI panel; logical focus order; visible focus rings.
- The streaming AI response region is an ARIA live region so screen readers announce it.
- All form fields properly labelled; errors associated via `aria-describedby`.
- Colour contrast ≥ 4.5:1; never rely on colour alone for error/confidence states.
- Run axe-core (or Lighthouse a11y) and document the score in the README.

## 9. Testing plan (back your coverage claim)

- **Unit (Jest + React Testing Library):** wizard reducer, validation logic, the extraction-response parser.
- **Integration:** mock the AI route and assert the form pre-fills correctly from a fixture extraction response.
- **E2E (Cypress):** full happy path (4 steps → submit) and one error path (failed validation → AI explanation shown).
- Add a **coverage badge** and a **CI badge** (GitHub Actions) to the README.

## 10. Security notes

- API key in an environment variable, used only in the server route. Never `NEXT_PUBLIC_`.
- Rate-limit the assist route (even a simple in-memory limiter) — mention it as a production-awareness signal.
- No real PII; sample images only; a visible "synthetic demo" banner.

## 11. Build milestones

1. **Skeleton** — Next.js + TS app, 4-step wizard with `practics/ui`, mock submit. (No AI yet.)
2. **AI helper** — server route + streaming `useChat` panel grounded in the policy file.
3. **Extraction** — image upload → structured JSON → form pre-fill with confirm/edit.
4. **Explainability + guardrails** — "Why?" popovers, scope lock, human-in-the-loop confirms.
5. **A11y + tests** — keyboard/SR pass, axe score, Jest + Cypress, badges.
6. **Polish** — README (with Responsible AI section), screenshots/GIF, live deploy, link from Featured + Projects.

Ship after milestone 3 if needed; everything after is upside.

## 12. Showcase checklist

- [ ] Live demo deployed (Vercel) and public.
- [ ] README: one-line what+why, GIF, live link, stack, **Responsible AI** section, a11y score, badges.
- [ ] Synthetic-data banner visible in the UI.
- [ ] Added to LinkedIn **Featured** (link the live demo) and **Projects** (with skill tags: React.js, Next.js, TypeScript, AI Integration, Design Systems, Accessibility).
- [ ] Repo pinned on GitHub.

## 13. How to talk about it in interviews

> "I built a digital-bank onboarding flow with an AI assistant that extracts data from ID documents and explains validation errors — but the interesting part is the guardrail layer: it only answers from approved policy, never invents fields, flags low-confidence extractions for human review, and logs the basis for every suggestion. That came straight from working in a zero-defect banking environment — AI in a regulated flow has to be auditable, not just clever."

That answer ties your QA-rooted compliance instinct to modern AI work in one breath — which is the exact narrative your whole profile is built around.
