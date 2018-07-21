<template>
    <div @mouseleave="show_s_area=false" class="location">
        <!-- <div  class="location-set">{{set}}</div> -->
        <div class="search">
            <input @focus="show_s_area=true" type="search" placeholder="请搜索城市" v-model="keyword">
        </div>
        <div  class="location-area">
            <div class="step-list" v-show="show_s_area">
                <div class="col-lg-4 step">
                    <div>省</div>
                    <div :class="{active: lo.id  == current.state,item:true}" @click="select(lo)"  v-for="(lo,index) in location.state"  :key="index">{{lo.name}}</div>
                </div>
                <div class="col-lg-4 step">
                    <div>市</div>
                    <div :class="{active: lo.id  == current.city,item:true}" @click="select(lo)" v-for="(lo,index) in location.city"  :key="index">{{lo.name}}</div>
                </div>
                <!-- <div class="col-lg-4 step">
                    <div>区</div>
                    <div :class="{active: lo.id  == current.region,item:true}" @click="select(lo)" v-for="(lo,index) in location.region"  :key="index">{{lo.name}}</div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
const china_id = 1;
import api from "../lib/api";
export default {
  props: {
    onSelect: {}
  },
  data() {
    return {
      show_s_area: false,
      keyword: "",
      parent_id: "",
      location: {
        state: [],
        city: [],
        region: []
      },
      set: "请选择",
      current: {
        state: [],
        city: [],
        region: []
      }
    };
  },
  methods: {
    /* 
    *   获取并列出地址
    * @param parent_id
    * @param type
    * @param reture {*}
     */
    read(parent_id, type, limit) {
      this.parent_id = parent_id;
      return api("location/read", {
        limit: limit,
        where: {
          and: { parent_id }
        }
      }).then(r => {
        let data = r.data;
        this.location[type] = data;
        return data;
      });
    },
    search() {
      this.reset_location();
      api("location/search", {
        or: {
          name: this.keyword
        }
      }).then(r => {
        this.group(r.data);
      });
    },
    group(list) {
      list.forEach(row => {
        let sub = this.location[row.type];
        sub.push(row);
      });
    },
    reset_location() {
      this.location = {
        city: [],
        state: [],
        region: []
      };
    },
    select(row) {
        //用if或者switch来写
        this.current[row.type] = row.id;
      if (row.type == "state") {
        this.read(row.id, "city");
      } else if (row.type == "city") {
        this.read(row.id, "region");
      };

      if(this.onSelect)
        this.onSelect(row);
    }
  },
  mounted() {
    this.read(china_id, "state", 40);
  },
  watch: {
    keyword() {
      if (!this.keyword) return;
      this.search();
    }
  }
};
</script>
<style scoped>
.location {
  vertical-align: top;
  margin: 10px 0;
}
.location-set {
  background: #e08109;
  padding: 10px;
  width: 10%;
}

.location-area {
  width: 40%;
}
.location-area .step-list {
  position: absolute;
  z-index: 1;
  background: #ececec;
}
.location-area .step-list .step {
  border: 1px solid #0b5a81;
  border-right: 0;
  overflow: auto;
  height: 200px;
  width: 50px;
}
.location-area .step-list .step:last-child{
    border: 1px solid  #0b5a81;
}
.location .step-list .active {
  background: #e08109;
  color: #fff;
}

.location .step-list .item {
    cursor: pointer;
    user-select: none;
}
</style>
