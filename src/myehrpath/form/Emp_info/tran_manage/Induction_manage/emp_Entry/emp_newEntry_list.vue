<template>
  <div>
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:right_buttons="right_buttons" v-bind:bottom_buttons="bottom_buttons" @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"  :filterColumnDatas="filterColumnDatas">
     </list1-component>
  </div>
</template>
<script>
  import List1Component from '@/components/myehr_list1/list1Component.vue'
  export default {
    components: {
      List1Component
    },
    created () {
      this.loadData(null, null, null, null)
    },
    watch: {
      screenWidth (val) {
        this.screenWidth = val
      },
      rows () {
        this.$nextTick(function () {
            /* 现在数据已经渲染完毕 */
          const that = this
          window.onresize = () => {
            return (() => {
              window.screenWidth = document.body.clientWidth
              that.screenWidth = window.screenWidth
            })()
          }
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })
      }
    },
    mounted: function () {
    },
    name: 'testList1Config',
    methods: {
      onScrollBottom (prows, pager, filterParam, orderByParam) {
          // 分页回调
        this.loadData(prows, pager, filterParam, orderByParam)
      },
      getIbuttons () {
      },
      onRowButtonClick (buttonId, row) {
        if(butonId === '121324343') {

        }
      },
      onRowClick (row) {

      },
      onLoadData () {
        		var params = this.$route.query
      },
      onBlurQuery (value) {
        if (value == null) {
          value = ''
        }
        this.blurQueryValue = value
        var old = this.filterParams
        Object.assign(old, {EMPEMPLOYEEREG_EMPCODE: value, EMPEMPLOYEEREG_CNAME: value, EMPEMPLOYEEREG_CERTNO: value})
        this.loadData(null, null, old, this.orderByParam)
      },
      loadData (initRows, pager, filterParams, orderByParam) {
        if (filterParams == null) {
          filterParams = {}
        }
		   Object.assign(filterParams, {EMPEMPLOYEEREG_EMPCODE: this.blurQueryValue, EMPEMPLOYEEREG_CNAME: this.blurQueryValue, EMPEMPLOYEEREG_CERTNO: this.blurQueryValue})
        console.log(filterParams)
        this.filterParams = filterParams
        var offset = 0
        var limit = 10
        var startFlag = 0
        if (pager != null) {
          startFlag = 1
          offset = pager.offset
          limit = pager.limit
          this.pager = pager
        }
  		 this.$axios.post('/myehr/form/cardformInitData.action',
    			{'order': 'asc', 'offset': 0, 'limit': 10, 'containerParam': {}, 'paramsMap': {}, 'requestParam': {USERID: '18971'}, 'filter': filterParams == null ? {} : filterParams, 'formId': '2057', 'isView': null, 'heightGrade': []}
  		 )
          .then(function (response) {
            console.log(response)
            if (initRows == null || startFlag == 0) {
              this.rows = response.data.rows
              this.totalData = response.data.total
            } else {
              this.rows = initRows.concat(response.data.rows)
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    data () {
      return {
        orderByColumn: [],
        filterColumnDatas: [],
        blurQueryValue: null,
        orderByParam: {},
        filterParams: {},
        orderByColumn: [],
		   filterColumnDatas: [{ name: 'EMPEMPLOYEEREG_JOINDATE', lableName: '入职日期', type: 'daterange', format: 'yyyy-MM-dd', defaultValue: '' }, {name: 'EMPEMPLOYEEREG_JOBID', lableName: '岗位', type: 'radio', dictId: 'sql|sql46', defaultValue: '' }],
        screenWidth: document.body.clientWidth,
        standDataColumn: {title: '', imgUrl: null},
        showRowColumn: [
                        {columnId: 'EMPEMPLOYEEREG_EMPCODE', columnName: '工号'},
                        {columnId: 'EMPEMPLOYEEREG_CNAME', columnName: '姓名'},
                        {columnId: 'EMPEMPLOYEEREG_ENAME', columnName: '英文名'},
                        {columnId: 'EMPEMPLOYEEREG_COMPID_DICTNAME', columnName: '公司'},
                        {columnId: 'EMPEMPLOYEEREG_FRISTBANK', columnName: '一级支行'},
                        {columnId: 'EMPEMPLOYEEREG_DEPID_DICTNAME', columnName: '部门'},
                        {columnId: 'EMPEMPLOYEEREG_JOBID_DICTNAME', columnName: '岗位'},
                        {columnId: 'EMPEMPLOYEEREG_COMMGRADE_DICTNAME', columnName: '承诺等级'},
                        {columnId: 'EMPEMPLOYEEREG_COMMSALARY_DICTNAME', columnName: '承诺薪档'},
                        {columnId: 'EMPEMPLOYEEREG_COMMDEPOSIT', columnName: '承诺存款'},
                        {columnId: 'EMPEMPLOYEEREG_COMMPROFIT', columnName: '承诺创利'},
                        {columnId: 'EMPEMPLOYEEREG_JOBSTATUS_DICTNAME', columnName: '在岗状态'},
                        {columnId: 'EMPEMPLOYEEREG_EMPTYPE_DICTNAME', columnName: '员工类型'},
                        {columnId: 'EMPEMPLOYEEREG_EMPSTATUS_DICTNAME', columnName: '员工状态'},
                        {columnId: 'EMPEMPLOYEEREG_EMPGROUP3_DICTNAME', columnName: '星座'},
                        {columnId: 'EMPEMPLOYEEREG_EMPGROUP4', columnName: '微博'},
                        {columnId: 'EMPEMPLOYEEREG_EMPGROUP5', columnName: '邮编'},
                        {columnId: 'EMPEMPLOYEEREG_EMPGRADE_DICTNAME', columnName: '客户经理级别'},
                        {columnId: 'EMPEMPLOYEEREG_EMPLEVEL_DICTNAME', columnName: '柜员级别'},
                        {columnId: 'EMPEMPLOYEEREG_RECTYPE_DICTNAME', columnName: '招聘来源'},
                        {columnId: 'EMPEMPLOYEEREG_WORKCITY_DICTNAME', columnName: '工作城市'},
                        {columnId: 'EMPEMPLOYEEREG_JOINDATE_NEWDATE', columnName: '入职日期'},
                        {columnId: 'EMPEMPLOYEEREG_WORKYEARADJUST', columnName: '行龄调整'},
                        {columnId: 'EMPEMPLOYEEREG_BEGINWORKDATE_NEWDATE', columnName: '参加工作日期'},
                        {columnId: 'EMPEMPLOYEEREG_COMPYEARADJUST', columnName: '工龄调整(年)'},
                        {columnId: 'EMPEMPLOYEEREG_PROBBEGINDATE_NEWDATE', columnName: '试用期开始日期'},
                        {columnId: 'EMPEMPLOYEEREG_PROBTERM', columnName: '试用期（月）'},
                        {columnId: 'EMPEMPLOYEEREG_PROBENDDATE_NEWDATE', columnName: '试用期结束日期'},
                        {columnId: 'EMPEMPLOYEEREG_CONUNIT_DICTNAME', columnName: '合同签约单位'},
                        {columnId: 'EMPEMPLOYEEREG_CONNUMBER', columnName: '合同编号'},
                        {columnId: 'EMPEMPLOYEEREG_CONTYPE_DICTNAME', columnName: '合同类型'},
                        {columnId: 'EMPEMPLOYEEREG_CONKIND_DICTNAME', columnName: '合同属性'},
                        {columnId: 'EMPEMPLOYEEREG_CONBEGINDATE_NEWDATE', columnName: '合同开始日期'},
                        {columnId: 'EMPEMPLOYEEREG_CONMONTHS', columnName: '合同期（年）'},
                        {columnId: 'EMPEMPLOYEEREG_CONENDDATE_NEWDATE', columnName: '合同结束日期'},
                        {columnId: 'EMPEMPLOYEEREG_COUNTRY_DICTNAME', columnName: '国籍'},
                        {columnId: 'EMPEMPLOYEEREG_NATION_DICTNAME', columnName: '民族'},
                        {columnId: 'EMPEMPLOYEEREG_ORIGIN_DICTNAME', columnName: '籍贯'},
                        {columnId: 'EMPEMPLOYEEREG_CERTTYPE_DICTNAME', columnName: '证件类型'},
                        {columnId: 'EMPEMPLOYEEREG_CERTNO', columnName: '证件编码'},
                        {columnId: 'EMPEMPLOYEEREG_GENDER_DICTNAME', columnName: '性别'},
                        {columnId: 'EMPEMPLOYEEREG_BIRTHDAY_NEWDATE', columnName: '出生日期'},
                        {columnId: 'EMPEMPLOYEEREG_BIRTHDAYPLACE', columnName: '出生地'},
                        {columnId: 'EMPEMPLOYEEREG_HOMEADDRESS', columnName: '家庭住址'},
                        {columnId: 'EMPEMPLOYEEREG_RESIDENTTYPE_DICTNAME', columnName: '户口性质'},
                        {columnId: 'EMPEMPLOYEEREG_RESIDENTADDRESS', columnName: '户口所在地'},
                        {columnId: 'EMPEMPLOYEEREG_WORKEMAIL', columnName: '机构邮箱'},
                        {columnId: 'EMPEMPLOYEEREG_WORKPHONE', columnName: '办公电话'},
                        {columnId: 'EMPEMPLOYEEREG_PESEMAIL', columnName: '私人邮箱'},
                        {columnId: 'EMPEMPLOYEEREG_PESPHONE', columnName: '联系电话'},
                        {columnId: 'EMPEMPLOYEEREG_MOBILE', columnName: '手机号码'},
                        {columnId: 'EMPEMPLOYEEREG_MARRIAGESTATUS_DICTNAME', columnName: '婚姻状况'},
                        {columnId: 'EMPEMPLOYEEREG_HEALTHSTATUS_DICTNAME', columnName: '健康状况'},
                        {columnId: 'EMPEMPLOYEEREG_BLOODTYPE_DICTNAME', columnName: '血型'},
                        {columnId: 'EMPEMPLOYEEREG_CHILDSTATUS_DICTNAME', columnName: '生育状况'},
                        {columnId: 'EMPEMPLOYEEREG_CHILDS', columnName: '子女情况(个数)'},
                        {columnId: 'EMPEMPLOYEEREG_QQ', columnName: 'qq号码'},
                        {columnId: 'EMPEMPLOYEEREG_WECHART', columnName: '微信'},
                        {columnId: 'EMPEMPLOYEEREG_LOCATION', columnName: '现居住地址'},
                        {columnId: 'EMPEMPLOYEEREG_REMARK', columnName: '备注'},
                        {columnId: 'EMPEMPLOYEEREG_REGBY_DICTNAME', columnName: '登记人'},
                        {columnId: 'EMPEMPLOYEEREG_REGTIME_NEWDATE', columnName: '登记时间'},
                        {columnId: 'EMPEMPLOYEEREG_TELLERGRADE_DICTNAME', columnName: '柜员级别'},
                        {columnId: 'EMPEMPLOYEEREG_MANAGERGRADE_DICTNAME', columnName: '客户经理级别'},
                        {columnId: 'EMPEMPLOYEEREG_CONSTELLATION_DICTNAME', columnName: '星座'}
        ],
        pager: {offset: 0, limit: 10},
        ibuttons: [
                    {buttonName: '入职登记', icon: 'fas fa-edit', buttonId: 2306},
                    {buttonName: '入职背景', icon: 'fas fa-edit', buttonId: 2307},
                    {buttonName: '编辑', icon: 'fas fa-edit', buttonId: 2321},
                    {buttonName: '删除', icon: 'fas fa-edit', buttonId: 2319},
                    {buttonName: '工号分配', icon: 'fas fa-edit', buttonId: 2322},
                    {buttonName: '生效', icon: 'fas fa-edit', buttonId: 2308},
                    {buttonName: '导入', icon: 'fas fa-edit', buttonId: 2954},
                    {buttonName: '导出', icon: 'fas fa-edit', buttonId: 6805},
                    {buttonName: '背调查询', icon: 'fas fa-edit', buttonId: 7193}
        ],
        right_buttons:[
                      {buttonName: '入职登记', icon: 'fas fa-edit', buttonId: 2306},
                      {buttonName: '入职背景', icon: 'fas fa-edit', buttonId: 2307}
                    ],
        bottom_buttons:[
                      {buttonName: '编辑', icon: 'fas fa-edit', buttonId: 2321},
                      {buttonName: '删除', icon: 'fas fa-edit', buttonId: 2319}
                    ],
        rows: [],
        totalData: -1,
        isHowTopQuery: true
      }
    }
  }
</script>
