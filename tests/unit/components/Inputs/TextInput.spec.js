import { shallowMount } from '@vue/test-utils';
import TextInput from '@/components/Inputs/TextInput.vue';

const propsData = {
  name: 'Name:',
  placeholder: 'Local Docker',
  label: 'Name:',
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(TextInput, {
    propsData,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Creates Component', () => {
  test('Loads Component', () => {
    expect(wrapper.findComponent(TextInput)).not.toBeUndefined();
  });
  test('Defaults to empty value', () => {
    expect(wrapper.vm.value).toBe('');
  });
  test('Takes default value when passed in', () => {
    const defaultVal = 'Test';
    wrapper = shallowMount(TextInput, {
      propsData: {
        ...propsData,
        value: defaultVal,
      },
    });
    expect(wrapper.vm.value).toBe(defaultVal);
  });
});

describe('Computed Values', () => {
  test('inputValue getter with default val', () => {
    expect(wrapper.vm.inputValue).toBe('');
  });

  test('inputValue getter with predefined val', () => {
    const val = 'Test';
    wrapper = shallowMount(TextInput, {
      propsData: {
        ...propsData,
        value: val,
      },
    });
    expect(wrapper.vm.inputValue).toBe(val);
  });

  test('inputValue setter', () => {
    const testVal = 'Test';
    const mocks = {
      $emit: jest.fn(() => undefined),
    };
    wrapper = shallowMount(TextInput, {
      propsData: {
        ...propsData,
      },
      mocks,
    });

    wrapper.vm.inputValue = testVal;

    expect(wrapper.vm.$emit).toBeCalledTimes(1);
  });
});
