<template>
    <div class="sidebar"> 
        <!--   :collapse="collapse" -->
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.id" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-menu-item
                                :index="subItem.url?subItem.url:subItem.id"
                                :key="subItem.url"
                            >{{subItem.name}}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
// import bus from "./bus.js"
export default {
    data(){
        return{
             collapse: false,
             items: [
                {id:'1',name:'商品',icon:'iconfont icon-shangpin',children:[
                    {id:'1_1',name:'商品管理',icon:'',url:'/goods/index'},
                    {id:'1_2',name:'商品分类',icon:'',url:'/goods/category'},
                    {id:'1_3',name:'商品评价',icon:'',url:'/goods/reply'},
                    {id:'1_4',name:'商品规格',icon:'',url:'/goods/rule'},
                ]},
             ],
        }
    },
    computed: {
        onRoutes() {
            return this.$route.matched[0].path;
        },
    },
    created(){
        this.getmuenus();
        // bus.$on('collapse',msg=>{
        //     this.collapse = msg;
        //     bus.$emit('collapse-content', msg); 
        // })
    },
    methods:{
        getmuenus() {
        //    const res = await this.$axios.post("/api/api/jwt/common/getMenus");           
        //    this.items =res.data.data;
        },



    }
}
</script>
<style >
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 55px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>