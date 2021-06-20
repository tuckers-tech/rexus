<template>
  <Modal
    v-if="isModalOpen"
    title="Add Connection"
    size="md"
    @close="$emit('close')"
  >
    <div class="w-full flex flex-col">
      <div class="flex mb-2">
        <TextInput
          v-model="connection.name"
          label="Name:"
          name="name"
          placeholder="Local"
        />
      </div>
      <div class="flex">
        <TextInput
          v-model="connection.host"
          class="mr-2"
          label="Host:"
          name="host"
          placeholder="localhost"
        />
        <TextInput
          v-model="connection.port"
          label="Port:"
          name="port"
          placeholder="6379"
        />
      </div>
    </div>
    <template v-slot:actions>
      <div class="flex justify-end">
        <button
          class="hover:bg-red-300 px-5 py-2 border-2 border-gray-200 hover:border-red-300 hover:text-white rounded mr-2"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-green-400 text-white px-5 py-2 border-2 border-green-400 rounded"
          @click="submitFormData"
        >
          Add Connection
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Layout/Modal.vue';
import TextInput from '@/components/Inputs/TextInput.vue';

export default {
  name: 'AddConnectionModal',
  components: {
    Modal,
    TextInput,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      connection: {
        name: '',
        host: '',
        port: '',
      },
    };
  },
  methods: {
    clearFormData() {
      this.connection = {
        name: '',
        host: '',
        port: '',
      };
    },
    async submitFormData() {
      if (
        this.connection.name.length > 0 &&
        this.connection.host.length > 0 &&
        this.connection.port.length > 0
      ) {
        await this.$store.dispatch('addConnection', this.connection);
        this.$emit('close');
        this.clearFormData();
      }
    },
  },
};
</script>
