<template>
  <div class="templateHeight" v-if="formData">
    <group title="基本信息">
      <hr-text-box :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               	  :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[1].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[1].columnId]"
               	  :readonly="dataColumn[1].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[1].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(1)" :required="dataColumn[1].formColumnRequired" ></hr-text-box>
      <hr-combo-box :title="dataColumn[2].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[2].columnId]"
                    :disabled="dataColumn[2].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[2].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(2)" :required="dataColumn[2].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[2].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box  :title="dataColumn[3].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[3].columnId]"
                    :disabled="dataColumn[3].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[3].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(3)" :required="dataColumn[3].formColumnRequired" v-if="dictValues" :data="dictValues[dataColumn[3].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[4].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[4].columnId]"
                    :disabled="dataColumn[4].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[4].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(4)" :required="dataColumn[4].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[4].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[5].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[5].columnId]"
                    :disabled="dataColumn[5].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[5].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(5)" :required="dataColumn[5].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[5].columnTypeDetail.dictTypeCode]"></hr-combo-box>
    </group>
    <group title="更改前家庭信息">
      <hr-text-box :title="dataColumn[6].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[6].columnId]"
               	  :readonly="dataColumn[6].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[6].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(6)" :required="dataColumn[6].formColumnRequired" ></hr-text-box>
      <hr-combo-box :title="dataColumn[7].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[7].columnId]"
                    :disabled="dataColumn[7].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[7].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(7)" :required="dataColumn[7].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[7].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-text-box :title="dataColumn[8].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[8].columnId]"
               	  :readonly="dataColumn[8].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[8].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(8)" :required="dataColumn[8].formColumnRequired" ></hr-text-box>
      <hr-combo-box :title="dataColumn[9].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[9].columnId]"
                    :disabled="dataColumn[9].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[9].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(9)" :required="dataColumn[9].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[9].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-date-time :title="dataColumn[10].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[10].columnId]" :required="dataColumn[10].formColumnRequired"
      			   :format="dataColumn[10].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
      <hr-text-box :title="dataColumn[11].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[11].columnId]"
               	  :readonly="dataColumn[11].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[11].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(11)" :required="dataColumn[11].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[12].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[12].columnId]"
               	  :readonly="dataColumn[12].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[12].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(12)" :required="dataColumn[12].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[13].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[13].columnId]"
               	  :readonly="dataColumn[13].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[13].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(13)" :required="dataColumn[13].formColumnRequired" ></hr-text-box>
    </group>
    <group title="系统信息">
      <hr-combo-box :title="dataColumn[14].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[14].columnId]"
                    :disabled="dataColumn[14].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[14].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(14)" :required="dataColumn[14].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[14].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-date-time :title="dataColumn[15].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[15].columnId]" :required="dataColumn[15].formColumnRequired"
      			   :format="dataColumn[15].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
      <hr-textarea :title="dataColumn[16].columnName" :placeholder="dataColumn[16].columnTypeDetail.textboxEmptytext" :required="dataColumn[16].formColumnRequired"
                   :readonly="dataColumn[16].formColumnShowType === 'readonly'?true:false"
      			   ></hr-textarea>
    </group>
    <group title="更改后家庭信息">
      <hr-text-box :title="dataColumn[17].columnName" @onValidChange="onValidChange" v-model="formData.EMPBGFAMILY_ESSFNAME"
               	  :readonly="dataColumn[17].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[17].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(17)" :required="dataColumn[17].formColumnRequired" ></hr-text-box>
      <hr-combo-box :title="dataColumn[18].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[18].columnId]"
                    :disabled="dataColumn[18].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[18].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(18)" :required="dataColumn[18].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[18].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[19].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[19].columnId]"
                    :disabled="dataColumn[19].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[19].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(19)" :required="dataColumn[19].formColumnRequired" v-if="dictValues!=null" :data="dictValues[dataColumn[19].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-date-time :title="dataColumn[20].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[20].columnId]" :required="dataColumn[20].formColumnRequired"
      			   :format="dataColumn[20].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
      <hr-text-box :title="dataColumn[21].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[21].columnId]"
               	  :readonly="dataColumn[21].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[21].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(21)" :required="dataColumn[21].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[22].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[22].columnId]"
               	  :readonly="dataColumn[22].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[22].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(22)" :required="dataColumn[22].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[23].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[23].columnId]"
               	  :readonly="dataColumn[23].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[23].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(23)" :required="dataColumn[23].formColumnRequired" ></hr-text-box>
    </group>
    <group title="其它">
      <hr-text-box :title="dataColumn[24].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[24].columnId]"
               	  :readonly="dataColumn[24].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[24].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(24)" :required="dataColumn[24].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[25].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[25].columnId]"
               	  :readonly="dataColumn[25].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[25].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(25)" :required="dataColumn[25].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[26].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[26].columnId]"
               	  :readonly="dataColumn[26].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[26].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(26)" :required="dataColumn[26].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[27].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[27].columnId]"
               	  :readonly="dataColumn[27].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[27].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(27)" :required="dataColumn[27].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[28].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[28].columnId]"
               	  :readonly="dataColumn[28].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[28].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(28)" :required="dataColumn[28].formColumnRequired" ></hr-text-box>
      <hr-date-time :title="dataColumn[29].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[29].columnId]" :required="dataColumn[29].formColumnRequired"
      			   :format="dataColumn[29].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
    </group>
    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>
    <div class="bottomFixed" style="margin-bottom:  50px ;width: 98%">
      <x-button type="primary"   @click.native="submitForm">提交</x-button>
      <x-button type="primary"   @click.native="submitForm">关闭</x-button>
    </div>
  </div>
</template>
<script>
  import { getSessionData } from '@/libs/cookieUtil.js'
  import  { setDefaultValue,dateFormat,getInitFilterParam,refreshDictCache } from '@/libs/formCommon.js'
  import hrCheckList from '@/components/myerh_form/hrCheckList.vue'
  import HrDateTime from '@/components/myerh_form/hrDateTime'
  import HrTextarea from '@/components/myerh_form/hrTextarea.vue'
  import HrFileUpload from '@/components/myerh_form/hrFileUpload.vue'
  import HrTextBox from '@/components/myerh_form/hrTextBox.vue'
  import HrComboBox from '@/components/myerh_form/hrComboBox.vue'
  import Group from '@/components/group/index.vue'
  import XButton from '@/components/x-button/index.vue'
  import XInput from '@/components/x-input/index.vue'
  export default {
    name: 'testCardForm',
    components: {
      HrDateTime,
      XInput,
      Group,
      hrCheckList,
      HrTextarea,
      HrFileUpload,
      HrTextBox,
      XButton,
      HrComboBox
    },
    watch: {
      checkval: function (n, o) {
        console.log(n + '  外面值')
      },
      datevalue (n, o) {
        console.log(n + '  外面值')
      },
      formData (o, n) {
        console.log(o)
      }
    },props: {
      value: {},
      compParams: {}
    },
    methods: {
      getAllDictData(){
        // http://116.62.243.28:9876/myehr/dict/getDictDatasAll.action?formId=677
        this.$axios.post('/myehr/dict/getDictDatasAll.action?formId='+this.formId)
          .then(function (response) {
            this.dictValues = response.data;

          }.bind(this))
          .catch(function (error) {

          });
      },
      submitForm () {
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
      },loadData(result){
        this.$axios.post('/myehr/form/cardformInitData.action',
          {formId:this.formId,pkId:'',"containerParam":{},"paramsMap":{},"requestParam":result}
        )
          .then(function (response) {
            if(response.data) {
              if(response.data.rows[0]) {
                this.formData = response.data.rows[0];
                this.$emit('onLoadData', this.formId,this.formData,result,'0000')
              }else {
                this.$emit('onLoadData',this.formId,this.formData,result,'9999');
              }
            }else {
              this.$emit('onLoadData',this.formId,this.formData,result,'9999');
            }
          }.bind(this))
          .catch(function (error) {

          });
      }
    },
    created () {

      this.formData = this.value;
      this.getAllDictData();
      // 需要初始化数据
      var result = getInitFilterParam(this.queryParam, this.compParams, this.filterConfig)
      let isInit = result.isInit;
      isInit = true;
      if(isInit == true) {
        //需要初始化数据
        this.loadData(result);
      }else {
        //不需要初始化数据  此时需要取各字段默认值 以下代码需要后台生成  具体各种情况的代码如下
        //1 如果某个字段初始值时从上一个页面传入参数
        for(var i=0; i<this.dataColumn.length; i++){
          //数据验证
          this.setTextBoxDefaultValue(i);

        }
      }
    },
    data () {
      return {
        formId:4214,
      	dictValues: [],
      	formData: [],
      	paramData: this.$route.query, // 页面请求参数
      	defaultDate: 'TODAY',
        dataColumn: [
                      {formGroupId: '3988', entityId: 'EMP_V_EMPLOYEE', columnId: 'EMPVEMPLOYEE_EMPCODE', columnName: '工号', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3988', entityId: 'EMP_V_EMPLOYEE', columnId: 'EMPVEMPLOYEE_CNAME', columnName: '姓名', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3988', entityId: 'EMP_V_EMPLOYEE', columnId: 'EMPVEMPLOYEE_COMPID', columnName: '公司', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'sql|comPid', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3988', entityId: 'EMP_V_EMPLOYEE', columnId: 'EMPVEMPLOYEE_DEPID', columnName: '部门', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'sql|sql9', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3988', entityId: 'EMP_V_EMPLOYEE', columnId: 'EMPVEMPLOYEE_JOBID', columnName: '职位', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'sql|sql46', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3988', entityId: 'EMP_V_EMPLOYEE', columnId: 'EMPVEMPLOYEE_EMPSTATUS', columnName: '员工状态', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'dict|EMP_EMPSTATUS', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_FNAME', columnName: '亲属姓名', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_RELATIONID', columnName: '亲属关系', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'dict|emp_appellation', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_IDCARD', columnName: '身份证号码', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_GENDER', columnName: '性别', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'dict|emp_SEX', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
      				        {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_BIRTHDAY', columnName: '出生日期', columnType: '6', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_WORKUNIT', columnName: '工作单位', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_POSITION', columnName: '担任职务', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3989', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_PHONE', columnName: '电话', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3990', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_REGBY', columnName: '登记人', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'sql|sql4', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
      				        {formGroupId: '3990', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_REGTIME', columnName: '登记时间', columnType: '6', formColumnRequired: 'N', formColumnShowType: 'readonly', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3990', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_REMARK', columnName: '备注', columnType: '8', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: { textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSFNAME', columnName: '新亲属姓名', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSRELATIONID', columnName: '新亲属关系', columnType: '2', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'dict|emp_appellation', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSGENDER', columnName: '新性别', columnType: '2', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '', dictTypeCode: 'dict|emp_SEX', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
      				        {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSBIRTHDAY', columnName: '新出生日期', columnType: '6', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSWORKUNIT', columnName: '新工作单位', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSPOSITION', columnName: '新担任职务', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '4770', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSPHONE', columnName: '新电话', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_EMPID', columnName: '员工ID', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_SEQID', columnName: '关联ID', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ID', columnName: '主键', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_PARTY', columnName: '政治面貌', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSREGBY', columnName: '员工本人', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
      				        {formGroupId: '', entityId: 'EMP_BG_FAMILY', columnId: 'EMPBGFAMILY_ESSREGTIME', columnName: '编辑时间', columnType: '6', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}}
        ],
        filterConfig: [], // 过滤配置
        queryParam:this.$route.query
      }
    }
  }
</script>
<style scoped>
</style>
