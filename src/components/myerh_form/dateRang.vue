<template>
    <div>
      <datetime   v-model="startDateValue" :start-date="start_date" :end-date="getSEndDateValue()" format="YYYY-MM-DD" placeholder="请选择起始"  title="起"></datetime>
      <datetime   v-model="endDataValue"   :start-date="getEStartDateValue()"  :end-date="end_date"  placeholder="请选择截止"  title="止"></datetime>
    </div>
</template>

<script>
  import  Datetime from '../Datetime'
    export default {
        name: "dateRang",
        components: {
          Datetime
        },
        model: {    // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
        prop: 'tvalue',
        event: 'cc'
      },
      watch:{
        startDateValue:function (newVal,oldVal) {
          this.getTvalue();
        },
        endDataValue:function (newVal,oldVal) {
          this.getTvalue();
        }
      },
      methods:{
        getTvalue(){
          this.tvalue = '';
          if (this.startDateValue){
            this.tvalue =  this.startDateValue+'|';
          }
          if(this.endDataValue) {
            if(this.tvalue) {
              this.tvalue = this.tvalue+this.endDataValue;
            }else {
              this.tvalue = '|'+ this.tvalue+this.endDataValue;
            }
          }
          this.$emit('cc', this.tvalue);
        },
        getEStartDateValue:function (){

          if (this.startDateValue){
            return this.startDateValue;
          }else {
            return this.start_date;
          }
        },
        getSEndDateValue:function () {
          if(this.endDataValue){
            return this.endDataValue;
          }else {
            return this.end_date;
          }
        }
      },
        props:{
          start_date:{},
          end_date:{}
       },data(){
          return {
             startDateValue:'',
             endDataValue:'',
             tvalue:''
          }
      }
    }
</script>

<style scoped>

</style>
