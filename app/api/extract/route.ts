import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { isAiEnabled } from "../../../lib/config";

const extractionSchema = z.object({
  idType: z
    .enum(["passport", "drivers_license", "state_id"])
    .nullable()
    .describe("Type of ID document"),
  idNumber: z.string().nullable().describe("The ID/document number"),
  firstName: z.string().nullable().describe("First name on the document"),
  lastName: z.string().nullable().describe("Last name on the document"),
  dob: z
    .string()
    .nullable()
    .describe("Date of birth in YYYY-MM-DD format, or null if unreadable"),
  reasons: z
    .record(z.string(), z.string())
    .describe(
      "For each extracted field, a brief explanation of how it was read from the document"
    ),
});

export async function POST(req: Request) {
  if (!isAiEnabled) {
    return new Response("AI features are disabled.", { status: 503 });
  }

  const { imageBase64, mimeType } = await req.json();

  if (!imageBase64 || !mimeType) {
    return new Response("Missing imageBase64 or mimeType", { status: 400 });
  }

  // Strip data URL prefix if present
  const base64Data = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-6"),
    schema: extractionSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: base64Data,
            mimeType: mimeType as "image/jpeg" | "image/png" | "image/webp",
          },
          {
            type: "text",
            text: `Extract identity information from this ID document image.
Rules:
- Only return values that are clearly readable in the image.
- If a field is unreadable or not present, return null — never guess or fabricate values.
- For dob, convert to YYYY-MM-DD format.
- For idType, classify as 'passport', 'drivers_license', or 'state_id' based on visual cues.
- In reasons, explain briefly how each non-null field was read (e.g. "Printed in top-right corner").`,
          },
        ],
      },
    ],
  });

  return Response.json(object);
}
