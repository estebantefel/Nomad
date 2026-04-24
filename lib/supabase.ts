import { createClient } from '@supabase/supabase-js';
import type { ExperienceDB, ExperienceCategory } from '@/types/experience';

const ALL_CATEGORIES: ExperienceCategory[] = [
  'outdoors', 'mind', 'learning', 'creative',
  'social', 'food', 'lifestyle', 'sports',
];

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getTopPick(): Promise<ExperienceDB | null> {
  const client = getClient();
  if (!client) return null;
  const { data } = await client
    .from('experiences')
    .select('*')
    .eq('is_top_pick', true)
    .order('week_of', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function getDashboardFeed(): Promise<ExperienceDB[]> {
  const client = getClient();
  if (!client) return [];

  // Fetch 2 experiences per category so the feed always shows variety
  const results = await Promise.all(
    ALL_CATEGORIES.map(cat =>
      client
        .from('experiences')
        .select('*')
        .eq('category', cat)
        .eq('is_top_pick', false)
        .order('fetched_at', { ascending: false })
        .limit(2)
    )
  );

  // Interleave: first pick from each category, then second pick from each
  const first = results.map(r => r.data?.[0]).filter(Boolean) as ExperienceDB[];
  const second = results.map(r => r.data?.[1]).filter(Boolean) as ExperienceDB[];
  return [...first, ...second];
}

export async function getExperienceById(id: string): Promise<ExperienceDB | null> {
  const client = getClient();
  if (!client) return null;
  const { data } = await client
    .from('experiences')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return data;
}

export async function getExperiencesByCategory(category: string): Promise<ExperienceDB[]> {
  const client = getClient();
  if (!client) return [];
  const { data } = await client
    .from('experiences')
    .select('*')
    .eq('category', category)
    .eq('is_top_pick', false)
    .order('fetched_at', { ascending: false })
    .limit(12);
  return data ?? [];
}
