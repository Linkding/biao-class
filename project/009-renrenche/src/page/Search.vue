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
                        <div class="col-lg-10 range" >
                            <span :class="{active:!search_param.brand_id}" @click="remove_condition('brand_id')">不限</span>
                            <span v-for="row in list.brand" :key="row.name">
                                <span :class="{active:search_param.brand_id == row.id}" @click="set_where('brand_id',row.id)">{{row.name}}</span>
                            </span>
                           
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                    <!-- 车系 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            车系
                        </div>
                        <div class="col-lg-10 range">
                            <span :class="{active:!search_param.model_id}" @click="remove_condition('model_id')">不限</span>
                            <span v-for="row in list.model" :key="row.name">
                                <span :class="{active:search_param.model_id == row.id}" @click="set_where('model_id',row.id)">{{row.name}}</span>
                            </span>
                           
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                    <!-- 价格 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            价格
                        </div>
                        <div class="col-lg-10 range">
                            <span :class="{active:!search_param.price_max && !search_param.price_min}"
                               @click="set_query_price_range()">不限
                            </span>
                            <span :class="{active:search_param.price_max == 3 && search_param.price_min == 0}"
                               @click="set_query_price_range(0,3)">3万以下
                            </span>
                            <span :class="{active:search_param.price_max == 5 && search_param.price_min == 3}"
                               @click="set_query_price_range(3,5)">3-5万
                            </span>
                             <span :class="{active:search_param.price_max == 8 && search_param.price_min == 5}"
                               @click="set_query_price_range(5,8)">5-8万
                            </span>
                             <span :class="{active:search_param.price_max == 10 && search_param.price_min == 8}"
                               @click="set_query_price_range(8,10)">8-10万
                            </span>
                             <span :class="{active:search_param.price_max == 15 && search_param.price_min == 10}"
                               @click="set_query_price_range(10,15)">3-5万
                            </span>
                             <span :class="{active:search_param.price_max == 30 && search_param.price_min == 20}"
                               @click="set_query_price_range(20,30)">20-30万
                            </span>
                             <span :class="{active:search_param.price_min == 30}"
                               @click="set_query_price_range(30,0)">30万以上
                            </span>
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                    <!-- 更多 -->
                    <div class="row fiflter-list">
                        <div class="col-lg-1 prop">
                            更多
                        </div>
                        <div class="col-lg-10 range">
                          <div class="col-lg-3">
                              <DropDown  :list="design_list" 
                              :itemTitle="'车型'" 
                              :onSelect="onSelectDesign" 
                              :showItemTitle="true" 
                              Width="100"
                              />
                          </div>
                        </div>
                        <div class="col-lg-1 prop right">全部</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vehicle-list">
            <div class="container">
                <div class="sort-bar">
                    <div class="col-lg-6 title">排序筛选</div>
                    <div class="col-lg-6 right">
                        <span @click="toggle_sort_by('id')">时间<i :class="{fa:true ,
                                                                    'fa-caret-down':is_sort('id','down'),
                                                                    'fa-caret-up':is_sort('id','up')}" aria-hidden="true"></i></span>
                        <span @click="toggle_sort_by('price')">价格<i :class="{fa:true ,
                                                                    'fa-caret-down':is_sort('price','down'),
                                                                    'fa-caret-up':is_sort('price','up')}" aria-hidden="true"></i></span>
                        <span @click="toggle_sort_by('birth_day')">车龄<i :class="{fa:true, 'fa-caret-down':is_sort('birth_day','down'),
                                                                    'fa-caret-up':is_sort('birth_day','up')}" aria-hidden="true"></i></span>
                    </div>
                </div>
                <div class="card-list">
                    <div class="col-lg-3" v-for="(row,index) in result" :key="index">
                        <div class="card" >
                            <div class="thumbnail">
                            <img :src="row.preview[0].url" alt="">
                            </div>
                            <div class="detail">
                            <div class="title">{{row.title}}</div>
                            <div class="desc">{{row.birth_day|only_day}} / {{row.consumed_distance}}万公里</div>
                            <div class="other">
                                <span class="price">{{row.price}}万</span>
                                <span class="f-pay">首付{{row.price }}万</span>
                                <!-- <span class="btn btn-primary btn-fat">购买</span> -->
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination 
                :limit="6" 
                :totalCount="total"
                :onChange="on_page_change"
                :currentPage="search_param.page"
                />
        </div>
    </div>
</template>
<script>
import "../css/vehicle.css";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import Pagination from "../components/Pagination";
import api from "../lib/api";
import helper from "../lib/helper";
import VehicleList from "../mixin/VehicleList";
import Reader from "../mixin/Reader";

export default {
  mixins: [VehicleList, Reader],
  components: { Nav, SearchBar, DropDown, Pagination },
  data() {
    return {
      design_list: [],
      total: 0,
      limit: "",
      result: [],
      search_param: {},
      list: {},
      tmp: [
        { name: "王花花", value: 1 },
        { name: "李拴蛋", value: 2 },
        { name: "赵可爽", value: 3 },
        { name: "刘备备", value: 4 }
      ]
    };
  },
  watch: {
    "$route.query": {
      deep: true,
      handler(n) {
        this.prepare_search_param();
        this.search();
      }
    }
  },
  methods: {
    set_query_price_range(min,max) {
        let query = this.parse_route_query();
        if(!min && !max){
            delete query.price_min;
            delete query.price_max;
        }else {
            let condition = {
                price_min:min,
                price_max:max,
            }
            query = Object.assign({},query,condition);
        }
        this.$router.replace({query})
    },
    onSelectDesign(row) {
      this.set_condition("design_id", row.id);
    },
    read_design() {
      api("design/read").then(r => {
        this.design_list = r.data;
        console.log("this.design_list", this.design_list);
      });
    },
    is_sort(property, direction) {
      let p = this.search_param; //p 是property缩写
      if (!p.sort_by) return false;

      return p.sort_by[0] == property && p.sort_by[1] == direction; //如果传入的property和direction一致，就返回true，否则false；
    },
    //pagination处理顺序：
    //初始化search时候，预定好limit，获取total
    //父组件将on_page_change提供子组件在click时候回调，子组件将点击的row传入
    //子组件监控current_page变化
    on_page_change(page) {
      this.set_condition("page", page);
    },
    set_condition(type, value) {
      let query = helper.clone(this.$route.query);
      switch (type) {
        case "sort_by":
          query.sort_by = value;
          break;
        case "page":
          query.page = value;
          break;
        case "design_id":
          query.design_id = value;
          break;
      }
      this.$router.replace({ query });
    },
    prepare_search_param() {
      let query = this.parse_route_query();
      this.search_param = query;
    },
    on_submit() {
      this.search();
    },
    search() {
      let p = this.search_param;

      let brand_query = "",
        design_query = "",
        price_min_query = "",
        price_max_query = "";

      p.brand_id && (brand_query = `and "brand_id" = ${p.brand_id}`);
      p.design_id && (design_query = `and "design_id" = ${p.design_id}`);
      p.price_min && (price_min_query = `and "price" >= ${p.price_min}`);
      p.price_max && (price_max_query = `and "price" <= ${p.price_max}`);

      let query = `where("title" contains "${p.keyword ||
        ""}" ${brand_query} ${design_query} ${price_min_query} ${price_max_query})`;

      api("vehicle/read", {
        query: query,
        sort_by: p.sort_by,
        limit: this.limit,
        page: p.page
      }).then(r => {
        this.result = r.data;
        console.log('this.result',this.result);
        
        this.total = r.total;
      });
    },
    parse_route_query() {
      let query = helper.clone(this.$route.query);

      if (!query.sort_by) {
        query.sort_by = ["id", "down"];
      } else if (!Array.isArray(query.sort_by)) {
        query.sort_by = query.sort_by.split(",");
      }

      return query;
    },
    //toggle处理顺序：
    // toggle=>
    // parse_route_query query预处理，将sort_by转换成数组=>
    //toggle处理最后，将sort_by再次转换为字符串，方便url显示 '?sort_by=id,up';
    //url的query变化，触发watch，执行search前，再次parse_route_query，将sort_by转换成数组，请求api获取数据
    toggle_sort_by(property) {
      let query = this.parse_route_query();

      let sort_prop = query.sort_by[0];
      let direction = query.sort_by[1];

      if (sort_prop == property) {
        query.sort_by[1] = direction == "up" ? "down" : "up";
      } else {
        //否则使用指定的属性排序，默认是降序排序
        query.sort_by[0] = property;
        query.sort_by[1] = "down";
      }

      query.sort_by = query.sort_by.toString();
      console.log("query", query);

      this.$router.replace({ query });
    },
    remove_condition(type) {
      this.$router.replace({ query: "" });

      this.$delete(this.search_param, type);
      let param = Object.assign({}, this.search_param);

      this.$nextTick(() => {
        this.$router.replace({ query: param });
      });
    },
    set_where(type, value) {
      let condition = {};
      condition[type] = value;

      let o = this.search_param; //old
      let n = Object.assign({}, o, condition);

      this.$router.replace({ query: n });
      //当点击的是brand时候执行
      if (type == "brand_id") this.read_model_by_id(value);
    },
    read_model_by_id(id) {
      api("model/search", { where: { brand_id: id } }).then(r => {
        this.list["model"] = r.data;
        console.log("this.list", this.list);
      });
    }
  },
  mounted() {
    this.search_param = this.$route.query;
    this.prepare_search_param();
    this.read("brand");
    this.read("model", 9);
    this.search();
    console.log("this.list", this.list);
  },
  created() {
    this.read_design();
  }
};
</script>
<style scoped>
.fiflter,
.vehicle-list {
  color: #495056;
}
.fiflter,
.vehicle-list .sort-bar {
  border: 1px solid rgba(0, 0, 0, 0.09);
}
.fiflter-list {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.fiflter-list:last-child {
  border-bottom: 0;
}
.prop {
  color: #7a838d;
  text-align: center;
}

.fiflter-list > * {
  vertical-align: middle;
}

/* .range > * {
  margin: 0 5px;
  padding: 0 5px;
} */
.range span {
  padding: 3px 5px;
}
.active {
  background: #0b5a81;
  color: #fff;
}
.vehicle-list {
  margin: 20px 0;
}
.vehicle-list .sort-bar {
  padding: 10px 0;
}
.vehicle-list .sort-bar .title {
  padding: 0 10px;
}
.vehicle-list .sort-bar span {
  padding: 0 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.09);
}
</style>
