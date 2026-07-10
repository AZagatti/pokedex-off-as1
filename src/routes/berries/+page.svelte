<script lang="ts">
	import type { PageData } from './$types';

	interface Berry {
		id: number;
		name: string;
		firmness: { name: string };
		growth_time: number;
		size: number;
		flavors: Array<{ flavor: { name: string }; potency: number }>;
	}

	let { data }: { data: PageData } = $props();
	let berries = $derived.by(() => (data.berries as unknown as Berry[]) ?? []);
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-4xl font-bold mb-2">Berries</h1>
		<p class="text-slate-600 dark:text-slate-400">Pokémon berries and their properties</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
		{#each berries as berry (berry.id)}
			<a
				href={`/berries/${berry.name}`}
				class="group p-4 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg dark:hover:shadow-xl dark:shadow-black/30 transition transform hover:-translate-y-1"
			>
				<h3 class="font-semibold capitalize text-lg mb-3 group-hover:text-red-500 transition">
					{berry.name}
				</h3>
				<div class="space-y-2 text-sm">
					<div>
						<span class="text-slate-600 dark:text-slate-400">Firmness:</span>
						<span class="ml-2 capitalize font-semibold">{berry.firmness.name}</span>
					</div>
					<div>
						<span class="text-slate-600 dark:text-slate-400">Growth Time:</span>
						<span class="ml-2 font-semibold">{berry.growth_time} hours</span>
					</div>
					<div>
						<span class="text-slate-600 dark:text-slate-400">Size:</span>
						<span class="ml-2 font-semibold">{berry.size} mm</span>
					</div>
					{#if berry.flavors.length > 0}
						<div>
							<span class="text-slate-600 dark:text-slate-400">Flavors:</span>
							<div class="flex flex-wrap gap-1 mt-1">
								{#each berry.flavors as { flavor }}
									<span class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs capitalize">
										{flavor.name}
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
