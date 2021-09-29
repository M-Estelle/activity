<template>
  <div class="prize">
    <Scroll class="login-bg" ref="scroll">
      <div class="first-top">
        <img class="top-img" src="~@/assets/img/back.png" @click="goback">
        <div class="first-top-time">恭喜您获得了证书</div>
        请到指定地点领取纸质版证书
      </div>
      <img class="prize-img" :src="url" @load="imageLoad">
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "Prize",
  components:{
    Scroll
  },
  data(){
    return{
      url:''
    }
  },
  created() {
    this.url='https://xyh.looyeagee.cn'+this.$route.query.url
    console.log(this.$route.query.url)
  },
  methods:{
    goback(){
      this.$router.push('/firstPage')
    },
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
.prize {
  box-sizing: border-box;
  background-image: url('~@/assets/img/login/pic2.jpg');
  background-repeat: no-repeat;
  min-height: 650px;
  background-size: cover;
  height: 100vh;
  background-position:center;
}

.login-bg{
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background-color: rgba(1,104,181, 0.85);
  overflow: hidden;

}
.first-top {
  position: relative;
  background-image: url('~@/assets/img/first/bg1.png');
  background-position:center center;
  background-repeat: no-repeat;

  height: 100px;
  color: #fff;
  font-size: 15px;
  text-align: center;
  width: auto;
  padding: 45px 0;
  margin: 0 auto;
}

.first-top-time {
  line-height: 80px;
  font-size: 30px;
}
.first-top img{
  margin: 0 10px;
  height: 20px;
  width: 20px;
}

.prize-img {
  width: 80%;
  max-width: 560px;
  display: block;
  margin: 0 auto;
  border: 2px solid #fff;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.first-top .top-img{
  position: absolute;
  width: 34px;
  height: 34px;
  top: 10px;
  left: 10px;
}
</style>