import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import './css/global.css';
import 'normalize.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

import Home from './page/Home';
import Search from './page/Search';
import Detail from './page/Detail';
import NewOrder from './page/NewOrder';
import Pay from './page/Pay';
import Login from './page/Login';
import Signup from './page/Signup';
import Me from './page/Me';
import MeOrder from './page/MeOrder';
import MeSetting from './page/MeSetting';


import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Breed from './page/admin/Breed';
import Location from './page/admin/Location';
import Material from './page/admin/Material';
import Order from './page/admin/Order';
import Ptype from './page/admin/Ptype';
import Product from './page/admin/Product';
import Occasion from './page/admin/Occasion';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path:'/',component:Home,meta:{title:'首页 |Aroma'}},
      {path:'/search',component:Search ,meta:{title:'搜索|Aroma'}},
      {path:'/detail/:id',component:Detail ,meta:{title:'详情|Aroma'}},
      {path:'/neworder',component:NewOrder ,meta:{title:'订单|Aroma'}},
      {path:'/login',component:Login ,meta:{title:'登录|Aroma'}},
      {path:'/signup',component:Signup ,meta:{title:'注册|Aroma'}},
      {path:'/pay/:oid',component:Pay ,meta:{title:'支付|Aroma'}},
      {path:'/me',component:Me ,meta:{title:'用户中心|Aroma'},
        children:[
          {path:'order',component:MeOrder,meta:{title:'用户订单|Aroma'}},
          {path:'setting',component:MeSetting,meta:{title:'设置|Aroma'}},
        ]
      },
      {path:'/admin', component:AdminBase,meta:{title:'后台 |Aroma'},
        children:[
          {path:'user',component:User,meta:{title:'用户管理 |Aroma'}},
          {path:'breed',component:Breed,meta:{title:'品种管理 |Aroma'}},
          {path:'location',component:Location ,meta:{title:'产地管理 |Aroma'}},
          {path:'material',component:Material ,meta:{title:'材质管理 |Aroma'}},
          {path:'order',component:Order ,meta:{title:'订单管理 |Aroma'}},
          {path:'occasion',component:Occasion ,meta:{title:'场合管理 |Aroma'}},
          {path:'ptype',component:Ptype ,meta:{title:'产品类型管理 |Aroma'}},
          {path:'product',component:Product ,meta:{title:'产品管理 |Aroma'}},
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
