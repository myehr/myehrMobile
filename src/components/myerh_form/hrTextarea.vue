<template>
  <div class="vux-x-input weui-cell  weui-cell:before" style="padding-left: 0">
      <div class="weui-cell__hd" v-if="title===''">
        <label for="vux-x-input-uosjx" class="weui-label" style="width: 4em;">{{title}}</label>
      </div>
      <div class="weui-cell__bd weui-cell__primary" style="text-align: left">
        <!--<div class='hrtextarea' contenteditable placeholder='请输入文字' ref="mybox"   v-on:focus="onFocus" v-on:blur="getBlur" ></div>-->
        <x-textarea  :title="title" @onValidChange="onValidChange" v-model="currentValue"  :readonly="readonly" :placeholder="placeholder"
                     :is-type="checkType" :required="required" v-on:focus="onFocus" v-on:blur="getBlur" ></x-textarea>
      </div>
    <div class="weui-cell__ft">
      <i class="weui-icon weui_icon_clear weui-icon-clear" v-if="showClean" v-on v-on:click="cleanData"></i>
      <i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" v-if="!valid" :title="errorMessage" v-on:click="showErrorMsg()" style=""></i>
    </div>
    <toast v-model="showToaskMsg" type="text" :time="800" is-show-mask :text="errorMessage"  ></toast>
    </div>
</template>

<script>
  import  {getConstant} from  '@/libs/constant.js';
  import Toast from '@/components/toast/index.vue'
  import XTextarea from '@/components/x-textarea/index.vue'
    export default {
        name: "hrTextarea",
        components: {
          XTextarea,
          Toast
        },
        props:{
          title:{},
          value:{type:Object},
          required:{},
          readonly:{},
          placeholder:{}
        },methods:{
          getBlur(){
              this.showClean = false;
              this.currentValue = this.$refs.mybox.innerText;
          },
          onFocus(e){
              this.showClean = true;
          },
          cleanData(){
              this.$refs.mybox .innerText = null;
              this.getBlur();
          },
          showErrorMsg(){
            this.showToaskMsg= true;
          }
        },created(){
          if(this.value!=''&&this.value!=null){
            this.currentValue = this.value
          }else{
            this.currentValue = ' '
          }
          if(this.required === true || this.required === 'true') {
            if(this.value == null ||this.value === '') {
              this.valid = false;
              this.errorMessage = getConstant('notNullMsg');
            }else {
              this.valid =  true;
              this.errorMessage = null;
            }
          }
        },watch:{
          valid(n,o){
            this.$emit('onValidChange',n);
          },
          value(n,o){
            this.currentValue = n;
          },
          currentValue(n,o){
            if(this.required === true || this.required === 'true') {
              if(n == null ||n === '') {
                this.valid = false;
                this.errorMessage = getConstant('notNullMsg');
              }else {
                this.valid =  true;
                this.errorMessage = null;
              }
            }
            this.$emit('input',  n);
          }
        },data(){
              return {
                currentValue:null,
                valid:true,
                showClean:false,
                errorMessage:null,
                showToaskMsg :false
              }
        }
    }
</script>

<style scoped>
  .ivu-input-wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    color: inherit;
  }

  .ivu-input {
    display: inline-block;
    width: 90%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
  }
  .hrtextarea {
    width: r(670);
    height: auto;
    min-height: r(160);
    max-height: r(200);
    border: r(1) solid #cecece;
    font-size: r(24);
    text-align: justify;
    overflow-y: auto;
    outline: none;
    margin: 0 auto;
    margin-top: r(100);
  }
  .hrtextarea:empty::before {
    content: attr(placeholder);
    color:grey;
  }
</style>
