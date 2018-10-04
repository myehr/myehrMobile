<template>
  <div class="accept-container">
    <div v-transfer-dom>
      <loading :show="showLoading" text=""></loading>
    </div>
    <!-- <object data="http://localhost:8081/examples/index.html" :height="deviceheight" :width="devicewidth"></object>-->
     <iframe v-show="iframeState" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src="url"     ></iframe>
  </div>
</template>

<script>
  import { Loading,TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Loading
    },
    name: "iframe",
    data () {
      return {
        iframeState:true,
        url:this.$route.query.url,
        loading:true,
        deviceheight:'',
        devicewidth:'',
        showLoading:true,
        backFlag:false
      }
    },
    created:function (){
      let  that = this;
      if(window.addEventListener){
        window.addEventListener('message',that.handleMessage,false);
      }
    },
    mounted(){
      const oIframe = document.getElementById('show-iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = deviceWidth + 'px';
      oIframe.style.height = (deviceHeight-40) + 'px';
      this.deviceheight  = deviceWidth + 'px';
      this.devicewidth = deviceWidth + 'px';

    },
    methods:{
      getshowLoading(){
        console.log('this.showLoading'+this.showLoading)
        return this.showLoading;
      },
      handleMessage(e){
        let type = e.data;
        if(this.showLoading == true) {
          this.showLoading = false
        }
        if(type == '0') {
          if(this.backFlag == false ) {
            console.log('返回返回返回返回返回返回返回返回返回返回返回返回返回'+type)
            this.backFlag = true;
            this.$router.go(-1)
          }

        }
        console.log('#######################################################################'+type+this.showloading)
      },
      goBack(){
        this.iframeState = false;
      },
      showIframe(){
        this.iframeState = true;
      }
    }
  }
</script>

<style scoped>

</style>
