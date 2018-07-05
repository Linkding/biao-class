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
                        <h2>二手车列表</h2>
                        <SearchBar :model="model"  :cb="search" :searchable="searchable"/>
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建二手车</span></button>
                            <!-- <form class="search-bar" @submit="search($event)">
                                <input type="search" placeholder="请输入关键字" autofocus v-model="keyword">
                                <button type="submit">🔍</button>
                            </form> -->
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>标题</label>
                                <input v-validator="'required|max_length:40'"
                                    error-el="#title-error"
                                    type="text" v-model="current.title">
                                <div class="error-list">
                                    <div id="title-error"></div>
                                </div>
                            </div>
                            <div class="input-control">
                                <label>价格</label>
                                 <input v-validator="'positive'"
                                    error-el="#price-error"
                                    type="input" v-model="current.price">
                                <div class="error-list">
                                 <div id="price-error"></div>
                                </div>
                            </div>
                            <div class="input-control">
                                <label>卖车原因</label>
                                <input type="text" 
                                    v-validator="'max_length:140'"
                                    error-el="#publish_reason-error"
                                v-model="current.publish_reason">
                                <div class="error-lit">
                                    <div id="publish_reason-error"></div>
                                </div>
                            </div>
                            <div class="input-control">
                                <label>当前里程</label>
                                <input type="number" 
                                    v-validator="'positive'"
                                    error-el="#consumed_distance-error"
                                v-model="current.consumed_distance">
                                <div class="error-lit">
                                    <div id="consumed_distance-error"></div>
                                </div>
                            </div>
                            <div class="input-control">
                                <label>过户次数</label>
                                <input type="number"
                                     v-validator="'positive'"
                                     error-el="#exchange_times-error"
                                 v-model="current.exchange_times">
                                 <div class="error-list">
                                     <div id="exchange_times-error"></div>
                                 </div>
                            </div>
                            <div class="input-control">
                                <label>第一次上牌时间</label>
                                <input type="datetime-local" v-model="current.birthday">
                            </div>
                            <div class="input-control">
                                <label>预期出售时间</label>
                                <input type="datetime-local" v-model="current.deadline">
                            </div>
                            <div class="input-control">
                                <label>车况</label>
                                <input type="number" 
                                    v-validator="'required|positive|max:9'"
                                    error-el="#condition-error"
                                v-model="current.condition">
                                <div class="error-list">
                                    <div id="condition-error"></div>
                                </div>
                            </div>
                            <div class="input-control">
                                <label>描述</label>
                                <textarea 
                                    v-validator="'max_length:10000'"
                                    error-el="#description-error"
                                v-model="current.description"></textarea>
                                <div class="error-list">
                                    <div id="description-error"></div>
                                </div>
                            </div>
                             <div class="input-control">
                                <label>发布人</label>
                                <DropDown 
                                    
                                    :api="'user.username,realname'"
                                    displayKey="username"
                                    :onSelect="set_publisher_id"
                                />
                            </div>
                            <div class="input-control">
                                <label>品牌</label>
                                <DropDown :list="brand_list"/>
                            </div>
                            <div class="input-control">
                                <label>型号</label>
                                <DropDown :list="model_list"/>
                            </div>
                            <div class="input-control">
                                <label>设计</label>
                                <DropDown :list="design_list"/>
                            </div>
                            <div class="input-control">
                                <label class="dib">促销
                                <input type="checkbox" v-model="current.on_sale">
                                </label>
                                <label class="dib">本地车牌
                                <input type="checkbox" v-model="current.local">
                                </label>
                            </div>
                            <div class="input-control">
                                <button class="btn-primary" type="submit">提交</button>
                                <button @click="cancel()" class="btn-primary" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>标题</th>
                                    <th>价格</th>
                                    <th>买车原因</th>
                                    <th>当前里程</th>
                                    <th>发布人</th>
                                    <th>预期出售时间</th>
                                    <th>车况</th>
                                    <th>过户次数</th>
                                    <th>特价</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.title}}</td>
                                    <td>{{row.price}}</td>
                                    <td>{{'-'}}</td>
                                    <td>{{row.consumed_distance || '-'}}</td>
                                    <td>{{row.deadline || '-'}}</td>
                                    <td>{{row.condition ? row.condition + '成新' : '-'}}</td>
                                    <td>{{row.exchange_times || '-'}}</td>
                                    <td>{{row.on_sale || '-'}}</td>
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
import validator from '../../directive/validator';

import api from '../../lib/api';

export default {
    directives:{validator},
   created() {
       this.model = 'vehicle';
   },
  data() {
    return {
        searchable:['title'],
        model_list:[],
        brand_list:[],
        user_list:[],
        design_list:[],

    };
  },
  methods: {
      read_model(){
          api('model/read')
            .then(r=>{
                this.model_list = r.data;
            })
      },
      read_brand(){
          api('brand/read')
            .then(r=>{
                this.brand_list = r.data;
            })
      },
      read_user(){
          api('user/read')
            .then(r=>{
                this.user_list = r.data;
            })
      },
      read_design(){
          api('design/read')
            .then(r=>{
                this.design_list = r.data;
            })
      },
      set_publisher_id(row){
          this.$set(this.current,'model_id',row.id);
      }
  },
  mounted() {
      this.read_model();
      this.read_brand();
      this.read_user();
      this.read_design();
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

.search-bar {
    margin: 10px 0;
}
input {
  width: 45%;
  /* font-size: 1.6rem; */
}


button:hover {
  background: #181818;
}
</style>
