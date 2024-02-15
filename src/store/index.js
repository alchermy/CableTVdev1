import { createStore } from 'vuex';

export default createStore({
  state: {
    lineId: null,
    profile: null
  },
  mutations: {
    setLineId(state, lineId) {
      state.lineId = lineId;
    },
    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  actions: {
    saveLineData({ commit }, { lineId, profile }) {
      commit('setLineId', lineId);
      commit('setProfile', profile);
    }
  },
  getters: {
    getLineId(state) {
      return state.lineId;
    },
    getProfile(state) {
      return state.profile;
    }
  }
});
