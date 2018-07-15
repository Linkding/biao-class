<template>
    <div>
        <Nav :pushDown="true"/>
        <div>
            <div class="container">
                <div class="col-lg-3">
                    <AdminNav/>
                </div>
                <div class="col-lg-9 wrapper">
                        <h2>交易管理</h2>
                        <!-- <SearchBar :model="model"  :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建交易记录</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>用户id</label>
                                <DropDown :list="user_list" :itemTitle="'请选择'" :onSelect="set_user_id"/>{{this.current.user_id}}
                                <!-- <input type="text" v-model="current.user_id"> -->
                            </div>
                            <div class="input-control">
                                <label>股票代码</label>
                                <input type="text" v-model="current.stock_name">
                            </div>
                            <div class="input-control">
                                <label>股票名称</label>
                                <input type="text" v-model="current.stock_code">
                            </div>
                            <div class="input-control">
                                <label>成本</label>
                                <input type="text" v-model="current.cost">
                            </div>
                             <div class="input-control">
                                <label>股数</label>
                                <input type="text" v-model="current.shares">
                            </div>
                             <div class="input-control">
                                <label>股票账户</label>
                                <DropDown :list="account_list" :itemTitle="'请选择账户'" :onSelect="set_account_id"/>{{this.current.account_id}}
                                <!-- <input type="text" v-model="current.account_id"> -->
                            </div>
                             <div class="input-control">
                                <label>股票账户归属人</label>
                                <input type="text" v-model="current.account_belong">
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
                                    <th>用户</th>
                                    <th>股票代码</th>
                                    <th>股票名称</th>
                                    <th>成本</th>
                                    <th>股数</th>
                                    <th>股票账户</th>
                                    <th>账户归属人</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.id}}</td>
                                    <td>{{row.$user.name}}</td>
                                    <td>{{row.stock_code}}</td>
                                    <td>{{row.stock_name}}</td>
                                    <td>{{row.cost}}</td>
                                    <td>{{row.shares}}</td>
                                    <td>{{row.$account.name}}</td>
                                    <td>{{row.account_belong}}</td>
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
    this.model = "trade";
  },
  data() {
    return {
      show_form: false,
      user_list:[],
      account_list:[],
      with:[
          {model:'account',type:'has_one'},
          {model:'user',type:'has_one'},
      ]
    };
  },
  methods:{
      read_by(model){
          http.post(`${model}/read`)
            .then(r=>{
                this[model + '_list'] = r.data;
                console.log(this.user_list);
                
            })
      },
      set_user_id(row){
          this.$set(this.current,'user_id',row.id)
      },
      set_account_id(row){
          this.$set(this.current,'account_id',row.id)
      },
  },
  mounted() {
      this.read_by('user');
      this.read_by('account');
  },
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

