import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Nav/Logo.vue';

const propsData = {};

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Logo, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(Logo)).not.toBeUndefined();
  });
});
