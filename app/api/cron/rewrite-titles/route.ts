import { NextResponse } from 'next/server';
import { runTitleRewriteAgent } from '@/lib/agents/title-rewrite-agent';

export const maxDuration = 300;

export async function GET() {
  const { rewritten, errors } = await runTitleRewriteAgent();
  return NextResponse.json({ ok: true, ran_at: new Date().toISOString(), rewritten, errors });
}
