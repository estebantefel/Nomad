import { NextResponse } from 'next/server';
import { runTopPicksAgent } from '@/lib/agents/top-picks-agent';

export const maxDuration = 120;

export async function GET() {
  const saved = await runTopPicksAgent();
  return NextResponse.json({ ok: true, ran_at: new Date().toISOString(), saved });
}
