<template>
    <div>
        <Nav :pushDown="true"/>
        <div>
            <div class="container">
                <div class="col-lg-3">
                    <AdminNav/>
                </div>
                <div class="col-lg-9 wrapper">
                        <h2>账户管理</h2>
                        <!-- <SearchBar :model="model"  :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建账户</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>账户名称</label>
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
                                    <th>id</th>
                                    <th>账户名称</th>
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
                        <!-- <pagination :limit="limit" :totalCount="total" :onChange="on_page_change"/> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AdminPage from "../../mixin/AdminPage";
import http from "../../util/http";

export default {
  mixins: [AdminPage],
  created() {
    this.model = "account";
  },
  data() {
    return {
      show_form: false,
      with:[
          {model:'account',type:'has_one'}
      ]
    };
  }
};
</script>
<style scoped>
h2 {
  margin-top: 0;
}
.wrapper {
  padding-left: 20px;
}
button {
  font-size: 1.1rem;
  padding: 10px;
  margin-right: 10px;
}
button:hover {
  background: #a7aeb8;
  color: #fff;
}
form > *,
form input {
  padding: 10px;
}
form .input-control {
  display: block;
}
form label {
  font-size: 1.2rem;
}
</style>

