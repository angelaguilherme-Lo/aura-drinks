// app/api/assistant/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { buildAuraPrompt } from '../../../lib/ai/build-aura-prompt';
import { auraDemoCatalog } from '../../../lib/ai/aura-demo-catalog';
import {
  AuraAssistantResultSchema,
  auraAssistantResultJsonSchema,
} from '../../../lib/ai/aura-response-schema';

let client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const userMessage = String(body.message ?? '');

  const { instructions, input } = buildAuraPrompt({
    userMessage,
    catalog: auraDemoCatalog,
  });

  let  response = await client.responses.create({
    model: 'gpt-5',
    instructions,
    input,
    text: {
      format: {
        type: 'json_schema',
        ...auraAssistantResultJsonSchema,
      },
    },
  });

  const rawText = response.output_text;
  const parsed = AuraAssistantResultSchema.parse(JSON.parse(rawText));

  return NextResponse.json(parsed);
}
