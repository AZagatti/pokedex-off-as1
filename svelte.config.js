import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			fallback: '404.html',
			precompress: true
		}),
		paths: {
			base: '/pokedex-off-as1'
		},
		prerender: {
			entries: ['/', '/berries', '/favorites']
		}
	}
};
