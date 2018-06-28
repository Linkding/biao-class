<template>
    <div>
        <Nav/>
        <div>
            <div>
                <div class="container">
                    <SearchBar/>
                </div>
            </div>
            <div class="container">
                <div class=" fiflter">
                    <!-- 品牌 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            品牌
                        </div>
                        <div class="col-lg-10 range">
                            <span class="active">不限</span>
                            <span>大众</span>
                            <span>福特</span>
                            <span>奔驰</span>
                            <span>现代</span>
                            <span>大众</span>
                            <span>福特</span>
                            <span>奔驰</span>
                            <span>现代</span>
                            <span>大众</span>
                            <span>福特</span>
                            <span>奔驰</span>
                            <span>现代</span>
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                    <!-- 车系 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            车系
                        </div>
                        <div class="col-lg-10 range">
                            <span class="active">不限</span>
                            <span>朗逸</span>
                            <span>奔特</span>
                            <span>福驰</span>
                            <span>大代</span>
                            <span>现众</span>
                            <span>朗逸</span>
                            <span>奔特</span>
                            <span>福驰</span>
                            <span>大代</span>
                            <span>现众</span>
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                    <!-- 价格 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            价格
                        </div>
                        <div class="col-lg-10 range">
                            <span class="active">不限</span>
                            <span >3万以下</span>
                            <span>3-5万</span>
                            <span>5-8万</span>
                            <span>8-10万</span>
                            <span>10-15万</span>
                            <span>15-20万</span>
                            <span>20-30万</span>
                            <span>30万以上</span>
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                    <!-- 更多 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            更多
                        </div>
                        <div class="col-lg-10 range">
                            <DropDown :selectItem="yo" :list="tmp"/>
                            <DropDown :selectItem="yo" :list="tmp"/>
                            <DropDown :selectItem="yo" :list="tmp"/>
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import DropDown from '../components/DropDown';

export default {
  components: { Nav, SearchBar ,DropDown },
  data(){
     return{
         tmp : [
          { name : '王花花', value : 1 },
          { name : '李拴蛋', value : 2 },
          { name : '赵可爽', value : 3 },
          { name : '刘备备', value : 4 },
        ],
     } 
  },
  methods:{
      yo(i){
          console.log(i)
      }
  }
};
</script>
<style scoped>
.fiflter {
  border: 1px solid #e6e6e6;
  color: #495056;
}
.fiflter-list {
    padding: 15px 0;
  border-bottom: 1px solid #e6e6e6;

}

.prop {
    color: #7a838d;
    text-align: center;
}

.fiflter-list > * {
    vertical-align: middle;
}

.range > * {
  margin: 0 5px;
  padding: 0 5px;
}
.active {
  background: #22ac38;
  color: #fff;
}
</style>
