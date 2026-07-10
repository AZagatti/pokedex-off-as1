<script lang="ts">
	import './layout.css';
	import { theme } from '$lib/stores';
	import { Moon, Sun } from 'lucide-svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	$effect(() => {
		if ($theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ef4444" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
	<!-- Header -->
	<header class="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
		<div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
			<a href="/" class="font-bold text-2xl text-red-500 hover:text-red-600">
				Pokédex
			</a>
			<nav class="flex items-center gap-6">
				<a href="/" class="hover:text-red-500 transition">List</a>
				<a href="/berries" class="hover:text-red-500 transition">Berries</a>
				<a href="/favorites" class="hover:text-red-500 transition">Favorites</a>
				<button
					onclick={() => theme.toggle()}
					class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
					aria-label="Toggle theme"
				>
					{#if $theme === 'light'}
						<Moon size={20} />
					{:else}
						<Sun size={20} />
					{/if}
				</button>
			</nav>
		</div>
	</header>

	<!-- Main -->
	<main class="max-w-7xl mx-auto px-4 py-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-slate-200 dark:border-slate-800 mt-16 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
		<p>
			Built with <span class="text-red-500">♥</span> • Data from
			<a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" class="hover:text-red-500">PokeAPI</a>
		</p>
	</footer>
</div>

<style>
	:global(html.dark) {
		color-scheme: dark;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
