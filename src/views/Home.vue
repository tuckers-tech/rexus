<template>
  <div class="h-screen">
    <Layout>
      <h1>Home</h1>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue';

export default {
  name: 'Home',
  components: {
    Layout,
  },
  created() {
    this.$store.dispatch('setAllConnections');

    console.log('Starting connection to WebSocket Server');
    this.connection = new WebSocket('ws://localhost:4375');

    this.connection.onmessage = function(event) {
      console.log(event);
    };

    this.connection.onopen = function(event) {
      console.log(event);
      console.log('Successfully connected to the echo websocket server...');
    };
  },
};
</script>
