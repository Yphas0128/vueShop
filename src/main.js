// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/color-dark.css'
import '../static/iconfont.css'
import vChat from 'v-charts'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import '@/styles/index.scss' // global css
// Vue.use(VueQuillEditor)


Vue.use(ElementUI)
Vue.use(vChat)
Vue.config.productionTip = false
Vue.prototype.qs = qs
Vue.prototype.$axios = axios

axios.interceptors.request.use(config=>{
  //在所有请求头部添加token值
  const token =  store.getters.getToken;
  console.log(token)
  if(token){
      config.headers.Authorization = "Bearer "+token;
  }
  return config;
},
error=>{
  return Promise.reject(error);
})

//拦截
axios.interceptors.response.use(
  response=>{
    // 刷新 token 是有问题的

    // var token = response.headers.authorization
    // if (token) {
    //     // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    //     store.dispatch('refreshToken', token)
    // }
    return response;
  },
  error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            //this.$store.commit("del_token");
            Message.error("Error : " + error.response.data.msg);
            router.replace({
              path: "/login",
              query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
            });
            break;
            default:
              Message.error("Error : " + error.response.data.msg);
            break;
        }
      }
      return Promise.reject(error.response.data);
    }
);


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.getToken) {
        next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
