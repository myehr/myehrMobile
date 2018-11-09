<template>
    <div>
      <div style="margin-bottom: 50px" v-if="dictValue != null">
        <div v-for="(temp,index)  in filterColumnDatas">
          <group :title="temp.lableName"  v-if="temp.type === 'radio'">
            <div class="sp">
              <checker v-model="filterColumnValueData_temp[index].value"  default-item-class="demo5-item" selected-item-class="demo5-item-selected" type="radio">
                <checker-item v-for="temp2 in  dictValue[temp.dictId]"   :key="temp2.code" :value="temp2.code"  >{{temp.name}}</checker-item>
              </checker>
            </div>
          </group>

          <group :title="temp.lableName"  v-if="temp.type === 'checkbox'">
            <div class="sp">
              <checker v-model="filterColumnValueData_temp[index].value"  default-item-class="demo5-item" selected-item-class="demo5-item-selected" type="checkbox">
                <checker-item v-for="temp2 in  dictValue[temp.dictId]"   :key="temp2.code" :value="temp2.code"  >{{temp.name}}</checker-item>
              </checker>
            </div>
          </group>




          <group :title="temp.lableName" v-model="filterColumnValueData_temp[index].value"  v-if="temp.type === 'textbox'">
            <x-input name="email" placeholder="请输入姓名" ></x-input>
          </group>
          <group :title="temp.lableName"   v-if="temp.type === 'daterange'">
            <date-rang  v-model="filterColumnValueData_temp[index].value"  start_date="2018-01-01" end_date="2019-01-04"></date-rang>
          </group>

          <group :title="temp.lableName"   v-if="temp.type === 'datetime'">
            <datetime  v-model="filterColumnValueData_temp[index].value"  :format="getFormat(temp)" v-bind:hour-list="defaultHourList" :minute-list="getMinuteList(temp)"  title="选择"></datetime>
          </group>
        </div>
      </div>
    </div>
</template>
<!-- 动态查询表单生成 -->

<i18n>
  Choose:
  zh-CN: 选择
  daterange-format:
  en: 'YYYY/MM/DD'
  zh-CN: 'YYYY年MM月DD日'
</i18n>

<script>
  import CheckerItem from '../checker/checker-item.vue'
  import Checker from '../checker/checker.vue'
  import XInput from '../x-input'
  import DateRang from "./dateRang";
  import Datetime from  '@/components/datetime'
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
          var dictCode = []
          for (var i = 0,j=0; i < len; i ++) {
            var item = {value: null};
            this.filterColumnValueData_temp.push(item);
            if(this.filterColumnDatas[i].dictId!=undefined&&this.filterColumnDatas[i].dictId!=null){
              dictCode[j] = this.filterColumnDatas[i].dictId
              j++
            }
          }

        /*console.log(dictCode)
        console.log(dictCode)
        console.log(dictCode)
        console.log(dictCode)
*/
        this.getAllDictData()
      },
        methods :{
          onChange (val) {
            console.log('change', val)
          },getAllDictData(){
            // http://116.62.243.28:9876/myehr/dict/getDictDatasAll.action?formId=677
            this.$axios.post('/myehr/dict/getDictDatasAll.action?formId='+this.formId)
              .then(function (response) {

                if(response.data) {
                  this.dictValue = response.data;
                }else {
                  this.dictValue = {};
                }
                alert(this.dictValue);
              }.bind(this))
              .catch(function (error) {

              });
          },
          getFormData(){
            var len = this.filterColumnValueData_temp.length;
            for (var zi = 0; i < len; i ++) {
              var propertyName = this.filterColumnDatas[i].name;

              this.filterColumnValueData[propertyName] = this.filterColumnValueData_temp[i].value;
            }
            return this.filterColumnValueData;
          },getHourList(temp){
            return  !temp.hourList?this.defaultHourList:temp.hourList
          },getMinuteList(temp){
            return  !temp.minuteList?this.defaultMinuteList:temp.minuteList
          },getFormat(temp){
            return !temp.format? 'YYYY-MM-DD':temp.format
          }
        }
        ,props:{
          filterColumnDatas:{
            type:Array,
            default:function () {
              return []
            }
          },formId:{}
      },
      data () {
        return {
          filterColumnValueData_temp:[],
          filterColumnValueData:{},
          dictValue:null,
          defaultHourList: ['09', '10', '11', '12', '13', '14', '15', '16', '17','18', '19', '20', '21', '22', '23', '00', '01', '02', '03','04','05','06','06','08'],
          defaultMinuteList:['00', '15', '30', '45']
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

