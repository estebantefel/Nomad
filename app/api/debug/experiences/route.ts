import { NextResponse } from 'next/server';
import { getDashboardFeed, getTopPick } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, key: !!key });
  }

  const client = createClient(url, key);
  const { data, error } = await client
    .from('experiences')
    .select('id, title, category, is_top_pick, fetched_at')
    .eq('is_top_pick', false)
    .order('fetched_at', { ascending: false })
    .limit(5);

  const topPick = await getTopPick();
  const feed = await getDashboardFeed();

  return NextResponse.json({
    envVarsPresent: true,
    urlPreview: `${url.slice(0, 15)}...${url.slice(-10)}`,
    urlLength: url.length,
    keyLength: key.length,
    directQueryCount: data?.length ?? 0,
    directQueryError: error?.message ?? null,
    directQuerySample: data?.slice(0, 2) ?? [],
    getDashboardFeedCount: feed.length,
    topPickFound: !!topPick,
  });
}
