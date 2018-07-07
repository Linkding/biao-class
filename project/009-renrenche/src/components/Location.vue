<template>
    <div class="location">
        <div class="search">
            <input type="search" placeholder="请搜索城市" v-model="keyword">
        </div>
        <div class="step-list">
            <div class="step" v-if="location.state.length">
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
const chain_id = 1;
import api from "../lib/api";

export default {
  data() {
    return {
      keyword: "",
      parent_id: "",
      location: {
        state: [],
        city: [],
        region: []
      },
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
    read(parent_id, type) {
      this.parent_id = parent_id;
      return api("location/read", {
        where: {
          and: { parent_id }
        }
      }).then(r => {
        let data = r.data;
        this.location[type] = data;
        console.log('this.location',this.location);
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
        list.forEach(row=>{
            let sub = this.location[row.type];
            sub.push(row);
        })
    },
    reset_location() {
      this.location = {
        city: [],
        state: [],
        region: []
      };
    }
  },
  mounted() {
    this.read(chain_id,'state');
  },
  watch:{
      keyword(){
          this.search();
      }
  }
};
</script>