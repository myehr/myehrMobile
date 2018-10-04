<template>
  <div>
    <div>
      <group title="登录">
        <!-- 自定义验证  -->
        <x-input title="账户：" v-model="up.username"  placeholder="请输入姓名"  required></x-input>

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
   import qs from 'qs';
    export default {
        name: "myehrlogin",
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


            this.$axios.get('/myehrpath/login/IMlogin.action?UserCode=sysadmin&PassWord=ffstSgX8q9AO95QMD7Cgqg==',{
                headers: {
                /*  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
                  'Access-Control-Allow-Origin': '*'*/
                }
            })
              .then(function (response) {
                if(response.result === 'success') {

                }
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

          }
        }
    }
</script>

<style scoped>

</style>
