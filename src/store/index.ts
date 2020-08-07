import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import tableData from "./tableData";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: { user, tableData }
});
