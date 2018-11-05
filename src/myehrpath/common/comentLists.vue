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
      this.requestParam = {BUSINESSID:this.initParams.businessId};
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
    name: "lc_branchffing",
    methods :{
      onScrollBottom(prows,pager,filterParam,orderByParam){
        //分页回调
        this.loadData(prows,pager,filterParam,orderByParam);
      },
      onRowButtonClick(buttonId,row){
      },
      onRowClick(row){
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
        console.log('_______________________________________________')
        console.log(this.initParams)
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
        this.$axios.get('/myehr/act/task/queryHisUserComment.action?procInsId='+this.initParams.procInsId+'&taskId='+this.initParams.taskId
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
        formId:4089,
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
          {columnId: 'NAME_', columnName: '节点名称'},
          {columnId: 'MESSAGE_', columnName: '审批意见'},
          {columnId: 'ASSIGNEE_NAME', columnName: '审批人'},
          {columnId: 'END_TIME_DATE', columnName: '审批时间'}
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
