<template>
    <div>
        <Login ref="onShow"/>
        <div class="mask" v-if="show_trade">
             <div class="add_trade">
                <div class="row header">
                    <div>
                        <div class="col-lg-5 title left">{{on_click_stock.name}}</div>
                        <div class="col-lg-5"> 
                            <button @click="show_trade_form = !show_trade_form">+添加交易</button>
                        </div>
                        <div class="col-lg-2 right"><i class="fa fa-times" aria-hidden="true"  @click="close_trade_mask()"></i></div>
                    </div>
                    <div>
                        <form v-if="show_trade_form" @submit="cou_trade($event)">
                            <div class="input-control">
                                <select v-model="current_trade.account_name">
                                    <option v-for="(account,index) in account_list" :key="index" :value="account.name">{{account.name}}</option>
                                </select>
                            </div>
                            <div class="input-control">
                                <input type="text" placeholder="姓名" v-model="current_trade.user"/>
                            </div>
                                <div class="input-control">
                                <input type="text" placeholder="股数" v-model="current_trade.shares"/>
                            </div>
                            <div class="input-control">
                                <input type="text" placeholder="成本" v-model="current_trade.cost"/>
                            </div>
                            <div class="input-control">
                                <button type="submit">确定</button>
                                <button type="button" @click="cancel_input_trade()">取消</button>
                            </div>
                        </form>
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
                        <tr v-for="(row,index) in trade_list" :key="index">   
                            <td>{{index + 1}}</td>
                            <td>{{row.account_name}}</td>
                            <td>{{row.user}}</td>
                            <td>{{row.shares}}</td>
                            <td>{{row.cost}}</td>
                            <td>
                                <span><button @click="update_trade(row)">更新</button></span>
                                <span><button @click="remove_trade(row.id,on_click_stock.number)">删除</button></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="container">
            <div>
                <div class=" search-bar">
                  <div class="col-lg-8">
                    
                    <form @submit="cou_stock($event)">
                        <div class="input-control">
                            <input type="text" placeholder="股票代码" v-model="current_stock.code">
                        </div>
                        <div class="input-control">
                            <input type="text" placeholder="股票名称" v-model="current_stock.name">
                        </div>
                        <div class="input-control">
                            <button type="submit">添加</button>
                        </div>
                    </form>
                  </div>
                  <div class="col-lg-4 right">
                    <button @click="toggle_login">登录</button>
                  </div>
                </div>
                <div class="banner">
                    <div class="col-lg-3">持有市值：{{total_value}}</div>
                    <div class="col-lg-3">总盈亏：{{total_value}}</div>
                    <div class="col-lg-6 right">
                      <button  @click="test()" type="submit"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                    </div>
                </div>
                <table>
                    <thead class="thead">
                        <tr>
                            <th>全部股票</th>
                            <th>股票代码</th>
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
                        <tr id="stock-list" v-for="(row ,index) in stock_list" :key="index">
                            <td>{{ row.name }}</td>
                            <td>{{ row.code }}</td>
                            <td>{{row.price}}</td>
                            <td>{{ row.change || '-'  }}</td>
                            <td>{{ row.close|| '-'  }}</td>
                            <td>{{ row.cost || '-' }}</td>
                            <td>{{ row.shares || '-' }}</td>
                            <td>{{  math_round(row.price ,row.shares)  || '-'}}</td>
                            <td>{{ toPercent(math_round(row.cost,row.shares)/total_value )|| '-' }}</td>
                            <td>{{ row.gain_loss|| '-'  }}</td>
                            <td>
                                <i class="fa fa-calculator" aria-hidden="true" @click="on_show_trade(row.name,row.code,index)" ></i>
                            </td>
                            <td>
                                <i class="fa fa-times" aria-hidden="true" @click="remove_stock(row.id)"></i>
                            </td>
                            <td>
                                <i class="fa fa-bars" aria-hidden="true"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import http from "../util/http";
import helper from "../util/helper";
import Login from "./Login";

export default {
  components: { Login },
  data() {
    return {
      show_trade_form: false, //输入trade数据表单
      show_trade: false, //trade面板
      on_click_stock: {}, //保存点击所对应股票的名字和代码
      current_trade: {},
      current_stock: {},
      trade_list: [],
      account_list: [],
      stock_list: [],
      stock_code_list: [],
      real: [],
    };
  },
  methods: {
    test(){
      console.log('this.stock_code_list',this.stock_code_list);
      
      http.api(this.stock_code_list)
        .then(r=>{
          this.real = r.data;
          this.meger_real_to_stock();
        })
    },
    //显示登录页面
    toggle_login() {
      this.$nextTick(() => {
        this.$refs.onShow.toggle_login();
      });
    },
    read_real() {
      http.api().then(r => {
        this.real = r.data;
        console.log("r", r);
      });
    },
    //四舍五入计算
    math_round(p1, p2) {
      return helper.math_round(p1 * p2);
    },
    //转换百分比
    toPercent(num) {
      return helper.toPercent(num);
    },
    //关闭trade
    close_trade_mask() {
      this.show_trade = false;
    },
    //取消trade表单编辑
    cancel_input_trade() {
      this.show_trade_form = false;
      this.current_trade = {};
    },
    on_show_trade(name, code, index) {
      this.show_trade = true;
      this.on_click_stock.name = name;
      this.on_click_stock.number = code;
      this.on_click_stock.index = index;

      this.read_trade(code);
    },
    cou_trade(e) {
      e.preventDefault();
      //更新前，获取对应股票的id和名字,以及用户id
      this.current_trade.stock_code = this.on_click_stock.number;
      this.current_trade.stock_name = this.on_click_stock.name;
      this.current_trade.user_id = helper.get('user_id');

      let action = this.current_trade.id ? "update" : "create";
      http.post(`trade/${action}`, this.current_trade).then(r => {
        this.read_trade(this.on_click_stock.number);
        this.current_trade = {};
      });

      //更新后，将对应股的二次运算数据重算
      this.update_cal_stock(this.on_click_stock.index, this.trade_list);
    },
    update_cal_stock(index, list) {
      //计算股票总数
      this.stock_list[index].shares = helper.math_round(
        helper.sum_arr_by_prop(list, "shares")
      );
      // //计算股票成本
      this.stock_list[index].cost = helper.math_round(
        helper.sum_arr_by_props(list, "cost", "shares") /
          this.stock_list[index].shares
      );
    },
    cou_stock(e) {
      e.preventDefault();
      this.current_stock.user_id = helper.get('user_id');
      let action = this.current_stock.id ? "update" : "create";
      http.post(`stock/${action}`, this.current_stock).then(r => {
        this.current_stock = {};
        this.init_stock();
      });
    },
    remove_trade(id, code) {
      if (confirm("确定需要删除吗？"))
        http.post("trade/delete", { id }).then(r => {
          this.read_trade(code);
        });
    },
    remove_stock(id) {
      if (confirm("确定需要删除吗？"))
        http.post("stock/delete", { id }).then(r => {
          this.read_stock();
        });
    },
    update_trade(row) {
      this.current_trade = row;
      this.show_trade_form = true;
    },
    read_stock() {
      http.post("stock/read").then(r => {
        this.stock_list = r.data;
      });
    },
    read_account() {
      http.post("account/read").then(r => {
        this.account_list = r.data;
      });
    },
    read_trade(code, index, on_success) {
      http.post("trade/search", { or: { stock_code: code } }).then(r => {
        this.trade_list = r.data;
        if (on_success) on_success(index, this.trade_list);
      });
    },
    init_stock() {
      http.post("stock/read").then(r => {
        //获取stock数据
        this.stock_list = r.data;
        //获取所有的股票代码，并取得对应的trade数据,并计算得出需要二次运算得出的值
        this.cal_stock_data();
      });
    },
    cal_stock_data() {
      let stock_list = this.stock_list;

      for (let i = 0; i < stock_list.length; i++) {
        let code = stock_list[i].code;
        this.stock_code_list.push(code);//保存股票代码列表，留用
        this.read_trade(code, i, this.update_cal_stock);
      }
    },
    meger_real_to_stock() {
      let real_len = this.real.length;
      for (let i = 0; i < real_len; i++) {
        let stock_length = this.stock_list.length;
        for (let r = 0; r < stock_length; r++) {
          if (this.real[i].code == this.stock_list[r].code)
            this.$set(this.stock_list[r],'price',this.real[i].close)
        }
      }
    },
  },
  computed: {
    total_value: function() {
      let result = helper.sum_arr_by_props(this.stock_list, "price", "shares");
      return helper.math_round(result);
    }
  },
  mounted() {
    this.read_account();
    // this.read_trade()
    this.init_stock();
    // this.read_real();
  },
  watch: {
    real: {
      deep: true,
      handler(n) {
        this.meger_real_to_stock();
      }
    }
  }
};
</script>
<style scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  /* opacity: 200; */
}

.add_trade {
  font-size: 1rem;
  position: absolute;
  width: 70%;
  min-height: auto;
  top: 100px;
  left: 15%;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #e2d4c0;
}

.add_trade .title {
  padding: 0px 15px;
  font-size: 1.3rem;
  font-weight: 600;
}
.header {
  background: #cba58c;
  padding: 10px;
}
.header > * {
  padding-bottom: 5px;
}

form > * {
  padding-right: 5px;
}
form button {
  margin: 0 4px;
}
table {
  font-size: 12px;
}

table thead {
  background: rgb(243, 224, 212);
}

.thead {
  background: #e2d4c0;
}

.search-bar {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.banner {
  padding: 10px;
  font-size: 1.1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-top: 0;
}
.banner > *{
  vertical-align: middle;
  
}
.banner button:hover {
  background: #E2D4C0;
}
</style>
