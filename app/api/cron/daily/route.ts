import { NextResponse } from 'next/server';
import { runCategoryAgent } from '@/lib/agents/category-agent';
import { runTitleRewriteAgent } from '@/lib/agents/title-rewrite-agent';
import type { ExperienceCategory } from '@/types/experience';

export const maxDuration = 300;

const CATEGORIES: ExperienceCategory[] = [
  'outdoors', 'mind', 'learning', 'creative',
  'social', 'food', 'lifestyle', 'sports',
];

export async function GET() {
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

  const { rewritten } = await runTitleRewriteAgent();

  return NextResponse.json({ ok: true, ran_at: new Date().toISOString(), summary, rewritten });
}
