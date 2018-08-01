<template>
    <div>
        <Nav :pushDown="true"/>
        <div>
            <div class="container">
                <div class="col-lg-2">
                    <AdminNav/>
                </div>
                <div class="col-lg-10">
                    <div class="wrapper">
                        <h2>二手车列表</h2>
                        <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/>
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
                                <label>封面地址</label>
                                <div style="margin-bottom: 5px;">
                                    <div v-for="(p, i) in current.preview" :key="i" class="input-group">
                                        <input type="text" placeholder="部位" v-model="p.name">
                                        <input type="url" placeholder="图片地址" v-model="p.url">
                                        <button @click="current.preview.splice(i, 1)" type="button">-</button>
                                    </div>
                                </div>
                                <button @click="current.preview.push({})" type="button">+</button>
                            </div>
                            <div class="input-box">
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
                                {{'上牌时间'+ current.birth_day}}
                                <div class="input-control">
                                    <label>第一次上牌时间</label>
                                    <input type="date" v-model="current.birth_day">
                                </div>
                                <div class="input-control">
                                    <label>预期出售时间</label>
                                    <input type="date" v-model="current.deadline">
                                </div>
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
                            {{'发布人id：'+current.publisher_id}}
                            <div class="input-box">
                                <div class="input-control">
                                    <label>发布人</label>
                                    <DropDown 
                                        :list="user_list"
                                        displayKey="username"
                                        :onSelect="set_publisher_id"
                                        :showInput="true"
                                        ref="edit_vehicle_publisher"
                                    />
                                </div>
                                <div class="input-control">
                                    <label>品牌 {{current.brand_id}}</label>
                                    <DropDown 
                                        :list="brand_list"
                                        :showInput="true"
                                        :onSelect="set_brand_id"
                                        ref="edit_vehicle_brand"
                                    />
                                </div>
                                <div class="input-control">
                                    <label>车系 {{current.model_id}}</label>
                                    <DropDown 
                                        :list="model_list"
                                        :showInput="true"
                                        :api="'model.name'"
                                        :onSelect="set_model_id"
                                        ref="edit_vehicle_model"
                                        
                                    />
                                </div>
                                <div class="input-control">
                                    <label>车型 {{current.design_id}}</label>
                                    <DropDown
                                        :showInput="true"
                                        :list="design_list"
                                        :onSelect="set_design_id"
                                        ref="edit_vehicle_design"
                                        
                                    />
                                </div>
                            </div>
                            {{'地址id:' + current.location_id}}
                            <div class="input-control">
                                <label>所属位置</label>
                                <Location :onSelect="set_location_id"/>
                            </div>
                            <div class="input-control">
                                <label class="dib">促销
                                <input type="checkbox" v-model="current.on_sale">
                                </label>
                                <label class="dib">本地车牌
                                <input type="checkbox" v-model="current.local" checked="checked">
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
                                    <th>卖车原因</th>
                                    <th>当前里程</th>
                                    <th>是否当地车牌</th>
                                    <th>过户次数</th>
                                    <th>初次上牌时间</th>
                                    <th>预期出售时间</th>
                                    <th>车况</th>
                                    <th>描述</th>
                                    <th>是否特价</th>
                                    <th>发布人</th>
                                    <th>品牌</th>
                                    <th>车系</th>
                                    <th>车型</th>
                                    <th>所在地</th>
                                    <th>预览</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.title}}</td>
                                    <td>{{row.price}}</td>
                                    <td>{{row.publish_reason}}</td>
                                    <td>{{row.consumed_distance||'-'}}</td>
                                    <td>{{row.local || '-'}}</td>
                                    <td>{{row.exchange_times || '-'}}</td>
                                    <td>{{row.birth_day || '-'}}</td>
                                    <td>{{row.deadline || '-'}}</td>
                                    <td>{{row.condition || '-'}}</td>
                                    <td>{{row.description || '-'}}</td>
                                    <td>{{row.on_sale || '-'}}</td>
                                    <td>{{row.publisher_id || '-'}}</td>
                                    <td>{{row.$brand.name || '-'}}</td>
                                    <td>{{row.$model.name || '-'}}</td>
                                    <td>{{row.$design.name || '-'}}</td>
                                    <td>{{row.location_id || '-'}}</td>
                                    <td>{{row.preview.url || '-'}}</td>
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
import AdminPage from "../../mixin/AdminPage";
import validator from "../../directive/validator";

import api from "../../lib/api";

export default {
  directives: { validator },
  created() {
    this.model = "vehicle";
  },
  data() {
    return {
      with: [
          {model:'brand',relation:'has_one'},
          {model:'model',relation:'has_one'},
          {model:'design',relation:'has_one'},
          {model:'user',relation:'has_one'},
      ],
      searchable: ["title"],
      model_list: [],
      brand_list: [],
      user_list: [],
      design_list: []
    };
  },
  methods: {
    read_model() {
      api("model/read",{limit:50}).then(r => {
        this.model_list = r.data;
      });
    },
    read_brand() {
      api("brand/read").then(r => {
        this.brand_list = r.data;
      });
    },
    read_user() {
      api("user/read").then(r => {
        this.user_list = r.data;
      });
    },
    read_design() {
      api("design/read").then(r => {
        this.design_list = r.data;
      });
    },
    set_publisher_id(row) {
      this.$set(this.current, "publisher_id", row.id);
    },
    set_brand_id(row) {
      this.$set(this.current, "brand_id", row.id);
    },
    set_model_id(row) {
      this.$set(this.current, "model_id", row.id);
    },
    set_design_id(row) {
      this.$set(this.current, "design_id", row.id);
    },
    set_location_id(row){
        if(row.type == 'city')
            this.$set(this.current,"location_id",row.id)
    },
  },
  mounted() {
    this.read_model();
    this.read_brand();
    this.read_user();
    this.read_design();
  },
  mixins: [AdminPage]
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
.input-control input {
    font-size: 1rem;
    width: 100%;
    padding: 10px;
}
.input-group button {
  background: #fff;
  margin: 0;
  color: black;
}

.input-group > * {
  font-size: 1rem;
}
.input-group > *:first-child {
  width: 20%;
}
.input-group > *:nth-child(2) {
  width: 60%;
}

.input-group > *:last-child {
  width: 20%;
}
.input-box > * {
    display: inline-block;
    padding-right:10px;
}
button:hover {
  background: #181818;
}

</style>
