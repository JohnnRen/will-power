import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Router from 'vue-router';
import Test from './views/Test.vue';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
});
