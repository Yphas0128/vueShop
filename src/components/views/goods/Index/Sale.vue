<template>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="search" placeholder="请输入内容" class="input-with-select mr10" style="width:300px;" size="mini">
                <template slot="prepend">所有分类</template>
            </el-input>
            <el-input v-model="search" placeholder="请输入内容" class="input-with-select mr10" style="width:300px;" size="mini">
                <template slot="prepend">商品名称</template>
            </el-input>
            <el-button type="primary" icon="el-icon-plus" @click="searchbtn" size="mini">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addGoods" size="mini">添加商品</el-button>
        </div>
        <el-table :data="tableData" border>
            <el-table-column type="index" label="ID" width="50"></el-table-column>
            <el-table-column prop="picture" label="商品图片" width="300"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="number"   label="销量" width="50"></el-table-column>
            <el-table-column label="状态" width="300">
                <template slot-scope="scope">
                <el-switch v-model="scope.row.status" active-color="#13ce66"  inactive-color="#ff4949" :active-value="'1'" :inactive-value="'0'"
                    @change="changeStatus($event,scope.row,scope.$index)"/>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="button" class="el-icon-delete" size="small" circle></el-button>
                    <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="button" class="el-icon-edit" size="small" circle></el-button>
                    <el-button type="button" icon="el-icon-check" size="small" title="用户" @click.prevent="addrole(scope.row)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[2, 4, 6, 8]" :page-size="2"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-dialog title="分配角色" :visible.sync="dialogroleFormVisible">
            <el-form >
                <el-form-item label="用户名" :label-width="formLabelWidth"></el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    {{selectvalue}}
                    <el-select v-model="selectvalue" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogroleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editrole">确 定</el-button>
            </div>
        </el-dialog>
    </div>  
</template>
<script>
export default {
    name:'userc',
    data(){
        return{
            tableData:[],
            dialogFormVisible: false,
            dialogaddVisible :false,
            dialogroleFormVisible:false,
            form:{name:'',password:'',email:''},
            addform:{id:'',name:'',password:'',email:''},
            formLabelWidth:'',
            total:0,
            pageSize:2,
            pageIndex:1,
            search:'',
            editIndex:0,
            selectvalue:"",
            options:[],
            currentId:'',
        }
    },
    mounted(){
        
    },
    methods:{
        addGoods(){
            //添加商品
            this.$router.push('/goods/category/add');
        },
        handleSizeChange(){
            
        }
    }
}
</script>
<style>
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>