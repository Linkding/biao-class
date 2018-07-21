<template>
    <div>
        <Nav/>
        <!-- 车辆信息 -->
        <div class="sell-area">
            <div class="container">
                <div class="header">
                    <div class="col-lg-6">
                        <span>雪佛兰 迈锐宝 2012款 2.0L 自动豪华版</span>
                    </div>
                    <div class="col-lg-6 right">
                        <span>车源号：HC-37907701</span>
                    </div>
                </div>
                <div class="main">
                    <div class="col-lg-6 ">
                        <div class="slider">
                            <img :src="detail.preview ? detail.preview[select_preview].url : ''" alt="">
                        </div>
                        <div class="thumbnail-list" v-for="(row,index) in detail.preview" :key="index" >
                            <div @mouseover="select_preview = index"><img :src="row.url" alt=""></div>
                        </div>
                    </div>
                    <div class="col-lg-6 order-panel">
                        <h2>{{detail.title}}</h2>
                        <div class="row-panel">
                            <div class="item">
                                <div class="value">{{detail.birth_day|only_day}}</div>
                                <div class="prop">上牌时间</div>
                            </div>
                            <div class="item">
                                <div class="value">{{detail.consumed_distance}}</div>
                                <div class="prop">表显里程</div>
                            </div>
                            <div class="item">
                                <div class="value">{{detail.location_id}}</div>
                                <div class="prop">上牌城市</div>
                            </div>
                            <div class="item">
                                <div class="value">2.0</div>
                                <div class="prop">排量</div>
                            </div>
                             <div class="item">
                                <div class="value">自动</div>
                                <div class="prop">变速箱</div>
                            </div>
                        </div>
                        <div class="row-panel">
                            <span>车主报价
                                <span class="price currency">{{detail.price}}万</span>
                                <span class="currency">含税{{detail.price}}万</span>
                            </span>
                        </div>
                        <div class="row-panel loan-panel">
                            <div class="row">
                                <div class="col-lg-6 left">2.4万带回家</div> 
                                <div class="col-lg-6 right">贷款详情</div>  
                            </div>
                            <div class="row">
                                <div class="loan">在线贷款秒批，最高可贷30万</div>
                            </div>
                        </div>
                        <div class="row-panel service">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="col">
                                        服务保障升级
                                    </div>
                                    <div class="col box">
                                        理赔高达5.14万
                                    </div>
                                    <div class="col box">
                                        保全车13大系统
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="right">查看更多</div>
                                </div>
                            </div>
                        </div>
                        <div class="row-panel appo" v-if="!appointed_appo.appointed_at">
                            <div v-if="!show_appo">
                                <button @click="show_appo = true">预约看车</button>
                                &nbsp;<span class="tel">400-080-5027</span>
                            </div>
                            <form v-if="show_appo" @submit="submit_appo">
                                <div class="input-control">
                                    <label for="appointed_at">预约时间</label>
                                    <input v-validator="'required'" id="appointed_at" type="date" v-model="appo.appointed_at">
                                </div>
                                <div class="input-control btn-group">
                                    <button type="submit" class="btn-primary">预约</button>
                                    <button type="button" @click="show_appo=false">取消</button>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <button>已预约</button>
                            <p>{{appointed_appo.appointed_at}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 检测报告 -->
        <div class="vehicle-detail">
            <div class="container">
                <h2>车辆详情</h2>
                <div class="row">
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='排除重大事故检测2' 
                            cat='major_accident'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='外部配置检测' 
                            cat='surface_peripheral'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='泡水火烧检测' 
                            cat='soaking_and_roasting'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='轻微碰撞检测' 
                            cat='minor_crash'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='易损耗部件检测' 
                            cat='consumable'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='安全系统检测' 
                            cat='security_system'
                        />
                    </div>
                    
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='内部配置检测' 
                            cat='inner_peripheral'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='灯光系统检测' 
                            cat='lighting_system'
                        />
                    </div>
                     <div class="col-lg-6">
                         <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='高科技配置检测' 
                            cat='high_tech'
                        />
                    </div>
                    <div class="col-lg-6">
                        <ReportPanel 
                            :report='report' 
                            :reportStructure='report_structure' 
                            title='随车工具检测' 
                            cat='tool'
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../components/Nav";
import ReportPanel from "../components/ReportPanel";
import api from "../lib/api";
import session from '../lib/session';
export default {
  components: { Nav,ReportPanel },
  data(){
      return {
            show_appo:false,
            appo:{},
            appointed_appo : {},
            detail:{},
            select_preview:0,
            report:{},
            report_structure:{},
            with:[
                {model:'location',type:"has_one"}
            ]
      }
  },
  mounted() {
      let id = this.get_id();
      this.find(id);
      this.find_report_by_vehicle(id);
      this.get_report_structure();
      this.prepare_appo_row();
      this.has_appointed();
  },
  methods:{
        prepare_appo_row(){
            this.appo.vehicle_id = this.get_id();
            // console.log('session.uinfo()',session.uinfo());
            this.appo.user_id = session.uinfo().id;
        },
        submit_appo(e){
            e.preventDefault();
            api('appo/create',this.appo)
                .then(r=>{
                    this.has_appointed();
                })
        },
        has_appointed(){
            let row = this.appo;
            let query = `where("vehicle_id" = ${row.vehicle_id} and "user_id" = ${row.user_id})`;
            api('appo/read',{query})
                .then(r=>{
                    if(r.success)
                        this.appointed_appo = r.data[0];
                })
        },
        get_id(){
            return this.$route.params.id 
        },
        find(id){
            api('vehicle/find',{id,with:this.with})
                .then(r=>{
                    this.detail = r.data
                    console.log('find this.list',this.list);
                })
        },
        find_report_by_vehicle(vid){
            api('report/first',{
                where:{
                    vehicle_id:vid, 
                }
            }).then(r=>{
                this.report = r.data;
            })
        },
        get_report_structure(){
            api('MODEL/FIND',{name:'report'})
                .then(r=>{
                    this.report_structure = r.data.structure;
                })
        }
  }
};
</script>

<style scoped>
.sell-area .header{
    padding: 15px 0;
}
.sell-area .thumbnail-list{
    overflow: auto;
    width: 25%;
    display: inline-block;
    margin: 10px 0;
    padding: 0 5px;
}
.sell-area .order-panel {
    padding-left: 20px;
}

.sell-area .order-panel .row-panel {
    margin-bottom: 15px;
}
.sell-area .order-panel  .item {
    display: inline-block;
    padding: 0 18px;
    text-align: center;
}
.sell-area .order-panel  .item .value {
    font-size: 1.2rem;
}
.sell-area .order-panel  .item .prop {
    padding: 4px 0;
}
.sell-area .order-panel .price {
    font-size: 1.5rem;
    
}
.sell-area .order-panel .loan-panel {
    background: rgba(0, 0, 0, .08);
    padding: 10px;
}

.sell-area .order-panel .row {
    padding: 10px 15px;
}
.sell-area .order-panel .row .loan {
    font-size: 1rem;
    padding: 1px 0;
}
.sell-area .order-panel .service .row > * {
    font-size: 0.9rem;
    margin: 0 4px;
}
.sell-area .order-panel .service .row .box {
    border: 1px solid #0B5A81;
    padding: 0 2px;
}

.sell-area .order-panel .appo button
{
    vertical-align: middle;
}
.sell-area .order-panel .appo label,
.sell-area .order-panel .appo .tel {
    font-size: 1.1rem;
    color: #0B5A81;
}
/* 车辆详情 */
.vehicle-detail h2,
.vehicle-detail .report-panel  .title {
    text-align: center;
}
</style>
