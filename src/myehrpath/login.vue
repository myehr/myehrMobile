<template>
  <div>
    <div>
      <group title="登录">
        <!-- 自定义验证  -->
        <x-input title="账户：" v-model="up.username"   placeholder="请输入姓名"  required></x-input>

        <!-- 自定义验证  -->
        <x-input title="密码：" type="password" v-model="up.password"  placeholder="请输入密码"    required></x-input>


      </group>
    </div>
    <div class="btn_wrap" style="padding:1em">
      <x-button type="primary" @click.native="login">登录</x-button>
    </div>
  </div>
</template>

<script>
   import { XInput, Group,XButton} from 'vux'
   import  { getCookie,setCookie } from '../libs/cookieUtil.js'
   import { b64_md5 } from '../libs/security.js'
    export default {
        name: "login",
        components: {
          XInput,
          Group,
          XButton

        },
        data (){
          return {
            up:{
              username: null,
              password:null
            }
          }
        },
        methods: {

          login(){

            var password = this.up.password;
            password = b64_md5(password);
            password +="=="
            this.$axios.get('/myehr/login/IMlogin.action?UserCode='+this.up.username+'&PassWord='+password,{
                headers: {
                /*  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
                  'Access-Control-Allow-Origin': '*'*/
                }
            }).then(function (response) {
                console.log(response.data.result)
                if(response.data.result === 'success') {
                  this.$router.push({path:'/',query:{title:'登录成功',desc:'',icon:'success'}})
                  setCookie('username',this.up.username,30);
                  setCookie('password',password,30);
                }else {
                  this.$router.push({path:'/myehrpath/mmsg',
                    query:{
                      paht:'/myehrpath/login',
                      buttonText:'重新登录',
                      title:'登录失败',
                      pageTitle:'提示',
                      desc:response.data.desc,icon:'warn'
                  }
                    }
                  )
                }
                console.log(response);
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });

          }
        }

    }
</script>

<style scoped>

</style>
