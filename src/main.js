import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

window.addEventListener('message', (e) => {
  if (
    e.data &&
    typeof e.data === 'string' &&
    e.data.match(/webpackHotUpdate/)
  ) {
    location.reload();
    console.clear();
  }
});
