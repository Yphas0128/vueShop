<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">羊皮卷</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model="param.name" placeholder="用户名">
                        <el-button slot="prepend"  class="iconfont icon-denglu"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"  placeholder="密码"   v-model="param.password"   @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" class="iconfont icon-mima"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
               param:{
                   name:'',
                   password:'',
               } ,
                rules: {
                    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
        }
    },
    methods:{
        //关于element-ui 验证
       submitForm(){  
            var vm = this;
             this.$refs.login.validate(valid => {
                 if(valid){
                     vm.$axios.post('/api/api/shop/auth/login',this.param).then(function(res){
                            vm.$store.commit("setToken", res.data.data);
                            vm.$store.commit('setUsername',vm.param.name);
                            vm.$message.success('登录成功');
                            vm.$router.push('/');
                     }).catch(function (error) {
                         vm.$message.error('登录失败'); 
                        });
                 }else{
                    this.$message.error('请输入账号和密码');
                    return false;
                 }
             })    
        }
    }
}
</script>
<style >
 .login-wrap {

    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/images/bg-logo.jpg");
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #0a0a0a;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    /* background-color:#00111C; */
    box-shadow:0 0 10px #3FBEEB;
    border:1px solid #74B5C9;
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>