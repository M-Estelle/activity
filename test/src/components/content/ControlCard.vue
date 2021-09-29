<template>
  <div class="control-cartd">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
      <!--插槽 写入控件名称-->
        <span> <slot name="title"></slot></span>
      </div>

      <!-- 显示控件当前状态     -->
      <div  class="text item">
        <span class="line-title">状态：</span><span>{{isOpen}}</span>
      </div>

      <!--根据传入参数setValus决定是否需要设置阈值，几个阈值-->
      <div  class="text item" v-for="item in setValus" :key="item.title">
        <div class="line-title">{{item.title}}：</div>
        <el-input
            size="small"
            v-model="item.value"
            :disabled="canMod"
            placeholder="请输入内容"></el-input>
      </div>

      <!--切换当前控件状态-->
      <div  class="text item">
        <span class="line-title">切换状态：</span>
        <el-switch
            class="paddingtop"
            v-model="nowState"
            :disabled="canMod"
            active-text="on"
            inactive-text="off">
      </el-switch>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ControlCard",
  data(){
    return{
      canMod:false, //当前状态是否可以更改，可以为false
      nowState:true //当前控件状态 开或关
    }
  },
  computed:{
    isOpen(){
      if(this.nowState==true){
        return '开'
      }
      else{
        return '关'
      }
    }
  },
  props:{
    setValus:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 600;
}
.text {
  font-size: 14px;
  width: auto;
  height: 32px;
  line-height: 32px;
}

.item {
  display: flex;
  margin-bottom: 18px;
}

.line-title{
  width: 70px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 95%;
}
.paddingtop {
  padding-top: 5px;
}
</style>