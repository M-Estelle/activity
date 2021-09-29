<template>
  <div class="activity">
    <!--导航栏-->
    <nav-bar class="activity-nav">
      <div slot="left" @click="goback"><img src="~@/assets/img/back.png"></div>
      <div slot="center">答题</div>
    </nav-bar>
    <Scroll class="activity-scroll">
      <!--题目描述-->
      <div class="title-box">
        <span v-for="(item,index) in result " :key="index">{{str[index]}}__<span style="color:#dd001b">{{item}}</span>__</span>
        <span>{{str[resLength]}}</span>
      </div>
      <!--结果展示-->
      <div class="title-box" v-show="isFinish" :style="{color:currentAnswer?'#579242':'#fe2563'}">
        您选择的是：{{myAnswer}}    答案是：{{one.answer}}
      </div>

      <!--题目选项-->
      <div v-for="(item,index) in filterColor" :key="index" @click="itemClick(index)">
        <div class="option-box" :class="isActive[index]?'active-color':''">
          <div class="options-cir"  :class="isActive[index]?'active-bgcolor':''" ></div>
          <span class="options-item">{{letter[index]}}</span>、{{item}}
        </div>
      </div>

    </Scroll>
    <div class="activity-next">
      <el-button type="primary" v-show="!isFinish" class="activity-btn" round @click="submit">提交</el-button>
      <el-button type="primary" v-show="isFinish" class="activity-btn" round @click="nextone">下一个</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll"
import Vue from "vue";
import {getPrize} from "@/network/login";

export default {
  name: "Activity",
  components:{
    NavBar,
    Scroll
  },
  data(){
    return{
      isActive:[false,false,false,false],//记录选项的选中状态，true为选中
      correct:null,//记录需要答对的个数
      result:[],//记录当前题目用户的答案
      list:[],//记录所有题目（已打乱）
      letter:['A','B','C','D'],//字母列表
      str:null,//记录当前题目文字信息
      resLength:null,//记录当前题目答案个数
      currentIndex:0,//记录用户点击选项位置
      isFinish:false,//记录答题状态
      currentProblem:0,//记录当前已经回答的个数,
      currentAnswer:false,
      currentNumber:0,
      one:{
        "desc": "学校校徽包括徽志和徽章，徽志为____型，徽章为____证章。徽章题有毛泽东____校名“长沙理工大学”。",
        "options": [
          "地区A",
          "地区B",
          "地区C",
          ""
        ],
        "answer": "B",
      },//记录当前问题

    }
  },
  methods:{
    goback(){
      this.$router.push('/firstPage')
    },
    nextone(){
      console.log(this.currentProblem)
      if(this.currentProblem<this.list.length-1){
        this.currentProblem++;
        this.one=this.list[this.currentProblem]
        this.isFinish=false;
      }
      else{

        if(this.currentNumber>=this.correct){

          this.$message({
            message: '恭喜你，答题成功，请领取获奖证书',
            type: 'success',
            center:true
          });

          getPrize().then(res=>{
            console.log(res)
            this.$router.replace({
              path: '/prize',
              query:{
                url:res.data.url
              }
            })
          })
        }
        else{
          this.$message.error({
            message: '抱歉，您没有通过答题活动，请再来一次',
            center: true
          })
          this.$router.replace('/firstPage')
        }

      }
    },
    submit(){
      if(this.myAnswer==this.one.answer){
        this.currentAnswer=true
        this.currentNumber++
      }
      else{
        this.currentAnswer=false
      }
      this.isFinish=true
      for(let i=0;i<4;i++){
        Vue.set(this.isActive,i,false)
      }
    },
    /*
    获取题目信息
     */
    getList(){
      if(Object.keys(this.$store.state.info).length==0){
        this.$store.dispatch('getInfo').then(res=>{
          console.log(res);
          this.list=this.shuffle(this.$store.state.info.problems);
          this.one=this.list[0];
          this.correct=this.$store.state.info.correct
        })
      }
      else{
        this.list=this.shuffle(this.$store.state.info.problems);
        this.one=this.list[0];
        this.correct=this.$store.state.info.correct
      }

    },
    /*
    用户点击选项事件
    1.更改当前选项状态
    2.将选项的字母替换到结果数组中
     */
    itemClick(index){
      // console.log("index",this.currentIndex);
      // console.log("length",this.resLength)
      if(this.isFinish){
        this.$message({
          message: '本题已回答完毕，请点击下一个',
          type: 'warning',
          center: true
        });
        return;
      }


      if(this.isActive[index]){
        Vue.set(this.isActive,index,false)
        console.log(this.result)
        while(this.currentIndex>=this.resLength||this.result[this.currentIndex]==''){
          this.currentIndex=this.currentIndex-1
          console.log("-1了");
        }

        Vue.set(this.result,this.currentIndex,'')
        console.log(this.currentIndex)

        if(this.currentIndex!==0){
          this.currentIndex--;
          console.log("后退了");
        }
      }
      else{
        if(this.currentIndex>this.resLength-1||this.currentIndex<0){
          this.$message.error({
            message: '注意:选项超过个数',
            center: true
          })
          return
        }
        if(this.result[this.currentIndex]!==''){
          this.currentIndex=this.currentIndex+1
        }
        Vue.set(this.isActive,index,true)
        Vue.set(this.result,this.currentIndex,this.letter[index])
        this.currentIndex=this.currentIndex+1
      }
    },
    /*
    打乱数组
     */
    shuffle(arr) {
      for (let i = 0; i < arr.length; i++) {
        let iRand = parseInt(arr.length * Math.random());
        let temp = arr[i];
        arr[i] = arr[iRand];
        arr[iRand] = temp;
      }
      return arr;
    }
  },
  computed:{
    /*
    过滤空选项
     */
      filterColor(){
        let newArr=this.one.options.filter(i=>i && i.trim())
        // console.log(newArr) /_+/
        return newArr;
      },
    myAnswer(){
        return this.result.join('')
    }
  },
  watch:{
    /*
    监听当前问题变化
    1.把题目描述按照 ____  划分，结果存到str中
    2.按照答案长度push空字符串到result数组
    3.记录答案长度
     */
    one:{
      handler(){
        // console.log(this.one.desc)
        this.currentIndex=0
        this.result=[]
        this.str=this.one.desc.split(/_+/)
        for(let i=1;i<this.str.length;i++){
          this.result.push('')
        }
        this.resLength=this.one.answer.length
        console.log(this.str)
        console.log(this.result)
      },
      immediate: false
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.activity-nav {
  background-color: #4ea5fe;
  color: #fff;
}
.activity-scroll{
  height: calc(100vh - 122px);
  background-color: #fff;
}
.title-box {
  box-sizing: border-box;
  padding: 20px 20px 0;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  max-width: 800px;
  margin: 0 auto;
  line-height: 25px;
  vertical-align: middle;
}
.option-box {
  box-sizing: border-box;
  padding: 20px 20px 0;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  max-width: 800px;
  margin: 0 auto;
  line-height: 25px;
  vertical-align: middle;
  display: flex;
}
.options-cir {

  box-sizing: border-box;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  line-height: 20px;
  border: 2px solid #4ea5fe;
  margin-top: 5px;
  margin-right: 5px;
}
.options-item{
  /*margin-right: 5px;*/
}
.activity-next{
  height: 78px;
  background-color: #f6f6f6;
  padding: 20px 10%;
}
.activity-btn {
  width: 100%;
  margin: 0 auto;
}
.active-color {
  color: #4ea5fe;
}
.active-bgcolor{
  background-color: #4ea5fe;
}


</style>