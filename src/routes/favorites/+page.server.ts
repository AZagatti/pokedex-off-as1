import { cachedFetch } from "$lib/api/cache";

const POKEAPI = "https://pokeapi.co/api/v2";

export async function load() {
  // Fetch some Pokémon for display (favorites loaded client-side from localStorage)
  const allPokemon = await Promise.all(
    Array.from({ length: 30 }, (_, i) =>
      cachedFetch(`${POKEAPI}/pokemon/${i + 1}`).catch(() => null)
    )
  );

  return {
    allPokemon: allPokemon.filter(Boolean),
  };
}
