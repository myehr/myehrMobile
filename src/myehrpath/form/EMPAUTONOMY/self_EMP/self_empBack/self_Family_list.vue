<template>
  <div>
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:right_buttons="right_buttons" v-bind:bottom_buttons="bottom_buttons" v-bind:slid_buttons="slid_buttons" @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"  :filterColumnDatas="filterColumnDatas" :winHeight="contentHeight" :formId="formId" >
     </list1-component>
  </div>
</template>
<script>
  import List1Component from '@/components/myehr_list1/list1Component.vue'
  import { setDefaultValue, dateFormat, getInitFilterParam} from '@/libs/formCommon.js'
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
      },
      currentRow: {
        handler (newValue, oldValue) {
          this.$emit('onRowChange', newValue, oldValue)
        },
        	deep: true
      }
    },
    mounted: function () {
    },
    props: {
      value: {},
      compParams: {},
      contentHeight: {}
    },
    name: 'testList1Config',
    methods: {
      onScrollBottom (prows, pager, filterParam, orderByParam) {
          // 分页回调
        this.loadData(prows, pager, filterParam, orderByParam)
      },
      onRowButtonClick (buttonId, row) {
        console.log(buttonId, '点击按钮')
        if (buttonId === 7400) {//新增
          this.togoHander('/myehrpath/form/EMPAUTONOMY/self_EMP/self_empBack/self_Family_edit.vue',null,'新增成员信息')
        }else if (buttonId === 7401) {//修改
          var paramx = {}
          paramx.isInit = 'true'
          this.togoHander('/myehrpath/form/EMPAUTONOMY/self_EMP/self_empBack/self_Family_edit.vue',paramx,'修改成员信息')
        }
      },
      togoHander (e,paramx,title) {
        console.log(e, '访问路径')
        this.gotoMyehrPath(e, paramx, title)
      },
      onRowClick (row) {
      },
      buttonClickCallBack (buttonId, datas, retcode) {
        this.$emit('onButtonClickEnd', this.formId, buttonId, datas, retcode)
      },
      onBlurQuery (value) {
        	if (value == null) {
          	value = ''
        	}
        	this.blurQueryValue = value
        	var old = this.filterParams
        Object.assign(old, {})
        	this.loadData(null, null, old, this.orderByParam)
      },
      loadData (initRows, pager, filterParams, orderByParam) {
        if (filterParams == null) {
        	filterParams = {}
        }
		   Object.assign(filterParams, {})
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
    			{'order': 'asc', 'offset': offset, 'limit': limit, 'containerParam': {}, 'paramsMap': {}, 'requestParam': {USERID: '18971'}, 'filter': filterParams == null ? {} : filterParams, 'formId': this.formId, 'isView': null, 'heightGrade': []}
  		 )
          .then(function (response) {
            console.log(response)
            if (response.data) {
              if (initRows == null || startFlag == 0) {
                this.rows = response.data.rows
                this.totalData = response.data.total
              } else {
                this.rows = initRows.concat(response.data.rows)
              }
              this.$emit('onLoadData', this.formId, this.rows, result, '9999')
            } else {
              this.$emit('onLoadData', this.formId, this.rows, result, '9999')
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    data () {
      return {
        blurQueryValue: null,
        orderByParam: {},
        filterParams: {},
        orderByColumn: [{name: 'EMPBGFAMILY_RELATIONID', type: 'default', lableName: '亲属关系', defaultOrderBy: 'asc', checked: false},
                        {name: 'EMPBGFAMILY_RELATIONID', type: 'list', lableName: '亲属关系', defaultOrderBy: 'asc', checked: false},
                        {name: 'EMPBGFAMILY_REGTIME', type: 'list', lableName: '登记时间', defaultOrderBy: 'asc', checked: false}
        ],
		   filterColumnDatas: [],
        screenWidth: document.body.clientWidth,
        standDataColumn: {title: '', imgUrl: null},
        showRowColumn: [
                        {columnId: 'EMPBGFAMILY_FNAME', columnName: '亲属姓名'},
                        {columnId: 'EMPBGFAMILY_RELATIONID_DICTNAME', columnName: '亲属关系'},
                        {columnId: 'EMPBGFAMILY_GENDER_DICTNAME', columnName: '性别'},
                        {columnId: 'EMPBGFAMILY_BIRTHDAY_NEWDATE', columnName: '出生日期'},
                        {columnId: 'EMPBGFAMILY_WORKUNIT', columnName: '工作单位'},
                        {columnId: 'EMPBGFAMILY_POSITION', columnName: '担任职务'},
                        {columnId: 'EMPBGFAMILY_PHONE', columnName: '电话'},
                        {columnId: 'EMPBGFAMILY_REGTIME_NEWDATE', columnName: '登记时间'}
        ],
        pager: {offset: 0, limit: 10},
        right_buttons: [
        ],
        bottom_buttons: [
                          {buttonName: '增加', icon: 'fas fa-edit', buttonId: 7400},
                          {buttonName: '修改', icon: 'fas fa-edit', buttonId: 7401}
        ],
        slid_buttons: [
        ],
        rows: [],
        totalData: -1,
        formId: 4214,
        isHowTopQuery: true
      }
    }
  }
</script>
