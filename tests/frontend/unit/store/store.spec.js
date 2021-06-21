import { shallowMount, createLocalVue } from '@vue/test-utils';
import Connection from '@/store/modules/Connection.store';
import Vuex from 'vuex';

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
});

afterEach(() => {
  wrapper.destroy();

  storeRef = null;
});

describe('Modules Available', () => {
  test('Connection module is available', () => {
    expect(storeRef.state.Connection).not.toBeUndefined();
  });
});
