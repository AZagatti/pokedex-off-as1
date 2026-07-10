<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Berry {
		id: number;
		name: string;
		firmness: { name: string };
		growth_time: number;
		size: number;
		gen?: number;
		flavors: Array<{ flavor: { name: string }; potency: number }>;
	}

	let { data }: { data: PageData } = $props();
	let berry = $derived.by(() => (data.berry as unknown as Berry) ?? {});
</script>

<div class="space-y-8">
	<!-- Back Button -->
	<a href="/berries" class="inline-flex items-center gap-2 text-red-500 hover:text-red-600 transition">
		<ArrowLeft size={20} />
		Back to Berries
	</a>

	<!-- Header -->
	<div>
		<h1 class="text-4xl font-bold capitalize mb-4">{berry.name} Berry</h1>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
				<div class="text-sm text-slate-600 dark:text-slate-400 mb-1">Firmness</div>
				<div class="text-lg font-semibold capitalize">{berry.firmness.name}</div>
			</div>
			<div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
				<div class="text-sm text-slate-600 dark:text-slate-400 mb-1">Growth Time</div>
				<div class="text-lg font-semibold">{berry.growth_time} h</div>
			</div>
			<div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
				<div class="text-sm text-slate-600 dark:text-slate-400 mb-1">Size</div>
				<div class="text-lg font-semibold">{berry.size} mm</div>
			</div>
			<div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
				<div class="text-sm text-slate-600 dark:text-slate-400 mb-1">Generation</div>
				<div class="text-lg font-semibold">Gen {berry.gen ?? 'Unknown'}</div>
			</div>
		</div>
	</div>

	<!-- Flavors -->
	{#if berry.flavors.length > 0}
		<div class="space-y-4">
			<h2 class="text-2xl font-bold">Flavors</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each berry.flavors as { flavor, potency }}
					<div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
						<div class="flex items-center justify-between mb-2">
							<span class="capitalize font-semibold">{flavor.name}</span>
							<span class="px-2 py-1 bg-red-500 text-white text-sm rounded">+{potency}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
