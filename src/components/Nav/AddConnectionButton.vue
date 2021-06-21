<template>
  <div>
    <button
      class="w-full flex justify-center	py-2 mb-2 rounded bg-green-500 hover:bg-green-600 text-white width"
      @click="onClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      &nbsp;Add Connection
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddConnectionButton',
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
