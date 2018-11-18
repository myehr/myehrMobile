<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in swipers" :key="index" style="margin-right:20px !important;">
              <grid :show-lr-borders="false">
                <grid-item  :label="item.menuName" >
                  <img slot="icon" src="../assets/grid_icon.png">
                </grid-item>
              </grid>
            </div>
        </div>
         <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
    </div>
</template>
<script>
  import asiaSwiper from 'swiper';
   import {Grid, GridItem } from 'vux'
  export default {
    name: 'swipetr',
    data() {
      return {
        testSwiper: null,
      }
    },
    props: {
        swipers:[]
    },  //swiper的就是test这个数据传递来的
    components: {
    Grid,
    GridItem
  },
  created(){
      // console.log(this.swipers,'989898989');
  },
    methods: {
      initSwiper() {
        this.testSwiper = new asiaSwiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 4,
                slidesPerColumn: 2,// 控制组件列
                paginationClickable: true,
                spaceBetween: 30
        })
        console.log('创建');
      },
      updateSwiper() {
        this.$nextTick(() => {
          this.testSwiper.update(true);  //swiper update的方法
          console.log('更新');
        })
      },
      swiperUpdate() {
        if (this.testSwiper) { //节点存在
          this.updateSwiper(); //更新
        } else {
          this.initSwiper(); //创建
          
        }
      },
    },

    watch: {
      //通过props传来的数据 和 组件一加载节点就创建成功 二者不是同步，实时监听的swiper(传递的值)的变化
      swipers() {
        this.swiperUpdate();
        console.log(this.swipers,'监听数据变化');
        console.log('监听数据变化');
      }
    },
    mounted() {
      this.swiperUpdate(); //页面一加载拉去数据创建节点
      console.log('swiper 组件组件组件');
    }
  }
</script>
<style scoped>
 .weui-grid__label{
   text-overflow: inherit !important;
 }
 .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
   bottom: -4px;
 }
</style>
