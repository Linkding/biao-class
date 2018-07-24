import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import './css/global.css';
import 'normalize.css';

import Home from './page/Home';
import Search from './page/Search';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path:'/',component:Home,meta:{title:'首页 |Aroma'}},
    {path:'/search',component:Search ,meta:{title:'搜索|Aroma'}}
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
