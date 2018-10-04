<template>
  <div >
        <sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
          <tab v-model="index">
            <tab-item v-for="(menu,index2) in menus" v-if="index2 === 0"   @on-item-click="onItemClick(menu.name)"  selected  :key="index2">{{menu.name}}</tab-item>
            <tab-item  v-else @on-item-click="onItemClick" >{{menu.name}}</tab-item>

          </tab>
          <keep-alive>
          <component v-bind:is="which_to_show"></component>
          </keep-alive>
          <!--
          <swiper v-model="index" height="800px" :show-dots="false" >
            <swiper-item v-for="menu in menus" height="100%">
              <demo-list></demo-list>
            </swiper-item>
          </swiper>-->
        </sticky>
  </div>
</template>

<i18n>
set bar-active-color:
  zh-CN: 设置bar颜色
</i18n>

<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import DemoList from './DemoList'
import hrmenus from './hrmenus'
const list = () => ['精选', '美食', '电影', '酒店', '外卖']

export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    DemoList,
    hrmenus
  },
  watch:{
    index(){
      console.log('*****************:'+this.index)
    }
  },
  data () {
    return {
      menu0:'',
      index:0,
      which_to_show:'hrmenus',
      menus:[
        {name:'薪酬'},
        {name:'绩效'},
        {name:'考核'},
        {name:'机构'},
        {name:'机构'},
        {name:'机构'},
        {name:'机构'},
        {name:'机构'},
        {name:'机构'},
        {name:'机构'},
        {name:'机构'},
        {name:'最后'}

      ]
    }
  },
  methods: {
    onItemClick(name){
      console.log('*******************************'+name)
      if(name==='薪酬'){
        this.which_to_show = 'hrmenus'
      }else {
        this.which_to_show = 'DemoList'
      }
     //
    //  this.$router.push('/component/myehrbuttontab')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';

.box {
  padding: 15px;
}
.active-6-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}
.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
.active-6-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>
