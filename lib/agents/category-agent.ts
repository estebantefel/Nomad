import { searchTavily } from './tavily';
import { createServerClient } from '@/lib/supabase-server';
import type { ExperienceCategory, ExperienceInsert } from '@/types/experience';

const MADRID_NEIGHBORHOODS = [
  'Malasaña', 'Chueca', 'La Latina', 'Lavapiés', 'Retiro', 'Salamanca',
  'Chamberí', 'Moncloa', 'Arganzuela', 'Vallecas', 'Carabanchel', 'Usera',
  'Tetuán', 'Hortaleza', 'Moratalaz', 'Vicálvaro', 'Barajas', 'Fuencarral',
  'Centro', 'Sol', 'Gran Vía', 'Tribunal', 'Embajadores', 'Ópera',
];

const CATEGORY_QUERIES: Record<ExperienceCategory, string[]> = {
  outdoors:  ['outdoor activities Madrid this week', 'nature hiking parks Madrid'],
  mind:      ['meditation yoga wellness mindfulness Madrid', 'mental wellness events Madrid'],
  learning:  ['workshops classes learning events Madrid', 'educational experiences Madrid'],
  creative:  ['art pottery cooking creative workshops Madrid', 'creative classes Madrid'],
  social:    ['social meetups events networking Madrid', 'community events Madrid this week'],
  food:      ['food tours tapas experiences gastronomy Madrid', 'best restaurants food events Madrid'],
  lifestyle: ['fitness wellness lifestyle events Madrid', 'spa wellness lifestyle Madrid'],
  sports:    ['padel football running sports events Madrid', 'sports activities tournaments Madrid'],
};

function extractNeighborhood(text: string): string | undefined {
  for (const n of MADRID_NEIGHBORHOODS) {
    if (text.includes(n)) return n;
  }
  return undefined;
}

function extractPrice(text: string): string | undefined {
  const freeMatch = /\b(free|gratis|gratuito|entrada libre)\b/i.exec(text);
  if (freeMatch) return 'Free';
  const euroMatch = /€\s*\d+(?:[.,]\d+)?/.exec(text);
  if (euroMatch) return euroMatch[0].replace(/\s/, '');
  return undefined;
}

function buildExperience(
  result: { title: string; url: string; content: string },
  image_url: string | undefined,
  category: ExperienceCategory
): ExperienceInsert {
  const combinedText = `${result.title} ${result.content}`;
  return {
    title: result.title.replace(/\s*[-|].*$/, '').trim().slice(0, 120),
    description: result.content.slice(0, 200).trim(),
    category,
    neighborhood: extractNeighborhood(combinedText),
    price: extractPrice(combinedText),
    image_url,
    source_url: result.url,
  };
}

export async function runCategoryAgent(category: ExperienceCategory): Promise<number> {
  const supabase = createServerClient();
  const queries = CATEGORY_QUERIES[category];
  const saved: ExperienceInsert[] = [];

  for (const query of queries) {
    try {
      const { results, images } = await searchTavily(query, true);
      const topResults = results.slice(0, 3);

      for (let i = 0; i < topResults.length; i++) {
        const exp = buildExperience(topResults[i], images[i], category);
        saved.push(exp);
      }
    } catch {
      // continue with next query
    }
  }

  if (saved.length === 0) return 0;

  const { error } = await supabase.from('experiences').insert(saved);
  return error ? 0 : saved.length;
}
