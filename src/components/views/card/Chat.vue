<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>订单</span>
        </div>
        <div class="text item ">
           <ve-line :data="chartData" :toolbox="toolbox"></ve-line>
        </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        this.toolbox = {
            feature: {
            magicType: {type: ['line', 'bar']},
            saveAsImage: {}
            }
        }
        return{
            chartData: {
                columns: ['日期', '成本', '利润'],
                rows: [
                    { '日期': '1月1日', '成本': 15, '利润': 12 },
                    { '日期': '1月2日', '成本': 12, '利润': 25 },
                    { '日期': '1月3日', '成本': 21, '利润': 10 },
                    { '日期': '1月4日', '成本': 41, '利润': 32 },
                    { '日期': '1月5日', '成本': 31, '利润': 30 },
                    { '日期': '1月6日', '成本': 71, '利润': 55 }
                ]
            }
         
        }
    }
}
</script>
<style scoped>
  .text {
    font-size: 22px;
    font-weight: 600;
  }

  .item {
    margin-bottom: 5px;
    width: 80%;
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