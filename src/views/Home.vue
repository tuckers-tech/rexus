<template>
  <div class="h-screen">
    <Layout>
      <div class="flex flex-col w-full overflow-y-auto"></div>
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
};
</script>
