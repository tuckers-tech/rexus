import { shallowMount } from '@vue/test-utils';
import Layout from '@/components/Layout/Layout.vue';
import LeftNav from '@/components/Nav/LeftNav.vue';

const propsData = {};

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Layout, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Create', () => {
  test('Component is created', () => {
    expect(wrapper.findComponent(Layout)).not.toBeUndefined();
    expect(wrapper.findComponent(LeftNav)).not.toBeUndefined();
  });
});
