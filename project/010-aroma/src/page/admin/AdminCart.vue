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
                        <h2>购物车管理</h2>
                        <!-- <SearchBar :model="model"  :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建购物车</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>用户</label>
                                <DropDown
                                    :Width="'200'"
                                    :showInput="true"
                                    :list="user"
                                    :onSelect="set_user_id"
                                    :displayKey="'username'"
                                />
                            </div>
                            <div class="input-control">
                                <label>商品</label>
                                 <DropDown
                                    :Width="'200'"
                                    :showInput="true"
                                    :list="product"
                                    :onSelect="set_product_id"
                                />
                            </div>
                            <div class="input-control">
                                <label>商品数量</label>
                                <input type="text" v-model="current.count">
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
                                    <th>用户</th>
                                    <th>商品</th>
                                    <th>商品数量</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.id}}</td>
                                    <td>{{row.$user?row.$user.username:'-'}}</td>
                                    <td>{{row.$product?row.$product.name:'-'}}</td>
                                    <td>{{row.count||'-'}}</td>
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
    this.model = "cart";
  },
  data() {
    return {
        searchable:['name'],
        with:[
            {model:'user',relation:'has_one'},
            {model:'product',relation:'has_one'},
        ],
    };
  },
  mounted() {
      this.read_by_model('user');
      this.read_by_model('product');
  },
  methods:{
    set_user_id(row){
        this.$set(this.current,'user_id',row.id);
    },
    set_product_id(row){
        this.$set(this.current,'product_id',row.id);
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
