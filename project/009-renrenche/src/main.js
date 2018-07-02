import "normalize.css";
import "./main.css";
import 'font-awesome/css/font-awesome.css';
import VueRouter from 'vue-router';

import Vue from 'vue';
import Root from './Root.vue';
import Home from './page/Home'
import Detail from './page/Detail.vue';
import Login from './page/Login';
import Singup from './page/Singup';
import SearchResult from './page/SearchResult';
import AdminBase from './page/admin/Base';
import Vehicle from './page/admin/Vehicle';


import Me from './page/settings/Me';

import SettingNav from './components/SettingNav';
import DropDown from './components/DropDown';
import SearchBar from './components/SearchBar';

Vue.config.productionTip = false;

Vue.use(VueRouter);


const router = new VueRouter({
  routes:[
    {path:'/',component:Home},
    {path:'/detail',component:Detail},
    {path:'/login',component:Login},
    {path:'/singup',component:Singup},
    {path:'/searchresult',component:SearchResult},
    {path:'/vehicle',component:Vehicle},
    {path:'/me',component:Me},
    {path:'/settingnav',component:SettingNav},
    {path:'/dropdown',component:DropDown},
    {path:'/searchbar',component:SearchBar},
    {
      path:'/admin',
      component:AdminBase,
      children:[
        {path:'vehicle',component:Vehicle},
      ]
    }
  ]
});

new Vue({
  render: h => h(Root),
  router:router,
}).$mount('#root');