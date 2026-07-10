import { cachedFetch } from "$lib/api/cache";
import { PokemonListSchema } from "$lib/api/schemas";

const POKEAPI = "https://pokeapi.co/api/v2";

export async function load() {
  // Fetch initial batch of pokémon
  const listUrl = `${POKEAPI}/pokemon?limit=30&offset=0`;
  const listData = await cachedFetch(listUrl);
  const validatedList = PokemonListSchema.parse(listData);

  // Fetch full details for first batch
  const pokemonDetails = await Promise.all(
    validatedList.results
      .slice(0, 30)
      .map((p) => cachedFetch(`${POKEAPI}/pokemon/${p.name}`))
  );

  return {
    pokemonList: validatedList,
    pokemonDetails,
    totalCount: validatedList.count,
  };
}
