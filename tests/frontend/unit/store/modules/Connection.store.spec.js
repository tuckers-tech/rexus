import { shallowMount, createLocalVue } from '@vue/test-utils';
import Connection from '@/store/modules/Connection.store';
import Vuex from 'vuex';

import axios from 'axios';

import {
  single as newConnection,
  multiple as connections,
  multipleSQL,
} from '../../../fixures/Connections.json';

let wrapper;
let storeRef;

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Connection,
  },
});

axios.get = jest.fn(() => Promise.resolve({ data: connections }));
axios.post = jest.fn(() => Promise.resolve({ data: newConnection }));

beforeEach(() => {
  const Component = {
    render() {},
  };
  wrapper = shallowMount(Component, {
    localVue,
    store,
  });

  storeRef = wrapper.vm.$store;
  storeRef.commit('setConnections', []);
});

afterEach(() => {
  wrapper.destroy();

  storeRef = null;
});

describe('State', () => {
  test('connection is defined on state', () => {
    expect(storeRef.state.Connection.connections).not.toBeUndefined();
  });
});

describe('Getters', () => {
  test('getAllConnections returns all connections when empty', () => {
    expect(storeRef.getters.getAllConnections).toEqual([]);
  });

  test('getAllConnections returns all connections when populated', () => {
    storeRef.commit('addConnection', newConnection);
    const targetStateVal = [];
    targetStateVal.push(newConnection);
    expect(storeRef.getters.getAllConnections).toEqual(targetStateVal);
  });
});

describe('Mutations', () => {
  test('setConnections updates all connections', () => {
    storeRef.commit('setConnections', connections);
    expect(storeRef.state.Connection.connections).toEqual(connections);
  });
  test('addConnection updates connections', () => {
    storeRef.commit('addConnection', newConnection);
    const targetStateVal = [];
    targetStateVal.push(newConnection);
    expect(storeRef.state.Connection.connections).toEqual(targetStateVal);
  });
});

describe('Actions', () => {
  test('setAllConnections returns all connections', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: multipleSQL }),
    );

    await storeRef.dispatch('setAllConnections');

    expect(storeRef.state.Connection.connections).toEqual(connections);
  });
  test('Add Connection Adds A Connection', async () => {
    await storeRef.dispatch('addConnection', newConnection);

    const targetStateVal = [];
    targetStateVal.push(newConnection);

    expect(storeRef.state.Connection.connections[0]).toEqual(newConnection);
  });
});
