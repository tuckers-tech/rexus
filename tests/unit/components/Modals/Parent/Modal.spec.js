import { shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modals/Parent/Modal.vue';

const propsData = {
  title: 'Example Modal',
};

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

describe('Computed Props', () => {
  test('sizeClass() small', () => {
    const propsData = {
      title: 'Example Modal',
      size: 'sm',
    };

    wrapper = shallowMount(Modal, {
      propsData,
    });
    expect(wrapper.vm.sizeClass).toBe('w-1/4');
  });

  test('sizeClass() medium', () => {
    const propsData = {
      title: 'Example Modal',
      size: 'md',
    };

    wrapper = shallowMount(Modal, {
      propsData,
    });
    expect(wrapper.vm.sizeClass).toBe('w-2/4');
  });

  test('sizeClass() large', () => {
    const propsData = {
      title: 'Example Modal',
      size: 'lg',
    };

    wrapper = shallowMount(Modal, {
      propsData,
    });
    expect(wrapper.vm.sizeClass).toBe('w-3/4');
  });

  test('sizeClass() xl', () => {
    const propsData = {
      title: 'Example Modal',
      size: 'xl',
    };

    wrapper = shallowMount(Modal, {
      propsData,
    });
    expect(wrapper.vm.sizeClass).toBe('w-5/6');
  });

  test('sizeClass() default', () => {
    const propsData = {
      title: 'Example Modal',
      size: 'smallish',
    };

    wrapper = shallowMount(Modal, {
      propsData,
    });
    expect(wrapper.vm.sizeClass).toBe('w-2/4');
  });
});
