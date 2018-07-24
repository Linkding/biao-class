<template>
    <div>
        <div class="header">
            <Nav/>
        </div>
        <div class="container">
            <div @mouseleave="cat_panel = ''">
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
                    <span class="search-item">
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
                            <span>&lt;2008</span>
                        </div>
                        </div>
                    </div>
                    <div v-show="cat_panel == 'winetool'" class="winetool">
                        <div class="panel">
                            <div class="col-lg-1 title">功能</div> 
                            <div class="col-lg-11 link-group">
                                <span>开瓶器</span>
                                <span>泡杯</span>
                                <span>醒酒器</span>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nav from "../components/Nav";

export default {
  components: { Nav },
  data(){
      return{
          cat_panel:'wine',
      }
  }
};
</script>
<style scoped>
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
.cat-panel .panel {
  background: rgba(0, 0, 0, 0.09);
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}
.cat-panel .panel .title {
    font-size: 1.1rem;
    text-align: center;
}
.cat-panel .panel .title,
.cat-panel .panel .link-group > * {
  padding: 8px;
}
</style>
