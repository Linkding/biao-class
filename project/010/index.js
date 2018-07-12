import Vue from "vue";
import Home from "./page/Home";
import Router from "vue-router";

const routes = [
    {path:'/', component:Home},
]

const router = new Router({
    routes,
})

Vue.use(Router);

new Vue({
    el:"#root",
    data:{
        name:'wah',
    }
})