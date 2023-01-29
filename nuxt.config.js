export default {
	buildModules: ['@nuxt/typescript-build'],
	css: ['~/assets/scss/index.scss'],
	modules: [
		'@nuxtjs/composition-api/module',
		'@nuxtjs/axios',
		'@nuxtjs/svg',
	],
	head: {
		title: 'Product Slider App',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
		],
	},
	axios: {
		baseURL: process.env.API_URL,
	},
};
