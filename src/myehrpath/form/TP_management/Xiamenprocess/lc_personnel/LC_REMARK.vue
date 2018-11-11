<template>
  <div >
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:right_buttons="right_buttons"
                      @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery"
                      :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"  :filterColumnDatas="filterColumnDatas"
                      :winHeight="contentHeight">
     </list1-component>
  </div>
</template>
<script>
	 import List1Component from '@/components/myehr_list1/list1Component.vue'
    export default {
      components: {
        List1Component
      },created() {
        this.requestParam = {};
        this.loadData(null,null,null,null);
      },props:{
        initParams:{}
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
            console.log(window.onresize())
          })
        }
      },
      mounted : function() {
        console.log('111111111111111111')
      },props:{
        contentHeight:{},
        initParams:{}
      },
      name: "lc_remark",
      methods :{
        onScrollBottom(prows,pager,filterParam,orderByParam){
          //分页回调
          this.loadData(prows,pager,filterParam,orderByParam);
        },
        onRowButtonClick(buttonId,row){
          //点击每个按钮具体实现转交上层组件实现
          if(buttonId === 1) { //编辑按钮，默认跳转
            this.gotoMyehrPath('/myehrpath/testList1Config2Edit',{isInit:true,row:row},'编辑');
          }
        //  this.onRowClick(row);
        },
        onRowClick(row){
          console.log("打开审批")
          var url = "/myehr/form/toForm.action?formId="+row.formId+"&key="+row.procDefKey+"&isInit=true&taskId="+row.taskId+"&procInsId="+row.procInsId+"&businessId="+row.businessId+'&formType=APP';
          console.log(url);
          //var url =  "";
          let pageTitle = row.title;
          var query = {pageTitle:pageTitle,title:this.title,url:url};
          this.$router.push({path:'/myehrpath/iframe',query:query})
        },
        onLoadData(){
          //重新加载数据 带入条件 排序字段
        },
        onBlurQuery(value){
          var old = this.filterParams ;
          old[rtyuiop] = value;
        Object.assign(old,{})
          loadData(null,null,old,this.orderByParam);
        },
        loadData(initRows,pager,filterParams,orderByParam){
        if (filterParams == null) {
        	filterParams = {}
        }
		   Object.assign(filterParams,{})
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
          if(this.totalData != -1 && this.rows.length >= this.totalData) {
            return ;
          }
          this.$axios.post('/myehr/form/cardformInitData.action',
            {"order":"asc","offset":0,"limit":10,"containerParam":{},"paramsMap":{},"requestParam":this.requestParam,"filter":{"EMPVEMPLOYEE_EMPSTATUS":"","EMPVEMPLOYEE_EMPCODE":"","EMPVEMPLOYEE_CNAME":""},"userIds":null,"formId":this.formId,"isView":null,"heightGrade":[]}
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
          formId:4373,
          requestParam:{},
        orderByColumn:[],
        filterColumnDatas:[],
        blurQueryValue: null,
        orderByParam: {},
        filterParams: {},
		   filterColumnDatas: [],
        screenWidth: document.body.clientWidth,
        standDataColumn: {title: '', imgUrl: null},
        showRowColumn: [
                        {columnId: 'LCREMARK_REMARK', columnName: '备注'}
                        ],
        pager: {offset: 0, limit: 10},
        rows: [],
        totalData: -1,
        isHowTopQuery: true
          }
        }
    }
</script>
<style scoped>
  .container {
   /* margin-bottom: 0px;
    width: 100%;
    overflow: scroll;*/
    -webkit-overflow-scrolling: touch;
  }
</style>
