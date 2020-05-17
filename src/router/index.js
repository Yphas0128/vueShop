import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/admin'
    },{
      path: '/',
      name: 'Index',
      meta: {
        requireAuth : true
      },
      component: () =>
      import(/* webpackChunkName: "login" */ '@/components/views/home/Index.vue'),
      children:[
        {
          path:'/admin',
          component: () =>
          import('@/components/views/admin/Index.vue'),
        },{
          path:'/goods/index',
          meta:{
            title:'商品管理',
          },
          component: () =>
          import('@/components/views/goods/Index.vue'),
        },{
          path:'/goods/category',
          meta:{
            title:'商品分类',
          },
          component: () =>
          import('@/components/views/goods/Category.vue'),
        },
        ,{
          path:'/goods/category/add',
          meta:{
            title:'添加商品',
          },
          component: () =>
          import('@/components/views/goods/add.vue'),
        }
      ]
    },{
      path: '/login',
      name:'Login',
      meta:{
        title: '登录',
        keepAlive: true
      },
      component: () =>
      import(/* webpackChunkName: "login" */ '@/components/views/user/Login.vue')
    }
  ]
})
