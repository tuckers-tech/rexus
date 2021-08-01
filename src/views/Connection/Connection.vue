<template>
  <div class="h-screen">
    <Layout>
      <div class="flex flex-col w-full overflow-y-auto">
        <router-view></router-view>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue';

export default {
  name: 'Connection',
  components: {
    Layout,
  },
};
</script>

<style></style>
