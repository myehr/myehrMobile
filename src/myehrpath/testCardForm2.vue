<template>
  <div >
    <group title="申请人信息">
      <!-- 自定义验证   -->
      <hr-text-box :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
               :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></hr-text-box>

      <hr-date-time :title="dataColumn[1].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[1].columnId]" :required="dataColumn[1].formColumnRequired"
                    :format="dataColumn[1].columnTypeDetail.datepickerFormat"
      ></hr-date-time>

      <hr-check-list :title="dataColumn[2].columnName" v-model="formData[dataColumn[2].columnId]" @onValidChange="onValidChange"
                      isMutiple="false" :readonly="dataColumn[2].formColumnShowType === 'readonly'?true:false"
                     :required="dataColumn[2].formColumnRequired" ></hr-check-list>

      <hr-text-box :title="dataColumn[3].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[3].columnId]"
                   :readonly="dataColumn[3].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[3].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(3)" :required="dataColumn[3].formColumnRequired" ></hr-text-box>

      <hr-text-box :title="dataColumn[4].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[4].columnId]"
                   :readonly="dataColumn[4].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[4].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(4)" :required="dataColumn[4].formColumnRequired" ></hr-text-box>
    </group>

    <group title="调配信息">
      <hr-textarea :title="dataColumn[5].columnName" :placeholder="dataColumn[5].columnTypeDetail.textboxEmptytext" :required="dataColumn[5].formColumnRequired"
                   :readonly="dataColumn[5].formColumnShowType === 'readonly'?true:false" v-model="formData[dataColumn[5].columnId]"
      ></hr-textarea>

    </group>
    <group title="审批信息">
      <hr-check-list :title="dataColumn[6].columnName" v-model="formData[dataColumn[6].columnId]" @onValidChange="onValidChange"
                     isMutiple="false" :readonly="dataColumn[6].formColumnShowType === 'readonly'?true:false"
                     :required="dataColumn[6].formColumnRequired" ></hr-check-list>

      <hr-text-box :title="dataColumn[7].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[7].columnId]"
                   :readonly="dataColumn[7].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[7].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(7)" :required="dataColumn[7].formColumnRequired" ></hr-text-box>
      <hr-date-time :title="dataColumn[8].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[8].columnId]" :required="dataColumn[8].formColumnRequired"
                    :format="dataColumn[8].columnTypeDetail.datepickerFormat"
      ></hr-date-time>
    </group>

    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>
    <div class="bottomFixed" style="margin-bottom:  50px ;width: 98% ; text-align: right">
      <x-button mini >提交</x-button>
      <x-button mini  type="primary">退回</x-button>
      <x-button mini  type="warn">取消</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput,Calendar, Group, XButton, Cell,CheckIcon,Checklist,XSwitch ,Datetime,PopupPicker,Flexbox,FlexboxItem} from 'vux'
  import  { getSessionData } from '@/libs/cookieUtil.js'
  import  { setDefaultValue,dateFormat ,getInitFilterParam} from '@/libs/formCommon.js'
  import  hrCheckList from '@/components/myerh_form/hrCheckList.vue'
  import HrDateTime from "../components/myerh_form/hrDateTime";
  import HrTextarea  from '@/components/myerh_form/hrTextarea.vue'
  import HrFileUpload  from '@/components/myerh_form/hrFileUpload.vue'
  import HrTextBox  from '@/components/myerh_form/hrTextBox.vue'
  export default {
    name: "testCardForm2",
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
      HrFileUpload,
      HrTextBox,
      XButton,
      Flexbox,
      FlexboxItem
    },props:{
        value:{},
        compParams:{}
    },watch:{
      checkval:function(n,o){
        console.log(n+'  外面值')
      },datevalue(n,o){
        console.log(n+'  外面值')
      },formData(o,n){
        this.$emit('input',  n);
      }
    },
    methods:{
      submitForm(){

      },
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
      },
      loadData(){
        //需要初始化数据
        var result = getInitFilterParam(this.paramData,this.compParams,this.filterConfig);
        this.$axios.post('/myehr/form/cardformInitData.action',
          {formId:this.formId,pkId:'',"containerParam":{},"paramsMap":{},"requestParam":result}
        )
          .then(function (response) {
            if(response.data) {
              if(response.data.rows[0]) {
                this.formData = response.data.rows[0];
              }
            }
            console.log(response)
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created(){
        let tempData = {};
        let isInit = this.paramData.isInit;
        isInit = true;
        if(isInit == true) {
          this.loadData();
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
            {formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_TITLE',columnName:'标题',columnType:'1',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:'请输入标题'}}
            ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_DATE_NEWDATE',columnName:'申请日期',columnType:'6',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
            ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_JOBIDNAME',columnName:'申请人职位',columnType:'2',formColumnRequired:'true',formColumnShowType:'readonly',columnTypeDetail:{datepickerFormat:'yyyy-MM-dd',textboxCheckType:'',textboxDataFromType:'constant',textboxDataFromValue:'1',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_DEPIDNAME',columnName:'申请部门',columnType:'1',formColumnRequired:'false',formColumnShowType:'readonly',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_EMPDINAME',columnName:'申请人',columnType:'1',formColumnRequired:'true',formColumnShowType:'readonly',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_RENSON',columnName:'原因',columnType:'8',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_DEPARTMENT',columnName:'是否行长审批',columnType:'2',formColumnRequired:'true',formColumnShowType:'show',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_OTHERSINGLE',columnName:'其他-文本',columnType:'1',formColumnRequired:'false',formColumnShowType:'readonly',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}
          ,{formGroupId:'',entityId:'PERSONNEL',columnId:'PERSONNEL_DUTYTIME',columnName:'到岗日期',columnType:'6',formColumnRequired:'false',formColumnShowType:'readonly',columnTypeDetail:{textboxCheckType:'',textboxDataFromType:'',textboxDataFromValue:'',textboxEmptytext:''}}

          ],
        be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        },
        filterConfig:[{paramType:'parameter',paramValue:'businessId',paramName:'BUSINESSID'}], //过滤配置
        formId:4091,//当前页面表单ID
        formData:null,
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
  .bottomFixed{
    position: fixed;
    z-index: 1000;
    left:0px; bottom:0px; width:100%;
    margin: 0 auto;
  }

</style>
