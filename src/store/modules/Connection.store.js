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
  async getAllConnections({ commit }) {
    const results = await fetch(`${window.API_LOCATION}/api/v1/connection`, {
      method: 'GET',
    }).then((response) => response.json());

    const mappedResults = results.map((row) => ({
      id: row.con_id,
      name: row.con_name,
      host: row.con_host,
      port: row.con_port,
    }));

    commit('setConnections', mappedResults);
  },
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
