import { ActionTree, MutationTree, GetterTree } from "vuex";

export type data = {
	id: number;
	title: string;
	amount: number;
	video: string | null;
};

interface TableData {
	data: data[];
	lastItem: data | null;
	selectedItem: data | null;
}

const state: TableData = {
	data: [],
	lastItem: null,
	selectedItem: null
};

const mutations: MutationTree<TableData> = {
	ADD_DATA(state, payload: data) {
		state.data.push(payload);
	},
	SET_DATA(state, payload: data[]) {
		state.data = payload;
	},
	SET_LAST_ITEM(state, payload: data) {
		state.lastItem = payload;
	},
	SET_SELECTED_ITEM(state, payload: data) {
		state.selectedItem = payload;
	}
};
const actions: ActionTree<TableData, {}> = {
	addData({ commit }, payload: data) {
		commit("ADD_DATA", payload);
		commit("SET_LAST_ITEM", payload);
	},
	change({ commit, state }, payload: data) {
		const { id, amount, title, video } = payload;
		const newData = state.data.map(item => {
			if (item.id === id) {
				const newAmount = amount ? item.amount + amount : item.amount;
				const newTitle = title ? title : item.title;
				const newVideo = video !== undefined ? video : item.video;
				return {
					...item,
					title: newTitle,
					amount: newAmount,
					video: newVideo
				};
			}
			return item;
		});
		commit("SET_DATA", newData);
	}
};

const getters: GetterTree<TableData, {}> = {
	data: state => state.data,
	lastItem: state => state.lastItem,
	selectedItem: state => state.selectedItem,
	total: state => state.data.reduce((acc, v) => (acc += v.amount), 0),
	winner: state => {
		if (!state.data.length) return "Отсутствует";

		const data = [...state.data];
		data.sort((a, b) => b.amount - a.amount);
		return data[0].title;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
