<template>
  <div >
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:right_buttons="right_buttons"
                      @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery"
                      :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"  :filterColumnDatas="filterColumnDatas"
                      :winHeight="contentHeight"
     >

     </list1-component>


  </div>
</template>

<script>
  import  {List1Component} from 'vux'
    export default {
      components: {
        List1Component
      },created() {
        this.requestParam = {BUSINESSID:282};
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
        contentHeight:{}
      },
      name: "testList1Config2",
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
          loadData(null,null,old,this.orderByParam);
        },
        loadData(initRows,pager,filterParams,orderByParam){
          this.filterParams = filterParams;
          console.log('排序数据')
          console.log(orderByParam)
          filterParams= { //查询条件实例
            id:1,
            name:'张三',
            startDate:'2018-01-21|2018-09-09'
          };
          orderByParam = [ //排序字段
            {columnName:'age',sortType:'desc'}
          ]
          console.log(pager)
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
          formId:4089,
          orderByParam:{},
          filterParams:{},
          orderByColumn:[  ],
          filterColumnDatas:[ ],
          screenWidth: document.body.clientWidth,
          standDataColumn:{title:'PERSONNELASSIGNMENT_EMPID_DICTNAME',imgUrl:null},
          showRowColumn:[{columnId:'PERSONNELASSIGNMENT_XTYPE_DICTNAME',columnName:'类型'},{columnId:'PERSONNELASSIGNMENT_XDEPID_DICTNAME',columnName:'现属支行/部门'},{columnId:'PERSONNELASSIGNMENT_NJOBID_DICTNAME',columnName:'现岗位'},
              {columnId:'PERSONNELASSIGNMENT_NDEPID_DICTNAME',columnName:'调配部门'},
              {columnId:'PERSONNELASSIGNMENT_NJOBID_DICTNAME',columnName:'调配岗位'}
            ],
          pager:{offset:0,limit:10},
          right_buttons:[{buttonName:'修改',icon:'fas fa-edit',buttonId:1,area:"right"},{buttonName:'删除',icon:'fas fa-edit',buttonId:113,area:"right"}],
          rows: [],
          totalData:-1,
          isHowTopQuery:false,
          requestParam:{}
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
