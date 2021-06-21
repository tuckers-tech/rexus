import { shallowMount } from '@vue/test-utils';
import AddConnectionButton from '@/components/Nav/AddConnectionButton.vue';

const propsData = {};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(AddConnectionButton, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(AddConnectionButton)).not.toBeUndefined();
  });
});

describe('Methods', () => {
  test('onClick()', () => {
    wrapper.vm.onClick();
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
