export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface TavilyResponse {
  results: TavilyResult[];
  images: string[];
}

export async function searchTavily(
  query: string,
  includeImages = false,
  includeDomains?: string[]
): Promise<TavilyResponse> {
  const body: Record<string, unknown> = {
    query,
    search_depth: 'advanced',
    include_images: includeImages,
    max_results: 5,
    topic: 'general',
  };

  if (includeDomains?.length) {
    body.include_domains = includeDomains;
  }

  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Tavily search failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    results: data.results ?? [],
    images: data.images ?? [],
  };
}
