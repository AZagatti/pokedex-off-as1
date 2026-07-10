<script>
	import { page } from '$app/stores';
</script>

<div class="text-center py-20">
	<div class="text-6xl font-bold text-red-500 mb-4">404</div>
	<h1 class="text-4xl font-bold mb-2">Pokémon not found!</h1>
	<p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
		{#if $page.status === 404}
			The Pokémon you're looking for doesn't exist in this Pokédex.
		{:else}
			Something went wrong. Please try again.
		{/if}
	</p>
	<a href="/" class="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
		Return to Pokédex
	</a>
</div>
