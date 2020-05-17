<template>
    <div class="wrapper">
       <v-head></v-head>
       <v-sidebar></v-sidebar>
       <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from './Head.vue'
import vSidebar from './sidebar.vue'
import vTags  from './tags.vue'
import bus from "./../../bus/bus.js"; //事件
export default {
  data () {
    return{
        collapse: false,
        tagsList: [],    
    }
  },
  created(){
    bus.$on("collapse",item=>{
        this.collapse = item;
    })

    bus.$on("tags",msg=>{
      let arr = [];
      msg.forEach(item => {
          item.name && arr.push(item.name);
      });
      this.tagsList = arr;
    });
    
  },
  components:{
    vHead,
    vSidebar,
    vTags
  }
}
</script>
<style scoped>

</style>