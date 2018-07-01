<template>
    <div>
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
                        <form v-if="show_trade_form" @submit="cod_trade($event)">
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
                    <form @submit="cod_stock($event)">
                        <div class="input-control">
                            <input type="text" placeholder="股票名称" v-model="current_stock.st_name">
                        </div>
                        <div class="input-control">
                            <input type="text" placeholder="股票代码" v-model="current_stock.st_num">
                        </div>
                        <div class="input-control">
                            <button type="submit">添加</button>
                        </div>
                    </form>
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
                            <td>{{ row.st_name }}</td>
                            <td>{{ row.st_num }}</td>
                            <td>{{ row.new_price || '-' }}</td>
                            <td>{{ row.change || '-'  }}</td>
                            <td>{{ row.close|| '-'  }}</td>
                            <td>{{ row.cost || '-' }}</td>
                            <td>{{ row.shares || '-' }}</td>
                            <td>{{ row.mark_value|| '-'  }}</td>
                            <td>{{ row.position || '-' }}</td>
                            <td>{{ row.gain_loss|| '-'  }}</td>
                            <td>
                                <i class="fa fa-calculator" aria-hidden="true" @click="on_show_trade(row.st_name,row.st_num)" ></i>
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
// import Trade from "./Trade";

export default {
  data() {
    return {
      show_trade_form: false,
      show_trade: false,
      on_click_stock: {}, //保存点击所对应股票的名字和代码
      current_trade: {},
      current_stock: {},
      trade_list: [],
      account_list: [],
      stock_list: [],
      stock_code_list: []
    };
  },
  methods: {
    close_trade_mask() {
      this.show_trade = false;
      this.init_stock();
    },
    cancel_input_trade() {
      this.show_trade_form = false;
      this.current_trade = {};
    },
    on_show_trade(name, number) {
      this.show_trade = true;
      this.on_click_stock.name = name;
      this.on_click_stock.number = number;

      this.read_trade(number);
    },
    cod_trade(e) {
      e.preventDefault();

      this.current_trade.stock_id = this.on_click_stock.number;
      this.current_trade.stock_name = this.on_click_stock.name;

      let action = this.current_trade.id ? "update" : "create";

      http(`trade/${action}`, this.current_trade).then(r => {
        this.read_trade(this.on_click_stock.number);
        this.current_trade = {};
      });
    },
    cod_stock(e) {
      e.preventDefault();
      let action = this.current_stock.id ? "update" : "create";
      http(`stock/${action}`, this.current_stock).then(r => {
        this.current_stock = {};
        this.init_stock();
      });
    },
    remove_trade(id, code) {
      if (confirm("确定需要删除吗？"))
        http("trade/delete", { id }).then(r => {
          this.read_trade(code);
        });
    },
    remove_stock(id) {
      if (confirm("确定需要删除吗？"))
        http("stock/delete", { id }).then(r => {
          this.read_stock();
        });
    },
    update_trade(row) {
      this.current_trade = row;
      this.show_trade_form = true;
    },
    read_stock() {
      http("stock/read").then(r => {
        this.stock_list = r.data.data;
        console.log("this.stock_list", this.stock_list);
      });
    },
    read_account() {
      http("account/read").then(r => {
        this.account_list = r.data.data;
        console.log("this.account_list", this.account_list);
      });
    },
    read_trade(code, on_success) {
      http("trade/search", { or: { stock_id: code } }).then(r => {
        this.trade_list = r.data.data;
        if (on_success) on_success(this.trade_list);
      });
    },
    init_stock() {
      http("stock/read").then(r => {
        //获取stock数据
        this.stock_list = r.data.data;
        console.log("this.stock_list", this.stock_list);
        //获取所有的股票代码，并取得对应的trade数据,并计算得出需要二次运算得出的值
        this.get_stock_code();
      });
    },
    get_stock_code() {
      let stock_list = this.stock_list;

      for (let i = 0; i < stock_list.length; i++) {
        let code = stock_list[i].st_num;
        this.stock_code_list.push(code);

        function on_success(list) {
            //计算股票总数
            stock_list[i].shares = helper.sum_arr_by_prop(list, "shares");
            //计算股票成本
            stock_list[i].cost = helper.math_round(
            helper.sum_arr_by_props(list, "cost", "shares") /
                stock_list[i].shares
            );
         };
        this.read_trade(code, on_success);
      }
      console.log("this.stock_list", this.stock_list);
    },
  },
  mounted() {
    this.read_account();
    // this.read_trade()
    this.init_stock();
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
</style>
