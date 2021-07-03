import { shallowMount } from '@vue/test-utils';
import TextInput from '@/components/Inputs/TextInput.vue';
import waitForNextTick from '../../../../helpers/waitForNextTick';

const propsData = {
  name: 'example',
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

  test('inputValue setter emits change value', () => {
    const testVal = 'Test';

    wrapper.vm.inputValue = testVal;

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([testVal]);
  });
});

describe('Input Functionality', () => {
  test('Input Hooked up to v-model', async () => {
    const textInput = wrapper.find('input[type="text"]');

    const targetValue = 'example';

    await textInput.setValue(targetValue);

    waitForNextTick(() => {
      expect(wrapper.vm.inputValue).toEqual(targetValue);
    });
  });
});
