<template>
  <div
    class="w-screen h-screen bg-opacity-50 fixed top-0 bg-gray-900 flex justify-center items-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white text-left rounded" :class="sizeClass">
      <div v-if="title">
        <div class="flex p-5">
          <h2 class="text-xl font-medium">{{ title }}</h2>
          <div class="flex-1"></div>
          <button
            class="flex justify-center items-center hover:bg-red-300 hover:text-white rounded close-btn"
            @click="$emit('close')"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr />
      </div>
      <div class="px-5 py-2">
        <slot />
      </div>
      <div class="">
        <hr />
        <div class="py-2 px-5">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    title: String,
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'sm':
          return 'w-1/4';
        case 'md':
          return 'w-2/4';
        case 'lg':
          return 'w-3/4';
        case 'xl':
          return 'w-5/6';
        default:
          return 'w-2/4';
      }
    },
  },
};
</script>

<style scoped>
.close-btn {
  width: 23px;
  height: 23px;
}
</style>
