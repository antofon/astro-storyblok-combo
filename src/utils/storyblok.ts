import StoryblokClient from "storyblok-js-client";

const token = import.meta.env.STORYBLOK_TOKEN;
const version = (import.meta.env.STORYBLOK_VERSION ?? "draft") as "draft" | "published";

if (!token) {
  throw new Error("Missing STORYBLOK_TOKEN env var");
}

export const storyblok = new StoryblokClient({
  accessToken: token,
  cache: { clear: "auto", type: "memory" },
});

// Common relations to resolve - add your component field names here
const RESOLVE_RELATIONS = [
  'featured-articles-section.articles',
  'featured-articles-section.posts',
  'featured-articles-section.items',
  'blog-section.articles',
  'blog-section.posts',
  'article-grid.articles',
  'article-list.articles',
  'banner-reference.banner',
  'page.featured_posts',
];

export async function getStory(slug: string, resolveRelations: string[] = RESOLVE_RELATIONS) {
  const { data } = await storyblok.get(`cdn/stories/${slug}`, { 
    version,
    resolve_relations: resolveRelations.join(','),
    resolve_links: 'url',
  });
  return data.story;
}

// Get multiple stories (e.g., for blog posts)
export async function getStories(params: {
  starts_with?: string;
  content_type?: string;
  per_page?: number;
  page?: number;
  sort_by?: string;
} = {}) {
  const { data } = await storyblok.get('cdn/stories', {
    version,
    ...params,
  });
  return data.stories;
}

// Resolve a single story by UUID
export async function getStoryByUuid(uuid: string) {
  const { data } = await storyblok.get(`cdn/stories`, {
    version,
    by_uuids: uuid,
  });
  return data.stories?.[0];
}

// Resolve multiple stories by UUIDs
export async function getStoriesByUuids(uuids: string[]) {
  if (!uuids.length) return [];
  const { data } = await storyblok.get(`cdn/stories`, {
    version,
    by_uuids: uuids.join(','),
  });
  return data.stories || [];
}

