<template>
  <div >
    <group title="分组1">
      <!-- 自定义验证   -->
      <x-input :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
               :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></x-input>

      <x-input :title="dataColumn[1].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[1].columnId]"
               :readonly="dataColumn[1].formColumnShowType == 'readonly'?true:false"
               :placeholder="dataColumn[1].columnTypeDetail.textboxEmptytext" :is-type="getTextBolxCheck(1)" :required="dataColumn[1].formColumnRequired" ></x-input>

      <hr-check-list :title="dataColumn[2].columnName" v-model="formData[dataColumn[2].columnId]" @onValidChange="onValidChange"  :dataList="checkListDatas" isMutiple="false" :readonly="true" :required="true" ></hr-check-list>

      <hr-date-time :title="dataColumn[3].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[3].columnId]" :required="dataColumn[3].formColumnRequired"></hr-date-time>

      <hr-textarea :title="dataColumn[4].columnName" :placeholder="dataColumn[4].columnTypeDetail.textboxEmptytext"></hr-textarea>

      <hr-file-upload></hr-file-upload>
      <x-input :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
               :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></x-input>
      <x-input :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
               :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></x-input>
    </group>


  </div>
</template>

<script>
  import { XInput,Calendar, Group, XButton, Cell,CheckIcon,Checklist,XSwitch ,Datetime,PopupPicker} from 'vux'
  import  { getSessionData } from '@/libs/cookieUtil.js'
  import  { setDefaultValue,dateFormat } from '@/libs/formCommon.js'
  import  hrCheckList from '@/components/myerh_form/hrCheckList.vue'
  import HrDateTime from "../components/myerh_form/hrDateTime";
  import HrTextarea  from '@/components/myerh_form/hrTextarea.vue'
  import HrFileUpload  from '@/components/myerh_form/hrFileUpload.vue'
  export default {
    name: "testCardForm",
    components: {
      HrDateTime,
      XInput,
      Group,
      Cell,
      CheckIcon,
      Calendar,
      Checklist,
      XSwitch,
      Datetime,
      PopupPicker,
      hrCheckList,
      HrTextarea,
      HrFileUpload
    },watch:{
      checkval:function(n,o){
        console.log(n+'  外面值')
      },datevalue(n,o){
        console.log(n+'  外面值')
      }
    },
    methods:{
      onValidChange:function (value) {
        console.log("验证结果："+value)
        this.checkValue = value;
      },initdata:function (columnId) {
        return "初始化函数的值";
      },getTextBolxCheck(i){
        var tempColumn = this.dataColumn[i];
        if(tempColumn.columnTypeDetail.textboxCheckType !== 'fun') {
          return tempColumn.columnTypeDetail.textboxCheckType;
        }else {
          return  'checkSelf'+i;
        }
      },setTextBoxDefaultValue(i) {
        var formThis = this;
        setDefaultValue(i,formThis,null);
      }
    },
    created(){
      //  console.log('************************88')
        let tempData = {};
        let isInit = this.paramData.isInit;
        if(isInit == true) {
          //需要初始化数据
        }else {

          //不需要初始化数据  此时需要取各字段默认值 以下代码需要后台生成  具体各种情况的代码如下
          //1 如果某个字段初始值时从上一个页面传入参数
          for(var i=0; i<this.dataColumn.length; i++){
              //数据验证
            this.setTextBoxDefaultValue(i);

          }
      }
    }
    ,
    data (){
      return {
        dataColumn:[
            {formGroupId:'',entityId:'EMP_EMPLOYEE_REG',columnId:'EMPCODE',columnName:'员工工号',columnType:'1',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'email',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:'空文本显示'}}
            ,{formGroupId:'',entityId:'EMP_EMPLOYEE_REG',columnId:'EMPNAME',columnName:'姓名',columnType:'1',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'initFun',textboxDataFromValue:'initdata',textboxEmptytext:''}}
            ,{formGroupId:'',entityId:'EMP_EMPLOYEE_REG',columnId:'EMPCONTRY',columnName:'国家',columnType:'2',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'constant',textboxDataFromValue:'2',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'EMP_EMPLOYEE_REG',columnId:'EMPBIRTHDAY',columnName:'出生日期',columnType:'6',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'EMP_EMPLOYEE_REG',columnId:'DESC',columnName:'说明',columnType:'6',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:'多行文本'}}
          ],
        be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        },
        formData:{EMP_EMPLOYEE_REG:'100'},
        checkValue:true,
        defaultCheckValue:true,
        paramData:this.$route.query, //页面请求参数
        defaultDate:'TODAY',
        checkListDatas: [ {code:'1',name:'张三'},{code:'2',name:'李四'}],
        radioValue:'中国',
        list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
        checkval:'1,2',
        datevalue:'2018-10-21'
      }
    }
  }



  /**
   *
   *
   * 控件类型
   {id: "11", text: "下拉树选择"}
   {id: "12", text: "模糊匹配输入框"}
   {id: "1", text: "文本框"}
   {id: "8", text: "多行文本域"}
   {id: "2", text: "下拉列表选择"}
   {id: "6", text: "日期选择框"}
   {id: "3", text: "单选框组"}
   {id: "4", text: "复选框组"}
   {id: "5", text: "复选框"}
   {id: "7", text: "lookup弹出窗"}
   {id: "9", text: "附件"}
   {id: "10", text: "富文本"}

   是否必填
   {id: "Y", text: "是"}
   {id: "N", text: "否"}

   显示方式
   {id: "show", text: "显示"}
   {id: "hide", text: "隐藏"}
   {id: "readonly", text: "只读"}
   {id: "label", text: "label"}

   验证类型
   {id: "int", text: "数字"}
   {id: "float", text: "实数"}
   {id: "naturalNumber", text: "自然数"}
   {id: "letter", text: "英文字母"}
   {id: "engnum", text: "英文和数字"}
   {id: "email", text: "邮件"}
   {id: "zh", text: "汉字"}
   {id: "url", text: "网址"}
   {id: "chinaZipcode", text: "邮政编码"}
   {id: "phone", text: "电话号码"}
   {id: "chinaMobile", text: "手机号码"}
   {id: "uniqueVerify", text: "唯一校验"}
   {id: "chinaIDNo", text: "身份证号码"}
   {id: "IP", text: "IP"}
   {id: "fun", text: "自定义校验方案"}


   //默认数据来源类型
   {id: "session", text: "会话数据"}
   {id: "parameter", text: "请求参数"}
   {id: "constant", text: "常量"}
   {id: "currentdate", text: "当前系统时间"}
   {id: "initFun", text: "自定义初始化方案"}
   {id: "urlParam", text: "流程用url参数"}

   *
   */
</script>

<style scoped>

</style>
