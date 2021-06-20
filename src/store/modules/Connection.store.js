const state = {
  connections: [],
};

const getters = {
  getAllConnections(stateRef) {
    return stateRef.connections;
  },
};

const mutations = {
  addConnection(stateRef, newConnection) {
    stateRef.connections.push(newConnection);
  },
};

const actions = {
  addConnection({ commit }, newConnection) {
    commit('addConnection', newConnection);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
