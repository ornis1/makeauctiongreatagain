import { MutationTree, GetterTree } from "vuex";

interface UserState {
	accessToken: string | null;
}

const state: UserState = {
	accessToken: null
};

const mutations: MutationTree<UserState> = {
	SET_ACCESS_TOKEN(state, payload: string | null) {
		state.accessToken = payload;
	}
};

const getters: GetterTree<UserState, {}> = {
	token: state => state.accessToken,
	online: state => !!state.accessToken
};

export default {
	namespaced: true,
	state,
	mutations,
	getters
};
