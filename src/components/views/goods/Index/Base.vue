<template>
    <div>
       <el-form v-model="baseForm">
           <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-select multiple placeholder="请选择"  v-model="baseForm.category" style="width:90%">
                        <el-option-group
                            v-for="group in options"
                            :key="group.id"
                            :label="group.name">
                            <el-option
                                v-for="item in group.options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                            </el-option-group>
                </el-select>
           </el-form-item>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="baseForm.name" style="width:90%" placeholder="请输入商品名称">></el-input>
           </el-form-item>
            <el-form-item label="商品关键字" :label-width="formLabelWidth">
                <el-input v-model="baseForm.keyword" style="width:90%" auto-complete="off" placeholder="请输入商品关键字"></el-input>
           </el-form-item>
            <el-form-item label="单位" :label-width="formLabelWidth">
                <el-input v-model="baseForm.unit_name" style="width:90%" auto-complete="off" placeholder="请输入单位"></el-input>
           </el-form-item>
            <el-form-item label="商品简介" :label-width="formLabelWidth">
                <el-input v-model="baseForm.info" type="textarea" style="width:90%" auto-complete="off" placeholder="请输入商品简介"></el-input>
           </el-form-item>
            <el-form-item label="主图视频" :label-width="formLabelWidth">
                <el-input v-model="baseForm.source_link" style="width:70%" auto-complete="off" placeholder="请输入视频连接"></el-input>
                <el-button size="mini">上传视频</el-button>
           </el-form-item>
            <el-form-item label="商品封面图" :label-width="formLabelWidth">
 
           </el-form-item>
            <el-form-item label="商品轮播图" :label-width="formLabelWidth">
                <template v-for="u in baseForm.rotation">
                    <div class="pictrueBox pictrue" >
                        <i class="el-icon-error closes"></i>
                    </div>
                </template>
           </el-form-item>
            <el-form-item label="商品规格" :label-width="formLabelWidth">
                <el-table :data="tableData"   size="small" element-loading-text="Loading" border highlight-current-row>
                    <el-table-column label="图片"  >
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="picture">
                                <el-input v-show="true" v-model="scope.row.pictrue" placeholder="请输入图片"/>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="售价"  >
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="price">
                                <el-input v-show="true" v-model="scope.row.pictrue" placeholder="请输入售价"/>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="成本价" >
                       <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="cost">
                                <el-input v-show="true" v-model="scope.row.cost" placeholder="请输入成本价"/>
                                </el-form-item>
                            </el-form>
                        </template>          
                    </el-table-column>
                    <el-table-column label="原价"  >
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="ot_price">
                                <el-input v-show="true" v-model="scope.row.ot_price" placeholder="请输入原价"/>
                                </el-form-item>
                            </el-form>
                        </template>  
                    </el-table-column>
                    <el-table-column  label="库存" >
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="stock">
                                <el-input v-show="true" v-model="scope.row.stock" placeholder="请输入库存"/>
                                </el-form-item>
                            </el-form>
                        </template>  
                    </el-table-column>
                    <el-table-column  label="产品编号"  >
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="bar_code">
                                <el-input v-show="true" v-model="scope.row.bar_code" placeholder="请输入库存"/>
                                </el-form-item>
                            </el-form>
                        </template> 
                    </el-table-column>
                    <el-table-column  label="重量(KG)"  >
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="weight">
                                <el-input v-show="true" v-model="scope.row.weight" placeholder="请输入库存"/>
                                </el-form-item>
                            </el-form>
                        </template> 
                    </el-table-column>
                    <el-table-column label="体积(m³)"  >
                               <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="rules">
                                <el-form-item prop="volume">
                                <el-input v-show="true" v-model="scope.row.volume" placeholder="请输入库存"/>
                                </el-form-item>
                            </el-form>
                        </template> 
                    </el-table-column>
                </el-table>
           </el-form-item>
            <el-form-item label="商品状态" :label-width="formLabelWidth">
                <template>
                    <el-radio v-model="baseForm.is_show" label="1">上架</el-radio>
                    <el-radio v-model="baseForm.is_show" label="2">下架</el-radio>
                </template>
           </el-form-item>
       </el-form>
       <el-button size="mini" @click="next">下一步</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
          baseForm:{category:[]},
          categories:[], // 商品分类
          tableData:[{picture:'','price':'','ot_price':''}],
          rules: {
 
          },
          slider_image:'', // 轮播图
          activeValue:'',
          formLabelWidth:'100px',
          options:[]
        }
    },
        created(){
        this.getGoodoptions();
    },
    methods:{
        async getGoodoptions(){
            const res = await this.$axios.post('/api/api/shop/category/mutioptions');
            this.options = res.data;
        },
        next(){
            // 需要赋值 父级
            this.$emit("next");

        }
    }
}
</script>
<style scoped>
.pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 15px;
    display: inline-block;
    position: relative;
    cursor: pointer;
}
.closes {
    position: absolute;
    left: 86%;
    top: -8%;
}
</style>