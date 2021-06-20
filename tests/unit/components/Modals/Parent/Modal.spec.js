import { shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modals/Parent/Modal.vue';

const propsData = {};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(Modal, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(Modal)).not.toBeUndefined();
  });
});
