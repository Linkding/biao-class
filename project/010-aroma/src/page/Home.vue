<template>
    <div>
        <div class="header">
            <div class="slider"></div>
        </div>
        <div class="cat">
            <div class="container">
                <div class="cat-list">
                    <div class="cat-title">明星单品</div>
                    <div class="row card-group">
                        <div class="col-lg-3 card">
                            <img src="../assets/img/glass01-pre.jpeg" alt="">
                            <span class="tap">红酒杯</span>
                        </div>
                        <div class="col-lg-3 card">
                            <img src="../assets/img/wine01-pre.jpeg" alt="">
                            <span class="tap">博若莱新酒</span>
                        </div>
                        <div class="col-lg-3 card">
                            <img src="../assets/img/xiangbin-pre.jpeg" alt="">
                            <span class="tap">香 槟</span>
                        </div>
                        <div class="col-lg-3 card">
                            <img src="../assets/img/glass01-pre.jpeg" alt="">
                            <span class="tap">红酒杯</span>
                        </div>
                    
                    </div>
                </div>
                <div class="cat-list">
                    <div class="cat-title">品酒场合</div>
                    <div class="row card-group">
                        <div class="col-lg-3 card">
                            <img src="../assets/img/glass01-pre.jpeg" alt="">
                            <span class="tap">家庭餐</span>
                        </div>
                        <div class="col-lg-3 card">
                            <img src="../assets/img/wine01-pre.jpeg" alt="">
                            <span class="tap">宴 席</span>
                        </div>
                        <div class="col-lg-3 card">
                            <img src="../assets/img/xiangbin-pre.jpeg" alt="">
                            <span class="tap">朋 友</span>
                        </div>
                        <div class="col-lg-3 card">
                            <img src="../assets/img/glass01-pre.jpeg" alt="">
                            <span class="tap">商 务</span>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.slider {
    background-image: url(../assets/img/bg03.jpg);
    background-repeat: no-repeat;
    background-size:  cover;
    width: 100%;
    min-height: 600px;
    background-position: 330% 30%;
    opacity: .9;
}
.cat {
    margin: 2rem 0;
}
.cat .cat-title{
    font-size: 3rem;
    padding: 5px 0;
    margin: 2rem 0;
}
.cat .card {
    /* background-image: url(.../assets/img/glass01.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    width: 25%; */
    /* min-height: 300px; */
    position: relative;
    padding: 0;
    margin: 0;
}
.cat .card img{
    height: 450px;
}
.cat .card .tap{
    font-size: 2rem;
    position: absolute;
    bottom: 10px;
    left: 5px;
    background: #F9726C;
    color: #fff;
    padding: 3px 15px;
}
</style>
