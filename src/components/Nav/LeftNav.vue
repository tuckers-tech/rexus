<template>
  <div class="left-nav bg-gray-100">
    <Logo />
    <AddConnectionModal
      :isModalOpen="isConnectionModalOpen"
      @close="closeConnectionModal"
    />
    <div class="flex flex-col px-2">
      <AddConnectionButton @click="openConnectionModal" />
      <ConnectionList
        v-for="connection of connections"
        :key="connection.name"
        :connection="connection"
      />
    </div>
  </div>
</template>

<script>
import ConnectionList from '@/components/Nav/ConnectionList.vue';
import AddConnectionButton from '@/components/Nav/AddConnectionButton.vue';
import Logo from '@/components/Nav/Logo';
import AddConnectionModal from '../Modals/AddConnectionModal.vue';

export default {
  name: 'LeftNav',
  components: {
    AddConnectionButton,
    ConnectionList,
    Logo,
    AddConnectionModal,
  },
  data() {
    return {
      isConnectionModalOpen: false,
    };
  },
  computed: {
    connections() {
      return this.$store.getters.getAllConnections;
    },
  },
  methods: {
    openConnectionModal() {
      this.isConnectionModalOpen = true;
    },
    closeConnectionModal() {
      this.isConnectionModalOpen = false;
    },
  },
};
</script>

<style scoped>
.left-nav {
  width: 250px;
}
</style>
