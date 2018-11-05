<template>
  <div class="weui-tab" style="overflow: hidden">
    <slot name="header"></slot>
    <div class="weui-tab__panel vux-fix-safari-overflow-scrolling" ref="viewBoxBody" id="vux_view_box_body" :style='{marginTop: bodyPaddingTop,}' style="padding-bottom:46px;">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: 'view-box',
  props: ['bodyPaddingTop', 'bodyPaddingBottom'],
  data(){
      return{
        clientHeight:'',
      }
  },
  created(){
      //  let m = document.documentElement.clientHeight;
      //  this.clientHeight = m - 46;
      //  console.log(m,'屏幕高度');
      // document.body.addEventListener('touchmove' , function(e){
      //   console.log('666666666666');
      //     e.preventDefault();
      // })
  },
  methods: {
    scrollTo (top) {
      this.$refs.viewBoxBody.scrollTop = top
    },
    getScrollTop () {
      return this.$refs.viewBoxBody.scrollTop
    },
    getScrollBody () {
      return this.$refs.viewBoxBody
    },
    changeFixed(clientHeight){
        console.log(clientHeight);
        let m = clientHeight-53
        let weixin = clientHeight-73
        if(this.isWeiXin()){
             this.$refs.viewBoxBody.style.height =weixin+'px';
        }else{
          this.$refs.viewBoxBody.style.height = m+'px';
        }
       

      },
      //判断是否是微信浏览器的函数
    isWeiXin(){
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
      }else{
      return false;
      }
    },
    wScroll(elem) {
                var startX = 0,startY = 0;
                document.addEventListener('touchstart', function(evt) {
                    var touch = evt.touches[0]; 
                    startX = Number(touch.pageX); 
                    startY = Number(touch.pageY); 
                });
                elem.addEventListener('touchmove', function(ev) {
                    var _point = ev.touches[0],
                        _top = elem.scrollTop;
                    var _bottomFaVal = elem.scrollHeight - elem.offsetHeight;
                    //console.log(_top + ":" + _bottomFaVal + ":" + elem.offsetHeight + ":" + elem.scrollHeight);
                    if(_top === 0) {
                        if(_point.clientY > startY) {
                            ev.preventDefault();
                        } else {
                            ev.stopPropagation();
                        }
                    } else if(_top === _bottomFaVal) {
                        elem.scrollTop--;
                    } else if(_top > 0 && _top < _bottomFaVal) {
                        ev.stopPropagation();
                    } else {
                        ev.preventDefault();
                    }
                }, {
                    passive: false
                });
            }
  },
  watch: {
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
  mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
      this.wScroll(this.$refs.viewBoxBody);
    },
    

}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/vux-tabbar';
// body:before {
//   width: 100%;
//   height: 100%;
//   content: ' ';
//   position: fixed;
//   z-index: -1;
//   top: 0;
//   left: 0;
//   background: #fff;
// }
</style>
