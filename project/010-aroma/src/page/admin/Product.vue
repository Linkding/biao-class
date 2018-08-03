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
                        <h2>产品管理</h2>
                        <!-- <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建产品</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>产品名称</label>
                                <input type="text" v-model="current.name">
                            </div>
                            <div class="input-control">
                                <label>产品类型</label>
                                <DropDown
                                    :showInput="true"
                                    :Width="'200'"
                                    :list='ptype'
                                    :onSelect="set_ptype_id"
                                    ref="edit_wine_ptype"
                                />
                            </div>
                             <div class="input-control">
                                <label>年份</label>
                                <input type="number" v-model="current.year" placeholder="例如：2007">
                            </div>
                             <div class="input-control">
                                <label>葡萄品种</label>
                                <!-- <div> -->
                                    <DropDown
                                        :showInput="true"
                                        :Width="'200'"
                                        :list='breed'
                                        :onSelect="set_breed_id"
                                        ref="edit_wine_breed"
                                    />
                                <!-- </div> -->
                            </div>
                            <div class="input-control">
                                <label>地区</label>
                                <DropDown
                                    :showInput="true"
                                    :Width="'200'"
                                    :list='location'
                                    :onSelect="set_location_id"
                                    ref="edit_wine_location"
                                />
                            </div>
                            <div class="input-control">
                                <label>用酒场合</label>
                                <DropDown
                                    :showInput="true"
                                    :Width="'200'"
                                    :list='occasion'
                                    :onSelect="set_occasion_id"
                                    ref="edit_wine_occasion"
                                />
                            </div>
                             <div class="input-control">
                                <label>价格</label>
                                <input type="text" v-model="current.price">
                            </div>
                             <div class="input-control">
                                <label>库存</label>
                                <input type="text" v-model="current.store">
                            </div>
                             <div class="input-control">
                                <label>是否新酒</label>{{current.new}}
                                <input type="checkbox" v-model="current.new">
                            </div>
                            <div class="input-control">
                                <label>图片地址</label>
                                <div style="margin-bottom: 5px;">
                                    <div v-for="(p, i) in current.preview" :key="i" class="input-group">
                                        <input type="text" placeholder="部位" v-model="p.name">
                                        <input type="url" placeholder="图片地址" v-model="p.url">
                                        <button @click="current.preview.splice(i, 1)" type="button">-</button>
                                    </div>
                                </div>
                                <button @click="current.preview.push({})" type="button">+</button>
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
                                    <th>产品名称</th>
                                    <th>产品类型</th>
                                    <th>年份</th>
                                    <th>品种</th>
                                    <th>地区</th>
                                    <th>价格</th>
                                    <th>库存</th>
                                    <th>场合</th>
                                    <th>是否新酒</th>
                                    <th>图片数量</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.id||'-'}}</td>
                                    <td>{{row.name||'-'}}</td>
                                    <td>{{row.$ptype?row.$ptype.name:'-'}}</td>
                                    <td>{{row.year||'-'}}</td>
                                    <td>{{row.$breed?row.$breed.name:'-'}}</td>
                                    <td>{{row.$location?row.$location.name:'-'}}</td>
                                    <td>{{row.price||'-'}}</td>
                                    <td>{{row.store||'-'}}</td>
                                    <td>{{row.$occasion?row.$occasion.name:'-'}}</td>
                                    <td>{{row.new||'-'}}</td>
                                    <td>{{row.preview.length||'-'}}</td>
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
    this.model = "product";
  },
  data() {
    return {
        searchable:['name'],
        breed:{},
        with:[
            {model:'location',relation:"has_one"},
            {model:'breed',relation:"has_one"},
            {model:'occasion',relation:"has_one"},
            {model:'ptype',relation:"has_one"},
        ]

    };
  },
  mounted() {
      this.read_by_model('breed');
      this.read_by_model('location');
      this.read_by_model('occasion');
      this.read_by_model('ptype');
  },
  methods:{
    set_breed_id(row){
         this.$set(this.current,'breed_id',row.id);
     },
    set_location_id(row){
        this.$set(this.current,'location_id',row.id);
    },
    set_occasion_id(row){
        this.$set(this.current,'occasion_id',row.id);
    },
    set_ptype_id(row){
        this.$set(this.current,'ptype_id',row.id);
    },
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
