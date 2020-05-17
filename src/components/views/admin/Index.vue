<template>
    <div >
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple"> <v-card :orarray="orderurgent"></v-card></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"><v-card :orarray="orderexcahge"></v-card></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"><v-card :orarray="goodstock"></v-card></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"><v-card :orarray="drawncash"></v-card></div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple"> <v-card :orarray="orderyestoday"></v-card></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"><v-card :orarray="transactionyestoday"></v-card></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"><v-card :orarray="fanstoday"></v-card></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"><v-card :orarray="fansmoney"></v-card></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple"><v-chat></v-chat></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import vCard from './../card/Index.vue'
import vChat from './../card/Chat.vue'
export default {
    data(){
        return {
            orderurgent:{title:'订单',pic:'急',type:0,count:0,content:'待发货'},
            orderexcahge:{title:'订单',pic:'待',type:1,count:0,content:'退换货'},
            goodstock:{title:'商品',pic:'急',type:0,count:0,content:'库存预警'},
            drawncash:{title:'待提现',pic:'待',type:0,count:0,content:'待提现'},
            orderyestoday:{title:'订单',pic:'昨',type:1,count:2,content:'昨日支付订单数'},
            transactionyestoday:{title:'交易',pic:'昨',type:1,count:0,content:'昨日交易额'},
            fanstoday:{title:'粉丝',pic:'今',type:1,count:0,content:'今日新增粉丝'},
            fansmoney:{title:'粉丝',pic:'月',type:1,count:0,content:'本月新增粉丝'},
        }
    },
    components:{
        vCard,
        vChat
    }
}
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #d3dce6;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 126px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>