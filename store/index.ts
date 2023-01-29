import { Context } from '@nuxt/types';
import { ActionTree, MutationTree } from 'vuex';
import { Product } from '~/product';

export const state = () => ({
	products: null as Product[] | null,
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
	UPDATE_PRODUCTS: (state, newProducts: Product[]) =>
		(state.products = newProducts),
};

export const actions: ActionTree<RootState, RootState> = {
	async nuxtServerInit({ commit }, { $axios }: Context) {
		const newProducts: Product[] = await $axios.$get('products');
		commit('UPDATE_PRODUCTS', newProducts);
	},
};
