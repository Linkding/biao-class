import Vue from 'vue'
import App from './App.vue';
import VueRouter from  'vue-router';
import 'font-awesome/css/font-awesome.css';
import 'normalize.css';
import './css/common/global.css';


Vue.use(VueRouter);
Vue.config.productionTip = false

import Home from './page/Home';
import AdminBase from './page/admin/Base'
import Stock from './page/admin/Stock'
import Trade from './page/admin/Trade'
import Account from './page/admin/Account'
import User from './page/admin/User'

const router = new VueRouter({
  routes:[
    {path:'/',component:Home},
    {
      path:'/admin',component:AdminBase,
      children:[
        {path:'stock',component:Stock},
        {path:'trade',component:Trade},
        {path:'user',component:User},
        {path:'account',component:Account},
      ]
    }
  ]
})
new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
