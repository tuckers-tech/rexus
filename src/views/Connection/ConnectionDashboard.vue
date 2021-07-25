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
    const { data } = await axios.get(
      `${window.API_LOCATION}/api/v1/connection/${this.targetConnectionID}/server-info`,
    );
    this.serverInfo = data;
    console.log(this.serverInfo);
  },
};
</script>

<style></style>
