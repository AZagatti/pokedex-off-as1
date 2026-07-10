import { cachedFetch } from "$lib/api/cache";
import { error } from "@sveltejs/kit";

const POKEAPI = "https://pokeapi.co/api/v2";

export async function load({ params }) {
  try {
    const pokemon: any = await cachedFetch(`${POKEAPI}/pokemon/${params.name}`);
    const species: any = await cachedFetch(
      `${POKEAPI}/pokemon-species/${params.name}`
    );
    const chain: any = await cachedFetch(species.evolution_chain.url);

    return {
      pokemon,
      species,
      chain,
    };
  } catch {
    throw error(404, "Pokémon not found");
  }
}
