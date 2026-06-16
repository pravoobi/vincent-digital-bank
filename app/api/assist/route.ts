import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { readFileSync } from "fs";
import { join } from "path";
import { isAiEnabled } from "../../../lib/config";

const POLICY = readFileSync(
  join(process.cwd(), "data/onboarding-policies.md"),
  "utf-8"
);

const SYSTEM_PROMPT = `You are an onboarding assistant for Vincent Bank, a demo digital banking application.

RULES (strictly follow these):
1. SCOPE: Only answer questions about this specific onboarding process. Politely redirect any off-topic questions.
2. POLICY GROUNDING: Only answer policy questions using the provided knowledge base below. If the answer is not there, say "I don't have that information — please contact support."
3. NO FABRICATION: Never invent policy rules, fees, interest rates, or regulatory information.
4. HONESTY: If uncertain, acknowledge uncertainty rather than guessing.
5. CONCISE: Keep responses brief and helpful. Use plain language — no jargon.

KNOWLEDGE BASE:
${POLICY}`;

const STEP_CONTEXT: Record<number, string> = {
  1: "The user is on Step 1: Personal Details (name, date of birth, email).",
  2: "The user is on Step 2: Address (house number, street, city, state, zip code).",
  3: "The user is on Step 3: ID Document upload and field verification.",
  4: "The user is on Step 4: Review & Submit — reviewing all entered information.",
};

// Simple in-memory rate limiter: max 20 requests per IP per minute
const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  if (!isAiEnabled) {
    return new Response("AI features are disabled.", { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return new Response("Rate limit exceeded. Please wait a moment.", {
      status: 429,
    });
  }

  const { messages, step } = await req.json();
  const stepCtx = STEP_CONTEXT[step] ?? "";

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: SYSTEM_PROMPT,
    messages: [
      { role: "user", content: stepCtx },
      {
        role: "assistant",
        content: "Understood. I'm ready to help with this step.",
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
