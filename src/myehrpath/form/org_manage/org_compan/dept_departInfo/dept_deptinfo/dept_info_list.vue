<template>
  <div>
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:ibuttons="ibuttons" @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"  :filterColumnDatas="filterColumnDatas">
     </list1-component>
  </div>
</template>
<script>
  import List1Component from '@/components/myehr_list1/list1Component.vue'
    export default {
      components: {
        List1Component
      },created() {
        this.loadData(null,null,null,null);
      },
      watch: {
        screenWidth (val) {
          this.screenWidth = val
        },
        rows(){
          this.$nextTick(function(){
            /*现在数据已经渲染完毕*/
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
      mounted : function() {
      },
      name: "testList1Config",
      methods :{
        onScrollBottom(prows,pager,filterParam,orderByParam){
          //分页回调
          this.loadData(prows,pager,filterParam,orderByParam);
        },
        getIbuttons(){
        },
        onRowButtonClick(buttonId,row){
        },
        onRowClick(row){
        },
        onLoadData(){
        		var params = this.$route.query;
        },
      onBlurQuery (value) {
        if (value == null) {
          value = ''
        }
        this.blurQueryValue = value
        var old = this.filterParams
        Object.assign(old,{ORGDEPARTMENT_DEPCODE:value,ORGDEPARTMENT_CNAME:value})
        this.loadData(null, null, old, this.orderByParam)
      },
        loadData(initRows,pager,filterParams,orderByParam){
        if (filterParams == null) {
        filterParams = {}
        }
		   Object.assign(filterParams,{ORGDEPARTMENT_DEPCODE: this.blurQueryValue,ORGDEPARTMENT_CNAME: this.blurQueryValue})
        console.log(filterParams)
        this.filterParams = filterParams
          var offset =0;
          var limit = 10;
          var startFlag =0;
          if(pager != null) {
            startFlag = 1;
            offset = pager.offset;
            limit = pager.limit;
            this.pager = pager;
          }
  		 this.$axios.post('/myehr/form/cardformInitData.action',
    			{"order":"asc","offset":0,"limit":10,"containerParam":{},"paramsMap":{},"requestParam":{USERID: "18971"},"filter":filterParams==null?{}:filterParams,"formId":"685","isView":null,"heightGrade":[]}
  		 )
          .then(function (response) {
            console.log(response)
            if(initRows == null||startFlag == 0) {
              this.rows = response.data.rows;
              this.totalData = response.data.total;
            }else {
              this.rows = initRows.concat(response.data.rows);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    data () {
      return {
        orderByColumn:[],
        filterColumnDatas:[],
        blurQueryValue: null,
        orderByParam: {},
        filterParams: {},
        orderByColumn: [],
		   filterColumnDatas: [],
        screenWidth: document.body.clientWidth,
        standDataColumn: {title: '', imgUrl: null},
        showRowColumn: [
                        {columnId: 'ORGDEPARTMENT_DEPCODE', columnName: '组织编码'},
                        {columnId: 'ORGDEPARTMENT_CNAME', columnName: '组织名称'},
                        {columnId: 'ORGDEPARTMENT_ENAME', columnName: '组织简称'},
                        {columnId: 'ORGDEPARTMENT_DEPTYPE_DICTNAME', columnName: '组织类型'},
                        {columnId: 'ORGDEPARTMENT_DEPGRADE_DICTNAME', columnName: '组织级别'},
                        {columnId: 'ORGDEPARTMENT_DEPAREA_DICTNAME', columnName: '机构区域'},
                        {columnId: 'ORGDEPARTMENT_ISALLOW_DICTNAME', columnName: '是否享受海岛津贴'},
                        {columnId: 'ORGDEPARTMENT_HANGLEADER_DICTNAME', columnName: '挂片领导'},
                        {columnId: 'ORGDEPARTMENT_ISPROTECT_DICTNAME', columnName: '是否保护期'},
                        {columnId: 'ORGDEPARTMENT_DEPKIND_DICTNAME', columnName: '业务条线'},
                        {columnId: 'ORGDEPARTMENT_DEPCOST_DICTNAME', columnName: '成本中心'},
                        {columnId: 'ORGDEPARTMENT_COMPID_DICTNAME', columnName: '所属公司'},
                        {columnId: 'ORGDEPARTMENT_PARENTID_DICTNAME', columnName: '上级组织'},
                        {columnId: 'ORGDEPARTMENT_CREATEDATE_NEWDATE', columnName: '成立日期'},
                        {columnId: 'ORGDEPARTMENT_LEADER_DICTNAME', columnName: '分管领导'},
                        {columnId: 'ORGDEPARTMENT_LEADERSHIP_DICTNAME', columnName: '协管领导'},
                        {columnId: 'ORGDEPARTMENT_XORDER', columnName: '排序'},
                        {columnId: 'ORGDEPARTMENT_REMARK', columnName: '备注'},
                        {columnId: 'ORGDEPARTMENT_UPDATETIME_NEWDATE', columnName: '最近修改日期'},
                        {columnId: 'ORGDEPARTMENT_ISFININSTITU_DICTNAME', columnName: '是否人行金融机构'},
                        {columnId: 'ORGDEPARTMENT_FININSTITU', columnName: '人行金融机构代码'},
                        {columnId: 'ORGDEPARTMENT_WEBNUM', columnName: '网点号'},
                        {columnId: 'ORGDEPARTMENT_PROAGENCCODE', columnName: '省联社机构代码'},
                        {columnId: 'ORGDEPARTMENT_MANAGEREGION_DICTNAME', columnName: '管辖区域'}
                        ],
        pager: {offset: 0, limit: 10},
        ibuttons: [
                    {buttonName: '查看', icon: 'fas fa-edit', buttonId: 5890},
                    {buttonName: '部门说明', icon: 'fas fa-edit', buttonId: 6182},
                    {buttonName: '导出', icon: 'fas fa-edit', buttonId: 6315}
                        ],
        rows: [],
        totalData: -1,
        isHowTopQuery: true
      }
    }
  }
</script>
