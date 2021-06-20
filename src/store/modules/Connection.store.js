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
  async addConnection({ commit }, newConnection) {
    console.log(newConnection);
    commit('addConnection', newConnection);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
