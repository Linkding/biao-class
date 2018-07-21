<template>
  <div>
      <Nav/>
      <div class="first-screen">
        <!-- <img src="../assets/first_screen.jpg" alt=""> -->
        <!-- <img src="../assets/home/first-screen.webp" alt=""> -->
      </div>
      <div class="quick_check">
        <div class="container">
          <div class="col-lg-2 wrap">
            <span class="buy">买</span>
            <span class="row tip">1年/2万公里质保</span>
          </div>
          <div class="col-lg-7 link-group">
            <div>
              <router-link to="'/search/?brand_id=' + row.id'" v-for="(row,index) in list.brand" :key="index">
                {{row.name}}
              </router-link>
            </div>
            
            <div>
              <span class="tag">3万以下</span>
              <span class="tag">3-5万</span>
              <span class="tag">5-10万</span>
              <span class="tag">10-15万</span>
              <span class="tag">15-20万</span>
              <span class="tag">20-30万</span>
              <span class="tag">30-60万</span>
            </div>
            <div>
              <span class="tag">降价车</span>
              <span class="tag">准新车</span>
              <span class="tag">紧凑车型</span>
              <span class="tag">急售车</span>
              <span class="tag">中大车型</span>
              <span class="tag">豪华车型</span>
              <span class="tag">超值SUV</span>
              <span class="tag">商务行政</span>
              <span class="tag">经典跑车</span>
            </div>
            <div>
              <!-- <input type="text" placeholder="请输入关键字">
              <button type="submit">🔍</button> -->
              <SearchBar/>
            </div>
          </div>
          <div class="col-lg-3">
            <span class="col-lg-3 sell">卖</span>
            <div class="col-lg-9 right">
              <a href="" style="margin-top: 15px; display: inline-block;" class="btn btn-primary btn-fat">极速卖车</a>
            </div>
          </div>

        </div>
      </div>
      <div class="guaruntee">
        <div class="row container">
              <div class="col-lg-7">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="title">分期购车</div>
                      <div class="desc">门槛低 审批快</div>
                      <div>
                        <img src="../assets/home/guarantee1.png" alt="">
                      </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card">
                    <div class="title">分期购车</div>
                      <div class="desc">门槛低 审批快</div>
                      <div>
                        <img src="../assets/home/guarantee1.png" alt="">
                      </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card">
                    <div class="title">分期购车</div>
                      <div class="desc">门槛低 审批快</div>
                      <div>
                        <img src="../assets/home/guarantee1.png" alt="">
                      </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="card">
                  <div class="title">论坛</div>
                </div>
              </div>
        </div>
      </div>
      <!-- 车列表 导航 -->
      <div class="vehicle-nav">
        <div class="container">
          <div @click="read_main('on_sale')" class="col-lg-2 item">
            特价好车
          </div>
          <div @click="read_main('under_5')" class="col-lg-2 item">
            5万以下
          </div>
          <div @click="read_main('between_5_10')" class="col-lg-2 item">
            5-10万
          </div>
          <div @click="read_main('suv')" class="col-lg-2 item">
            超值SUV
          </div>
          <div @click="read_main('urgent')" class="col-lg-2 item">
            急售降价车
          </div>
          <div class="col-lg-2 item">
            更多
          </div>
        </div>
      </div>
      <!-- 车 列表 -->
      <div class="vehicle-list">
        <div class="container">
          <div class="col-lg-3" v-for="(row,index) in main_list" :key="index">
            <div class="card" >
                <div class="thumbnail">
                  <img :src="row.preview[0].url" alt="">
                </div>
                <div class="detail">
                  <div class="title">{{row.title}}</div>
                  <div class="desc">{{row.birth_day|only_day}} / {{row.consumed_distance}}万公里</div>
                  <div class="other">
                    <div class="col-lg-6">
                      <span class="price">{{row.price}}万</span>
                      <span class="f-pay">首付{{row.price }}万</span>
                    </div>
                    <div class="col-lg-6 right">
                      <router-link :to="'/detail/' + row.id" class="link">详情</router-link>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import '../css/vehicle.css';
import Nav from "../components/Nav.vue";
import SearchBar from "../components/SearchBar";
import api from "../lib/api";
import Reader from "../mixin/Reader";

export default {
  components: { Nav, SearchBar },
  mixins:[Reader],
  data() {
    return {
      list: [],
      main_list:[],
      model: "vehicle",
      design:[],
      
    };
  },
  methods: {
    find_design(name){
      api('design/search',{or:{name:name}})
        .then(r=>{
          this.design[name] = r.data[0];
          console.log('design r.data',r.data);
          
        })
    },
    read_main(type){
      let condition = {};
      switch (type){
        case 'on_sale':
          condition = {
            where:{
              and:{
                on_sale:true,
              }
            }
          };
          break;
        case 'under_5':
          condition = {
            where:{
              or:[
                ['price','<',5],
              ]
            }
          };
          break;
        case 'between_5_10':
          condition = {
            where:{
              and:[
                ['price','>=',5],
                ['price','<',10],
              ]
            }
          };
          break;
        case 'SUV':
          condition = {
            where:{
              and:{
                design_id:this.design_id.SUV.id,
              }
            }
          };
          break;
        case 'urgent':
          let date = new Date;
          date.setDate(date.getDate() + 30);
          date = date.toISOString().split('T')[0];
          condition = {query:`where('deadline' <= ${date})`};
          break;
      }
      api('vehicle/search',condition)
        .then(r=>{
          console.log("this['main_list']",this['main_list']);
          
          this['main_list'] = r.data;
        })
    },
  },
  mounted() {
    this.read('brand');
    this.read_main('on_sale')
    this.find_design('SUV');

  }
};
</script>
<style scoped>
.first-screen {
  background-image: url(../assets/first_screen.jpg);
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  min-height: 420px;
  opacity: 0.8;
}

.quick_check {
  padding: 20px;
}

.quick_check .container {
  background: #fff;
  padding: 20px 10px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
}

.quick_check .container .wrap {
  padding: 0px 10px;
}

.buy,
.sell {
  color: #0b5a81;
  font-size: 4rem;
  font-weight: bold;
}

.tip {
  font-size: 0.8rem;
}

.tag {
  display: inline-block;
  padding: 0px 6px;
}

.link-group {
  padding:0 20px;
}

.link-group > * {
  padding: 8px 0px;
  font-size: 0.9rem;
}

.link-group span,
.link-group a{
  padding: 0px 10px;
}
.link-group input {
  width: 45%;
}

.link-group input,
.link-group button {
  padding: 10px;
  vertical-align: top;
}

.link-group button {
  border-left: 0;
}

.link-group button:hover {
  background: #fd521d;
}

.guaruntee,
.guaruntee .col-lg-4 {
  padding: 15px 15px 15px 0;
  background: #ddd;
}

.guaruntee .col-lg-5 .card {
  padding-right: 0px;
}

.guaruntee .card {
  padding: 15px;
  background: #fff;
}

.guaruntee .card > * {
  padding: 10px;
}

.guaruntee .card .title,
.guaruntee .card .des {
  padding: 8px 0;
}

.guaruntee .card .desc {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
}
.guaruntee .card .title {
  font-size: 1.5rem;
}

.vehicle-nav .item {
  padding: 10px;
  font-size: 1.6rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.vehicle-nav .item:hover {
  background: rgba(0, 0, 0, 0.4);
}

</style>