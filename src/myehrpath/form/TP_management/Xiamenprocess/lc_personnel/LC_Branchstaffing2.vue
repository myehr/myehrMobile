<template>
  <div  >
        <hr-combo-box :title="dataColumn[14].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[14].columnId]"
                      :disabled="dataColumn[14].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[14].columnTypeDetail.textboxEmptytext"
                      :required="dataColumn[14].formColumnRequired" :data="dictValues[dataColumn[14].columnTypeDetail.dictTypeCode]"></hr-combo-box>
  </div>
</template>
<script>

  import HrComboBox from '@/components/myerh_form/hrComboBox.vue'

  export default {
    name: 'testCardForm2',
    components: {
      HrComboBox
    },
    props: {
      value: {},
      compParams: {}
    },
    watch: {
      formData (o, n) {
        this.$emit('input', n)
      }
    },
    methods: {
      getAllDictData() {
        // http://116.62.243.28:9876/myehr/dict/getDictDatasAll.action?formId=677
        this.$axios.post('/myehr/dict/getDictDatasAll.action?formId=' + this.mainFormId)
          .then(function (response) {
            this.dictValues = response.data;

          }.bind(this))
          .catch(function (error) {

          });
      }
    },
    created () {
      this.getAllDictData();
      var result = {BUSINESSID: "234"}
      //需要初始化数据
      this.$axios.post('/myehr/form/cardformInitData.action',
        {formId:this.mainFormId,pkId:'',"containerParam":{},"paramsMap":{},"requestParam":result}
      ) .then(function (response) {
          if(response.data) {
            if(response.data.rows[0]) {
              this.formData = response.data.rows[0];
            }
          }

        }.bind(this))
        .catch(function (error) {

        });
    },
    data () {
      return {
        dataColumn: [
                      {formGroupId: '4314', entityId: 'PERSONNEL', columnId: 'PERSONNEL_TITLE', columnName: '标题', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'initFun', textboxDataFromValue: '', textboxEmptytext: ''}},
      				  {formGroupId: '4314', entityId: 'PERSONNEL', columnId: 'PERSONNEL_DATE', columnName: '申请日期', columnType: '6', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: 'currentdate', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4314', entityId: 'PERSONNEL', columnId: 'PERSONNEL_JOBIDNAME', columnName: '申请人职位', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'session', textboxDataFromValue: 'JOB_NAME', textboxEmptytext: ''}},
                      {formGroupId: '4314', entityId: 'PERSONNEL', columnId: 'PERSONNEL_DEPIDNAME', columnName: '申请部门', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'session', textboxDataFromValue: 'A_NAME', textboxEmptytext: ''}},
                      {formGroupId: '4314', entityId: 'PERSONNEL', columnId: 'PERSONNEL_EMPDINAME', columnName: '申请人', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'session', textboxDataFromValue: 'EMP_NAME', textboxEmptytext: ''}},
                      {formGroupId: '4323', entityId: 'PERSONNEL', columnId: 'PERSONNEL_RENSON', columnName: '原因', columnType: '8', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: { textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '4315', entityId: 'PERSONNEL', columnId: 'PERSONNEL_COMPID', columnName: '公司', columnType: '2', formColumnRequired: 'Y', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|comPid', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4315', entityId: 'PERSONNEL', columnId: 'PERSONNEL_DEPARTMENT', columnName: '是否行长审批', columnType: '2', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|ISBLACKLIST', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4315', entityId: 'PERSONNEL', columnId: 'PERSONNEL_TRANSFER', columnName: '调入支行综合经理', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql12', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4315', entityId: 'PERSONNEL', columnId: 'PERSONNEL_DEPARTMENTCONFIRMS', columnName: '调入部室负责人确认人员到位', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|Departmentcharge', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4315', entityId: 'PERSONNEL', columnId: 'PERSONNEL_OTHERSINGLE', columnName: '其他-文本', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
      				  {formGroupId: '4315', entityId: 'PERSONNEL', columnId: 'PERSONNEL_DUTYTIME', columnName: '到岗日期', columnType: '6', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: 'choose', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '', entityId: 'PERSONNEL', columnId: 'PERSONNEL_ID', columnName: '主键', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'parameter', textboxDataFromValue: 'businessId', textboxEmptytext: ''}},
                      {formGroupId: '', entityId: 'PERSONNEL', columnId: 'PERSONNEL_BUSINESSID_IS', columnName: '流程单据号', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'PERSONNEL', columnId: 'PERSONNEL_FLAG', columnName: '审批状态', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|flag', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}}
        ]
        ,be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        },
        filterConfig: [{paramType: 'parameter', paramValue: 'businessId', paramName: 'BUSINESSID'}], // 过滤配置
        formId: 4090, // 当前页面表单ID
        mainFormId: 4091,
        formData: null,
        checkValue: true,
        approveRemark: '',
        defaultCheckValue: true,
        paramData: this.$route.query, // 页面请求参数
        defaultDate: 'TODAY',
        checkListDatas: [],
        radioValue: '中国',
        dictValues: null,
        checkval: '',
        datevalue: '',
        showPopupPicker: false,
        backButtonId:6765,
        backPerson:[[{value:'00001',name:'赵一'}, {value:'00002',name:'钱二'}, {value:'00003',name:'孙三'}, {value:'00004',name:'李四'}, {value:'00005',name:'王五'}]],
        value5: [],
        dictflags:[{code: "0", name: "未审批"}, {code: "1", name: "审批中"}, {code: "2", name: "已审批"}]
      }
    }
  }
</script>
<style scoped>
  .bottomFixed{
    position: relative;
    left:0px; bottom:0px; width:100%;
    margin: 0 auto;
  }
</style>
