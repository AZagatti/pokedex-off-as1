# Pokédex

A modern, animated Pokédex web app built with SvelteKit, TypeScript, and Tailwind CSS.

[![SvelteKit](https://img.shields.io/badge/SvelteKit-5-FF3E00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square&logo=github&logoColor=white)](https://azagatti.github.io/pokedex-off-as1/)

**[Live Demo →](https://azagatti.github.io/pokedex-off-as1/)**

## Features

- **Pokédex List** – Browse all Pokémon with smart pagination
  - Search by name or Dex number
  - Filter by type (18 types)
  - Filter by generation (Gen 1–9)
  - Sort by Dex # or base stats
  
- **Detail Page** – Full Pokémon data
  - Official artwork + sprite variants
  - Type-colored badges
  - Animated stat bars
  - Abilities & moves
  - Evolution chain
  
- **Berries** – Berry reference
  - List and detail pages
  - Flavor breakdown
  
- **Favorites** – Persistent (localStorage)
- **Theme Toggle** – Light/dark mode
- **Responsive** – Mobile-first
- **Accessible** – ARIA labels, keyboard nav

## Tech Stack

- **SvelteKit 5** (Svelte 5 runes, TypeScript strict)
- **Tailwind CSS v4** + lucide-svelte
- **zod** validation, **stores** + localStorage
- **oxlint + oxfmt** (via ultracite), **lefthook**
- **vitest + Playwright**, **GitHub Pages**

## Run Locally

```bash
npm install
npm run dev      # http://localhost:5174/pokedex-off-as1
npm run build    # production build
npm run lint
npm run check    # typecheck
npm run test     # vitest + Playwright
```

## Docs

- [Architecture](./docs/ARCHITECTURE.md) – Data flow, caching, routes
- [Decisions](./docs/DECISIONS.md) – Tech choices, spec deviations
