import { shallowMount } from '@vue/test-utils';
import LeftNav from '@/components/Nav/LeftNav.vue';

import { multiple as connections } from '../../../fixures/Connections.json';

const propsData = {};

const mocks = {
  $store: {
    getters: {
      getAllConnections: connections,
    },
  },
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(LeftNav, {
    propsData,
    mocks,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(LeftNav)).not.toBeUndefined();
  });
});
