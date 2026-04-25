import { createServerClient } from '@/lib/supabase-server';

// Strip platform names, city suffixes, and other noise from scraped titles
const STRIP_SUFFIXES = /\s*[|\-–—]\s*(Eventbrite|Meetup|GetYourGuide|Airbnb|Viator|Civitatis|TripAdvisor|Withlocals|Timeout|Madrid\.?\s*$|Spain\.?\s*$|ES\.?\s*$)[^|]*$/gi;
const STRIP_CITY = /,?\s+(?:in\s+)?Madrid\s*$/i;
const STRIP_YEAR = /\s+20\d{2}\s*$/;
const COLLAPSE_SPACES = /\s{2,}/g;

function rewriteTitle(raw: string): string {
  return raw
    .replace(STRIP_SUFFIXES, '')
    .replace(STRIP_CITY, '')
    .replace(STRIP_YEAR, '')
    .replace(COLLAPSE_SPACES, ' ')
    .trim()
    .slice(0, 120);
}

export async function runTitleRewriteAgent(): Promise<{ rewritten: number; errors: string[] }> {
  const supabase = createServerClient();

  const { data: rows, error } = await supabase
    .from('experiences')
    .select('id, title')
    .is('raw_title', null);

  if (error) return { rewritten: 0, errors: [`query error: ${error.message}`] };
  if (!rows || rows.length === 0) return { rewritten: 0, errors: [] };

  const BATCH_SIZE = 20;
  let rewritten = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map(async (row) => {
        const newTitle = rewriteTitle(row.title);
        const { error: updateError } = await supabase
          .from('experiences')
          .update({ title: newTitle, raw_title: row.title })
          .eq('id', row.id);
        if (updateError) throw updateError;
        return 1;
      })
    );

    for (const r of results) {
      if (r.status === 'fulfilled') rewritten++;
      else errors.push(String(r.reason));
    }
  }

  return { rewritten, errors };
}
