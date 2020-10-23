import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { AppConfig } from "@/types/appConfig";

Vue.use(Vuex);

const state = {
  isFrame: window.top !== window,
  appConfig: {} as AppConfig
};
const mutations = {
  setAppConfig(state: State, config: AppConfig) {
    state.appConfig = Object.assign({}, config);
  }
};

const getters = {};
const actions = {};
export type State = typeof state;
export type Mutations = typeof mutations;
export type Getters = typeof getters;
export type Actions = typeof actions;

const store = new Vuex.Store<State>({
  state,
  mutations: mutations as MutationTree<State>,
  getters,
  actions,
  modules: {}
});

export default store;
