<template>
  <div>
      <Nav/>
      <div class="first-screen">
        <img src="../assets/home/first-screen.webp" alt="">
      </div>
      <div class="quick_check">
        <div class="container">
          <div class="col-lg-1">
            <span class="buy">买</span>
            <span class="row tip">1年/2万公里质保</span>
          </div>
          <div class="col-lg-7 link-group">
            <div>
              <span class="tag">大众</span>
              <span class="tag">别克</span>
              <span class="tag">奥迪</span>
              <span class="tag">丰田</span>
              <span class="tag">长城</span>
              <span class="tag">吉利</span>
              <span class="tag">马自达</span>
              <span class="tag">长城</span>
              <span class="tag">吉利</span>
              <span class="tag">马自达</span>
              <span class="tag">马自达</span>
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
          <div class="col-lg-4">
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
          <div class="col-lg-2 item">
            特价好车
          </div>
          <div class="col-lg-2 item">
            5万以下
          </div>
          <div class="col-lg-2 item">
            5-10万
          </div>
          <div class="col-lg-2 item">
            超值SUV
          </div>
          <div class="col-lg-2 item">
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
          <div class="col-lg-3">
            <div class="card">
                <div class="thumbnail">
                  <img src="../assets/home/vehicle-list-thumbnail1.webp" alt="">
                </div>
                <div class="detail">
                  <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                  <div class="desc">2015年02月 / 3.07万公里</div>
                  <div class="other">
                    <span class="price">11.5万</span>
                    <span class="f-pay">首付3.5万</span>
                    <!-- <span class="btn btn-primary btn-fat">购买</span> -->
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import SearchBar from "../components/SearchBar";


export default {
  components: { Nav,SearchBar }
};
</script>
<style scoped>
.quick_check {
  padding: 20px;
}

.buy,
.sell {
  color: #fd521d;
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
  padding-left: 20px;
}

.link-group > * {
  padding: 8px 0px;
  font-size: 0.9rem;
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
.guaruntee .col-lg-4
{
  
  padding: 15px 15px 15px 0;
  background: #ddd;
}


.guaruntee .col-lg-5 .card{
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
  border: 1px solid  rgba(0, 0, 0, 0.06)
}

.vehicle-nav .item:hover{
  background: rgba(0, 0, 0, 0.4)
}

.vehicle-list .card {
  padding: 3px;
  margin: 10px 0;
}

.vehicle-list .card:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .08);
  /* border: 1px solid rgba(0, 0, 0, 0.06); */
}
.vehicle-list .detail{
  padding: 10px 20px;
}

.vehicle-list .detail > * {
  padding: 7px 0;
}

.vehicle-list .detail .title {
  font-size: 1.2rem;
  color: #495056;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.vehicle-list .detail .desc,
.vehicle-list .detail .other .f-pay {
  color: #7a838d;
}

.vehicle-list .detail .desc {
  font-size: 0.9rem;
}
.vehicle-list .detail .other > * {
  padding-right: 10px;
}
.vehicle-list .detail .other .price{
  font-size: 1.3rem;
  font-weight: 650;
  color: #f95523;
}

.vehicle-list .detail .other .f-pay {
  font-size: 0.6rem;
}
</style>