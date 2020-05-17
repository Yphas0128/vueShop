<template>
<div class="container">
    <el-row :gutter="20">            
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商品添加</span>
                    <el-button type="button" size="mini" class="back">返回列表</el-button>
                </div>
                <div class="text item">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="基础信息" name="first">
                            <v-base @next='next'></v-base>
                        </el-tab-pane>
                        <el-tab-pane label="商品详情" name="second">
                            <el-card style="height: 610px;">
                                <!-- <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption"></quill-editor> -->
                            </el-card>
                            <el-button size="mini" @click="uploadpage">上一页</el-button>
                             <el-button size="mini" @click="nextpage">下一页</el-button>
                        </el-tab-pane>
                        <el-tab-pane label="其他设置" name="third">
                             <el-form v-model="otherForm">
                                 <el-row>
                                     <el-col :span="8">
                                        <el-form-item label="虚拟销量" >
                                            <el-input type='number' v-model="otherForm.ficti" style="width:30%" auto-complete="off" placeholder="请输入单位"></el-input>
                                        </el-form-item>
                                     </el-col>
                                     <el-col :span="8">
                                        <el-form-item label="积分" >
                                            <el-input  type='number' v-model="otherForm.give_integral" style="width:30%" auto-complete="off" placeholder="请输入单位"></el-input>
                                        </el-form-item>
                                     </el-col>
                                       <el-col :span="8">
                                        <el-form-item label="排序" >
                                            <el-input type='number' v-model="otherForm.sort" style="width:30%" auto-complete="off" placeholder="请输入单位"></el-input>
                                        </el-form-item>
                                     </el-col>
                                 </el-row>
                                <el-row>
                                     <el-col :span="24">
                                        <el-form-item label="佣金设置" >
                                            <template>
                                                <el-radio v-model="otherForm.is_sub" label="1">单独设置</el-radio>
                                                <el-radio v-model="otherForm.is_sub" label="0">默认设置</el-radio>
                                            </template>
                                        </el-form-item>
                                     </el-col>
                                 </el-row>
                                <el-row>
                                     <el-col :span="8">
                                        <el-form-item label="热卖单品" >
                                            <template>
                                                <el-radio v-model="otherForm.is_hot" label="1">开启</el-radio>
                                                <el-radio v-model="otherForm.is_hot" label="0">关闭</el-radio>
                                            </template>
                                        </el-form-item>
                                     </el-col>
                                     <el-col :span="8">
                                        <el-form-item label="促销单品" >
                                            <template>
                                                <el-radio v-model="otherForm.is_benefit" label="1">开启</el-radio>
                                                <el-radio v-model="otherForm.is_benefit" label="0">关闭</el-radio>
                                            </template>
                                        </el-form-item>
                                     </el-col>
                                       <el-col :span="8">
                                             <el-form-item label="精品推荐" >
                                            <template>
                                                <el-radio v-model="otherForm.is_best" label="1">开启</el-radio>
                                                <el-radio v-model="otherForm.is_best" label="0">关闭</el-radio>
                                            </template>
                                        </el-form-item>
                                     </el-col>
                                 </el-row>
                                  <el-row>
                                     <el-col :span="8">
                                        <el-form-item label="首发新品" >
                                            <template>
                                                <el-radio v-model="otherForm.is_new" label="1">开启</el-radio>
                                                <el-radio v-model="otherForm.is_new" label="0">关闭</el-radio>
                                            </template>
                                        </el-form-item>
                                     </el-col>
                                     <el-col :span="8">
                                        <el-form-item label="优品推荐" >
                                            <template>
                                                <el-radio v-model="otherForm.is_good" label="1">开启</el-radio>
                                                <el-radio v-model="otherForm.is_good" label="0">关闭</el-radio>
                                            </template>
                                        </el-form-item>
                                     </el-col>
                                 </el-row>
                                <!-- <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="活动优先级" >
                                            <draggable :options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
                                    
                                            @change="change"
                                            @start="start"
                                            @end="end"
                                            :move="move"
                                            style="display: inline-block; width:190px;height: 200px;background: #eee;overflow: auto">
                                    
                                        </draggable>
                                        </el-form-item>
                                    </el-col>
                                 </el-row> -->
                             </el-form>
                              <el-button size="mini" @click="thirdup">上一步</el-button>
                              <el-button size="mini" @click="add">保存</el-button>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </el-col>
    </el-row >
</div>
</template>
<script>
import vBase from './Index/Base.vue'
// import {quillEditor } from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import draggable from 'vuedraggable'
export default {
    data(){
        return{
            activeName: 'first',
            content: null,
            editorOption: {},
            otherForm:{},// 其他设置
            formLabelWidth:'100px'
        }
    },
    components:{
        vBase,
        quillEditor,
        draggable
    },
    created(){
        // this.getGoodoptions();
    },
    methods:{
    
        next(){
            this.activeName = "second"
        },
         handleClick(tab, event){
            console.log(tab,event)  
         },
         uploadpage(){
            this.activeName = "first";
         },
         nextpage(){
              this.activeName = "third";
         },
         thirdup(){
              this.activeName = "second";
         },
         add(){
             // 添加
         }
    }
}
</script>
<style scoped>
 .back{
     margin-left: 50px;
 }
</style>