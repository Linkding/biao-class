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
                        <h2>葡萄产区管理</h2>
                        <!-- <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建葡萄产区</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>葡萄产区名</label>
                                <input type="text" v-model="current.name">
                            </div>
                            <div class="input-control">
                                <button class="btn-primary" type="submit">提交</button>
                                <button @click="cancel()" class="btn-primary" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>序号</th>
                                    <th>葡萄产区</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.id}}</td>
                                    <td>{{row.name}}</td>
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

export default {
  created() {
    this.model = "location";
  },
  data() {
    return {
        searchable:['name'],
    };
  },
  methods:{
     
  },
  mixins:[AdminPage],
};
</script>
<style scoped>
.input-control {
    display: block;
    margin: 15px 0;
}
.input-control button,
button:hover {
  background: #0b5a81;
  color: #fff;
}
.input-control button {
  margin: 0px 10px;
}
</style>
