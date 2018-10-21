<template>
    <div class="weui-cell">
      <x-input :title="title" @onValidChange="onValidChange" v-model="currentValue"  :readonly="readonly" :placeholder="placeholder"
               :is-type="checkType" :required="required" ></x-input>
    </div>
</template>

<script>
  import XInput from  '@/components/x-input/index.vue'
    export default {
        name: "hrTextBox",
        components: {
          XInput
        },
        props:{
          title:{},
          value:{type:Object},
          required:{},
          readonly:{},
          placeholder:{},
          checkType:{}
        },methods:{
          onValidChange(n){
            this.$emit('onValidChange',n);
          }
        },created(){
          this.currentValue = this.value;
          console.log('textbox初始值:'+this.value)
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


</style>
