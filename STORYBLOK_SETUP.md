# Storyblok Setup

This project uses Storyblok as a headless CMS.

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
STORYBLOK_TOKEN=your_storyblok_access_token_here
STORYBLOK_VERSION=draft
```

### Getting Your Storyblok Token

1. Log in to your [Storyblok](https://app.storyblok.com/) account
2. Navigate to your space settings
3. Go to "Access Tokens"
4. Copy the "Preview" token for development or "Public" token for production

### Environment Variable Details

- `STORYBLOK_TOKEN` (required): Your Storyblok access token
- `STORYBLOK_VERSION` (optional): Set to `draft` for preview content or `published` for published content only. Defaults to `draft` if not specified.

## Usage

The Storyblok helper is located at `src/utils/storyblok.ts` and provides:

### Getting a Story

```typescript
import { getStory } from '~/utils/storyblok';

const story = await getStory('home');
```

### Using the Storyblok Client Directly

```typescript
import { storyblok } from '~/utils/storyblok';

const { data } = await storyblok.get('cdn/stories', {
  version: 'draft',
  starts_with: 'blog/',
});
```

## For Production

When deploying to production:

1. Set `STORYBLOK_VERSION=published` to only fetch published content
2. Make sure to add your environment variables to your hosting platform (Netlify, Vercel, etc.)

