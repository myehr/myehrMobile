

<template>
  <div  style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>

      <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '200px'}">
        <!-- main content -->
        <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="0px">

          <x-header
            v-if="isShowNav"
            slot="header"
            style="width:100%;position:absolute;left:0;top:0;z-index:100;"
            :left-options="leftOptions"
            :right-options="rightOptions"
            :title="title"
            :transition="headerTransition"
            @on-click-more="onClickMore">
            <span v-if="route.path === '/' || route.path === '/component/drawer'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
              <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
            </span>
          </x-header>




          <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
         <!-- <transition
          @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
          :name="viewTransition" :css="!!direction">-->
            <div>
              <keep-alive    >
                <router-view class="router-view" v-if="this.$route.meta.keepAlive" ></router-view>
              </keep-alive>
              <router-view class="router-view2" v-if="!this.$route.meta.keepAlive"></router-view>
            </div>
       <!--   </transition>
-->


   <!--      <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="false" slot="bottom">
           &lt;!&ndash; <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
              <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
              <span slot="label">Home</span>
            </tabbar-item>
            <tabbar-item :link="{path:'/demo'}" :selected="isDemo" badge="9">
              <span class="demo-icon-22" slot="icon">&#xe633;</span>
              <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span v-else>Demos</span></span>
            </tabbar-item>&ndash;&gt;
          </tabbar>-->



        </view-box>



    </drawer>
    <div  >
    </div>
    <tabbar>
      <tabbar-item selected link="/">
        <span class="icon iconfont icon-shouye1 hometabbar" style="font-size: 23px"   slot="icon" ></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/myehrpath/work/worktab" title="工作台" :keepAlive="true">
        <span class="icon iconfont icon-gongzuo1 hometabbar" style="font-size: 23px"   slot="icon" ></span>
        <span slot="label">工作台</span>
      </tabbar-item>
      <tabbar-item >
        <span class="icon iconfont icon-ico-user-group-off hometabbar" style="font-size: 23px"   slot="icon" ></span>
        <span slot="label">工作圈</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <span class="icon iconfont icon-wo hometabbar" style="font-size: 23px"   slot="icon" ></span>
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Scroller,Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'
import VueRouter from 'vue-router'
/*import BScroll from 'better-scroll'*/


export default {
  directives: {
    TransferDom
  },
  components: {
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Actionsheet,
    Scroller,
    VueRouter
  },
  methods: {
    onShowModeChange (val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    },
    onClickMore () {
      this.showMenu = true
    },getActivity(){
      if(this.$route.query){
        if(this.$route.query.keepAlive == true){
          console.log('truetruetruetruetruetruetrue');
          return true;
        }
      }
    return false;
  },
    changeLocale (locale) {
      this.$i18n.set(locale)
      this.$locale.set(locale)
    },
    ...mapActions([
      'updateDemoPosition'
    ])
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
    this.registPath('/myehrpath/work/worktab',true);
    // 获取浏览器可视区域高度
    this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  //  this.$refs.wrapper.style.height = this.clientHeight+'px';
  //  console.log(this.clientHeight+'dddddddddddddddddddddd')

  },
  beforeDestroy () {
    this.box && this.box.removeEventListener('scroll', this.handler, false)
  },
  watch: {
    path (path) {

      if(this.$route.query){
        if(this.$route.query.keepAlive == true){
          this.keepAlive = true
        }else {
          this.keepAlive = false
        }
      }else {
        this.keepAlive = false
      }

      if(path == '/') {
        this.keepAlive = false;
      }else {
        this.keepAlive = true;
      }


      console.log('路径修改'+'*******'+path+this.keepAlive)
      if (path === '/component/demo') {
        this.$router.replace('/demo')
        return
      }
      if (path === '/demo') {
        setTimeout(() => {
          this.box = document.querySelector('#demo_list_box')
          if (this.box) {
            this.box.removeEventListener('scroll', this.handler, false)
            this.box.addEventListener('scroll', this.handler, false)
          }
        }, 1000)
      } else {
        this.box && this.box.removeEventListener('scroll', this.handler, false)
      }
    }
  }, beforeRouteLeave(to,from ,next){
    console.log('*******************1111111111111111');
    console.log(to);
    console.log(from);
    console.log(next);
    console.log('*******************');
    next()
  }, beforeRouteEnter(to,from ,next){
    console.log('*******************11111111111111222222222221');
    console.log(to);
    console.log(from);
    console.log(next);
    console.log('*******************');
    next()
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowBar () {
      if (this.entryUrl.indexOf('hide-tab-bar') > -1) {
        return false
      }
      return true
    },
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false
      }
      return true
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    isDemo () {
      return /component|demo/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    title () {

      if (this.route.path === '/myehrpath/work/worktab') return '我的工作台'
      if (this.route.path === '/') return '首页'
      if (this.route.path === '/project/donate') return 'Donate'
      if (this.route.path === '/demo') return 'Demo list'
      if (this.route.path === '/component/myehrservice') return '我的服务'
      if(this.$route.query != null &&this.$route.query.pageTitle!=null) {
         return this.$route.query.pageTitle;
      }
      return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  data () {
    return {
      entryUrl: document.location.href,
      showMenu: false,
      menus: {
        'language.noop': '<span class="menu-title">Language</span>',
        'zh-CN': '中文',
        'en': 'English'
      },
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left',
      clientHeight:0,
      keepAlive:false
    }
  }
}
</script>


<style lang="css">
  @import  "styles/myehr/home/iconfont.css";
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 0px;
  height: 0px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot');
  src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.woff') format('woff'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.svg#iconfont') format('svg');
}

.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}

.demo-icon-big {
  font-size: 28px;
}

.demo-icon:before {
  content: attr(icon);
}

.router-view {
  width: 100%;
  top: 46px;
}

.router-view2 {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
  .hometabbar{
    font-size: 30 !important;
  }

</style>
