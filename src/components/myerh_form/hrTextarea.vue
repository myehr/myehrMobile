<template>
  <div class="vux-x-input weui-cell  weui-cell:before">
      <div class="weui-cell__hd">
        <label for="vux-x-input-uosjx" class="weui-label" style="width: 4em;">{{title}}</label>
      </div>
      <div class="weui-cell__bd weui-cell__primary" style="text-align: left">
        <textarea wrap="soft" autocomplete="off" spellcheck="false" :placeholder="placeholder" rows="4" class="ivu-input" style="height: 52px; min-height: 52px; max-height: 115px; overflow-y: hidden;">
        </textarea>
      </div>
    <div class="weui-cell__ft">
      <i class="weui-icon weui_icon_clear weui-icon-clear" ></i>
      <i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" title="邮箱格式格式不对哦~" style=""></i>
    </div>
    </div>
</template>

<script>
    export default {
        name: "hrTextarea",
        props:{
          title:{},
          value:{type:Object},
          required:{},
          readonly:{},
          placeholder:{}
        },created(){
          this.currentValue = this.value;
          if(this.required === true || this.required === 'true') {
            if(this.value == null ||this.value === '') {
              this.valid = false;
            }else {
              this.valid =  true;
            }
          }
        },watch:{
          valid(n,o){
            this.$emit('onValidChange',n);
          },
          currentValue(n,o){
            if(this.required === true || this.required === 'true') {
              if(n == null ||n === '') {
                this.valid = false;
              }else {
                this.valid =  true;
              }
            }
            this.$emit('input',  n);
          }
        },data(){
              return {
                currentValue:null,
                valid:true
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
</style>
