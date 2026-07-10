import { z } from 'zod';

// Pokemon schemas
export const PokemonSchema = z.object({
	id: z.number(),
	name: z.string(),
	sprites: z.object({
		front_default: z.string().nullable(),
		front_shiny: z.string().nullable(),
		back_default: z.string().nullable(),
		back_shiny: z.string().nullable(),
		other: z
			.object({
				official_artwork: z.object({
					front_default: z.string().nullable()
				})
			})
			.optional()
	}),
	types: z.array(
		z.object({
			type: z.object({
				name: z.string()
			})
		})
	),
	height: z.number(),
	weight: z.number(),
	abilities: z.array(
		z.object({
			ability: z.object({
				name: z.string()
			}),
			is_hidden: z.boolean()
		})
	),
	stats: z.array(
		z.object({
			base_stat: z.number(),
			stat: z.object({
				name: z.string()
			})
		})
	),
	moves: z.array(
		z.object({
			move: z.object({
				name: z.string()
			})
		})
	)
});

export const PokemonListSchema = z.object({
	results: z.array(
		z.object({
			name: z.string(),
			url: z.string()
		})
	),
	count: z.number()
});

export const PokemonSpeciesSchema = z.object({
	evolution_chain: z.object({
		url: z.string()
	})
});

export const EvolutionChainSchema = z.object({
	chain: z.any()
});

export const TypeSchema = z.object({
	name: z.string(),
	pokemon: z.array(
		z.object({
			pokemon: z.object({
				name: z.string()
			})
		})
	)
});

export const GenerationSchema = z.object({
	pokemon_species: z.array(
		z.object({
			name: z.string()
		})
	)
});

export const BerrySchema = z.object({
	id: z.number(),
	name: z.string(),
	firmness: z.object({
		name: z.string()
	}),
	flavors: z.array(
		z.object({
			flavor: z.object({
				name: z.string()
			}),
			potency: z.number()
		})
	),
	growth_time: z.number(),
	size: z.number()
});

export const BerryListSchema = z.object({
	results: z.array(
		z.object({
			name: z.string(),
			url: z.string()
		})
	),
	count: z.number()
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonList = z.infer<typeof PokemonListSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
export type EvolutionChain = z.infer<typeof EvolutionChainSchema>;
export type Type = z.infer<typeof TypeSchema>;
export type Generation = z.infer<typeof GenerationSchema>;
export type Berry = z.infer<typeof BerrySchema>;
export type BerryList = z.infer<typeof BerryListSchema>;
