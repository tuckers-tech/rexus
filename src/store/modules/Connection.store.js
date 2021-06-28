import axios from 'axios';

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
  async setAllConnections({ commit }) {
    try {
      const { data } = await axios.get(
        `${window.API_LOCATION}/api/v1/connection`,
      );

      const mappedResults = data.map((row) => ({
        id: row.con_id,
        name: row.con_name,
        host: row.con_host,
        port: row.con_port,
      }));

      commit('setConnections', mappedResults);
    } catch (err) {
      console.log(err);
    }
  },
  async addConnection({ commit }, newConnection) {
    try {
      const { data } = await axios.post(
        `${window.API_LOCATION}/api/v1/connection`,
        newConnection,
      );

      commit('addConnection', data);
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
