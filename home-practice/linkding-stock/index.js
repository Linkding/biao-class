const Home =  Vue.component('home', {
    template:
    `
    <div>
        <div class="mask" v-if="show_trade">
            <div class="add">
                <!--form>
                    <div></div>
                    <input type="text" placeholder="添加交易">
                </form --> 
                <div class="row header">
                    <div class="col-lg-6 title">中国平安</div>
                    <div class="col-lg-6 add-btn"> 
                        <button @click="add_trade()">+添加交易</button>
                        <button @click="show_trade = false">取消</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>账户</th>
                            <th>姓名</th>
                            <th>股数</th>
                            <th>成本</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in trade_list">   
                            <td>{{row.id}}</td>
                            <td>{{row.account_id}}</td>
                            <td>{{row.name}}</td>
                            <td>{{row.shares}}</td>
                            <td>{{row.cost}}</td>
                            <td>
                                <span><button>更新</button></span>
                                <span><button>删除</button></span>
                            </td>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="container">
            <table>
                <thead class="head">
                    <tr>
                        <th>全部股票</th>
                        <th>最新价格</th>
                        <th>涨跌幅</th>
                        <th>昨收</th>
                        <th>成本</th>
                        <th>股数</th>
                        <th>持有市值</th>
                        <th>持仓比例</th>
                        <th>盈亏</th>
                        <th>账户</th>
                        <th>删除</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="stock-list" v-for="(row ,index) in stock_list">
                        <td>{{ row.name }}</td>
                        <td>{{ row.new_price }}</td>
                        <td>{{ row.change }}</td>
                        <td>{{ row.close }}</td>
                        <td>{{ row.cost }}</td>
                        <td>{{ }}</td>
                        <td>{{ row.mark_value }}</td>
                        <td>{{ row.position }}</td>
                        <td>{{ row.gain_loss }}</td>
                        <td>
                            <i class="fa fa-calculator" aria-hidden="true" @click="show_trade = !show_trade"></i>
                        </td>
                        <td @click="remove()">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </td>
                        <td>
                            <i class="fa fa-bars" aria-hidden="true"></i>
                        </td>
                    </tr>
                </tbody>
                </table>


        </div>
    </div>
    `,
    data() {
        return {
            show_trade:false,
            trade_list:[
                {
                    id: 1,
                    account_id:'东方财富',
                    name:'林xx',
                    shares:'200',
                    cost:'10',
                }
            ],
            stock_list: [
                {
                    name: '中国平安',
                    new_price: '1',
                    change: '1',
                    close: '1',
                    cost: '1',
                    account_list: [],
                    sum_stock:'',
                    mark_value: '1',
                    position: '1',
                    gain_loss: '1',
                },
                {
                    name: '中国太保',
                    new_price: '1',
                    change: '1',
                    close: '1',
                    cost: '1',
                    stock_num: '1',
                    mark_value: '1',
                    position: '1',
                    gain_loss: '1',
                },
            ],
            
        }
    },
    methods:{
        add_trade(){
            let len = this.trade_list.length;
            this.trade_list.push({
                id: len + 1,
                account_id:'',
                name:'',
                shares:'',
                cost:'', 
            })
        }
    }
})
const router = new VueRouter({
    routes:[
        {path:'/',component:Home},
    ]
})
new Vue({
    el: '.nav',
    router:router,
    computed:{
        count_stock:function(){
            
        }
    }
})