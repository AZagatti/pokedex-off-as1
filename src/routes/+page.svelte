<script lang="ts">
	import { cachedFetch } from '$lib';
	import { favorites } from '$lib/stores';
	import { Heart, Search, X } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Pokemon {
		id: number;
		name: string;
		sprites: {
			front_default: string | null;
			other?: {
				official_artwork?: {
					front_default: string | null;
				};
			};
		};
		types: Array<{ type: { name: string } }>;
		height?: number;
		weight?: number;
	}

	let { data }: { data: PageData } = $props();

	let pokemonList: Pokemon[] = $state(data.pokemonDetails as unknown as Pokemon[]);
	let filteredList: Pokemon[] = $state([]);

	$effect(() => {
		filteredList = [...pokemonList];
		applyFilters();
	});
	let searchQuery = $state('');
	let selectedTypes = $state<string[]>([]);
	let selectedGeneration = $state('all');
	let sortBy = $state<'number' | 'stats'>('number');
	let offset = $state(30);
	let isLoading = $state(false);

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

	async function loadMore() {
		isLoading = true;
		try {
			const url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`;
			const data: any = await cachedFetch(url);
			const newPokemon = await Promise.all(
				data.results.map((p: any) => cachedFetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`))
			);
			pokemonList = [...pokemonList, ...newPokemon];
			offset += 30;
		} catch (e) {
			console.error('Failed to load more pokémon:', e);
		} finally {
			isLoading = false;
		}
		applyFilters();
	}

	function applyFilters() {
		let filtered = pokemonList;

		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(p) => p.name.toLowerCase().includes(query) || p.id.toString().includes(query)
			);
		}

		// Type filter
		if (selectedTypes.length > 0) {
			filtered = filtered.filter((p) =>
				p.types.some((t) => selectedTypes.includes(t.type.name))
			);
		}

		// Generation filter (rough approximation based on id ranges)
		if (selectedGeneration !== 'all') {
			const ranges: Record<string, [number, number]> = {
				'1': [1, 151],
				'2': [152, 251],
				'3': [252, 386],
				'4': [387, 493],
				'5': [494, 649],
				'6': [650, 721],
				'7': [722, 809],
				'8': [810, 905],
				'9': [906, 1025]
			};
			const [min, max] = ranges[selectedGeneration] || [0, 0];
			filtered = filtered.filter((p) => p.id >= min && p.id <= max);
		}

		// Sort
		if (sortBy === 'stats') {
			filtered = filtered.sort((a, b) => {
				const aStats =
					(a as any).stats?.reduce((sum: number, s: any) => sum + s.base_stat, 0) ?? 0;
				const bStats =
					(b as any).stats?.reduce((sum: number, s: any) => sum + s.base_stat, 0) ?? 0;
				return bStats - aStats;
			});
		} else {
			filtered = filtered.sort((a, b) => a.id - b.id);
		}

		filteredList = filtered;
	}

	function updateSearch(e: Event) {
		searchQuery = (e.target as HTMLInputElement).value;
		applyFilters();
	}

	function toggleType(type: string) {
		selectedTypes = selectedTypes.includes(type)
			? selectedTypes.filter((t) => t !== type)
			: [...selectedTypes, type];
		applyFilters();
	}

	function clearFilters() {
		searchQuery = '';
		selectedTypes = [];
		selectedGeneration = 'all';
		sortBy = 'number';
		applyFilters();
	}

</script>

<div class="space-y-6">
	<!-- Search and Filters -->
	<div class="sticky top-20 z-30 bg-white dark:bg-slate-900 pb-4 space-y-4">
		<!-- Search -->
		<div class="relative">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
			<input
				type="text"
				placeholder="Search Pokémon by name or number..."
				value={searchQuery}
				oninput={updateSearch}
				class="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
		</div>

		<!-- Type Filter -->
		<div class="space-y-2">
			<div class="block text-sm font-medium">Type</div>
			<div class="flex flex-wrap gap-2">
				{#each Object.keys(typeColors) as type}
					<button
						onclick={() => toggleType(type)}
						class="px-3 py-1 rounded-full text-xs font-semibold {selectedTypes.includes(type)
							? `${typeColors[type]} text-white ring-2 ring-slate-900 dark:ring-white`
							: `${typeColors[type]} text-white opacity-50`} transition"
					>
						{type}
					</button>
				{/each}
			</div>
		</div>

		<!-- Generation and Sort -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="gen" class="block text-sm font-medium mb-2">Generation</label>
				<select
					id="gen"
					bind:value={selectedGeneration}
					onchange={applyFilters}
					class="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
				>
					<option value="all">All</option>
					{#each ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as gen}
						<option value={gen}>Gen {gen}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="sort" class="block text-sm font-medium mb-2">Sort</label>
				<select
					id="sort"
					bind:value={sortBy}
					onchange={applyFilters}
					class="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
				>
					<option value="number">By Dex #</option>
					<option value="stats">By Stats</option>
				</select>
			</div>
		</div>

		<!-- Clear Filters -->
		{#if searchQuery || selectedTypes.length > 0 || selectedGeneration !== 'all' || sortBy !== 'number'}
			<button
				onclick={clearFilters}
				class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-red-500 transition"
			>
				<X size={16} />
				Clear filters
			</button>
		{/if}
	</div>

	<!-- Empty State -->
	{#if filteredList.length === 0}
		<div class="text-center py-12">
			<p class="text-slate-500 dark:text-slate-400">No Pokémon found matching your filters</p>
		</div>
	{:else}
		<!-- Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each filteredList as pokemon (pokemon.id)}
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
							onclick={(e: MouseEvent) => {
								e.preventDefault();
								favorites.toggle(pokemon.id);
							}}
							class="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition shadow-lg"
						>
							<Heart
								size={20}
								class={$favorites.includes(pokemon.id)
									? 'fill-red-500 text-red-500'
									: 'text-slate-400'}
							/>
						</button>
					</div>

					<!-- Info -->
					<div class="p-4 space-y-2">
						<div class="flex items-center justify-between">
							<h3 class="font-semibold capitalize text-lg">
								{pokemon.name}
							</h3>
							<span class="text-xs font-mono text-slate-500 dark:text-slate-400">#{pokemon.id.toString().padStart(3, '0')}</span>
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

		<!-- Load More -->
		<div class="flex justify-center py-8">
			{#if isLoading}
				<div class="text-slate-500 dark:text-slate-400">Loading more...</div>
			{:else if pokemonList.length < data.totalCount}
				<button
					onclick={loadMore}
					class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
				>
					Load More
				</button>
			{:else}
				<p class="text-slate-500 dark:text-slate-400">No more Pokémon to load</p>
			{/if}
		</div>
	{/if}
</div>
