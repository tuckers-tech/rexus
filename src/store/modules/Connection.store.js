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
      console.error('Error Setting Connection');
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
      console.error('Error Adding connection');
    }
  },
  async startWatchingConnection(_, targetID) {
    try {
      await axios.post(
        `${window.API_LOCATION}/api/v1/connection/${parseInt(
          targetID,
          10,
        )}/connect`,
      );
    } catch (err) {
      console.error('Error Watching Connection');
    }
  },
  async stopWatchingConnection(_, targetID) {
    try {
      await axios.post(
        `${window.API_LOCATION}/api/v1/connection/${parseInt(
          targetID,
          10,
        )}/disconnect`,
      );
    } catch (err) {
      console.error('Error Watching Connection');
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
