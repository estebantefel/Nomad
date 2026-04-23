-- Run this in the Supabase SQL editor to set up the experiences table

create table if not exists experiences (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text not null,
  location text,
  neighborhood text,
  date_range text,
  duration text,
  price text,
  image_url text,
  source_url text,
  is_top_pick boolean default false,
  week_of date,
  fetched_at timestamptz default now()
);

create index if not exists experiences_category_idx on experiences(category);
create index if not exists experiences_is_top_pick_idx on experiences(is_top_pick);
create index if not exists experiences_fetched_at_idx on experiences(fetched_at desc);

-- Allow public reads (no auth required)
alter table experiences enable row level security;

create policy "Public read access"
  on experiences for select
  using (true);

create policy "Service role write access"
  on experiences for insert
  with check (true);

create policy "Service role update access"
  on experiences for update
  using (true);
