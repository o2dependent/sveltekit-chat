import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		defaults: {
			style: 'postcss'
		},
		postcss: true
	}),

	kit: {
		adapter: adapter(),

		vite: {
			resolve: {
				alias: {
					$stores: path.resolve('./src/stores'),
					$services: path.resolve('./src/services')
				}
			}
		},

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
