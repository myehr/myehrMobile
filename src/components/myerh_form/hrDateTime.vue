<template>

     <div class="vux-x-input weui-cell  weui-cell:before">
         <div class="weui-cell__hd">
           <label for="vux-x-input-uosjx" class="weui-label" style="width: 4em;">{{title}}</label>
         </div>
         <div class="weui-cell__bd weui-cell__primary" style="text-align: right">
           <datetime v-model="currentValue" :format="format" class="weui-cell__bd weui-cell__primary"
                     :hour-list="hour_list"
                     :minute-list="minute_list" :title="title">

           </datetime>
         </div>
         <div class="weui-cell__ft">
           <i class="weui-icon weui_icon_clear weui-icon-clear" ></i>
           <i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" title="邮箱格式格式不对哦~" style=""></i>
         </div>

     </div>
</template>

<script>
  import  Datetime from '@/components/datetime/index.vue'
    export default {
        name: "hrDateTime",
        components: {
          Datetime
        },props:{
          title:{},
          format:{},
          hour_list:{},
          minute_list:{},
          value:{type:Object},
          required:{},
          readonly:{}

        },data(){
          return {
            currentValue:null,
            valid:true
          }
      },created(){
          if(this.format == null || this.format === '') {
            this.format = 'YYYY-MM-DD'
          }
          this.currentValue = this.value;
          if(this.required === true || this.required === 'true') {
            if(this.currentValue === null || this.currentValue == '') {
              this.valid = false;
            }
          }

          if(this.format === 'YYYY-MM-DD HH:mm' || this.format === 'YYYY-MM-DD HH' ) {
            this.hour_list = ['09', '10', '11', '12', '13', '14', '15', '16'];
          }
          if(this.format === 'YYYY-MM-DD HH:mm' ) {
            this.minute_list = ['00', '15', '30', '45'];
          }

      },watch:{
        valid(n,o){
          this.$emit('onValidChange',n);
        },
        currentValue(n,o){
          console.log(n+' **********')
          if(this.required === true || this.required === 'true') {
            if(n == null ||n === '') {
              this.valid = false;
            }else {
              this.valid =  true;
            }
          }
          this.$emit('input',  n);
        }
      }
    }
</script>

<style>
   .form_border {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
</style>
