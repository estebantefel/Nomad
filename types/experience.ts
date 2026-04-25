export type ExperienceCategory =
  | 'outdoors'
  | 'mind'
  | 'learning'
  | 'creative'
  | 'social'
  | 'food'
  | 'lifestyle'
  | 'sports';

export interface ExperienceDB {
  id: string;
  title: string;
  description: string | null;
  category: ExperienceCategory;
  location: string | null;
  neighborhood: string | null;
  date_range: string | null;
  duration: string | null;
  price: string | null;
  languages: string | null;
  raw_title: string | null;
  image_url: string | null;
  source_url: string | null;
  is_top_pick: boolean;
  week_of: string | null;
  fetched_at: string;
}

export interface ExperienceInsert {
  title: string;
  description?: string;
  category: ExperienceCategory;
  location?: string;
  neighborhood?: string;
  date_range?: string;
  duration?: string;
  price?: string;
  languages?: string;
  image_url?: string;
  source_url?: string;
  is_top_pick?: boolean;
  week_of?: string;
}

export const CATEGORY_LABELS: Record<ExperienceCategory, string> = {
  outdoors: 'Outdoors',
  mind: 'Mind',
  learning: 'Learning',
  creative: 'Creative',
  social: 'Social',
  food: 'Food',
  lifestyle: 'Lifestyle',
  sports: 'Sports',
};
