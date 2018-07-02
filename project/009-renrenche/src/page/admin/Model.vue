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
                        <h2>车系管理</h2>
                        <SearchBar :model="model"  :cb="search" :searchable="searchable"/>
                        <!-- <form class="search-bar" @submit="search($event)">
                            <input type="search" placeholder="请输入关键字" autofocus v-model="keyword">
                            <button type="submit">🔍</button>
                        </form> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建用户</span></button>
                             
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>车系</label>
                                <input type="text" v-model="current.name">
                            </div>
                            <div class="input-control">
                                <label>品牌号</label>
                                <select v-model="current.brand_id">
                                    <option v-for="brand in brand_list" :key="brand.id" :value="brand.id">{{brand.name}}</option>
                                </select>
                                <!-- <input type="text" v-model="current.brand_id"> -->
                            </div>
                            <div class="input-control">
                                <button class="btn-primary" type="submit">提交</button>
                                <button @click="cancel()" class="btn-primary" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>车系</th>
                                    <th>品牌号</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.name}}</td>
                                    <td>{{row.brand_id}}</td>
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
import AdminPage from '../../mixin/AdminPage';
import api from '../../lib/api';

export default {
  created() {
    this.model = "model";
  },
  data() {
    return {
        searchable:['name'],
    };
  },
  mixins:[AdminPage],
  methods:{
      read_brand(){
          api("brand/read")
            .then(r=>{
                this.brand_list = r.data;
            })
      } 
  },
  mounted() {
      this.read_brand();
  },
};
</script>
<style scoped>
.input-control button,
button:hover {
  background: #0b5a81;
  color: #fff;
}
.input-control button {
  margin: 0px 10px;
}
</style>
