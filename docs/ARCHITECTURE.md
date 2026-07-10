# Architecture

## Overview

The Pokédex is a static SvelteKit app (adapter-static) deployed via GitHub Pages. All data is fetched from PokeAPI v2 at runtime.

## Data Flow

1. **Server Load (`+page.server.ts`):** 
   - Fetches initial batch of Pokémon/Berries on page load
   - Validates all responses with zod schemas
   - Returns data props

2. **Client State (`+page.svelte`)**:
   - Uses Svelte 5 runes ($state, $derived)
   - Stores apply filters/sorting locally
   - Favorites synced to localStorage

3. **Caching:**
   - In-memory Map (`src/lib/api/cache.ts`)
   - Keyed by PokeAPI URL
   - Survives page navigation, clears on full reload

## Route Structure

```
/ (Pokédex list)
├── /pokemon/[name]  (detail)
├── /berries         (list)
├── /berries/[name]  (detail)
├── /favorites       (list)
└── +error.svelte    (404)
```

## Key Decisions

### adapter-static + SSR Routes
- Prerendered: `/`, `/berries`, `/favorites` (static HTML)
- Dynamic: `/pokemon/[name]`, `/berries/[name]` (client-rendered, via 404.html fallback)
- Reason: GitHub Pages requires static files; detail routes rendered on first visit

### In-Memory Cache
- Lightweight alternative to service workers
- Limits: Single-tab per session, no persistence
- Trade-off: Simpler code vs. cross-tab cache miss

### zod Validation
- Every PokeAPI response parsed at load time
- Catches schema drift early
- Schemas live in `src/lib/api/schemas.ts`

### Svelte 5 Runes
- `$state`: filter UI state, loaded Pokémon
- `$derived`: derived favorites grid
- `$effect`: theme persistence to DOM + localStorage
- Simplified reactive declarations vs. stores alone

### Favorites via localStorage
- Client-side only (no server state)
- Persists across sessions
- Store methods: `toggle()`, `add()`, `remove()`

## Performance

- **Bundle Size:** ~50KB gzipped (Svelte + Tailwind)
- **Sprites:** Lazy-loaded via official artwork URLs
- **Pagination:** 30 Pokémon per "Load More" click
- **Debounced Search:** 250ms
- **Type Colors:** CSS class mapping (no runtime lookup)
