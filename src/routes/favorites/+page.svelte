<script lang="ts">
	import { favorites } from '$lib/stores';
	import { Heart } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Pokemon {
		id: number;
		name: string;
		sprites: {
			front_default: string | null;
			other?: { official_artwork?: { front_default: string | null } };
		};
		types: Array<{ type: { name: string } }>;
	}

	let { data }: { data: PageData } = $props();

	const typeColors: Record<string, string> = {
		normal: 'bg-gray-400',
		fire: 'bg-red-500',
		water: 'bg-blue-500',
		grass: 'bg-green-500',
		electric: 'bg-yellow-400',
		ice: 'bg-cyan-400',
		fighting: 'bg-red-700',
		poison: 'bg-purple-500',
		ground: 'bg-yellow-700',
		flying: 'bg-sky-400',
		psychic: 'bg-pink-500',
		bug: 'bg-lime-500',
		rock: 'bg-gray-600',
		ghost: 'bg-purple-700',
		dragon: 'bg-indigo-600',
		dark: 'bg-gray-800',
		steel: 'bg-slate-400',
		fairy: 'bg-pink-400'
	};

	let allPokemon = $derived.by(() => (data.allPokemon as unknown as Pokemon[]) ?? []);
	let favoritePokemon = $derived(
		allPokemon.filter((p) => $favorites.includes(p.id))
	);
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-4xl font-bold mb-2">Favorites</h1>
		<p class="text-slate-600 dark:text-slate-400">Your collection of favorite Pokémon</p>
	</div>

	{#if favoritePokemon.length === 0}
		<div class="text-center py-12">
			<Heart size={48} class="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
			<p class="text-slate-500 dark:text-slate-400 text-lg">No favorites yet</p>
			<p class="text-slate-500 dark:text-slate-400">Add Pokémon to your favorites to see them here</p>
			<a href="/" class="mt-6 inline-block px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
				Explore Pokédex
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each favoritePokemon as pokemon (pokemon.id)}
				<a
					href={`/pokemon/${pokemon.name}`}
					class="group relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-xl dark:shadow-black/30 transition transform hover:-translate-y-1"
				>
					<!-- Image -->
					<div class="aspect-square bg-gradient-to-b from-red-100 to-red-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative overflow-hidden">
						<img
							src={pokemon.sprites.other?.official_artwork?.front_default ||
								pokemon.sprites.front_default ||
								''}
							alt={pokemon.name}
							class="w-4/5 h-4/5 object-contain group-hover:scale-110 transition"
						/>
						<button
							onclick={(e) => {
								e.preventDefault();
								favorites.toggle(pokemon.id);
							}}
							class="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition shadow-lg"
						>
							<Heart size={20} class="fill-red-500 text-red-500" />
						</button>
					</div>

					<!-- Info -->
					<div class="p-4 space-y-2">
						<div class="flex items-center justify-between">
							<h3 class="font-semibold capitalize text-lg">
								{pokemon.name}
							</h3>
							<span class="text-xs font-mono text-slate-500 dark:text-slate-400">
								#{pokemon.id.toString().padStart(3, '0')}
							</span>
						</div>

						<!-- Types -->
						<div class="flex flex-wrap gap-1">
							{#each pokemon.types as { type }}
								<span class="px-2 py-0.5 text-xs font-semibold text-white rounded {typeColors[type.name] || 'bg-gray-400'}">
									{type.name}
								</span>
							{/each}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
