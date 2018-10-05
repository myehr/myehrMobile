<template>
  <div>

      <swiper loop auto :list="swiperList" :index="swiperListIndex" @onItemClick="gotoSwiperDetail" ></swiper>


    <group title="我的任务">
      <cell title="Live Demo222" link="/demo">
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>


      <!--<cell title="myEhr" link=""  v-on:click.native="gomyehr" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>

      <cell title="tab页" link=""  v-on:click.native="gotab" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>

      <cell title="服务" link=""  v-on:click.native="gomyehrService" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>

      <cell title="卡片表单演示" link=""  v-on:click.native="gomyehrcard" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>-->

      <cell title="列表测试" link=""  v-on:click.native="testlist" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>

      <cell title="我的待办" link=""  v-on:click.native="gomyehrlist1" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        <span class="weui-loading" v-show="showUnDoneLoading" />
        <badge :text="undototal" v-show="!showUnDoneLoading" ></badge>
      </cell>
      <cell title="我的已办" link=""  v-on:click.native="gomyehrlist2" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        <span class="weui-loading" v-show="showDoneLoading" />
        <badge :text="donetotal" v-show="!showDoneLoading"  ></badge>

      </cell>
      <cell title="我的已办" link=""  v-on:click.native="gomyehrlist2" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        <span class="weui-loading" v-show="showDoneLoading" />
        <badge :text="donetotal" v-show="!showDoneLoading"  ></badge>

      </cell>
      <cell title="我的已办" link=""  v-on:click.native="gomyehrlist2" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        <span class="weui-loading" v-show="showDoneLoading" />
        <badge :text="donetotal" v-show="!showDoneLoading"  ></badge>

      </cell>
      <cell title="我的已办" link=""  v-on:click.native="gomyehrlist2" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
        <span class="weui-loading" v-show="showDoneLoading" />
        <badge :text="donetotal" v-show="!showDoneLoading"  ></badge>

      </cell><cell title="我的已办" link=""  v-on:click.native="gomyehrlist2" >
      <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      <span class="weui-loading" v-show="showDoneLoading" />
      <badge :text="donetotal" v-show="!showDoneLoading"  ></badge>

    </cell>

     <!-- <cell title="流程发起" link=""  v-on:click.native="gomyehrflowstart" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>
      <cell title="iframe" link=""  v-on:click.native="gomiframe" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>-->


    </group>
    <group title="用户">
      <cell title="切换用户" link=""  v-on:click.native="gologin" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>
      <cell title="退出登录" link=""  v-on:click.native="gologinout" >
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>
    </group>
    <br>
    <p class="vue-version">current vue version: {{ vueVersion }}</p>
  </div>
</template>

<script>
import { Cell, Group, Badge, Divider,Swiper,SwiperItem } from 'vux'
import myehrbuttontab  from './myehrbuttontab'
import  { getCookie,setCookie,delCookie } from 'src/libs/cookieUtil.js'

const pkg = require('../../package.json')
const version = pkg.version
const vueVersion = pkg.devDependencies.vue
const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]

const urlList = baseList.map((item, index) => ({
  url: 'callback',
  img: item.img,
  fallbackImg: item.fallbackImg,
  title: `(可点击)${item.title}`
}))

export default {
  components: {
    Cell,
    Group,
    Badge,
    Divider,
    Swiper,
    SwiperItem,
  },created() {

    let username = getCookie('username')
    let password =  getCookie('password')
    console.log(username+password)
    if(username == null || password == null) {
      this.gotoMyehrPath('/myehrpath/login',null,'登录');
     // this.$router.push({path:'/myehrpath/login',query:{pageTitle:'登录'}})
    }else {
      this.$axios.get('/myehr/login/IMlogin.action?UserCode='+username+'&PassWord='+password,{
        headers: {
          /*  'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Origin': '*'*/
        }
      }).then(function (response) {
        console.log(response.data.result)
        if(response.data.result === 'success') {
          //this.$router.push({path:'/myehrpath/mmsg',query:{title:'登录成功',desc:'',icon:'success'}})
          this.loadundoCount();
          this.loaddoneCount();
        }else {
          this.gotoMyehrPath('/myehrpath/login',null,'重新登录');
           //this.$router.push({path:'/myehrpath/login',query:{pageTitle:'重新登录'}})
        }
        console.log(response);
    }.bind(this))
        .catch(function (error) {
          console.log(error);
      });
    }
},
  data () {
    return {
      version,
      vueVersion,
      undototal:0,
      donetotal:0,
      swiperList:urlList,
      showDoneLoading:true,
      showUnDoneLoading:true,
      swiperListIndex:0
    }
  },
  methods:{
    testlist(){

      var vl = [{
        path: '/myehrpath/testList1Config',
          component: () => import('../myehrpath/testList1Config.vue').then(m => m.default)
      }]
      this.$router.addRoutes(vl);
      this.$router.push('/myehrpath/testList1Config')
    },
    gotoSwiperDetail(item){
        console.log('轮播点击回调');

    },
    gomyehr (){
      this.$router.push('/component/myehrbuttontab')
    },
    gotab (){
      this.$router.push('/component/ehrhome')
    },
    gomyehrService(){
      var v = 100;
      this.$router.push('/component/myehrservice/namesds')
    },
    gomyehrcard(){
      this.$router.push('/component/myehrcard')
    },
    gologin(){
      this.gotoMyehrPath('/myehrpath/login',null,'重新登录');
     // this.$router.push({path:'/myehrpath/login',query:{pageTitle:'重新登录'}})
    },gologinout(){
      delCookie('username')
      delCookie('password')
      this.gotoMyehrPath('/myehrpath/login',null,'登录');
     //this.$router.push({path:'/myehrpath/login',query:{pageTitle:'登录'}})
    },
    gomyehrlist1(){
      this.gotoMyehrPath('/myehrpath/testList1Component',null,'我的待办');
     // this.$router.push({path:'/myehrpath/testList1Component',query:{pageTitle:'我的待办'}})
    },gomyehrlist2(){
      this.gotoMyehrPath('/myehrpath/testList2Component',null,'我的已办');
     // this.$router.push({path:'/myehrpath/testList2Component',query:{pageTitle:'我的已办'}})
    },
    gomyehrflowstart(){
      this.$router.push('/myehrpath/flowstart')
    },
    gomiframe(){
      this.$router.push('/myehrpath/iframe')
    },loadundoCount(){
      var offset =0;
      var limit = 10;
      let pager = null
      if(pager != null) {
        offset = pager.offset;
        limit = pager.limit;
      }
      this.$axios.post('/myehr/act/task/todo.action?flowType=7', {"order":"asc","offset":offset,"limit":limit,"paramsMap":{"userId":"1","flowCode":"7"},"requestParam":{},"filter":{"searchValue":""},"formId":"1041","isView":null})
        .then(function (response) {
            this.showUnDoneLoading = false;
            this.undototal = response.data.total;
        }.bind(this))
        .catch(function (error) {
          this.showUnDoneLoading = false;
          console.log(error);
        });
    },loaddoneCount(){
      let pager = null;
      var offset =0;
      var limit = 10;
      if(pager != null) {
        offset = pager.offset;
        limit = pager.limit;
        this.pager = pager;
      }
      this.$axios.post('/myehr/act/task/historic.action', {"order":"asc","offset":offset,"limit":limit,"paramsMap":{"userId":"1"},"requestParam":{},"filter":{"searchValue":""},"formId":"1041","isView":null})
        .then(function (response) {
            this.showDoneLoading = false;
            this.donetotal = response.data.total;
        }.bind(this))
        .catch(function (error) {
          this.showDoneLoading = false;
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.vue-version {
  text-align: center;
  font-size: 12px;
  color: #ccc;
}
.center {
  margin-top: 15px;
  text-align: center;
}
.vux-notice {
  color: #666;
  line-height: 40px;
}
.demo-icon {
  margin-right: 15px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 75px;
  border-radius: 50%;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
.demo-tip {
  background-color: #fefcec;
  color: #f76a24;
  font-size: 12px;
  padding: 5px 10px;
  margin-top: 15px;
}
</style>
