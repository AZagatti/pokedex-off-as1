import { cachedFetch } from "$lib/api/cache";
import { BerryListSchema } from "$lib/api/schemas";

const POKEAPI = "https://pokeapi.co/api/v2";

export async function load() {
  const listUrl = `${POKEAPI}/berry?limit=100`;
  const listData = await cachedFetch(listUrl);
  const validatedList = BerryListSchema.parse(listData);

  const berryDetails = await Promise.all(
    validatedList.results.map((b) => cachedFetch(`${POKEAPI}/berry/${b.name}`))
  );

  return {
    berries: berryDetails,
    total: validatedList.count,
  };
}
