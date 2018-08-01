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
                        <h2>预约管理</h2>
                        <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/>
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建预约</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>用户</label>
                                <DropDown 
                                    :api="'user.username,real_name'" 
                                    :list="user"
                                    displayKey='username'
                                    :onSelect="set_user_id"
                                />
                            </div>
                            <div class="input-control">
                                <label>选择车辆</label>
                                <DropDown 
                                    :api="'vehicel.title'" 
                                    :list="vehicle"
                                    displayKey='title'
                                    :onSelect="set_vehicle_id"
                                />
                            </div>
                             <div class="input-control">
                                <label>预约时间</label>
                                <input type="date" v-model="current.appointed_at">
                            </div>
                            <div class="input-control">
                                <button class="btn-primary" type="submit">提交</button>
                                <button @click="cancel()" class="btn-primary" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>用户</th>
                                    <th>车辆</th>
                                    <th>预约时间</th>
                                    <th>备注</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.$user.username}}</td>
                                    <td>{{row.$vehicle.title}}</td>
                                    <td>{{row.appointed_at|| '-'}}</td>
                                    <td>{{row.remark|| '-'}}</td>
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
    this.model = "appo";
  },
  data() {
    return {
        searchable:['username'],
        user:[],
        vehicle:[],
        with:[
            {model:'vehicle',relation:'has_one'},
            {model:'user',relation:'has_one'},
        ]
    };
  },
  methods:{
        read_by_model(name){
            api(`${name}/read`).then(r=>{
              this[name]= r.data;
              console.log('this[name]',this[name]);
            })
        },
        set_user_id(row){
            this.$set(this.current,'user_id',row.id)
         },
        set_vehicle_id(row){
            this.$set(this.current,'vehicle_id',row.id)
        },
  },
  mounted() {
      this.read_by_model('user');
      this.read_by_model('vehicle');
  },
  mixins:[AdminPage],
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
