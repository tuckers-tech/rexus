const state = {
  connections: [],
};

const getters = {
  getAllConnections(stateRef) {
    return stateRef.connections;
  },
};

const mutations = {
  setConnections(stateRef, newConnections) {
    stateRef.connections = newConnections;
  },
  addConnection(stateRef, newConnection) {
    stateRef.connections.push(newConnection);
  },
};

const actions = {
  async addConnection({ commit }, newConnection) {
    commit('addConnection', newConnection);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
