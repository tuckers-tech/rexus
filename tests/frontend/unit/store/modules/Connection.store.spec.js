import { shallowMount, createLocalVue } from '@vue/test-utils';
import Connection from '@/store/modules/Connection.store';
import Vuex from 'vuex';

import { single as newConnection } from '../../../fixures/Connections.json';

let wrapper;
let storeRef;

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Connection,
  },
});

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
  test('addConnection updates connections', () => {
    storeRef.commit('addConnection', newConnection);
    const targetStateVal = [];
    targetStateVal.push(newConnection);
    expect(storeRef.state.Connection.connections).toEqual(targetStateVal);
  });
});

describe('Actions', () => {
  test('connection is defined on state', async () => {
    await storeRef.dispatch('addConnection', newConnection);

    const targetStateVal = [];
    targetStateVal.push(newConnection);

    expect(storeRef.state.Connection.connections).toEqual(targetStateVal);
  });
});
