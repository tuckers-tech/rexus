<template>
  <div class="w-full rounded" :class="{ 'bg-gray-200': isOpen }">
    <button
      @click="toggleIsOpen"
      class="flex hover:bg-gray-300 w-full py-2 rounded"
      :class="{ 'bg-gray-300': isOpen }"
    >
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-5 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <svg
        v-if="isOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-5 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 12H4"
        />
      </svg>
      {{ connection.name }}
      <div class="flex-1"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    </button>
    <div v-if="isOpen" class="flex flex-col p-2">
      <router-link
        :to="{ name: 'ConnectionDashboard', params: { id: connection.id } }"
        tag="button"
        class="flex hover:bg-gray-300 w-full py-2 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        Dashboard
      </router-link>
      <router-link
        :to="{ name: 'ConnectionQuery', params: { id: connection.id } }"
        tag="button"
        class="flex hover:bg-gray-300 w-full py-2 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Query
      </router-link>
      <router-link
        :to="{ name: 'ConnectionWatch', params: { id: connection.id } }"
        tag="button"
        class="flex hover:bg-gray-300 w-full py-2 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Watch
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectionList',
  props: {
    connection: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style></style>
