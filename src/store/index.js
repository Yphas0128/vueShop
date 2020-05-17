import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {   //要设置的全局访问的state对象
    token: '',//要设置的初始属性值
    username:''
};

const getters = {  
    getToken(state) {  
       return state.token;
    },
};

const mutations = {
    setToken(state,token) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.token = token;
    },
    setUsername(state,name){
        state.username = name;
    }
};

const actions ={

}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [persistedState()]
});


export default store
