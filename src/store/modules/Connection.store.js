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
    const results = await fetch(`${window.API_LOCATION}/api/v1/connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConnection),
    }).then((response) => response.json());

    commit('addConnection', results);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
