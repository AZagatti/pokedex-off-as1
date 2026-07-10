import { cachedFetch } from "$lib/api/cache";
import { error } from "@sveltejs/kit";

const POKEAPI = "https://pokeapi.co/api/v2";

export async function load({ params }) {
  try {
    const berry: any = await cachedFetch(`${POKEAPI}/berry/${params.name}`);
    return { berry };
  } catch {
    throw error(404, "Berry not found");
  }
}
