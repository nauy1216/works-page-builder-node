import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import page from "./page";
import editor from "./editor";
Vue.use(Vuex);

const state = {};

const _mutations = {};
export type State = typeof state;
export type Mutations = typeof _mutations;
const mutations: MutationTree<{}> = _mutations;

const store = new Vuex.Store<{}>({
  state,
  mutations,
  actions: {},
  modules: {
    page,
    editor
  }
});

export default store;
