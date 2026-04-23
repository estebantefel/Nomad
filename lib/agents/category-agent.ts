import Anthropic from '@anthropic-ai/sdk';
import { searchTavily } from './tavily';
import { createServerClient } from '@/lib/supabase-server';
import type { ExperienceCategory, ExperienceInsert } from '@/types/experience';

const CATEGORY_SEARCH_TERMS: Record<ExperienceCategory, string> = {
  outdoors: 'outdoor activities nature hiking parks Madrid',
  mind: 'meditation yoga wellness mindfulness mental health Madrid',
  learning: 'workshops classes lectures educational tours language exchange Madrid',
  creative: 'art classes pottery music photography cooking crafts Madrid',
  social: 'meetups social events networking community salsa dancing Madrid',
  food: 'restaurants food tours tapas wine tasting markets gastronomy Madrid',
  lifestyle: 'wellness fitness spa design fashion lifestyle Madrid',
  sports: 'padel football cycling running events tournaments gym Madrid',
};

export async function runCategoryAgent(category: ExperienceCategory): Promise<number> {
  const client = new Anthropic();
  const supabase = createServerClient();
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const tools: Anthropic.Tool[] = [
    {
      name: 'search_web',
      description: 'Search the web for current Madrid experiences and events',
      input_schema: {
        type: 'object' as const,
        properties: {
          query: { type: 'string', description: 'Search query' },
          include_images: { type: 'boolean', description: 'Include image URLs in results' },
        },
        required: ['query'],
      },
    },
    {
      name: 'save_experience',
      description: 'Save a discovered Madrid experience to the database',
      input_schema: {
        type: 'object' as const,
        properties: {
          title: { type: 'string', description: 'Action-oriented name, e.g. "Rock climbing at La Pedriza"' },
          description: { type: 'string', description: 'One or two sentence description' },
          location: { type: 'string', description: 'Specific address or venue name in Madrid' },
          neighborhood: { type: 'string', description: 'Madrid neighborhood, e.g. Malasaña, La Latina' },
          date_range: { type: 'string', description: 'When available, e.g. "Until 15 May" or "Every Saturday"' },
          duration: { type: 'string', description: 'How long it takes, e.g. "2 h" or "Half day"' },
          price: { type: 'string', description: 'Cost, e.g. "Free" or "€15"' },
          image_url: { type: 'string', description: 'Direct URL to a real image of this experience' },
          source_url: { type: 'string', description: 'URL where you found this experience' },
        },
        required: ['title', 'description'],
      },
    },
  ];

  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: `Today is ${today}. Search for 4-5 real, specific ${CATEGORY_SEARCH_TERMS[category]} experiences currently available in Madrid this week. For each experience, search for a real image URL. Save each one using save_experience. Use action-oriented titles (e.g. "Visit Museo del Prado"). Only save real, bookable or visitable experiences — never invent them.`,
    },
  ];

  let saved = 0;
  let iterations = 0;

  while (iterations < 12) {
    iterations++;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: [
        {
          type: 'text' as const,
          text: 'You are a Madrid experience discovery agent. You find real, current experiences in Madrid and save them. Be specific: use real venue names, real prices, real neighborhoods. Never invent experiences.',
          cache_control: { type: 'ephemeral' },
        },
      ],
      tools,
      messages,
    });

    messages.push({ role: 'assistant', content: response.content });

    if (response.stop_reason === 'end_turn') break;
    if (response.stop_reason !== 'tool_use') break;

    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== 'tool_use') continue;

      if (block.name === 'search_web') {
        const input = block.input as { query: string; include_images?: boolean };
        try {
          const results = await searchTavily(input.query, input.include_images ?? true);
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(results),
          });
        } catch (err) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Search failed: ${(err as Error).message}`,
            is_error: true,
          });
        }
      }

      if (block.name === 'save_experience') {
        const input = block.input as Omit<ExperienceInsert, 'category'>;
        const { error } = await supabase.from('experiences').insert({ ...input, category });
        if (error) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Save failed: ${error.message}`,
            is_error: true,
          });
        } else {
          saved++;
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: 'Saved successfully.',
          });
        }
      }
    }

    messages.push({ role: 'user', content: toolResults });
  }

  return saved;
}
