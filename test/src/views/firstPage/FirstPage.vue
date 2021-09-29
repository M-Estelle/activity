<template>
  <div class="first-page">
    <div class="first-page-bg">
      <div class="login-bg">
        <div class="first-top">
          <div class="first-top-time">1天14时</div>
          距离活动结束还有
        </div>
      </div>

    </div>
    <div class="card-box">
      <div class="first-card">

        <div class="box-card" @click="toActivity">
          <el-card class="one-card" >
            <img src="~@/assets/img/first/activity.png">
            <div>参加活动</div>
          </el-card>
        </div>
        <div class="box-card">
          <el-card class="one-card">
            <img src="~@/assets/img/first/rank.png">
            <div>查看排名</div>
          </el-card>
        </div>
        <div class="box-card">
          <el-card class="one-card">
            <img src="~@/assets/img/first/prize.png">
            <div>领取证书</div>
          </el-card>
        </div>
        <div class="box-card" @click="exit">
          <el-card class="one-card">
            <img src="~@/assets/img/first/exit.png">
            <div>退出登录</div>
          </el-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstPage",
  methods:{
    exit(){
      localStorage.removeItem('userInfo');
      this.$router.replace('/login')
    },
    toActivity(){
      this.$router.push('/activity')
    }
  }
}
</script>

<style scoped>
.first-page{
  height: 100vh;
}
.first-page-bg {
  box-sizing: border-box;
  background-image: url('~@/assets/img/login/pic2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position:center;
}
.login-bg{
  box-sizing: border-box;
  height: 270px;
  width: 100%;
  background-color: rgba(1,104,181, 0.85);

}
.first-top {
  background-image: url('~@/assets/img/first/bg1.png');
  background-position:center center;
  background-repeat: no-repeat;

  height: 100px;
  color: #fff;
  font-size: 15px;
  text-align: center;
  width: auto;
  padding-top: 65px;
  margin: 0 auto;
}

.first-top-time {
  line-height: 80px;
  font-size: 45px;
}
.first-top img{
  margin: 0 10px;
  height: 20px;
  width: 20px;
}

.first-card {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.box-card{
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  margin-top: 20px;
}

.one-card {
  width: 95%;
  height: 150px;
}
.one-card img {
  display: block;
  height: 80px;
  width: 80px;
  margin: 0 auto;
}
.one-card div{
  text-align: center;
  font-size: 15px;
}
.card-box{
  position: relative;
  top: -75px;
}
</style>