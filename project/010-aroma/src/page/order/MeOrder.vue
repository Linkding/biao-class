<template>
    <div>
        <div class="mask" v-if="show_detail_mask">
                    <div class="wrap-detail">
                        <div class="close right" @click="show_detail_mask = false">
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <th>序号</th>
                                    <th>商品名称</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>小计</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in product_info" :key="index">
                                        <td>{{item.$product?item.$product.id:item.id}}</td>
                                        <td>{{item.$product?item.$product.name:item.name}}</td>
                                        <td>{{item.$product?item.$product.price:item.price}}</td>
                                        <td>{{item.count||'-'}}</td>
                                        <td>{{item.$product?item.$product.price:item.price * item.count }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                            <td><span @click="show_detail(row.product_info)">查看</span></td>
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
                show_detail_mask:false,
                product_info:{},
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
            show_detail(row){
                // this.parse_product_info(row);
                this.product_info = [row];
                console.log('this.product_infot',this.product_info);
                
                this.show_detail_mask = true;
            },
            parse_product_info(row){
                console.log('row',row);
                
                let p = row.product_info
                    ,len = p.length
                    ,id
                    ;
                if(len > 1){
                    let info_id = []
                    for(let i = 0;i<len;i++){
                        info_id.push(p[i].id)
                    }
                    id = info_id;
                    this.read_product_info(id)
                        .then()
                }else {
                    let id = p.id
                }

            },
            read_product_info(id){
                return api('product/find_many',{
                            in:id,
                        }).then(r=>{
                            this.product_info = r.data;
                        });
            },
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
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .1);
}
.wrap-detail {
    position: absolute;
    top: 15%;
    left: 22%;
    width: 700px;
    height: 250px;
    background: #f8f8f6;
    padding: 20px;
}
</style>
