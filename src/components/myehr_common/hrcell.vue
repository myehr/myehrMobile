<template>
  <div  v-on:click="isShow = !isShow"  data-v-1548e98c="" class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
    <div  class="weui-cell__hd"></div> <div class="vux-cell-bd vux-cell-primary">
    <p>
      <label class="vux-label" style="margin-right: 20px" >列表2</label>
      <x-button mini  @click.native="onButtonClick(item.buttonId)"  v-for="item in buttons">添加</x-button>
    </p>
    <span class="vux-label-desc"></span></div>
    <div  :class="{'vux-cell-arrow-down':!isShow,'vux-cell-arrow-up':isShow}"  class="weui-cell__ft vux-cell-arrow-transition ">  <!---->
    </div>
  </div>
</template>



<script>
  import  XButton from '@/components/x-button/index.vue'
    export default {
        name: "hrcell",
        components: {
          XButton
        },props: {
          buttons:{},
          title:{}
        },data() {
          return {
            isShow: true
          }
        },methods:{
          addNew2(){
            alert(1);
          }
        },watch:{
          isShow(n,o){
            this.$emit('onShowChange', n)
          }
        }
    }
</script>

<style scoped>

</style>
