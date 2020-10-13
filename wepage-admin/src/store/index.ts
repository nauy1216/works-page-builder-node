import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectComp: null
  },
  mutations: {
    setSelectComp(state, comp) {
      state.selectComp = comp
    }
  },
  actions: {},
  modules: {}
});
