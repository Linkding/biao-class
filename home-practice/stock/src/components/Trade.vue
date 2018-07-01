<template>
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
                <button type="button" @click="show_trade_form=false">取消</button>
            </div>
        </form>
    </div>  
</template>
<script>
import http from "../util/http";

export default {
  data() {
    return {
       
    };
  },
  methods: {
    cod_trade(e) {
      e.preventDefault();
      let action = this.current_trade.id ? "update" : "create";
      http(`trade/${action}`, this.current_trade).then(r => {
        this.read_trade();
      });
    },
    remove_trade(id) {
      if (confirm("确定需要删除吗？"))
        http("trade/delete", { id }).then(r => {
          this.read_trade();
        });
    },
    update_trade(row) {
      this.current_trade = row;
      this.show_trade_form = true;
    },
    read_account() {
      http("account/read").then(r => {
        this.account_list = r.data.data;
        console.log("this.account_list", this.account_list);
      });
    },
    read_trade() {
      http("trade/read").then(r => {
        this.trade_list = r.data.data;
      });
    }
  },
  mounted() {
   
  }
};
</script>
<style scoped>

</style>
