<template>
  <div class="templateHeight">
    <group title="基本信息">
      <hr-text-box :title="dataColumn[0].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[0].columnId]"
               	  :readonly="dataColumn[0].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[0].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(0)" :required="dataColumn[0].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[1].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[1].columnId]"
               	  :readonly="dataColumn[1].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[1].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(1)" :required="dataColumn[1].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[2].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[2].columnId]"
               	  :readonly="dataColumn[2].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[2].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(2)" :required="dataColumn[2].formColumnRequired" ></hr-text-box>
    </group>
    <group title="业务信息">
      <hr-combo-box :title="dataColumn[3].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[3].columnId]"
                    :disabled="dataColumn[3].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[3].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(3)" :required="dataColumn[3].formColumnRequired" :data="dictValues[dataColumn[3].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[4].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[4].columnId]"
                    :disabled="dataColumn[4].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[4].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(4)" :required="dataColumn[4].formColumnRequired" :data="dictValues[dataColumn[4].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-date-time :title="dataColumn[5].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[5].columnId]" :required="dataColumn[5].formColumnRequired"
      			   :format="dataColumn[5].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
      <hr-combo-box :title="dataColumn[6].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[6].columnId]"
                    :disabled="dataColumn[6].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[6].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(6)" :required="dataColumn[6].formColumnRequired" :data="dictValues[dataColumn[6].columnTypeDetail.dictTypeCode]"></hr-combo-box>
    </group>
    <group title="机构信息">
      <hr-combo-box :title="dataColumn[7].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[7].columnId]"
                    :disabled="dataColumn[7].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[7].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(7)" :required="dataColumn[7].formColumnRequired" :data="dictValues[dataColumn[7].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[8].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[8].columnId]"
                    :disabled="dataColumn[8].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[8].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(8)" :required="dataColumn[8].formColumnRequired" :data="dictValues[dataColumn[8].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[9].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[9].columnId]"
                    :disabled="dataColumn[9].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[9].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(9)" :required="dataColumn[9].formColumnRequired" :data="dictValues[dataColumn[9].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[10].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[10].columnId]"
                    :disabled="dataColumn[10].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[10].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(10)" :required="dataColumn[10].formColumnRequired" :data="dictValues[dataColumn[10].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-text-box :title="dataColumn[11].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[11].columnId]"
               	  :readonly="dataColumn[11].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[11].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(11)" :required="dataColumn[11].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[12].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[12].columnId]"
               	  :readonly="dataColumn[12].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[12].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(12)" :required="dataColumn[12].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[13].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[13].columnId]"
               	  :readonly="dataColumn[13].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[13].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(13)" :required="dataColumn[13].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[14].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[14].columnId]"
               	  :readonly="dataColumn[14].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[14].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(14)" :required="dataColumn[14].formColumnRequired" ></hr-text-box>
    </group>
    <group title="部门信息">
      <hr-combo-box :title="dataColumn[15].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[15].columnId]"
                    :disabled="dataColumn[15].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[15].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(15)" :required="dataColumn[15].formColumnRequired" :data="dictValues[dataColumn[15].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[16].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[16].columnId]"
                    :disabled="dataColumn[16].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[16].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(16)" :required="dataColumn[16].formColumnRequired" :data="dictValues[dataColumn[16].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[17].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[17].columnId]"
                    :disabled="dataColumn[17].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[17].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(17)" :required="dataColumn[17].formColumnRequired" :data="dictValues[dataColumn[17].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[18].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[18].columnId]"
                    :disabled="dataColumn[18].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[18].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(18)" :required="dataColumn[18].formColumnRequired" :data="dictValues[dataColumn[18].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-combo-box :title="dataColumn[19].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[19].columnId]"
                    :disabled="dataColumn[19].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[19].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(19)" :required="dataColumn[19].formColumnRequired" :data="dictValues[dataColumn[19].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-text-box :title="dataColumn[20].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[20].columnId]"
               	  :readonly="dataColumn[20].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[20].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(20)" :required="dataColumn[20].formColumnRequired" ></hr-text-box>
    </group>
    <group title="备注信息">
      <hr-text-box :title="dataColumn[21].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[21].columnId]"
               	  :readonly="dataColumn[21].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[21].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(21)" :required="dataColumn[21].formColumnRequired" ></hr-text-box>
      <hr-textarea :title="dataColumn[22].columnName" :placeholder="dataColumn[22].columnTypeDetail.textboxEmptytext" :required="dataColumn[22].formColumnRequired"
                   :readonly="dataColumn[22].formColumnShowType === 'readonly'?true:false"
      			   ></hr-textarea>
    </group>
    <group title="系统信息">
      <hr-combo-box :title="dataColumn[23].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[23].columnId]"
                    :disabled="dataColumn[23].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[23].columnTypeDetail.textboxEmptytext"
                    :is-type="getTextBolxCheck(23)" :required="dataColumn[23].formColumnRequired" :data="dictValues[dataColumn[23].columnTypeDetail.dictTypeCode]"></hr-combo-box>
      <hr-date-time :title="dataColumn[24].columnName"  @onValidChange="onValidChange"  v-model="formData[dataColumn[24].columnId]" :required="dataColumn[24].formColumnRequired"
      			   :format="dataColumn[24].columnTypeDetail.datepickerFormat"
      				></hr-date-time>
    </group>
    <group title="其它">
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
      <hr-text-box :title="dataColumn[29].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[29].columnId]"
               	  :readonly="dataColumn[29].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[29].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(29)" :required="dataColumn[29].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[30].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[30].columnId]"
               	  :readonly="dataColumn[30].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[30].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(30)" :required="dataColumn[30].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[31].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[31].columnId]"
               	  :readonly="dataColumn[31].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[31].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(31)" :required="dataColumn[31].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[32].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[32].columnId]"
               	  :readonly="dataColumn[32].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[32].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(32)" :required="dataColumn[32].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[33].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[33].columnId]"
               	  :readonly="dataColumn[33].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[33].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(33)" :required="dataColumn[33].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[34].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[34].columnId]"
               	  :readonly="dataColumn[34].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[34].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(34)" :required="dataColumn[34].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[35].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[35].columnId]"
               	  :readonly="dataColumn[35].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[35].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(35)" :required="dataColumn[35].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[36].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[36].columnId]"
               	  :readonly="dataColumn[36].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[36].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(36)" :required="dataColumn[36].formColumnRequired" ></hr-text-box>
      <hr-text-box :title="dataColumn[37].columnName" @onValidChange="onValidChange" v-model="formData[dataColumn[37].columnId]"
               	  :readonly="dataColumn[37].formColumnShowType == 'readonly'?true:false" :placeholder="dataColumn[37].columnTypeDetail.textboxEmptytext"
                   :is-type="getTextBolxCheck(37)" :required="dataColumn[37].formColumnRequired" ></hr-text-box>
    </group>
    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>
    <div class="bottomFixed" style="margin-bottom:  50px ;width: 98%">
      <x-button type="primary"   @click.native="submitForm">保存</x-button>
      <x-button type="primary"   @click.native="submitForm">关闭</x-button>
    </div>
  </div>
</template>
<script>
  import { getSessionData } from '@/libs/cookieUtil.js'
  import { setDefaultValue, dateFormat } from '@/libs/formCommon.js'
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
    },
    methods: {
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
      }
    },
    created () {
	      this.$axios.get('/myehr/dict/getDictDatasAll.action?formId=677')
	        .then(function (response) {
	          if (response.data) {
	            var datas = response.data
	            var dictValues = {}//this.dictValues
	            for(var i in datas) {
	              var values = []//对象数组
	              var datas1 = datas[i]//单个字典数据
	              for(var k=0;k<datas1.length;k++){//循环字典项
	                values[k] = {}
	                values[k].name = datas1[k].name
	                values[k].value = datas1[k].code
	              }
	              dictValues[i] = values
	            }
	            this.dictValues = dictValues
	          }
	        }.bind(this))
	        .catch(function (error) {
	          console.log(error)
	        })
      let tempData = {}
      let isInit = this.paramData.isInit
      isInit = true
      if (isInit == true) {
          // 需要初始化数据
        this.$axios.post('/myehr/form/cardformInitData.action',
            {formId: '3886', pkId: '', 'containerParam': {}, 'paramsMap': {}, 'requestParam': {'EMPEMPLOYEE_EMPID': '258'}}
          )
            .then(function (response) {
              if (response.data) {
                if (response.data.rows[0]) {
                  this.formData = response.data.rows[0]
                }
              }
              console.log(response)
            }.bind(this))
            .catch(function (error) {
              console.log(error)
            })
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
      	dictValues:{},
      	formData: null,
      	paramData: this.$route.query, // 页面请求参数
      	defaultDate: 'TODAY',
        dataColumn: [
                      {formGroupId: '2615', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPCODE', columnName: '部门编码', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '2615', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_CNAME', columnName: '部门名称', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '2615', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ENAME', columnName: '部门简称', columnType: '1', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '2616', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPTYPE', columnName: '部门类型', columnType: '2', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|DEPTYPE', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '2616', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPGRADE', columnName: '部门级别', columnType: '2', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|DEPGRADE', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
      				  {formGroupId: '2616', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_VALIDDATE', columnName: '成立日期', columnType: '6', formColumnRequired: 'Y', formColumnShowType: 'show', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: 'currentdate', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '2616', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_MANAGEREGION', columnName: '管辖区域', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|COMPAREA', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPAREA', columnName: '归属部门', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|Belong_plate', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ISALLOW', columnName: '是否海岛津贴', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|att_yes_no', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_HANGLEADER', columnName: '挂片领导', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql12', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ISPROTECT', columnName: '是否保护期', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|att_yes_no', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ISFININSTITU', columnName: '编制人数', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_FININSTITU', columnName: '人行金融机构代码', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_WEBNUM', columnName: '网点号', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3096', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_PROAGENCCODE', columnName: '省联社机构代码', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3097', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPKIND', columnName: '业务条线', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql247', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3097', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPKINDMOJ', columnName: '业务条线总监', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql12', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3097', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPCOST', columnName: '成本中心', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'dict|DEPCOST', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3097', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DIRECTOR', columnName: '部门负责人', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql12', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3097', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_LEADER', columnName: '部门分管领导', columnType: '2', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql12', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '3097', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_LEADERSHIP', columnName: '工号前缀', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '2722', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_XORDER', columnName: '排序', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '2722', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_REMARK', columnName: '备注', columnType: '8', formColumnRequired: 'N', formColumnShowType: 'show', columnTypeDetail: { textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '3086', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_REGBY', columnName: '登记人', columnType: '2', formColumnRequired: '', formColumnShowType: 'readonly', columnTypeDetail: {textboxCheckType: '',dictTypeCode:'sql|sql4', textboxDataFromType: '', textboxDataFromValue: '', textboxEmptytext: ''}},
      				  {formGroupId: '3086', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_REGTIME', columnName: '登记时间', columnType: '6', formColumnRequired: '', formColumnShowType: 'readonly', columnTypeDetail: {datepickerFormat: 'yyyy-MM-dd', textboxDataFromType: 'currentdate', textboxDataFromValue: '', textboxEmptytext: ''}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ID', columnName: '主键', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPID', columnName: '部门ID', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_XTYPE', columnName: '操作类型', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'constant', textboxDataFromValue: '1', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPGROUP1', columnName: '原因', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPGROUP2', columnName: '预留2', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPGROUP3', columnName: '预留3', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPGROUP4', columnName: '预留4', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_DEPGROUP5', columnName: '预留5', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_HRSPECIALIST', columnName: '人事专员', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_VALID', columnName: '生效', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_VALIDBY', columnName: '生效人', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ZUID', columnName: '租户ID', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}},
                      {formGroupId: '', entityId: 'ORG_DEPARTMENT_REG', columnId: 'ORGDEPARTMENTREG_ORGCODE', columnName: '部门码', columnType: '1', formColumnRequired: 'N', formColumnShowType: 'hide', columnTypeDetail: {textboxCheckType: 'null', textboxDataFromType: 'null', textboxDataFromValue: 'null', textboxEmptytext: 'null'}}
        ]
      }
    }
  }
</script>
<style scoped>
</style>
