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
  },
};
</script>
