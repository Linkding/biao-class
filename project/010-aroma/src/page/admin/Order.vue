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
                        <h2>订单管理</h2>
                        <!-- <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建订单</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>订单号</label>
                                <input type="text" v-model="current.oid">
                            </div>
                             <div class="input-control">
                                <label>数量</label>
                                <input type="text" v-model="current.sum">
                            </div>
                             <div class="input-control">
                                <label>订单信息</label>
                                <input type="text" v-model="current.product_info">
                            </div>
                             <div class="input-control">
                                <label>支付方式</label>
                                <input type="text" v-model="current.pay_by">
                            </div>
                             <div class="input-control">
                                <label>备注</label>
                                <input type="text" v-model="current.memo">
                            </div>
                             <div class="input-control">
                                <label>用户</label>
                                <DropDown
                                    :Width="'200'"
                                    :showInput="true"
                                    :list="user"
                                    :onSelect="set_user_id"
                                    :displayKey="'username'"
                                />
                                <!-- <input type="text" v-model="current.user_id"> -->
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
                                    <th>订单号</th>
                                    <th>数量</th>
                                    <th>订单信息</th>
                                    <th>支付方式</th>
                                    <th>备注</th>
                                    <th>用户</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.id||'-'}}</td>
                                    <td>{{row.oid||'-'}}</td>
                                    <td>{{row.sum||'-'}}</td>
                                    <td>{{row.product_info||'-'}}</td>
                                    <td>{{row.pay_by||'-'}}</td>
                                    <td>{{row.memo||'-'}}</td>
                                    <td>{{row.$user?row.$user.username:'-'}}</td>
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
    this.model = "order";
  },
  data() {
    return {
        searchable:['name'],
        with:[
            {model:'user',type:'has_one'},
        ],
        user:{},
    };
  },
  mounted() {
      this.read_by_model('user');
  },
  methods:{
       set_user_id(row){
         this.$set(this.current,'user_id',row.id);
     },
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
