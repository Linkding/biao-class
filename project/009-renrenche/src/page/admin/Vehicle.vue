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
                        <div class="tool-bar">
                            <button @click="show_form= !show_form"><span v-if="show_form">收起</span><span v-else>创建二手车</span></button>
                            <SearchBar :model="model"  :cb="search" :searchable="searchable"/>
                            <!-- <form class="search-bar" @submit="search($event)">
                                <input type="search" placeholder="请输入关键字" autofocus v-model="keyword">
                                <button type="submit">🔍</button>
                            </form> -->
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>标题</label>
                                <input type="text" v-model="current.title">
                            </div>
                            <div class="input-control">
                                <label>价格</label>
                                <input type="number" v-model="current.price">
                            </div>
                            <div class="input-control">
                                <label>卖车原因</label>
                                <input type="text" v-model="current.publish_reason">
                            </div>
                            <div class="input-control">
                                <label>当前里程</label>
                                <input type="number" v-model="current.consumed_distance">
                            </div>
                            <div class="input-control">
                                <label>过户次数</label>
                                <input type="number" v-model="current.exchange_times">
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
                                <input type="number" v-model="current.condition">
                            </div>
                            <div class="input-control">
                                <label>描述</label>
                                <textarea v-model="current.description"></textarea>
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
                                    <th>里程</th>
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

export default {
   created() {
       this.model = 'vehicle';
   },
  data() {
    return {
        searchable:['title']
    };
  },
  methods: {
   
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
button {
  border-left: 0;
}

button:hover {
  background: #181818;
}
</style>
