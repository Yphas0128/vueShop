<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{orarray.title}}</span>
            <el-tag style="float: right;" :type="orarray.type==1 ?'':'danger'">{{orarray.pic}}</el-tag>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div class="text item ">
            {{orarray.count}}
        </div>
         <div class="item">
            {{orarray.content}}
        </div>
        </el-card>
    </div>
</template>
<script>
export default {
    props:['orarray']
}
</script>
<style scoped>
  .text {
    font-size: 22px;
    font-weight: 600;
  }

  .item {
    margin-bottom: 5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>