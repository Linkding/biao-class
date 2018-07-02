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
                        <h2>用户列表</h2>
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建用户</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>用户名</label>
                                <input type="text" v-model="current.username">
                            </div>
                            <div class="input-control">
                                <label>密码</label>
                                <input type="password" v-model="current.password">
                            </div>
                             <div class="input-control">
                                <label>真实姓名</label>
                                <input type="text" v-model="current.real_name">
                            </div>
                            <div class="input-control">
                                <button class="btn-primary" type="submit">提交</button>
                                <button @click="cancel()" class="btn-primary" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>用户名</th>
                                    <th>密码</th>
                                    <th>真实姓名</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.username}}</td>
                                    <td>{{row.password}}</td>
                                    <td>{{row.real_name || '-'}}</td>
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
import Nav from "../../components/Nav";
import Pagination from "../../components/Pagination";
import AdminNav from "../../components/AdminNav";
import api from "../../lib/api";

export default {
  components: { Nav, AdminNav, Pagination },
  data() {
    return {
      total: 0, //共计多少条数据
      last_page: 0, //最后一页，默认0
      current_page: 1, //当前页码
      limit: 2,
      show_form: false,
      current: {},
      list: [],
      edit_mode: false
    };
  },
  methods: {
    on_page_change(page) {
      this.read(page);
    },
    read(page = 1) {
      if (page == this.current_page && page != 1) return; //如果点击当前页，而且不是第一页，则返回

      api("user/read", { limit: this.limit, page: page }).then(r => {
        this.list = r.data;
        this.total = r.total;
        this.last_page = r.last_page;
        this.current_page = r.current_page;
      });
    },
    cou(e) {
      e.preventDefault();
      let action = this.current.id ? "update" : "create";
      api(`user/${action}`, this.current).then(r => {
        this.read();
      });
    },
    remove(id) {
      api("user/delete", { id }).then(r => {
        this.read();
      });
    },
    update(row) {
      this.current = row;
      this.show_form = true;
    },
    cancel() {
      this.current = "";
      this.show_form = false;
    }
  },
  mounted() {
    this.read();
  }
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
