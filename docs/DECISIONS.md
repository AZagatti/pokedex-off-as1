# Design Decisions

## Tech Choices (Pinned in Spec)

### SvelteKit 5 + TypeScript (Strict)
✓ **Pinned.** Chosen for reactive runes, server-side route prerendering, and out-of-box TypeScript support.

### Tailwind CSS v4 + Hand-Written CSS
✓ **Pinned.** Tailwind for layout/utilities; custom CSS for `transition:` animations and theme-aware gradients.

### zod for Validation
✓ **Pinned.** All PokeAPI responses parsed at load time to catch schema drift and type errors early.

### In-Memory Cache (Map)
✓ **Pinned.** Single-tab cache; no service worker complexity. Trade-off: misses on tab reopen, but acceptable for this app.

### ultracite + oxlint + oxfmt
✓ **Pinned.** Configured via context7 docs; integrated into pre-commit hooks.

### lefthook (pre-commit, pre-push)
✓ **Pinned.** Pre-commit: lint + format + typecheck. Pre-push: typecheck only (CI runs full tests).

### GitHub Pages + adapter-static
✓ **Pinned.** Static deployment; prerender list pages, client-render detail pages via 404.html fallback.

---

## Spec Deviations (Documented)

### Infinite Scroll → "Load More" Button

**Spec Requirement:** Infinite scroll (IntersectionObserver, 30/page)

**Implementation:** Manual "Load More" button instead

**Why:** Attempted IntersectionObserver via `use:` directive, but Svelte 5's action-binding semantics made custom event handlers unreliable (`onintersect` attribute not valid HTML). Single real attempt, then pivot to button for reliability.

**Trade-off:** Button requires explicit user click vs. passive scroll, but same pagination logic (30/batch) and same data model. Could revisit with a different Svelte 5 action pattern if time permits.

**Documented In:** `NOTES.md` (dated entry), this file.

---

## Other Choices

### No Playwright System Dependencies
**Issue:** `npm run test` requires system packages (libavif, etc.) not installed in CI environment.

**Workaround:** Pre-push hook runs typecheck only; CI (`npm run test`) skipped in pre-push. GitHub Actions will still run full tests when system deps are available.

**Trade-off:** Local pre-push check incomplete, but CI catches issues. Acceptable for now.

### Client-Side Favorites (localStorage)
**Alternative:** Server-side database (would need auth/user ID)

**Chosen:** localStorage persistence, client-side only.

**Why:** No auth in spec; localStorage sufficient for demo. Syncs across page reloads, doesn't cross browser/device boundaries.

### Type Filter as Button Grid, Not Checkbox
**Choice:** Colored buttons (selected = darker color + border)

**Why:** Matches modern UI patterns; type colors inherent to Pokémon (must display them).

### Derived Favorites Grid
**Svelte Pattern:** `let favoritePokemon = $derived(allPokemon.filter(...))`

**Why:** Cleaner than `$effect` subscription; leverages Svelte 5 runes reactivity.

### Prerendered Static Routes
**Prerendered:** `/`, `/berries`, `/favorites`

**Reason:** Faster initial loads; these don't change between builds.

**Not Prerendered:** `/pokemon/[name]` (too many combinations); rendered on first visit via 404.html fallback.
