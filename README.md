# pi-web

Web tools for [pi](https://pi.dev):

- `web_fetch` fetches a public page through Firecrawl and returns clean Markdown and normalized metadata.
- `web_search` searches with Brave LLM Context and returns extracted content and citable sources.

## Install

From npm:

```bash
pi install npm:pi-web
```

From a local checkout:

```bash
pi install /absolute/path/to/pi-web
```

Try it for one run without installing:

```bash
pi -e /absolute/path/to/pi-web
```

## Configuration

### Web fetch

On an exe.dev VM, `web_fetch` automatically uses an attached Firecrawl integration named `firecrawl` through `firecrawl.int.exe.xyz`.

Elsewhere, Firecrawl's keyless tier works without configuration. Set `FIRECRAWL_API_KEY` to use an account's higher limits and credits:

```bash
export FIRECRAWL_API_KEY=...
```

### Web search

On an exe.dev VM, `web_search` automatically uses an attached Brave integration named `brave` through `brave.int.exe.xyz`.

Elsewhere, set a Brave Search API key:

```bash
export BRAVE_SEARCH_API_KEY=...
```

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
