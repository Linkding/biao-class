import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import './css/global.css';
import 'normalize.css';

import Home from './page/Home';
import Search from './page/Search';

import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Breed from './page/admin/Breed';
import Location from './page/admin/Location';
import Material from './page/admin/Material';
import Order from './page/admin/Order';
import ToolType from './page/admin/ToolType';
import Wine from './page/admin/Wine';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
      {path:'/search',component:Search ,meta:{title:'搜索|Aroma'}},
      {path:'/',component:Home,meta:{title:'首页 |Aroma'}},
      {path:'/admin', component:AdminBase,
        children:[
          {path:'user',component:User},
          {path:'breed',component:Breed},
          {path:'location',component:Location},
          {path:'material',component:Material},
          {path:'order',component:Order},
          {path:'tooltype',component:ToolType},
          {path:'wine',component:Wine},
        ]
    }
  ]
        
})

router.beforeEach((to,from,next)=>{
  next();
  document.title = to.meta.title;
})
  
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
