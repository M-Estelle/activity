<template>
  <div class="login">
    <Scroll class="login-bg">
      <div class="login-logo"></div>
      <div class="login-card">
        <div class="login-card-title">欢迎登录</div>
        <el-input
            placeholder="请输入学号"
            v-model="id"
            prefix-icon="el-icon-user"
            clearable>
        </el-input>
        <div class="login-card-in"></div>
        <el-input
            placeholder="请输入姓名"
            v-model="name"
            prefix-icon="el-icon-menu"
            clearable>
        </el-input>
        <div class="login-card-in"></div>

        <el-select
            v-model="collegeValue"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择学院">
          <el-option
              v-for="item in college"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
        <div class="login-card-in"></div>
        <el-select
            v-model="majorValue"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择专业">
          <el-option
              v-for="item in major"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
        <div class="login-card-in"></div>
        <el-input
            placeholder="请输入班级，例如：1801"
            v-model="classNum"
            prefix-icon="el-icon-setting"
            clearable>
        </el-input>
        <div class="login-card-in"></div>
        <el-button class="login-card-btn" @click="login" type="primary">登录</el-button>
      </div>



    </Scroll>

  </div>
</template>

<script>
import {getInfo} from "@/network/login";
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "Login",
  components:{
    Scroll
  },
  data() {
    return {
      name: '',
      id:'',
      classNum:'',
      college:[],
      major:[],
      majorValue:[],
      collegeValue: [],
    }
  },
  methods:{
    getDataInfo(){
      getInfo().then(res=>{
        // console.log(res);
        this.college=res.data.xy;
        this.major=res.data.zy;
      })
    },
    login(){
      if( this.major.length<=0||this.college.length<=0||this.id==''||this.name==''||this.classNum==''){
        console.log("信息未填写完整")
        this.$message.error({
          message: '注意:信息未填写完整',
          center: true
        })
      }
      else if(this.classNum.length!==4){
        console.log("班级号格式不正确，如：1801");
        this.$message.error({
          message: '注意:班级号格式不正确，如：1801',
          center: true
        })
      }
        else {
          let info={"xh":this.id,"xm":this.name,"xy":this.collegeValue.join(","),"zy":this.majorValue.join(","),"bj":this.classNum}
        console.log(info)
        localStorage.setItem('userInfo', JSON.stringify(info));
        this.$router.replace('/firstPage')
      }

      }
    },


  created() {
    this.getDataInfo()
  }

}
</script>

<style scoped>
.login {
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
.login-card{
  box-sizing: border-box;
  height: 450px;
  width: 250px;
  margin: 0px auto;
  /*background-color: rgba(205, 215, 233,.4);*/
  /*border-radius: 10px;*/
}
.login-logo {
  height: 150px;
  width: 100%;
  background-image: url('~@/assets/img/login/logo_white.png');
  background-repeat: no-repeat;
  background-size:300px ;
  background-position:center bottom;
}
.login-card-title {
  color: #a4acca;
  text-align: center;
  font-size: 27px;
  margin-bottom: 20px;

}

.login-card-in{
  height: 20px;
  width: 100%;
}

.login-card-btn {
  margin-top: 50px;
  /*margin-bottom: 50px;*/
}

.login-tab {
  width: 100%;
  font-size: 15px;
  margin-top: 30px;
  color: #fff;
  text-align: center;
}

/deep/.el-input__inner {
  background-color: transparent !important;
  border:2px solid #fff;
  color: #fff;
  border-radius: 10px;
}

/deep/.el-button--primary{
  color: #1b70b2;
  width: 100%;
  background-color: rgba(201, 244, 253, 0.75);
  border-color:  rgba(201, 244, 253,.75);
  font-size: 15px;
  font-weight: 600;
}

/deep/.el-select {
  width:100% ;
  color: #fff;
}
/deep/.el-select__input {
  color: #fff !important;
}
</style>

