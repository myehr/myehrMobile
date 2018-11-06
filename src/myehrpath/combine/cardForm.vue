<template>
    <div>
        <test-card-form :compParams="params" v-model="formData" @onButtonClickEnd="onButtonClickEnd"></test-card-form>
    </div>
</template>

<script>

    import  testCardForm from '@/myehrpath/testCardForm.vue'

    export default {
      name: "cardForm",
      components: {
        testCardForm
      },computed:{
        EMPEMPLOYEE_CNAME() {
          return this.formData!=null?this.formData.EMPEMPLOYEE_CNAME:null
        }
      },methods:{
        onButtonClickEnd(buttonId,datas,retcode){
          alert(buttonId+'ddddd'+datas)
        }
      },watch:{
        EMPEMPLOYEE_CNAME(n,o){
          //监听formData 中EMPEMPLOYEE_CNAME熟悉值变化
          console.log('EMPEMPLOYEE_CNAME::::'+n)
        },formData:{
          handler(newValue, oldValue) {
            console.log(newValue)
          },
         deep: true
        }
      },data(){
            return {
            params:{"EMPEMPLOYEE_EMPID":"258"},
            formData:null
          }
      }
    }
</script>

<style scoped>

</style>
