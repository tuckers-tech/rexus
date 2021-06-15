<template>
  <div class="left-nav bg-gray-100">
    <div class="logo text-2xl py-2">
      REXUS
    </div>
    <div class="flex flex-col px-2">
      <ConnectionList />
      <ConnectionList />
    </div>
  </div>
</template>

<script>
import ConnectionList from '@/components/Nav/ConnectionList.vue';

export default {
  name: 'LeftNav',
  components: {
    ConnectionList,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');

.left-nav {
  width: 250px;
}

.logo {
  font-family: 'Nunito', sans-serif;
}
</style>
