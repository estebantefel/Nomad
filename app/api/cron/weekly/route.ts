import { NextResponse } from 'next/server';
import { runTopPicksAgent } from '@/lib/agents/top-picks-agent';

export const maxDuration = 120;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const saved = await runTopPicksAgent();
  return NextResponse.json({ ok: true, ran_at: new Date().toISOString(), saved });
}
