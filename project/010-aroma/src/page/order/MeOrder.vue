<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-lg-3">
                <SideNav/>
            </div>
            <div class="col-lg-9">
                <div class="table">
                    <table>
                        <thead>
                            <th>序号</th>
                            <th>订单号</th>
                            <th>总价</th>
                            <th>订单信息</th>
                            <th>付款方式</th>
                            <th>已付款</th>
                            <th>备注</th>
                            <th>用户</th>
                            <th>操作</th>
                        </thead>
                        <tbody>
                            <tr v-for="(row,index) in list" :key="index">
                            <td>{{row.id||'-'}}</td>
                            <td>{{row.oid||'-'}}</td>
                            <td>{{row.sum||'-'}}</td>
                            <td><span @click="show_detail(row)">查看</span></td>
                            <td>{{row.pay_by||'-'}}</td>
                            <td>{{row._paid?'是':'否'}}</td>
                            <td>{{row.memo||'-'}}</td>
                            <td>{{row.$user?row.$user.username:'-'}}</td>
                            <td>
                                <div v-if="!row._paid">
                                    <router-link :to="`/pay/${row.oid}`" class="btn">付款</router-link>
                                    <span @click="cancel(row.id)" class="btn">取消订单</span>
                                </div>
                                <div v-else>订单完成</div>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mask">
                    <div class="wrap-detail">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import session from '../../lib/session';
    import api  from '../../lib/api';
    import Nav from '../../components/Nav';
    import SideNav from '../../components/SideNav';

    export default{
        components:{Nav,SideNav},
        data(){
            return{
                show_detail:false,
                uinfo:session.uinfo(),
                list:{},
                with:[
                    {model:'user',relation:'has_one'},
                ]
            }
        },
        mounted() {
            this.read()
        },
        methods:{
            read(){
                api('order/search',{
                    or:{
                    user_id:this.uinfo.id,
                    },
                    with:this.with,
                }).then(r=>{
                    this.list = r.data;
                    console.log('this.list',this.list);
                    
                })
            },
            cancel(id){
                api('order/delete',{id})
                    .then(r=>{
                        this.read();
                    })
            }
        },
    }
</script>
<style scoped>
.btn{
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, .1);
    color: #000;
    cursor: pointer;
    margin: 0 2px;
}
</style>
