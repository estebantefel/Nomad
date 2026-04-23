import { createClient } from '@supabase/supabase-js';
import type { ExperienceDB } from '@/types/experience';

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

export async function getDashboardFeed(limit = 8): Promise<ExperienceDB[]> {
  const client = getClient();
  if (!client) return [];
  const { data } = await client
    .from('experiences')
    .select('*')
    .eq('is_top_pick', false)
    .order('fetched_at', { ascending: false })
    .limit(limit);
  return data ?? [];
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
