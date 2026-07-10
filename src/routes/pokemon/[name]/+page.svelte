<script lang="ts">
	import { favorites } from '$lib/stores';
	import { ArrowLeft, Heart } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let currentSprite = $state<'front' | 'back' | 'shiny'>('front');

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

	const statNames: Record<string, string> = {
		hp: 'HP',
		attack: 'Attack',
		defense: 'Defense',
		'special-attack': 'Sp. Atk',
		'special-defense': 'Sp. Def',
		speed: 'Speed'
	};

	function getSprite() {
		if (currentSprite === 'front') return data.pokemon.sprites.front_default;
		if (currentSprite === 'back') return data.pokemon.sprites.back_default;
		return data.pokemon.sprites.front_shiny;
	}

	function getTotalStats() {
		return data.pokemon.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0);
	}

	function getEvolutionChain(): Array<{ name: string; id: number }> {
		const chain: Array<{ name: string; id: number }> = [];
		let current = data.chain.chain;

		while (current) {
			chain.push({
				name: current.species.name,
				id: current.species.url.split('/').slice(-2)[0]
			});
			current = current.evolves_to[0];
		}

		return chain;
	}
</script>

<div class="space-y-8">
	<!-- Back Button -->
	<a href="/" class="inline-flex items-center gap-2 text-red-500 hover:text-red-600 transition">
		<ArrowLeft size={20} />
		Back to Pokédex
	</a>

	<!-- Header Section -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<!-- Sprite Section -->
		<div class="space-y-4">
			<div class="aspect-square bg-gradient-to-b from-red-100 to-red-50 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
				<img src={getSprite()} alt={data.pokemon.name} class="w-4/5 h-4/5 object-contain" />
			</div>
			<div class="flex gap-2 justify-center">
				<button
					onclick={() => (currentSprite = 'front')}
					class="px-4 py-2 rounded-lg {currentSprite === 'front'
						? 'bg-red-500 text-white'
						: 'bg-slate-200 dark:bg-slate-700'} transition"
				>
					Front
				</button>
				<button
					onclick={() => (currentSprite = 'back')}
					class="px-4 py-2 rounded-lg {currentSprite === 'back'
						? 'bg-red-500 text-white'
						: 'bg-slate-200 dark:bg-slate-700'} transition"
				>
					Back
				</button>
				<button
					onclick={() => (currentSprite = 'shiny')}
					class="px-4 py-2 rounded-lg {currentSprite === 'shiny'
						? 'bg-red-500 text-white'
						: 'bg-slate-200 dark:bg-slate-700'} transition"
				>
					Shiny
				</button>
			</div>
		</div>

		<!-- Info Section -->
		<div class="space-y-6">
			<div>
				<h1 class="text-4xl font-bold capitalize mb-2">{data.pokemon.name}</h1>
				<span class="text-xl text-slate-500 dark:text-slate-400">#{data.pokemon.id.toString().padStart(3, '0')}</span>
			</div>

			<!-- Types -->
			<div class="flex flex-wrap gap-2">
				{#each data.pokemon.types as { type }}
					<span class="px-4 py-2 text-lg font-semibold text-white rounded {typeColors[type.name] || 'bg-gray-400'}">
						{type.name}
					</span>
				{/each}
			</div>

			<!-- Basic Info -->
			<div class="grid grid-cols-2 gap-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
				<div>
					<div class="text-sm text-slate-500 dark:text-slate-400">Height</div>
					<div class="text-lg font-semibold">{(data.pokemon.height / 10).toFixed(1)} m</div>
				</div>
				<div>
					<div class="text-sm text-slate-500 dark:text-slate-400">Weight</div>
					<div class="text-lg font-semibold">{(data.pokemon.weight / 10).toFixed(1)} kg</div>
				</div>
			</div>

			<!-- Favorite Button -->
			<button
				onclick={() => favorites.toggle(data.pokemon.id)}
				class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg {$favorites.includes(data.pokemon.id)
					? 'bg-red-500 text-white'
					: 'bg-slate-200 dark:bg-slate-700'} transition text-lg font-semibold"
			>
				<Heart size={24} fill={$favorites.includes(data.pokemon.id) ? 'currentColor' : 'none'} />
				{$favorites.includes(data.pokemon.id) ? 'Remove from Favorites' : 'Add to Favorites'}
			</button>
		</div>
	</div>

	<!-- Stats Section -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold">Base Stats</h2>
		<div class="space-y-3">
			{#each data.pokemon.stats as stat}
				<div class="flex items-center gap-4">
					<span class="w-24 text-sm font-semibold">{statNames[stat.stat.name] || stat.stat.name}</span>
					<div class="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-300"
							style="width: {(stat.base_stat / 255) * 100}%"
						></div>
					</div>
					<span class="w-12 text-right font-semibold">{stat.base_stat}</span>
				</div>
			{/each}
			<div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 font-bold text-lg">
				<span class="w-24">Total</span>
				<span class="flex-1"></span>
				<span class="w-12 text-right">{getTotalStats()}</span>
			</div>
		</div>
	</div>

	<!-- Abilities Section -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold">Abilities</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each data.pokemon.abilities as { ability, is_hidden }}
				<div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
					<div class="flex items-center justify-between">
						<span class="capitalize font-semibold">{ability.name.replace('-', ' ')}</span>
						{#if is_hidden}
							<span class="text-xs px-2 py-1 bg-red-500 text-white rounded">Hidden</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Moves Section -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold">Recent Moves</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
			{#each data.pokemon.moves.slice(0, 12) as { move }}
				<div class="p-3 bg-slate-100 dark:bg-slate-800 rounded text-center text-sm font-semibold capitalize">
					{move.name.replace('-', ' ')}
				</div>
			{/each}
		</div>
	</div>

	<!-- Evolution Chain -->
	{#if getEvolutionChain().length > 1}
		<div class="space-y-4">
			<h2 class="text-2xl font-bold">Evolution Chain</h2>
			<div class="flex items-center gap-4 overflow-x-auto pb-4">
				{#each getEvolutionChain() as evo, idx}
					<a href={`/pokemon/${evo.name}`} class="flex flex-col items-center gap-2 min-w-[100px]">
						<div class="w-20 h-20 bg-gradient-to-b from-red-100 to-red-50 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/${evo.id}.png`}
								alt={evo.name}
								class="w-16 h-16 object-contain"
							/>
						</div>
						<span class="capitalize text-sm font-semibold text-center">{evo.name}</span>
					</a>
					{#if idx < getEvolutionChain().length - 1}
						<div class="text-2xl">→</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
