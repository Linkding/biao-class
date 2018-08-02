<template>
    <div>
        <div class="header">
            <Nav/>
        </div>
        <div class="container">
            <div @mouseleave="cat_panel = ''" class="search-area">
                <div  class="search-bar">
                    <span @mouseover="cat_panel = 'wine'" class="search-item">
                        <img src="../assets/bottle02-icon.png" alt="">
                        <div>餐酒</div>
                    </span>
                    <span @mouseover="cat_panel = 'winetool'"  class="search-item">
                        <img src="../assets/glass-icon.png" alt="">
                        <div>酒具</div>
                    </span>
                    <span  @mouseover="cat_panel = 'wineparty'" class="search-item">
                        <img src="../assets/wineparty02-icon.png" alt="">
                        <div>宴会</div>
                    </span>
                    <span @mouseover="cat_panel = 'new'" class="search-item">
                        <img src="../assets/newwine-icon.png" alt="">
                        <div>新酒</div>
                    </span>
                </div>
                <div class="cat-panel">
                    <div v-show="cat_panel == 'wine'" class="wine">
                        <div class="panel">
                            <div class="col-lg-1 title">品种</div> 
                            <div class="col-lg-11 link-group">
                                <span>赤霞珠</span>
                                <span>梅洛</span>
                                <span>西拉</span>
                                <span>霞多丽</span>
                                <span>长相思</span>
                            </div>
                        </div>
                        <div class="panel">
                        <div class="col-lg-1 title">地区</div> 
                        <div class="col-lg-11 link-group">
                            <span>法国</span>
                            <span>西班牙</span>
                            <span>意大利</span>
                            <span>澳大利亚</span>
                            <span>智利</span>
                        </div>
                        </div>
                        <div class="panel">
                        <div class="col-lg-1 title">年份</div> 
                        <div class="col-lg-11 link-group">
                            <span>新酒</span>
                            <span>2015-2017</span>
                            <span>2011-2014</span>
                            <span>2008-2010</span>
                            <span>&lt; 2008</span>
                        </div>
                        </div>
                    </div>
                    <div v-show="cat_panel == 'winetool'" class="winetool">
                        <div class="panel">
                            <div class="col-lg-1 title">类型</div> 
                            <div class="col-lg-11 link-group">
                                <span>泡杯</span>
                                <span>醒酒器</span>
                                <span>开瓶器</span>
                                <span>酒架</span>
                                <span>瓶嘴</span>
                            </div>
                        </div>
                        <div class="panel">
                            <div class="col-lg-1 title">材质</div> 
                            <div class="col-lg-11 link-group">
                                <span>水晶</span>
                                <span>玻璃</span>
                            </div>
                        </div>
                        <div class="panel">
                            <div class="col-lg-1 title">型号</div> 
                            <div class="col-lg-11 link-group">
                                <span>波尔多红酒杯</span>
                                <span>勃艮第红酒杯</span>
                                <span>香槟杯</span>
                                <span>甜酒杯</span>
                                <span>长相思杯</span>
                            </div>
                        </div>
                    </div>
                    <div v-show="cat_panel == 'wineparty'" class="wineparty">
                        <div class="panel">
                            <div class="col-lg-1 title">场合</div> 
                            <div class="col-lg-11 link-group">
                                <span>家庭</span>
                                <span>朋友</span>
                                <span>商务</span>
                                <span>郊游</span>
                                <span>婚礼</span>
                            </div>
                        </div>
                    </div>
                    <div v-show="cat_panel == 'new'" class="winenew">
                        <div class="panel">
                            <div class="col-lg-1 title">新酒</div> 
                            <div class="col-lg-11 link-group">
                                <span>博若莱新酒</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-group">
            <div
                v-for="(pre,index) in list"
                :key="index"
                class="box">
                <div class="pic">
                    <img :src='pre.preview[0].url' alt="">
                </div>
                <div>
                    <div class="info heart">
                        <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                    </div>
                    <div class="info plus">
                        <!-- <span><i class="fa fa-plus" aria-hidden="true"></i></span> -->
                        <router-link :to="'/detail/' + pre.id"><span>view</span></router-link>
                    </div>
                </div>
            </div>
        </div>
        <Pagination 
            :totalCount="total"
            :limit="limit"
            :onChange="on_page_change"

        />
    </div>
</template>
<script>
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import api from '../lib/api';
import {clone} from '../lib/helper';

export default {
    components: { Nav , Pagination},
    data(){
        return{
            cat_panel:'',
            list:{},
            total:0,
            limit:3,
            search_param:{},
        }
    },
    mounted() {
        this.read();
    },
    methods:{
            read(){
                api('product/read',{limit:this.limit})
                    .then(r=>{
                        this.list = r.data;
                        this.total = r.total;
                    })
            },
            on_page_change(page){
                console.log('page',page);
                
                this.set_condition('page',page);
            },
            set_condition(type,value){
                let query = clone(this.$route.query);

                switch (type){
                    case 'page':
                        query.page = value;
                        break;
                }
                this.$router.replace({query});
                this.search();
            },
            search(){
                let p = this.search_param;
                
                api('product/search',{
                    limit:this.limit,
                    page:p.page,
                }).then(r=>{
                    this.list = r.data;
                    this.total = r.total;
                })
            },
            prepare_search_param(){
                let query = this.parse_route_query();
                this.search_param = query;
                
            },
            parse_route_query(){
                let query = this.$route.query;
                if(!query.sort_by)
                    query.sort_by = ['id','down'];
                
                if(typeof query.sort_by == 'string')
                    query.sort_by = query.sort_by.split(',')
                return query;
            }

    },
    watch:{
        '$route.query':{
            deep:true,
            handler(){
                this.prepare_search_param();
                this.search();
            }
        }
    }
};
</script>
<style scoped>
.search-area {
    position: relative;
}
.search-bar {
  background: rgb(224, 224, 224);
  padding: 10px;
  text-align: center;
}
.search-item {
  padding: 10px;
  margin: 0 20px;
}
.search-item img {
  width: 30px;
  height: 30px;
  opacity: 0.7;
}
.search-item:hover {
  background: #ccc;
}
.cat-panel {
    position: absolute;
    top:100%;
    left: 0%;
    z-index: 1;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.07);
    opacity: .93;
}
.cat-panel .panel {
  background: #f8f8f6;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}
.cat-panel .panel .title {
    font-size: 1.1rem;
    text-align: center;
}
.cat-panel .panel .title,
.cat-panel .panel .link-group > * {
  padding: 10px 20px;
}
.card-group {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
    /* -webkit-column-width: 250px;
    -moz-column-width: 250px;
    column-width: 250px; */
    -moz-column-gap:20px;
    -webkit-column-gap:20px;
    column-gap:20px;
    padding:30px 10%;
}
.box{
    box-sizing: border-box;    
    padding: 5px;
    /* border: solid 2px #eeeeee; */
    border-radius: 4px;
    margin-bottom: 30px;
    cursor: pointer;
    position: relative;
}
.pic img{
    width: 100%;
    opacity: .8;
}

.box:hover .info {
    opacity: .9;
    /* visibility: visible; */
    display: inline-block;
}
.box img:hover {
    opacity: 1;
}
.box .info {
    /* visibility: hidden; */
    display: none;
    font-size: 1rem;
    position: absolute;
    color: #F9726C;
    padding: 8px;
    border-radius: 5px;
    background: #fff;
}
.box .heart{
    top:10%;
    right: 10%;
}
.box .plus{
    bottom:12%;
    right: 10%;
}
</style>
