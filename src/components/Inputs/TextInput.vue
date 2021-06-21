<template>
  <div class="w-full flex flex-col">
    <label class="text-lg font-medium" :for="name">{{ label }}</label>
    <input
      v-model="inputValue"
      class="border-2 border-gray-200 p-2 rounded"
      :id="name"
      :name="name"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(inputValue) {
        this.$emit('input', inputValue);
      },
    },
  },
};
</script>
