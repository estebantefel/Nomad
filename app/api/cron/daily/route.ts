import { NextResponse } from 'next/server';
import { runCategoryAgent } from '@/lib/agents/category-agent';
import type { ExperienceCategory } from '@/types/experience';

export const maxDuration = 300;

const CATEGORIES: ExperienceCategory[] = [
  'outdoors', 'mind', 'learning', 'creative',
  'social', 'food', 'lifestyle', 'sports',
];

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await Promise.allSettled(
    CATEGORIES.map(async (category) => {
      const saved = await runCategoryAgent(category);
      return { category, saved };
    })
  );

  const summary = results.map((r, i) =>
    r.status === 'fulfilled'
      ? { category: CATEGORIES[i], saved: r.value.saved }
      : { category: CATEGORIES[i], error: (r.reason as Error).message }
  );

  return NextResponse.json({ ok: true, ran_at: new Date().toISOString(), summary });
}
