# pi-web

Web tools for [Pi](https://pi.dev):

- `web_fetch` fetches a public page through Firecrawl and returns clean Markdown and normalized metadata.
- `web_search` searches with Brave LLM Context and returns extracted content and citable sources.

## Install

```bash
pi install npm:@goofansu/pi-web
```

## Configuration

### Web fetch

Set `FIRECRAWL_API_KEY` to use an account's higher limits and credits. An explicit key takes precedence over integration discovery:

```bash
export FIRECRAWL_API_KEY=...
```

Without a key, `web_fetch` lazily discovers an attached exe.dev Firecrawl integration named `firecrawl` and caches the result. If none is attached, it uses Firecrawl's keyless tier.

### Web search

Set a Brave Search API key:

```bash
export BRAVE_SEARCH_API_KEY=...
```

An explicit key is used directly. Without one, `web_search` lazily discovers and caches an attached exe.dev Brave integration named `brave`. If neither credential source is available, the first search returns an actionable configuration error.

## Development

```bash
npm install
npm test
npm run typecheck
npm run lint
```

The Husky pre-commit hook runs `npm run lint`.

## Security

Pi packages execute with the user's full system permissions. Review package source before installing it.
