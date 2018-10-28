<template>
  <div>
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:right_buttons="right_buttons" v-bind:bottom_buttons="bottom_buttons" v-bind:slid_buttons="slid_buttons" @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"  :filterColumnDatas="filterColumnDatas">
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
      onRowButtonClick (buttonId, row) {

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
        Object.assign(old, {EMPVEMPLOYEE_EMPCODE: value, EMPVEMPLOYEE_CNAME: value})
        this.loadData(null, null, old, this.orderByParam)
      },
      loadData (initRows, pager, filterParams, orderByParam) {
        if (filterParams == null) {
          filterParams = {}
        }
		   Object.assign(filterParams, {EMPVEMPLOYEE_EMPCODE: this.blurQueryValue, EMPVEMPLOYEE_CNAME: this.blurQueryValue})
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
    			{'order': 'asc', 'offset': 0, 'limit': 10, 'containerParam': {}, 'paramsMap': {}, 'requestParam': {USERID: '18971'}, 'filter': filterParams == null ? {} : filterParams, 'formId': '2131', 'isView': null, 'heightGrade': []}
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
        orderByColumn: [{name: 'EMPVEMPLOYEE_JOBBEGINDATE', type: 'default', lableName: '从岗日期', defaultOrderBy: 'asc', checked: false},
                        {name: 'EMPVEMPLOYEE_JOBAGE', type: 'list', lableName: '岗龄', defaultOrderBy: 'asc', checked: false},
                        {name: 'EMPVEMPLOYEE_EMPCODE', type: 'list', lableName: '工号', defaultOrderBy: 'asc', checked: false}
        ],
		   filterColumnDatas: [{name: 'EMPVEMPLOYEE_JOBSTATUS', lableName: '在岗状态', type: 'radio', dictId: 'dict|Onduty', defaultValue: '' }],
        screenWidth: document.body.clientWidth,
        standDataColumn: {title: '', imgUrl: null},
        showRowColumn: [
                        {columnId: 'EMPVEMPLOYEE_EMPCODE', columnName: '工号'},
                        {columnId: 'EMPVEMPLOYEE_CNAME', columnName: '姓名'},
                        {columnId: 'EMPVEMPLOYEE_DEPID_DICTNAME', columnName: '部门'},
                        {columnId: 'EMPVEMPLOYEE_JOBID_DICTNAME', columnName: '职位'},
                        {columnId: 'EMPVEMPLOYEE_EMPSTATUS_DICTNAME', columnName: '员工状态'}
        ],
        pager: {offset: 0, limit: 10},
        right_buttons: [
                    {buttonName: '在职背景', icon: 'fas fa-edit', buttonId: 2414}
        ],
          bottom_buttons: [
                    {buttonName: '预览', icon: 'fas fa-edit', buttonId: 3032}
        ],
        slid_buttons: [
        ],
        rows: [],
        totalData: -1,
        isHowTopQuery: true
      }
    }
  }
</script>
