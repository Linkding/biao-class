<template>
    <div>
        <Nav/>
        <!-- 基本信息 -->
        <div class="row basis">
            <div class="container" >
                <div class="breadcrumb">
                    {{detail.title}}
                </div>
                <div class="row header">
                    <div class="col-lg-6 title">{{detail.title}}</div>
                    <div class="col-lg-6 search right">
                        <form>
                            <input type="text" placeholder="搜索喜欢的车型">
                            <button type="submit">🔍</button>
                        </form>
                    </div>
                </div>
                <div class="row main">
                    <div class="col-lg-6 photo">
                        <div class="slider">
                            <img :src="detail.preview ? detail.preview[select_preview].url : ''" alt="">
                        </div>
                        <div class="thumbnail-list">
                            <div class="col-lg-1 prev"> <i class="fa fa-chevron-left" aria-hidden="true"></i> </div>
                            <div class="col-lg-10 thumbnail">
                                <div class="col-lg-3">
                                    <img src="../assets/detail/preview-01.webp" alt="">
                                </div>
                                <div class="col-lg-3">
                                    <img src="../assets/detail/preview-01.webp" alt="">
                                </div>
                                <div class="col-lg-3">
                                    <img src="../assets/detail/preview-01.webp" alt="">
                                </div>
                                <div class="col-lg-3">
                                    <img src="../assets/detail/preview-01.webp" alt="">
                                </div>
                            </div>
                            <div class="col-lg-1 nex"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="col-lg-6 sell-info">
                        <div class="title">{{detail.title}}</div>
                        <div class="quote">
                            <div class="first-row">
                                <div class="col-lg-2">
                                    卖家报价: 
                                </div>
                                <span class="price currency">{{detail.price}}万</span>
                                <span class="tax-inclusive">新车含税{{detail.price}}万</span>
                                <span>降价提醒</span>
                            </div>
                            <div class="second-row">
                                <div class="col-lg-2">分期买:  </div>
                                <span >首付 : <span class="price">{{detail.price *0.3}}万 </span></span>
                                <span>月供 : <span class="price">2409元 </span></span>
                                <span class="block">分期详情></span>
                            </div>
                            <div class="third-row">
                                <div class="col-lg-2">服务费:  </div>
                                <span class="price">3800元<span class="explain">（车价×4%）</span></span>
                                
                                <span>详情</span>
                            </div>
                            <div>
                                <div class="col-lg-2">服务项:</div>
                                <span class="server-item">整车质保</span>
                                <span class="server-item">14天可退</span>
                                <span class="server-item">249项车况检测</span>
                            </div>
                        </div>
                        <div class="info">
                            <div class="col-lg-3">
                                <div class="main-item">{{detail.birth_day|only_day}}</div>
                                <div class="des-item">上牌时间</div>
                            </div>
                            <div class="col-lg-3">
                                <div class="main-item">{{detail.consumed_distance}}万公里</div>
                                <div class="des-item">公里数</div>    
                            </div>
                            <div class="col-lg-2">
                                <div class="main-item">国四</div> 
                                <div class="des-item">外迁查询</div>
                            </div>
                            <div class="col-lg-2">
                                <div class="main-item">1.6L</div>
                                <div class="des-item">排量</div>
                            </div>
                            <div class="col-lg-2">
                                <div class="main-item">陕A</div>
                                <div class="des-item">上牌城市</div>
                            </div>
                        </div>
                        <div class="link-btn">
                            <div>
                                <div class="col-lg-4 ">
                                    <div class="btn btn-primary"><a href="#"><i class="fa fa-phone" aria-hidden="true"></i>预约看车</a></div>
                                </div>
                                <div class="col-lg-4 ">
                                    <div class="btn btn-primary"><a href="#">砍价</a></div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="sm-item">免费咨询</div>
                                    <div class="tel">400-639-0951</div>
                                </div>
                            </div>
                            <div class="last-row">
                                 <div class="col-lg-4">
                                    车源号：xa-251041  
                                </div>
                                <div class="col-lg-4">
                                    <i class="fa fa-heart-o" aria-hidden="true"></i>收藏
                                </div>
                                <div class="col-lg-4">
                                    <i class="fa fa-mobile" aria-hidden="true"></i>发送到手机
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 卖点 -->
        <div class="sell-point">
            <div class="container">
                <div class="col-lg-5">
                    <div class="title">价格参考</div>
                </div>
                <div class="col-lg-7">
                    <div class="first">
                        <div>
                            <div class="bold"><i class="fa fa-lightbulb-o" aria-hidden="true"></i>亮点配置</div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>遥控钥匙</td>
                                            <td>车载雷达</td>
                                            <td>电动天窗</td>
                                            <td>防抱死制动系统</td>
                                        </tr>
                                        <tr>
                                            <td>电子制动力分配系统</td>
                                            <td>胎压监测装置</td>
                                            <td>定速巡航</td>
                                            <td>车载电话</td>
                                        </tr>
                                    </tbody>
                                </table>
                                    
                            </div>
                        </div>
                        <div>
                            <span class="bold"><i class="fa fa-thumbs-up" aria-hidden="true"></i>0次过户</span>
                            <span>过户次数越少，保值率越高</span>
                        </div>
                        <div>
                            <span class="bold"><i class="fa fa-thumbs-up" aria-hidden="true"></i>良好车况</span>
                            <span>卖家正常代步使用，保养得当，车况良好</span>
                        </div>
                        <div>
                            <span class="bold"><i class="fa fa-thumbs-up" aria-hidden="true"></i>热销车型</span>
                            <span>市场保有量大，维修方便，保值率较高</span>
                        </div>
                    </div>
                    
                    <div class="second">
                        <div class="suggest">该车性价比较高，预计1-2天售出，建议尽快预约看车</div>
                        <div class="">
                            <a href="" class="btn-primary">预约看车</a>
                            <a href="" class="btn-primary">咨询车型</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row certificate">
            <div class="container">
                <div class="header">
                    <div class="title">人人车质量检测合格证</div>
                    <div class="right">249项专业检测：114项国家标准检测，135项人人车专项检测</div>
                </div>
                <div class="content">
                    <div class="col-lg-3">
                        <div>
                            <img src="https://img1.rrcimg.com/pgstx.png?imageView2/2/interlace/1/w/135/h/135/format/png&v=1" alt="">
                        </div>  
                        <div>
                            谢师傅    
                        </div> 
                        <div>
                            高级机动车检测师
                        </div> 
                        <div>
                            <span>检测车辆</span>
                            <span>1501 辆</span>
                        </div>
                        <div>
                            <span>拒绝问题车 756 辆</span>
                            <span>756 辆</span>
                        </div>
                        <div>
                            <a href="">车辆检测拒绝重大事故车</a>
                        </div>
                        <div>
                            <a href="" class="btn btn-primary">免费咨询车况</a>
                        </div>
                    </div>    
                    <div class="col-lg-9"></div>    
                </div>  
            </div>
        </div>
        <!-- 车子详情 -->
        <div class="row vehicle-detail">
            <div class="container">
                <div class="title-one">车辆详情</div>
                <div class="seller">
                    <div class="col-lg-6">
                        <div class="header">
                            <div class="col-lg-2">
                                    <div class="logo">
                                    <img src="" alt="">
                                    </div>
                                </div>
                                <div class="col-lg-10">
                                    <div class="title">卖家刘女士说</div>
                                    <div class="occupation">公司职员</div>
                                    <div class="location">未央</div>
                                </div>
                            </div>
                        <div class="main">
                            这辆车从2015年2月上牌至今一共跑了3.07万公里。家到公司虽然不远，不过做公交不是很方便，所以每天都开车。操控性好，大天窗虽然比不上全景天窗，但至少比大部分车的天窗要大很多，在车里坐着很通透，还有内饰，看着很上档次。这车是我当时逛了好多家4S店才订的新车。车对于我来说更像一个默默无闻的朋友，一直陪在我身边，我对待它很周到，它也从没有掉链子，一直兢兢业业的，让我很省心。车子也没有过什么事故，车况绝对算是优秀。如果你喜欢它，快来带走吧，好车不等人啊！
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="title">车辆手续信息</div>
                        <div class="content">
                            <div class="col-lg-6">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>年检到期时间</td>
                                            <td>2019-02</td>
                                        </tr>
                                        <tr>
                                            <td>商业险到期时间v</td>
                                            <td>2019-02</td>
                                        </tr>
                                        <tr>
                                            <td>有无购车发票</td>
                                            <td>有</td>
                                        </tr>
                                        <tr>
                                            <td>是否4S店保养</td>
                                            <td>否</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-lg-6">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>交强险到期时间  </td>
                                            <td> 2019-02</td>
                                        </tr>
                                        <tr>
                                            <td>过户次数</td>
                                            <td>0次</td>
                                        </tr>
                                        <tr>
                                            <td>车辆购置税完税证明</td>
                                            <td>无</td>
                                        </tr>
                                        <tr>
                                            <td>有无改装</td>
                                            <td>无</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="outward">
                    <div class="header">
                        <div class="title">车辆外观</div>
                        <div class="desc">车况优秀，性能部件正常使用，经检测，外观及车身结构无重大撞击。</div>
                    </div>
                    <div class="main photo-group">
                        <div>
                            <div class="col-lg-6 left">
                                <img src="../assets/detail/outward-01.webp" alt="">
                            </div>
                            <div class="col-lg-6 right">
                                <img src="../assets/detail/outward-02.webp" alt="">
                                
                            </div>
                        </div>
                        <div>
                            <div class="col-lg-6 left">
                                <img src="../assets/detail/outward-01.webp" alt="">
                            </div>
                            <div class="col-lg-6 right">
                                <img src="../assets/detail/outward-02.webp" alt="">
                                
                            </div>
                        </div>
                        <div class="thumbnail">
                            <div class="col-lg-3 ">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                            <div class="col-lg-3">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                            <div class="col-lg-3">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                            <div class="col-lg-3">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="interior">
                    <div class="header">
                        <div class="title">车辆内饰</div>
                        <div class="desc">车内部件功能正常使用，内饰、座椅磨损程度正常，座椅底部、安全带根部等无水泡痕迹。</div>
                    </div>
                    <div class="main photo-group">
                        <div>
                            <div class="col-lg-6 left">
                                <img src="../assets/detail/outward-04.webp" alt="">
                            </div>
                            <div class="col-lg-6 right">
                                <img src="../assets/detail/outward-04.webp" alt="">
                            </div>
                        </div>
                        <div>
                            <div class="col-lg-6 left">
                                <img src="../assets/detail/outward-04.webp" alt="">
                            </div>
                            <div class="col-lg-6 right">
                                <img src="../assets/detail/outward-04.webp" alt="">
                            </div>
                        </div>
                        <div>
                            <div class="col-lg-6 left">
                                <img src="../assets/detail/outward-04.webp" alt="">
                            </div>
                            <div class="col-lg-6 right">
                                <img src="../assets/detail/outward-04.webp" alt="">
                            </div>
                        </div>
                        <div class="thumbnail">
                            <div class="col-lg-3 ">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                            <div class="col-lg-3">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                            <div class="col-lg-3">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                            <div class="col-lg-3">
                                <img src="../assets/detail/outward-03.webp" alt="">
                            </div>
                    </div>
                    </div>   
                </div>
                <div class="engine">
                    <div class="header">
                        <div class="title">发动机底盘</div>
                        <div class="desc">油液位及品质正常，油封不泄露，线路管无剥落</div>
                    </div>
                    <div class="main photo-group">
                        <div>
                            <div class="col-lg-6 left">
                                <img src="../assets/detail/engine-01.webp" alt="">
                            </div>
                            <div class="col-lg-6 right">
                                <img src="../assets/detail/engine-01.webp" alt="">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="thumbnail-group">
                    <div class="col-lg-4">
                        <div class="name">车身外观</div>
                        <div class="thumbnail">
                            <div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                            </div>
                            <div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="name">车身外观</div>
                        <div class="thumbnail">
                            <div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                            </div>
                            <div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="name">车身外观</div>
                        <div class="thumbnail">
                            <div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                            </div>
                            <div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                                <div class="col-lg-6">
                                    <img src="../assets/detail/outward-03.webp" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 砍价 -->
        <div class="bargin">
            <div class="container">
                <div class="col-lg-6">
                    <div class="title">大众-高尔夫 2014款 1.7L 自动舒适型</div>
                    <div class="div">2015年02月 | 3.08万公里 |国四 |西安</div>
                </div>
                <div class="col-lg-6">
                    <div class="col-lg-4">
                        <div>卖家报价<span>￥9.50万</span></div>
                    </div>
                    <div class="col-lg-8">
                        <form>
                            <input type="seacher">
                            <button type="submit">搜索</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 检测报告 -->
        <div class="row report">
            <div class="container">
                <div class="header">
                    <div class="title">人人车检测报告</div>
                    <div class="desc">249项专业检测视频介绍</div>
                </div>
                <div class="test-head">
                    <div class="col-lg-4">检测时间：2018-06-25</div>
                    <div class="col-lg-4">检测城市：西安</div>
                    <div class="col-lg-4">检测对象：大众-高尔夫 2014款 1.7L 自动舒适型</div>
                </div>
                <!-- 检测表格 -->
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>车身颜色</td>
                                <td>白色</td>
                                <td>年检到期时间</td>
                                <td>2019-02</td>
                                <td>交强险到期时间</td>
                                <td>2019-02</td>
                                <td>商业险到期时间</td>
                                <td>2019-02</td>
                            </tr>
                            <tr>
                                <td>上牌日期</td>
                                <td>2015-02-23</td>
                                <td>出厂日期</td>
                                <td>2015-01-01</td>
                                <td>归属地</td>
                                <td>西安</td>
                                <td>过户次数</td>
                                <td>0次</td>
                            </tr>
                            <tr>
                                <td>有无购车发票</td>
                                <td>有</td>
                                <td>是否4S店保养</td>
                                <td>否</td>
                                <td>有无改装</td>
                                <td>无</td>
                                <td>车辆购置税完税证明</td>
                                <td>无</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 重大事故检测小结 -->
                <div class="summary">
                    <div class="col-lg-1"><span>合格</span></div>
                    <div class="col-lg-2">
                        <div class="title">重大事故排查</div>
                    </div>
                    <div class="col-lg-7">
                        <div class="desc">车体骨架结构无变形、无扭曲、无更换、无烧焊、无褶皱；无火烧痕迹，无水泡痕迹。</div>
                    </div>
                </div>
                <!-- 核心部件检测 -->
                <div class="key-test">
                    <div class="col-lg-4">
                        <div class="col-lg-5">
                            <img src="../assets/detail/logo-01.png" alt="">
                        </div>
                        <div class="col-lg-7">
                            <div>舱内保险丝盒无火烧熏黑痕迹</div>
                            <div>车辆覆盖件无火烧痕迹</div>
                            <div>发动机线束无火烧痕迹</div>
                            <div>防火墙有无火烧或熏黑痕迹</div>
                        </div>
                    </div>
                     <div class="col-lg-4">
                        <div class="col-lg-5">
                            <img src="../assets/detail/logo-01.png" alt="">
                        </div>
                        <div class="col-lg-7">
                            <div>舱内保险丝盒无火烧熏黑痕迹</div>
                            <div>车辆覆盖件无火烧痕迹</div>
                            <div>发动机线束无火烧痕迹</div>
                            <div>防火墙有无火烧或熏黑痕迹</div>
                        </div>
                    </div>
                     <div class="col-lg-4">
                        <div class="col-lg-5">
                            <img src="../assets/detail/logo-01.png" alt="">
                        </div>
                        <div class="col-lg-7">
                            <div>舱内保险丝盒无火烧熏黑痕迹</div>
                            <div>车辆覆盖件无火烧痕迹</div>
                            <div>发动机线束无火烧痕迹</div>
                            <div>防火墙有无火烧或熏黑痕迹</div>
                        </div>
                    </div>
                </div>
                 <div class="summary">
                    <div class="col-lg-1"><span>合格</span></div>
                    <div class="col-lg-2">
                        <div class="title">核心部件检测</div>
                    </div>
                    <div class="col-lg-7">
                        <div class="desc">经检测，刹车系统、被动系统、指示灯系统正常。</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row vehicle-parameter"></div>
        <div class="row footer"></div>
    </div>
</template>

<script>
import Nav from "../components/Nav";
import api from "../lib/api";
export default {
  components: { Nav },
  data(){
      return {
          detail:{},
          select_preview:0,
      }
  },
  mounted() {
      let id = this.get_id();
      this.find(id);
      

  },
  methods:{
      get_id(){
         return this.$route.params.id 
      },
      find(id){
          api('vehicle/find',{id})
            .then(r=>{
                this.detail = r.data
                console.log('find this.list',this.list);
                
            })
      }
  }
};
</script>

<style scoped>
.fa {
  padding-right: 10px;
  font-size: 1rem;
}

.fa.fa-lightbulb-o,
.fa.fa-thumbs-up {
  color: #fd521d;
}

.fa.fa-lightbulb-o {
  font-size: 2rem;
}
.fa.fa-thumbs-up {
  font-size: 1.1rem;
}
.fa.fa-chevron-left,
.fa.fa-chevron-right {
  font-size: 2rem;
  padding-top: 20px;
}

.fa.fa-phone {
  font-size: 1.2rem;
}

.fa.fa-heart-o {
  color: rgb(41, 64, 192);
}

.fa.fa-mobile {
  color: rgb(13, 144, 219);
  font-size: 1.2rem;
}

/* ==================== */
.price {
  color: orangered;
}

.basis > * {
  font-size: 1rem;
}

.basis .breadcrumb {
  font-size: 0.8rem;
  padding: 15px 0;
}
.basis .thumbnail-list {
  padding: 10px 0;
}
.basis .thumbnail-list .thumbnail > * {
  padding: 0 10px;
}
.basis .header {
  padding: 20px 0;
}

.basis .sell-info {
  padding-left: 50px;
}

.basis .header .title,
.basis .sell-info .title {
  font-size: 1.5rem;
  font-weight: 400;
}
.basis .search input {
  width: 40%;
}

/* .basis .search input,
.basis .search button {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, .1)
} */

.basis .search button {
  border-left: 0px;
  width: 8%;
}

.basis .search button:hover {
  background: orangered;
}

.basis .sell-info .title {
  padding: 20px 0px;
}

.basis .sell-info .quote {
  background: rgba(0, 0, 0, 0.03);
}
.basis .sell-info .quote > * {
  padding: 10px;
}

.basis .sell-info .quote .col-lg-2 {
  text-align: right;
  margin-right: 20px;
}

.basis .sell-info .tax-inclusive {
  font-size: 0.1rem;
  font-weight: 100;
}
.basis .sell-info .quote .currency,
.basis .sell-info .link-btn .tel {
  color: orangered;
}

.basis .sell-info .quote .currency {
  font-size: 1.6rem;
  font-weight: 600;
}

.basis .sell-info .quote span {
  padding: 0 10px;
}

.basis .sell-info .quote .third-row {
  padding-top: 10px;
}
.basis .sell-info .quote .second-row {
  border-bottom: 2px solid #fff;
  padding-bottom: 25px;
}

.basis .sell-info .quote .explain {
  padding: 0;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.5rem;
}
.basis .sell-info .quote .server-item {
  font-size: 0.5rem;
}
.block {
  font-size: 0.6rem;
  background: orangered;
  width: 50px;
  padding: 6px;
  color: #fff;
}

/* ========.info======== */
.basis .sell-info .info {
  font-size: 1.5rem;
  padding: 20px 10px;
}

.basis .sell-info .info > * {
  padding-left: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.basis .sell-info .info .main-item {
  font-size: 1.3rem;
  font-weight: 500;
}

.basis .sell-info .info .des-item {
  font-size: 0.4rem;
  color: rgba(0, 0, 0, 0.4);
}

/* ===========link-btn======== */
.basis .sell-info .link-btn {
  padding: 15px 0;
}
.basis .sell-info .link-btn .btn-primary {
  width: 150px;
  text-align: center;
  border-radius: 5px;
}
.basis .sell-info .link-btn a {
  color: #fff;
}

.basis .sell-info .link-btn .sm-item {
  color: rgba(0, 0, 0, 0.3);
  font-size: 0.5rem;
}

.basis .sell-info .link-btn .tel {
  font-size: 1.3rem;
  font-weight: 600;
}

.basis .sell-info .last-row {
  padding: 20px 0;
  padding-right: 20px;
  text-align: center;
}

.basis .sell-info .last-row .col-lg-4 {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

/* ============sell-point========= */
.sell-point {
  margin: 20px;
}
.sell-point .container {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid #fd521d;
}
.sell-point .col-lg-5,
.sell-point .col-lg-7 {
  padding: 20px 40px;
}

.sell-point .col-lg-5 .title {
  border-left: 6px solid #fd521d;
  padding-left: 10px;
}

.sell-point .col-lg-7 > * {
  font-size: 0.7rem;
}

.sell-point .first {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}
.sell-point .first table {
  padding: 15px;
}
.sell-point .first td {
  padding-right: 15px;
}

.sell-point .col-lg-7 .bold {
  padding: 20px 0;
  padding-right: 15px;
  font-size: 1rem;
  font-weight: 500;
}

.sell-point .second {
  margin: 10px 0;
}

.sell-point .second > * {
  padding: 10px 0;
}

.sell-point .second .suggest {
  font-size: 1.1rem;
}

.sell-point .second a {
  padding: 10px 20px;
  margin: 0 20px;
}
/* =============vehicle-detail=========== */
.certificate .container,
.vehicle-detail .container,
.bargin .container {
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.certificate,
.vehicle-detail {
  margin: 10px 0;
}
.certificate .header {
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.certificate .header .title,
.vehicle-detail .seller .header .title,
.vehicle-detail .outward .header .title,
.vehicle-detail .engine .header .title,
.report .header .title {
  font-size: 1.2rem;
  text-align: center;
}

.vehicle-detail .seller .header .desc,
.vehicle-detail .outward .header .desc,
.vehicle-detail .engine .header .desc,
.report .header .desc {
  font-size: 0.8rem;
  text-align: center;
}
.certificate .header .right {
  font-size: 0.5rem;
}

.vehicle-detail .title-one {
  font-size: 1.5rem;
  text-align: center;
}
.vehicle-detail .seller {
  padding: 20px 60px;
}
.vehicle-detail .photo-group .left {
  padding: 10px 10px 10px 0;
}

.vehicle-detail .photo-group .right {
  padding: 10px 0 10px 10px;
}

.vehicle-detail .photo-group .thumbnail {
  margin-right: -10px;
}
.vehicle-detail .photo-group .thumbnail > * {
  padding: 10px 10px 10px 0;
}

.vehicle-detail .thumbnail-group > *,
.vehicle-detail .thumbnail-group .thumbnail .col-lg-6 {
  padding: 10px;
}

/* ==============report===== */
.report .container {
  padding: 10px 30px;
}
.report table {
  border-collapse: collapse;
}
.report table td {
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 1);
}
.report .summary {
  font-size: 1.1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>
