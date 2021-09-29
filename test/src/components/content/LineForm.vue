<template>
  <div class="line-form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="查询">
        <el-input v-model="formInline.user" placeholder="输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LineForm",
  data(){
    return{
      //搜索模块返回
      formInline: {
        user: '',
        region: ''
      },
    }
  },
  methods:{
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>