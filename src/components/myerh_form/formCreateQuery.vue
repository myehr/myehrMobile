<template>
    <div>
      <div style="margin-bottom: 50px">
        <div v-for="(temp,index)  in filterColumnDatas">
          <group :title="temp.lableName"  v-if="temp.type === 'radio'">
            <div class="sp">
              <checker v-model="filterColumnValueData_temp[index].value"  default-item-class="demo5-item" selected-item-class="demo5-item-selected" type="radio">
                <checker-item v-for="temp in  getDictList('dictId')"   :key="temp.id" :value="temp.id"  >{{temp.name}}</checker-item>
              </checker>
            </div>
          </group>
          <group :title="temp.lableName"  v-if="temp.type === 'checkbox'">

            <div class="sp" >
              <checker type="checkbox" v-model="filterColumnValueData_temp[index].value" default-item-class="demo5-item" selected-item-class="demo5-item-selected"  >
                <checker-item v-for="t in getDictList('dictId')" :key="t.id" :value="t.id">{{t.name}}</checker-item>
              </checker>
            </div>
          </group>
          <group :title="temp.lableName" v-model="filterColumnValueData_temp[index].value"  v-if="temp.type === 'textbox'">
            <x-input name="email" placeholder="请输入姓名" ></x-input>
          </group>
          <group :title="temp.lableName"   v-if="temp.type === 'date'">
            <date-rang  v-model="filterColumnValueData_temp[index].value"  start_date="2018-01-01" end_date="2019-01-04"></date-rang>
          </group>
        </div>
        <div>点击</div>


      </div>
    </div>
</template>
<!-- 动态查询表单生成 -->

<script>
  import CheckerItem from '../checker/checker-item.vue'
  import Checker from '../checker/checker.vue'
  import XInput from '../x-input'
  import  Datetime from '../Datetime'
  import DateRang from "./dateRang";
    export default {
        name: "formCreateQuery",
        components: {
          DateRang,
          CheckerItem,
          Checker,
          XInput,
          Datetime
        },created: function(){
          // 这里是动态生成v-model,这个可以放在网络请求成功里面;
          var len = this.filterColumnDatas.length;
          for (var i = 0; i < len; i ++) {
            var item = {value: null};
            this.filterColumnValueData_temp.push(item);
          }
      },
        methods :{
          getDictList(){

            return [{id:'1',name:'张三'},{id:'2',name:'李四'},{id:'3',name:'张三3'},{id:'4',name:'李四4'},{id:'5',name:'张三5'},{id:'6',name:'李四6'},{id:'7',name:'李四6'},{id:'8',name:'李四6'}];
          },
          getFormData(){
            var len = this.filterColumnValueData_temp.length;
            for (var i = 0; i < len; i ++) {
              var propertyName = this.filterColumnDatas[i].name;

              this.filterColumnValueData[propertyName] = this.filterColumnValueData_temp[i].value;
            }
            return this.filterColumnValueData;
          }
        }
        ,props:{
        filterColumnDatas:{
          type:Array,
          default:function () {
            return []
          }
        }
      },
      data () {
        return {
          filterColumnValueData_temp:[],
          filterColumnValueData:{}
        }
      }
    }

</script>


<style scoped >


  .sp {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }


  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
  .demo5-item {
    margin-bottom: 10px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
    padding: 5px 10px 5px 10px;
  }

  .demo5-item-selected {
    background: #ffffff url(../../imgs/active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }


</style>

