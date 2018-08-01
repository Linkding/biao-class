<template>
    <div>
        <Nav :pushDown="true"/>
        <div>
            <div class="container">
                <div class="col-lg-3">
                    <AdminNav/>
                </div>
                <div class="col-lg-9">
                    <div class="wrapper">
                        <h2>质检管理</h2>
                        <SearchBar :model="'report'" :isSearch="false" :onSubmit="search" :searchable="searchable"/>
                        <!-- <form class="search-bar" @submit="search($event)">
                            <input type="search" placeholder="请输入关键字" autofocus v-model="keyword">
                            <button type="submit">🔍</button>
                        </form> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建质检</span></button>
                        </div>
                        
                        <form v-if="show_form" @submit="cou($event)">
                          <div class="input-control">
                                <label>选择检测车辆</label>
                                <DropDown 
                                      :list="vehicle_list"
                                      :api="'vehicle.title'" 
                                      :showInput="true" 
                                      :displayKey="'title'" 
                                      :onSelect="set_vehicle_id" 
                                      ref="edit_report"
                                  />
                            </div>
                          <fieldset :disabled="!current.vehicle_id">
                              <div>
                                  <div class="col-lg-7">
                                      <button @click="check_all()" type="button">全部通过</button>
                                      <button @click="check_random()" type="button">随机通过</button>
                                      <button @click="check_all(false)" type="button">全部取消</button>
                                  </div>
                                  <div class="col-lg-5 check_count right">共有{{total_check}}个检测项</div>
                              </div>
                            
                            <div v-if="prop.display_name" class="col-lg-4 input-control" v-for="(prop,key) in structure" :key="key">
                                <input  type="checkbox" v-model="current[key]">
                                <label  >{{prop.display_name}}</label>
                            </div>
                            <div class="input-control">
                                  <button class="btn-primary" type="submit">提交</button>
                                  <button @click="cancel()" class="btn-primary" type="button">取消</button>
                              </div>
                          </fieldset>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>检查车辆</th>
                                    <th>通过数</th>
                                    <th>通过率</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>
                                        <router-link v-if="row.$vehicle" target="_blank" :to="'/detail/' + row.$vehicle.id">{{row.$vehicle.title}}</router-link>
                                        <span v-else>-</span>
                                    </td>
                                    <td>{{passed_count = compute_passed_check(row)}}</td>
                                    <td>{{passed_count / total_check | percentage}}</td>
                                    <td>
                                        <button @click="update(row)">编辑</button>
                                        <button @click="remove(row.id)">删除</button>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <pagination :limit="limit" :totalCount="total" :onChange="on_page_change"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AdminPage from "../../mixin/AdminPage";
import api from "../../lib/api";

export default {
  created() {
    this.model = "report";
  },
  data() {
    return {
      searchable: ["name"],
      structure: {},
      brand_list: [],
      with: [{ model: "vehicle", relation: "has_one" }],
      total_check: 0,
      current: {},
      vehicle_list: {}
    };
  },
  methods: {
    compute_passed_check(row) {
      let count = 0;
      row = row || this.current;
      this.each_prop((prop, key) => {
        prop.display_name && row[key] && count++;
      });
      return count;
    },
    //计算总检查项数目
    compute_total_check(row) {
      let count = 0;
      this.each_prop((prop, key) => {
        prop.display_name && count++;
      });
      this.total_check = count;
    },
    set_vehicle_id(row) {
      this.$set(this.current, "vehicle_id", row.id);
      console.log("this.current", this.current);
    },
    each_prop(fn) {
      let structure = this.structure;
      for (let key in structure) {
        let prop = structure[key];

        if (fn) fn(prop, key);
      }
    },
    get_structure() {
      api("MODEL/FIND", { name: "report" }).then(r => {
        this.structure = r.data.structure;
        this.compute_total_check();
      });
    },
    check_all(check = true) {
      this.each_prop((prop, key) => {
        if (!prop.display_name) return;
        this.$set(this.current, key, check);
      });
      console.log("this.current", this.current);
    },
    check_random() {
      this.each_prop((prop, key) => {
        if (!prop.display_name) return;
        this.$set(this.current, key, Math.random() >= 0.5);
      });
    },
    read_vehicle() {
      api("vehicle/read").then(r => {
        this.vehicle_list = r.data;
      });
    }
  },
  mounted() {
    this.get_structure();
    this.read_vehicle();
  },
  watch: {
    current: {
      deep: true,
      handler() {
        this.compute_passed_check();
      }
    }
  },
  mixins: [AdminPage]
};
</script>
<style scoped>
fieldset {
  border: 1px solid rgba(0, 0, 0, .09);
}
.check_count {
  padding: 10px;
}
.input-control button,
button:hover {
  background: #0b5a81;
  color: #fff;
}
.input-control button {
  margin: 0px 10px;
}
.input-control label {
  display: inline-block;
}
</style>
