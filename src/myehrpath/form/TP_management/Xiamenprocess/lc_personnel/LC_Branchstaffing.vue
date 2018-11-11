<template>
  <div >
    <group title="申请人信息">
      <hr-text-box :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               	  :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></hr-text-box>
      <hr-date-time :title="dataColumn[1].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[1].columnId]" :required="dataColumn[1].formColumnRequired"
      			   :format="dataColumn[1].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
      <hr-text-box :title="dataColumn[2].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[2].columnId]"
               	  :readonly="dataColumn[2].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[2].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(2)" :required="dataColumn[2].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[3].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[3].columnId]"
               	  :readonly="dataColumn[3].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[3].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(3)" :required="dataColumn[3].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[4].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[4].columnId]"
               	  :readonly="dataColumn[4].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[4].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(4)" :required="dataColumn[4].formColumnRequired" ></hr-text-box>
    </group>
    <group title="调配信息">
      <hr-textarea :title="dataColumn[5].columnName" :placeholder="dataColumn[5].columnTypeDetail.textboxEmptytext" :required="dataColumn[5].formColumnRequired"
                   :readonly="dataColumn[5].formColumnShowType === 'readonly'?true:false"
      			   ></hr-textarea>
    </group>
    <group title="审批信息">

    <!--  <hr-text-box :title="dataColumn[10].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[10].columnId]"
               	  :readonly="dataColumn[10].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[10].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(10)" :required="dataColumn[10].formColumnRequired" ></hr-text-box>
-->
      <hr-combo-box :title="dataColumn[10].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[10].columnId]" v-if="dictValues!=null"
                    :readonly="dataColumn[10].formColumnShowType === 'readonly'?true:false" :placeholder="dataColumn[10].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(10)" :required="dataColumn[10].formColumnRequired" v-bind:data="dictValues[dataColumn[10].columnTypeDetail.dictTypeCode]"></hr-combo-box>

      <hr-date-time :title="dataColumn[11].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[11].columnId]" :required="dataColumn[11].formColumnRequired"
      			   :format="dataColumn[11].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
    </group>
    <group title="其它">
      <hr-text-box :title="dataColumn[12].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[12].columnId]"
               	  :readonly="dataColumn[12].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[12].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(12)" :required="dataColumn[12].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[13].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[13].columnId]"
               	  :readonly="dataColumn[13].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[13].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(13)" :required="dataColumn[13].formColumnRequired" ></hr-text-box>
      <hr-combo-box :title="dataColumn[14].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[14].columnId]"
                    :disabled="dataColumn[14].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[14].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(14)" :required="dataColumn[14].formColumnRequired" :data="dictValues[dataColumn[14].columnTypeDetail.dictTypeCode]"></hr-combo-box>
    </group>
    <div class="bottomFixed" style="margin-bottom:  50px ;width: 98% ; text-align: right">
      <x-button mini plain type="primary" @click.native="approveAct('6764')">通过</x-button>
      <x-button mini plain type="warn" @click.native="showPopupPicker = true">驳回</x-button>
      <x-button mini plain  @click.native="saveForm('6914')">暂存</x-button>
    </div>	
    <group>
      <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="backPerson" v-model="value5" @on-change="ggg()"></popup-picker>
    </group>
    <group title="审批意见">
      <hr-textarea :rows="3" :cols="3" :placeholder="请输入" v-model="approveRemark"></hr-textarea>
    </group>	
    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>
  </div>
</template>
<script>
  import { getSessionData } from '@/libs/cookieUtil.js'
  import { setDefaultValue, dateFormat, getInitFilterParam} from '@/libs/formCommon.js'
  import hrCheckList from '@/components/myerh_form/hrCheckList.vue'
  import HrDateTime from '@/components/myerh_form/hrDateTime'
  import HrTextarea from '@/components/myerh_form/hrTextarea.vue'
  import HrFileUpload from '@/components/myerh_form/hrFileUpload.vue'
  import HrTextBox from '@/components/myerh_form/hrTextBox.vue'
  import HrComboBox from '@/components/myerh_form/hrComboBox.vue'
  import PopupPicker from '@/components/popup-picker/index.vue'
  import md5 from '@/tools/md5/index.js'
  import Group from '@/components/group/index.vue'
  import XButton from '@/components/x-button/index.vue'
  import XInput from '@/components/x-input/index.vue'
  export default {
    name: 'testCardForm2',
    components: {
      HrDateTime,
      XInput,
      Group,
      hrCheckList,
      HrTextarea,
      HrFileUpload,
      HrTextBox,
      XButton,
      PopupPicker,
      HrComboBox
    },
    props: {
      value: {},
      compParams: {}
    },
    watch: {
      checkval: function (n, o) {
        console.log(n + '  外面值')
      },
      datevalue (n, o) {
        console.log(n + '  外面值')
      },
      formData (o, n) {
        this.$emit('input', n)
      }
    },
    methods: {
      saveForm (buttonId) {
        console.log(buttonId)
        var signstr = JSON.stringify({'buttonId': buttonId, 'formId': this.mainFormId, 'param': this.formData, 'paramsMap': {}})
        var rule = '"'
        var regS = new RegExp(rule, 'g')
        signstr = signstr.replace(regS, '')
        var rule2 = ':'
        var regS2 = new RegExp(rule2, 'g')
        signstr = signstr.replace(regS2, '=')
        var sign = md5(signstr)
        console.log(signstr)
        console.log(sign)
        this.$axios.post('/myehr/form/saveButtonSave.action?sign=' + sign,
          {'formId': this.mainFormId, 'buttonId': buttonId, 'paramsMap': {}, 'param': this.formData}
        ).then(function (response) {
          if (response.data) {
            console.log(response.data)
          }
        })
          .catch(function (error) {
            alert(error)
          })
      },
      ggg(){
        alert(this.value5)
        console.log(this.value5)
        this.backAct()
      },
      submitAct () { // 提交
        this.saveForm()
      },
      approveAct (buttonId) { // 通过
        // this.saveForm(buttonId)
        // this.$route.query.id
        var actFlowParams = {}
        console.log(buttonId)
        var signstr = JSON.stringify({'buttonId': buttonId, 'formId': this.mainFormId, 'param': this.formData, 'paramsMap': {}})
        var rule = '"'
        var regS = new RegExp(rule, 'g')
        signstr = signstr.replace(regS, '')
        var rule2 = ':'
        var regS2 = new RegExp(rule2, 'g')
        signstr = signstr.replace(regS2, '=')
        var sign = md5(signstr)
        this.$axios.post('/myehr/form/saveButtonSave.action?sign=' + sign,
          {'formId': this.mainFormId, 'buttonId': buttonId, 'paramsMap': {}, 'param': this.formData}
        ).then(function (response) {
          if (response.data[0] === '000000') {
            actFlowParams.taskId = this.$route.query.taskId
            actFlowParams.procInsId = this.$route.query.procInsId
            actFlowParams.buttonType = '通过'
            actFlowParams.approveRemark = this.approveRemark
            actFlowParams.rejectType = ''
            console.log(actFlowParams)
            this.$axios.post('/myehr/act/task/complete.action',
              {'formId': this.mainFormId, 'buttonId': buttonId, 'paramsMap': {}, 'param': this.formData, 'actFlowParams': actFlowParams}
            ).then(function (response) {
              console.log(response.data)
            })
              .catch(function (error) {
                alert(error)
              })
          }
        }.bind(this)).catch(function (error) {
          alert(error)
        })
      },
      backAct () { // 驳回
        var buttonId = this.backButtonId
        var actFlowParams = {}
        var signstr = JSON.stringify({'buttonId': buttonId, 'formId': this.mainFormId, 'param': this.formData, 'paramsMap': {}})
        var rule = '"'
        var regS = new RegExp(rule, 'g')
        signstr = signstr.replace(regS, '')
        var rule2 = ':'
        var regS2 = new RegExp(rule2, 'g')
        signstr = signstr.replace(regS2, '=')
        var sign = md5(signstr)
        console.log(signstr)
        console.log(sign)
        this.$axios.post('/myehr/form/saveButtonSave.action?sign=' + sign,
          {'formId': this.mainFormId, 'buttonId': buttonId, 'paramsMap': {}, 'param': this.formData}
        ).then(function (response) {
          if (response.data[0] === '000000') {
            actFlowParams.taskId = this.$route.query.taskId
            actFlowParams.procInsId = this.$route.query.procInsId
            actFlowParams.buttonType = '驳回'
            actFlowParams.approveRemark = this.approveRemark
            actFlowParams.rejectType = this.value5[0]
            console.log(actFlowParams)
            this.$axios.post('/myehr/act/task/complete.action',
              {'formId': this.mainFormId, 'buttonId': buttonId, 'paramsMap': {}, 'param': this.formData, 'actFlowParams': actFlowParams}
            ).then(function (response) {
              console.log(response.data)
            })
              .catch(function (error) {
                alert(error)
              })
          }
        }.bind(this)).catch(function (error) {
          alert(error)
        })

      },
      getAllDictData() {
        // http://116.62.243.28:9876/myehr/dict/getDictDatasAll.action?formId=677
        this.$axios.post('/myehr/dict/getDictDatasAll.action?formId=' + this.mainFormId)
          .then(function (response) {
            this.dictValues = response.data;

          }.bind(this))
          .catch(function (error) {

          });
      },
      savePropert (buttonId) { // 暂存
        this.saveForm()
      },
      onValidChange: function (value) {
        console.log('验证结果：' + value)
        this.checkValue = value
      },
      initdata: function (columnId) {
        return '初始化函数的值'
      },
      getTextBolxCheck (i) {
        var tempColumn = this.dataColumn[i]
        if (tempColumn.columnTypeDetail.textboxCheckType !== 'fun') {
          return tempColumn.columnTypeDetail.textboxCheckType
        } else {
          return 'checkSelf' + i
        }
      },
      setTextBoxDefaultValue (i) {
        var formThis = this
        setDefaultValue(i, formThis, null)
      },
      loadData () {

        // 需要初始化数据
        var result = getInitFilterParam(this.paramData, this.compParams, this.filterConfig)
        this.$axios.post('/myehr/form/cardformInitData.action',
          {formId: this.mainFormId, pkId: '', 'containerParam': {}, 'paramsMap': {}, 'requestParam': result}
        ).then(function (response) {
          if (response.data) {
            if (response.data.rows[0]) {
              this.formData = response.data.rows[0]
              if (response.data.rows[0]['PERSONNEL_DATE_NEWDATE'] === 'null') {
              	this.formData.PERSONNEL_DATE = '1970-01-01'
              }else {
              	this.formData.PERSONNEL_DATE = response.data.rows[0]['PERSONNEL_DATE_NEWDATE']
              }
              if (response.data.rows[0]['PERSONNEL_DUTYTIME_NEWDATE'] === 'null') {
              	this.formData.PERSONNEL_DUTYTIME = '1970-01-01'
              }else {
              	this.formData.PERSONNEL_DUTYTIME = response.data.rows[0]['PERSONNEL_DUTYTIME_NEWDATE']
              }
            }
          }
          console.log(response)
        }.bind(this))
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created () {
      this.getAllDictData();
      let tempData = {}
      let isInit = this.paramData.isInit
      isInit = true
      if (isInit == true) {
        this.loadData()
      } else {
          // 不需要初始化数据  此时需要取各字段默认值 以下代码需要后台生成  具体各种情况的代码如下
          // 1 如果某个字段初始值时从上一个页面传入参数
        for (var i = 0; i < this.dataColumn.length; i++) {
              // 数据验证
          this.setTextBoxDefaultValue(i)
        }
      }
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
        value5: []
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
