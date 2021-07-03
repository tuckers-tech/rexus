import { shallowMount } from '@vue/test-utils';
import LeftNav from '@/components/Nav/LeftNav.vue';

import { multiple as connections } from '../../../fixures/Connections.json';

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

describe('Methods', () => {
  test('openConnectionModal() opens modal', () => {
    wrapper.vm.isConnectionModalOpen = false;

    wrapper.vm.openConnectionModal();

    expect(wrapper.vm.isConnectionModalOpen).toBe(true);
  });

  test('closeConnectionModal() closes modal', () => {
    wrapper.vm.isConnectionModalOpen = true;

    wrapper.vm.closeConnectionModal();

    expect(wrapper.vm.isConnectionModalOpen).toBe(false);
  });
});
