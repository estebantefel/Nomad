import Anthropic from '@anthropic-ai/sdk';
import { searchTavily } from './tavily';
import { createServerClient } from '@/lib/supabase-server';
import type { ExperienceCategory, ExperienceInsert } from '@/types/experience';

export async function runTopPicksAgent(): Promise<number> {
  const client = new Anthropic();
  const supabase = createServerClient();
  const weekOf = new Date().toISOString().split('T')[0];
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Clear previous week's top pick
  await supabase.from('experiences').update({ is_top_pick: false }).eq('is_top_pick', true);

  const tools: Anthropic.Tool[] = [
    {
      name: 'search_web',
      description: 'Search the web for trending events and buzz in Madrid',
      input_schema: {
        type: 'object' as const,
        properties: {
          query: { type: 'string' },
          include_images: { type: 'boolean' },
        },
        required: ['query'],
      },
    },
    {
      name: 'save_top_pick',
      description: "Save this week's hottest Madrid experience as the top pick",
      input_schema: {
        type: 'object' as const,
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          category: {
            type: 'string',
            enum: ['outdoors', 'mind', 'learning', 'creative', 'social', 'food', 'lifestyle', 'sports'],
          },
          location: { type: 'string' },
          neighborhood: { type: 'string' },
          date_range: { type: 'string' },
          duration: { type: 'string' },
          price: { type: 'string' },
          image_url: { type: 'string' },
          source_url: { type: 'string' },
        },
        required: ['title', 'description', 'category'],
      },
    },
  ];

  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: `Today is ${today}. Search for what Madrid is genuinely buzzing about this week — trending events, viral experiences, what locals are talking about, what's sold out or generating hype. Find the single hottest experience happening in Madrid right now and save it as this week's top pick.`,
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
          text: "You are a Madrid trends agent. Find what is genuinely trending and generating buzz in Madrid this week — not generic tourist attractions, but the experience everyone is talking about right now. Use social signals, news, event sites, and local media.",
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

      if (block.name === 'save_top_pick') {
        const input = block.input as Omit<ExperienceInsert, 'is_top_pick' | 'week_of'> & { category: ExperienceCategory };
        const { error } = await supabase.from('experiences').insert({
          ...input,
          is_top_pick: true,
          week_of: weekOf,
        });
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
            content: 'Top pick saved.',
          });
        }
      }
    }

    messages.push({ role: 'user', content: toolResults });
  }

  return saved;
}
