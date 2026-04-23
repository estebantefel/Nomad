import { searchTavily } from './tavily';
import { createServerClient } from '@/lib/supabase-server';

const TOP_PICKS_QUERIES = [
  'trending events Madrid this week',
  'most popular things to do Madrid right now',
  'viral experiences buzz Madrid',
];

export async function runTopPicksAgent(): Promise<number> {
  const supabase = createServerClient();
  const weekOf = new Date().toISOString().split('T')[0];

  // Clear previous top pick
  await supabase.from('experiences').update({ is_top_pick: false }).eq('is_top_pick', true);

  let best: { title: string; url: string; content: string; score: number; image?: string } | null = null;

  for (const query of TOP_PICKS_QUERIES) {
    try {
      const { results, images } = await searchTavily(query, true);
      if (results.length > 0 && results[0].score > (best?.score ?? 0)) {
        best = { ...results[0], image: images[0] };
      }
    } catch {
      // continue
    }
  }

  if (!best) return 0;

  const { error } = await supabase.from('experiences').insert({
    title: best.title.replace(/\s*[-|].*$/, '').trim().slice(0, 120),
    description: best.content.slice(0, 200).trim(),
    category: 'social',
    image_url: best.image,
    source_url: best.url,
    is_top_pick: true,
    week_of: weekOf,
  });

  return error ? 0 : 1;
}
