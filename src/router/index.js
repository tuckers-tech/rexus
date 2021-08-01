import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Connection from '../views/Connection/Connection.vue';
import ConnectionDashboard from '../views/Connection/ConnectionDashboard.vue';
import ConnectionQuery from '../views/Connection/ConnectionQuery.vue';
import ConnectionWatch from '../views/Connection/ConnectionWatch.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/connection/:id',
    name: 'Connection',
    component: Connection,
    children: [
      {
        name: 'ConnectionDashboard',
        path: 'dashboard',
        component: ConnectionDashboard,
      },
      {
        name: 'ConnectionQuery',
        path: 'query',
        component: ConnectionQuery,
      },
      {
        name: 'ConnectionWatch',
        path: 'watch',
        component: ConnectionWatch,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
