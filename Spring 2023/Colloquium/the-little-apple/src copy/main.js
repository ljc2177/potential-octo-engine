import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Bronx from './components/Bronx.vue';
import Brooklyn from './components/Brooklyn.vue';
import Manhattan from './components/Manhattan.vue';
import Queens from './components/Queens.vue';
import StatenIsland from './components/StatenIsland.vue';

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/bronx/', component: Bronx },
    { path: '/brooklyn/', component: Brooklyn },
    { path: '/manhattan/', component: Manhattan },
    { path: '/queens/', component: Queens },
    { path: '/statenisland/', component: StatenIsland }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')