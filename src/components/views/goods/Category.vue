<template>
<div class="container">
    <el-row :gutter="20">            
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>搜索条件</span>
                </div>
                <div class="text item">
                    <el-input v-model="show" placeholder="请输入内容" class="input-with-select mr10" style="width:250px;" size="mini">
                        <template slot="prepend">所有分类</template>
                    </el-input>  
                    <el-input v-model="menu" placeholder="请输入内容" class="input-with-select mr10" style="width:250px;" size="mini">
                        <template slot="prepend">所有分类</template>
                    </el-input> 
                    <el-input v-model="product" placeholder="请输入内容" class="input-with-select mr10" style="width:250px;" size="mini">
                        <template slot="prepend">产品名称</template>
                    </el-input> 
                    <el-button type="primary" icon="el-icon-plus" @click="search" size="mini">搜索</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row >
    <el-row :gutter="20">
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>分类列表</span>
                </div>
                <div class="text item">
                    <div class='addDiv'>
                         <el-button size="mini" @click="add"  type="primary" icon="el-icon-plus">添加分类</el-button>
                    </div>
                    <el-table :data="tableData" border >
                        <el-table-column  type="index" label="ID" width="50"></el-table-column>
                        <el-table-column  label="父级" width="200" prop='parent'></el-table-column>
                        <el-table-column  prop="name" label="分类名称" width="200"></el-table-column>
                        <el-table-column  label="查看子分类" width="100">
                            <a>查看</a>
                        </el-table-column>
                        <el-table-column  label="分类图标" width="250">
                            <template slot-scope="scope">
                                <img v-if="scope.row.image" :src="scope.row.image" width="200" height="30"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" width="150">
                            <template slot-scope="scope">
                            <el-switch v-model="scope.row.status"
                             active-color="#13ce66"  
                             inactive-color="#ff4949" 
                             :active-value="0" 
                             :inactive-value="1"
                                @change="changeStatus($event,scope.row.id)"/>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id)" type="button" class="el-icon-delete" size="small" circle></el-button>
                                <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="button" class="el-icon-edit" size="small" circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :page-sizes="[2, 4, 6, 8]" 
                    :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </el-col>
    </el-row>



    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="cateForm" ref="addcategory" :rules="rules">
            <el-form-item label="父级" :label-width="formLabelWidth">
                <el-select v-model="cateForm.parent" placeholder="请选择父级">
                    <el-option :key='k'  v-for="(u,k) in options" :label="u.name" :value="u.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="cateForm.name" autocomplete="off" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth">
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="handleAvatarSuccess">
                    <img v-if="cateForm.image" :src="cateForm.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save_category">确定</el-button>
        </div>
    </el-dialog>

        <el-dialog title="编辑分类" :visible.sync="dialogeditFormVisible">
        <el-form :model="editForm" ref="editcategory" :rules="rules">
            <el-form-item label="父级" :label-width="formLabelWidth">
                <el-select v-model="editForm.parent" placeholder="请选择父级">
                    <el-option :index='k'  v-for="(u,k) in options" :label="u.name" :value="u.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth">
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="handleEditSuccess">
                    <img v-if="editForm.image" :src="editForm.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogeditFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="edit_category">确定</el-button>
        </div>
    </el-dialog>


</div>
</template>
<script>
export default {
    data(){
        return {
            tableData:[],
            dialogFormVisible: false,
            dialogeditFormVisible :false,
            cateForm:{parent:'',name:'',image:''},
            editForm:{id:"",parent:'',name:'',image:''},
            formLabelWidth:'120px',
            total:0,
            pageSize:2,
            pageIndex:1,
            editIndex:0,
            selectvalue:"",
            options:[],
            currentId:'',
            action:'/api/api/shop/category/imageupload',

            headers:{}, // 文件上传 heard
            show:'',
            menu:'',
            product:'',
            rules:{
                name: [{ required: true, message: '分类名称', trigger: 'blur' }],
                parent: [{ required: true, message: '请选择父级', trigger: 'blur' }],
            }

        }
    },
    created(){
        this.headers.Authorization ="Bearer "+this.$store.getters.getToken;
        this.getTables()
    },
    methods:{
        edit_category(){
             //编辑分类
            var vm = this;
            this.$refs.editcategory.validate(valid=>{
                if(valid){
                    vm.$axios.post("/api/api/shop/category/edit",vm.editForm).then(res=>function(rs){
                        vm.$message.success('添加成功');
                        vm.dialogeditFormVisible = false;
                        vm.getTables()
                    });
                }
            })
        },
        editRow(index, data){
            this.category_option();
            this.editForm.id     = data.id;
            this.editForm.name   = data.name;
            this.editForm.iamge  = data.iamge;
            this.editForm.parent = data.pId;
            this.dialogeditFormVisible = true;
        },
        async deleteRow(index,id){
            const res = await this.$axios.post("/api/api/shop/category/delete",{'id':id});
            this.tableData.splice(index,1);
        },
        async changeStatus(event,id){
            const res = await this.$axios.post("/api/api/shop/category/changeStaus",{'id':id,'status':event});
            this.$message.success('状态改变成功');
        },
        handleEditSuccess(res, file){
            this.editForm.image = res.path; 
        },
        handleAvatarSuccess(res, file){
            this.cateForm.image = res.path; 
            //   URL.createObjectURL(file.raw);
        },
        search(){
            // 用户搜索

        },
        async getTables(){
            // 展示 table 数据
            const res = await this.$axios.post("/api/api/shop/category/tables",{'page':this.pageIndex,'size':this.pageSize});
            this.tableData = res.data.page_data;
            this.total     = res.data.page.total_items;
        },
        add(){
            this.dialogFormVisible = true;
            this.category_option();
        },
        async category_option(){
           const  res =  await  this.$axios.post("/api/api/shop/category/options");
           this.options = res.data;


        },
        save_category(){
            // 添加分类
            var vm = this;
            this.$refs.addcategory.validate(valid=>{
                if(valid){
                    vm.$axios.post("/api/api/shop/category/add",vm.cateForm).then(res=>function(rs){
                        vm.$message.success('添加成功');
                        vm.dialogFormVisible = false;
                        vm.getTables()
                    });
                }
            })
        },
        handleSizeChange(val){
            //每页 val 条
            this.pageSize = val;
            this.getTables();
            
        },
        handleCurrentChange(val){
            //每页 val 条
            this.pageIndex = val;
            this.getTables();
        }
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

    .text {
        font-size: 16px;
        font-weight: 600;
    }
    .item {
        margin-bottom: 5px;
        width:100%;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .el-input-group{
        float: left;
    }
    .el-padding{
        padding-left: 5px;
    }
    .el-button{
       margin-left: 15px;     
    }
    .addDiv{
        margin-bottom: 10px;
    }
</style>