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
        Object.assign(old,{ORGCOMPANY_cname:value,ORGCOMPANY_compcode:value})
        this.loadData(null, null, old, this.orderByParam)
      },
        loadData(initRows,pager,filterParams,orderByParam){
        if (filterParams == null) {
        filterParams = {}
        }
		   Object.assign(filterParams,{ORGCOMPANY_cname: this.blurQueryValue,ORGCOMPANY_compcode: this.blurQueryValue})
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
    			{"order":"asc","offset":0,"limit":10,"containerParam":{},"paramsMap":{},"requestParam":{USERID: "18971"},"filter":filterParams==null?{}:filterParams,"formId":"4188","isView":null,"heightGrade":[]}
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
		   filterColumnDatas: [{name: 'ORGCOMPANY_comptype', lableName: '公司类型', type: 'radio', dictId: 'dict|COMPTYPE', defaultValue: '' }],
        screenWidth: document.body.clientWidth,
        standDataColumn: {title: '', imgUrl: null},
        showRowColumn: [
                        {columnId: 'ORGCOMPANY_compcode', columnName: '公司编码'},
                        {columnId: 'ORGCOMPANY_cname', columnName: '公司名称'},
                        {columnId: 'ORGCOMPANY_ename', columnName: '公司简称'},
                        {columnId: 'ORGCOMPANY_comparea_DICTNAME', columnName: '公司区域'},
                        {columnId: 'ORGCOMPANY_createdate_NEWDATE', columnName: '生效日期'},
                        {columnId: 'ORGCOMPANY_org_isfinInstitu_DICTNAME', columnName: '是否人行金融机构'},
                        {columnId: 'ORGCOMPANY_org_finInstitu', columnName: '人行金融机构代码'},
                        {columnId: 'ORGCOMPANY_legalperson', columnName: '法人代表'},
                        {columnId: 'ORGCOMPANY_orgaddress', columnName: '公司地址'},
                        {columnId: 'ORGCOMPANY_regaddress', columnName: '注册地址'},
                        {columnId: 'ORGCOMPANY_telphone', columnName: '联系电话'},
                        {columnId: 'ORGCOMPANY_fax', columnName: '传真号码'},
                        {columnId: 'ORGCOMPANY_postcode', columnName: '邮政编码'},
                        {columnId: 'ORGCOMPANY_website', columnName: '公司网站'},
                        {columnId: 'ORGCOMPANY_xorder', columnName: '排序'},
                        {columnId: 'ORGCOMPANY_remark', columnName: '备注'}
                        ],
        pager: {offset: 0, limit: 10},
        ibuttons: [
                    {buttonName: '查看', icon: 'fas fa-edit', buttonId: 1711},
                    {buttonName: '公司证件', icon: 'fas fa-edit', buttonId: 1712},
                    {buttonName: '导出', icon: 'fas fa-edit', buttonId: 5552}
                        ],
        rows: [],
        totalData: -1,
        isHowTopQuery: true
      }
    }
  }
</script>
