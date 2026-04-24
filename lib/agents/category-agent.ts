import { searchTavily } from './tavily';
import { createServerClient } from '@/lib/supabase-server';
import type { ExperienceCategory, ExperienceInsert } from '@/types/experience';

// Booking and event sites — these return individual experiences, not articles
const BOOKING_DOMAINS = [
  'eventbrite.com', 'eventbrite.es',
  'meetup.com',
  'getyourguide.com',
  'airbnb.com',
  'viator.com',
  'withlocals.com',
  'timeout.com',
  'madridmovil.es',
  'civitatis.com',
];

const MADRID_NEIGHBORHOODS = [
  'Malasaña', 'Chueca', 'La Latina', 'Lavapiés', 'Retiro', 'Salamanca',
  'Chamberí', 'Moncloa', 'Arganzuela', 'Vallecas', 'Carabanchel', 'Usera',
  'Tetuán', 'Hortaleza', 'Centro', 'Sol', 'Gran Vía', 'Tribunal',
  'Embajadores', 'Ópera', 'Chueca', 'Malasaña',
];

// Specific, bookable-experience queries — not "articles about" but "this specific thing"
const CATEGORY_QUERIES: Record<ExperienceCategory, string[]> = {
  outdoors:  [
    'guided hiking tour Madrid book 2025',
    'outdoor kayak cycling tour Madrid reserve',
  ],
  mind:      [
    'meditation yoga class Madrid book session',
    'mindfulness wellness workshop Madrid Eventbrite',
  ],
  learning:  [
    'language exchange class workshop Madrid book',
    'cooking class flamenco lesson Madrid Airbnb Experiences',
  ],
  creative:  [
    'pottery ceramics class Madrid book session',
    'painting art workshop Madrid Eventbrite reserve',
  ],
  social:    [
    'social meetup networking event Madrid Meetup',
    'salsa dance class social event Madrid book',
  ],
  food:      [
    'food tour tapas experience Madrid Airbnb Viator book',
    'wine tasting paella cooking class Madrid reserve',
  ],
  lifestyle: [
    'spa wellness yoga retreat Madrid book session',
    'fitness pilates lifestyle workshop Madrid',
  ],
  sports:    [
    'padel tennis football class Madrid book court',
    'running trail cycling sports event Madrid reserve',
  ],
};

const TITLE_CLEANUP = /\s*[|\-–]\s*(Eventbrite|Meetup|GetYourGuide|Airbnb|Viator|Civitatis|TripAdvisor|Madrid).*$/i;

function cleanTitle(raw: string): string {
  return raw.replace(TITLE_CLEANUP, '').trim().slice(0, 120);
}

function extractNeighborhood(text: string): string | undefined {
  for (const n of MADRID_NEIGHBORHOODS) {
    if (text.includes(n)) return n;
  }
  return undefined;
}

function extractPrice(text: string): string | undefined {
  if (/\b(free|gratis|gratuito|entrada libre)\b/i.test(text)) return 'Free';
  const m = /€\s*\d+(?:[.,]\d+)?/.exec(text);
  if (m) return m[0].replace(/\s/, '');
  const usd = /\$\s*\d+/.exec(text);
  if (usd) return usd[0];
  return undefined;
}

function isListArticle(title: string, url: string): boolean {
  const listPatterns = /\b(\d+\s+(best|top|ways|things|ideas|workshops|classes|options)|best .* in madrid|top .* madrid)\b/i;
  const articleDomains = ['timeout.com/madrid/things-to-do', 'theguardian.com', 'lonelyplanet.com', 'tripadvisor.com/Attractions'];
  return listPatterns.test(title) || articleDomains.some(d => url.includes(d));
}

export async function runCategoryAgent(category: ExperienceCategory): Promise<number> {
  const supabase = createServerClient();
  const queries = CATEGORY_QUERIES[category];
  const toSave: ExperienceInsert[] = [];
  const seenUrls = new Set<string>();

  for (const query of queries) {
    try {
      const { results, images } = await searchTavily(query, true, BOOKING_DOMAINS);

      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        if (seenUrls.has(r.url)) continue;
        if (isListArticle(r.title, r.url)) continue;

        seenUrls.add(r.url);
        const combinedText = `${r.title} ${r.content}`;

        toSave.push({
          title: cleanTitle(r.title),
          description: r.content.slice(0, 200).trim(),
          category,
          neighborhood: extractNeighborhood(combinedText),
          price: extractPrice(combinedText),
          image_url: images[i] ?? undefined,
          source_url: r.url,
        });
      }
    } catch {
      // continue with next query
    }
  }

  if (toSave.length === 0) return 0;

  const { error } = await supabase.from('experiences').insert(toSave);
  return error ? 0 : toSave.length;
}
