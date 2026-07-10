// Simple in-memory cache for PokeAPI responses
const cache = new Map<string, unknown>();

export async function cachedFetch<T>(url: string): Promise<T> {
	if (cache.has(url)) {
		return cache.get(url) as T;
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const data = (await response.json()) as T;
	cache.set(url, data);
	return data;
}

export function clearCache() {
	cache.clear();
}

export function removeCacheEntry(url: string) {
	cache.delete(url);
}
