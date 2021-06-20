import { shallowMount } from '@vue/test-utils';
import AddConnectionModal from '@/components/Modals/AddConnectionModal.vue';

const propsData = {
  isModalOpen: false,
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(AddConnectionModal, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(AddConnectionModal)).not.toBeUndefined();
  });
});
