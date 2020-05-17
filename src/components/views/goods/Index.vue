<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出售中" name="first">
            <v-sale></v-sale>
        </el-tab-pane>
        <el-tab-pane label="仓库中" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="已售馨" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="库存"  name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="回收站" name="five">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>
<script>
import vSale from './Index/Sale.vue'
export default {
    data() {
        return {
            activeName: 'first'
        }
    },
    components:{
        vSale
    },
    methods:{
        handleClick(tab, event) {
          console.log(tab, event);
       }
    }
}
</script>
<style scoped>

</style>