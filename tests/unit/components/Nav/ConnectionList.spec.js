import { shallowMount } from '@vue/test-utils';
import ConnectionList from '@/components/Nav/ConnectionList.vue';

import { single as connection } from '../../../fixures/Connections.json';

const propsData = {
  connection,
};

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ConnectionList, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(ConnectionList)).not.toBeUndefined();
  });
});

describe('Methods', () => {
  test('toggleIsOpen()', () => {
    wrapper.vm.toggleIsOpen();
    expect(wrapper.vm.isOpen).toBe(true);
  });
});
