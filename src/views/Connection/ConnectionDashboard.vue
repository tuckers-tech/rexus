<template>
  <div>
    <div v-if="targetConnection && serverInfo">
      <ServerCard :connectionInfo="targetConnection" :serverInfo="serverInfo" />
      <DBCard :serverInfo="serverInfo" />
      <ClientCard :serverInfo="serverInfo" />
      <CPUCard :serverInfo="serverInfo" />
      <MemoryCard :serverInfo="serverInfo" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ServerCard from '../../components/Connection/ServerCard.vue';
import DBCard from '../../components/Connection/DBCard.vue';
import ClientCard from '../../components/Connection/ClientCard.vue';
import CPUCard from '../../components/Connection/CPUCard.vue';
import MemoryCard from '../../components/Connection/MemoryCard.vue';
export default {
  components: { ServerCard, DBCard, ClientCard, CPUCard, MemoryCard },
  name: 'ConnectionDashboard',
  data() {
    return {
      serverInfo: undefined,
      updateInterval: undefined,
      updateTime: 3000,
    };
  },
  computed: {
    targetConnectionID() {
      return parseInt(this.$route.params.id, 10);
    },
    targetConnection() {
      return this.$store.getters.getConnectionByID(this.targetConnectionID);
    },
  },
  async created() {
    this.updateConnectionData();
    this.setUpdateInterval(this.updateTime);
  },
  destroyed() {
    clearInterval(this.updateInterval);
  },
  methods: {
    async setUpdateInterval(updateTime) {
      this.updateInterval = setInterval(() => {
        this.updateConnectionData();
      }, updateTime);
    },
    async updateConnectionData() {
      const { data } = await axios.get(
        `${window.API_LOCATION}/api/v1/connection/${this.targetConnectionID}/server-info`,
      );
      this.serverInfo = data;
      console.log('Updated Server Info');
    },
  },
};
</script>

<style></style>
