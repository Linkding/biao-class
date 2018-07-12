import "normalize.css";
import "./main.css";
import 'font-awesome/css/font-awesome.css';
import VueRouter from 'vue-router';

import Vue from 'vue';
import Root from './Root.vue';
import Home from './page/Home'
import Detail from './page/Detail';
import Login from './page/Login';
import Signup from './page/Signup';
import Search from './page/Search';
import AdminBase from './page/admin/Base';
import Vehicle from './page/admin/Vehicle';
import User from './page/admin/User';
import Brand from './page/admin/Brand';
import Model from './page/admin/Model';
import Design from './page/admin/Design';
import Report from './page/admin/Report';


import Me from './page/settings/Me';

import SettingNav from './components/SettingNav';
import DropDown from './components/DropDown';
import SearchBar from './components/SearchBar';
import Location from './components/Location';

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.filter('only_day', function (value) {
  if (!value)
    return value;
  return value.split(' ')[0];
})

Vue.filter('percentage', function (value) {
  if (!value)
    return 0;

  // return value.toFixed(2) * 100  + '%';
  // console.log('value',value)
  return Number(value * 100).toFixed(2) + '%';
})

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/detail/:id', component: Detail },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/search', component: Search },
    { path: '/vehicle', component: Vehicle },
    { path: '/me', component: Me },
    { path: '/settingnav', component: SettingNav },
    { path: '/dropdown', component: DropDown },
    { path: '/searchbar', component: SearchBar },
    { path: '/location', component: Location },
    {
      path: '/admin', component: AdminBase,
      children: [
        { path: 'vehicle', component: Vehicle },
        { path: 'user', component: User },
        { path: 'brand', component: Brand },
        { path: 'model', component: Model },
        { path: 'design', component: Design },
        { path: 'report', component: Report },
      ]
    }
  ]
});

new Vue({
  render: h => h(Root),
  router: router,
}).$mount('#root');

