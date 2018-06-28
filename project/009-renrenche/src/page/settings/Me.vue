<template>
<div>
    <Nav :pushDown="true"/>
    <div class="row container">
        <div class="col-lg-3">
            <SettingNav/>
        </div>
        <div class="col-lg-9">
            <div class="content"> 
                <div class="row prop-item">
                    <div class="col-lg-3 tool-bar">
                        基础设置
                    </div>
                    <div class="col-lg-3 right">
                        <button @click="show_form = !show_form" class="btn btn-primaryg">更新</button>
                    </div>
                </div> 
                <div class="col-lg-6" v-if="show_form">
                    <form v-if="show_form" class="col-lg-6">
                        <div class="input-control">
                            <label>昵称</label>
                            <input type="text">
                        </div>
                        <div class="input-control">
                            <label>年龄</label>
                            <input type="text">
                        </div>
                        <div class="input-control">
                            <label>城市</label>
                            <input type="text">
                        </div>
                        <div class="input-control">
                            <label>职业</label>
                            <input type="text">
                        </div>
                        <div class="input-control">
                            <button type="submit" class="btn btn-primary btn-sub">提交</button>
                            <button @click="show_form=false" type="button" class="btn btn-primary btn-cancel">取消</button>
                        </div>
                    </form>
                </div>
                <div >
                    <div class="row prop-item">
                        <div class="col-lg-4 key">昵称</div>
                        <div class="col-lg-8 value">零丁</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">年龄</div>
                        <div class="col-lg-8" value>19</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">城市</div>
                        <div class="col-lg-8 value">西安</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">职业</div>
                        <div class="col-lg-8 value">白领</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">职业</div>
                        <div class="col-lg-8 value">白领</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">职业</div>
                        <div class="col-lg-8 value">白领</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">职业</div>
                        <div class="col-lg-8 value">白领</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">职业</div>
                        <div class="col-lg-8 value">白领</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-4 key">职业</div>
                        <div class="col-lg-8 value">白领</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Nav from "../../components/Nav";
import SettingNav from "../../components/SettingNav";

export default {
  components: {
    Nav,
    SettingNav
  },
  data(){
      return {
          show_form:true,
      }
  }
};
</script>
<style scoped>
    .content{
        position: relative;
        height: 100%;
        padding: 0 10px;
    }
    .content .tool-bar {
        font-size: 1.5rem;
    }
    button {
        font-size: 1.1rem;
    }
    
    .content .btn-cancel {
        margin-left: 15px;
        background: rgba(255, 0, 0, .3)
    }
    .content .key {
        opacity: .7;
    }
    .prop-item {
        margin: 10px;
        padding: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, .05)
    }

    form input {
        padding: 5px;
    }
</style>
