import { shallowMount } from '@vue/test-utils';
import AddConnectionModal from '@/components/Modals/AddConnectionModal.vue';

import { single as connection } from '../../../fixures/Connections.json';

const emptyConnection = {
  name: '',
  host: '',
  port: '',
};

const mocks = {
  $store: {
    dispatch: jest.fn(() => Promise.resolve()),
  },
};

const propsData = {
  isModalOpen: false,
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(AddConnectionModal, {
    propsData,
    mocks,
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

describe('Methods', () => {
  test('clearFormData() clears form data', () => {
    wrapper.vm.connection = connection;

    wrapper.vm.clearFormData();

    expect(wrapper.vm.connection).toEqual(emptyConnection);
  });

  test('submitFormData() does not submit when name empty', () => {
    wrapper.vm.connection.host = 'localhost';
    wrapper.vm.connection.port = '1111';

    wrapper.vm.submitFormData();

    expect(mocks.$store.dispatch).toBeCalledTimes(0);
  });

  test('submitFormData() does not submit when host empty', () => {
    wrapper.vm.connection.name = 'localhost';
    wrapper.vm.connection.port = '1111';

    wrapper.vm.submitFormData();

    expect(mocks.$store.dispatch).toBeCalledTimes(0);
  });

  test('submitFormData() does not submit when port empty', () => {
    wrapper.vm.connection.host = 'localhost';
    wrapper.vm.connection.name = 'Local';

    wrapper.vm.submitFormData();

    expect(mocks.$store.dispatch).toBeCalledTimes(0);
  });

  test('submitFormData() does submit when valid', () => {
    wrapper.vm.connection.name = 'Local';
    wrapper.vm.connection.host = 'localhost';
    wrapper.vm.connection.port = '1111';

    wrapper.vm.submitFormData();

    expect(mocks.$store.dispatch).toBeCalledTimes(1);
  });
});
