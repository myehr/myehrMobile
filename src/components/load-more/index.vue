<template>

  <div v-if="showLoading" class="vux-loadmore weui-loadmore weui-loadmore_line" >

    <i class="weui-loading" v-if="showLoading">

      <span class="weui-loadmore__tips" >loading</span>
    </i>

  </div>
</template>

<script>
  export default {
    name: 'load-more',
    props: {
      showLoading: {
        type: Boolean,
        default: false
      },
      tip: String
    }
  }
</script>

<style lang="less">
  @import '../../styles/weui/widget/weui-loading/weui-loading.less';
  @import '../../styles/weui/widget/weui_tips/weui-loadmore.less';

  .vux-loadmore{

    &.weui-loadmore_line{
      display: flex;
      border-top: 0;

      &:before, &:after{
        position: relative;
        top: -1px;
        flex: 1;
        content: '';
        border-top: 1px solid @weuiLineColorLight;
      }

    }
  }
</style>
