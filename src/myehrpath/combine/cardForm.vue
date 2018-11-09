<template>
  <div>
    <div>
        <test-card-form :compParams="params" v-model="formData" @onButtonClickEnd="onButtonClickEnd" @onLoadData="onLoadData"></test-card-form>
    </div>

    <div>
      <test-list1-config></test-list1-config>
    </div>

  </div>
</template>

<script>

    import  testCardForm from '@/myehrpath/testCardForm.vue'
    import  testList1Config from '@/myehrpath/testList1Config.vue'

    export default {
      name: "cardForm",
      components: {
        testCardForm,
        testList1Config
      },computed:{
        EMPEMPLOYEE_CNAME() {
          return this.formData!=null?this.formData.EMPEMPLOYEE_CNAME:null
        }
      },methods:{
        onButtonClickEnd(formId,buttonId,datas,retcode){ //按钮点击加载方法

        },onLoadData(formId,formData,param,retcode){ //数据加载回调方法

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
