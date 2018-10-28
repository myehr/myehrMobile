<template>
  <div>
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:ibuttons="ibuttons"
                      @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom">
     </list1-component>
  </div>
</template>

<script>
  import  {List1Component} from 'vux'


    export default {
      components: {
        List1Component
      },created() {
        this.loadData(null,null);
      },
      watch: {
        screenWidth (val) {
          this.screenWidth = val
        },
        rows(){
          this.$nextTick(function(){
            /*现在数据已经渲染完毕*/
            console.log('LLLLLLLLLLLLLLLLLLLLLLLLL')
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

      },
      name: "testList1Component",
      methods :{
        onScrollBottom(prows,pager){
          //分页回调

          this.loadData(prows,pager);
        },
        getShowRowColumn(){ //抽取需要显示的数据的字段
          return ['taskName','businessId','taskCreateDate']
        },
        getIbuttons(){
          return this.ibuttons;
        },
        onRowButtonClick(buttonId,row){
          //点击每个按钮具体实现转交上层组件实现
          this.onRowClick(row);
        },
        onRowClick(row){
        /*  console.log("打开审批")
          var url = "/myehr/form/toForm.action?formId="+row.formId+"&key="+row.procDefKey+"&isInit=true&taskId="+row.taskId+"&procInsId="+row.procInsId+"&businessId="+row.businessId+'&formType=APP';
          console.log(url);
          //var url =  "";
          let pageTitle = row.title;
          var query = {pageTitle:pageTitle,title:this.title,url:url};*/
          var formParam = {formId:row.formId,key:row.procDefKey,isInit:true,orderBy:'Humanresources',taskId:row.taskId,businessId:row.businessId,procInsId:row.procInsId};
        //  this.$router.push({path:'/myehrpath/iframe',query:query})


          this.gotoMyehrPath('/myehrpath/testCardList',formParam,'流程审批');
        },
        loadData(initRows,pager){
          console.log(pager)
          var offset =0;
          var limit = 10;
          if(pager != null) {
            offset = pager.offset;
            limit = pager.limit;
            this.pager = pager;
          }
          if(this.totalData != -1 && this.rows.length >= this.totalData) {
            return ;
          }
          this.$axios.post('/myehr/act/task/todo.action?flowType=7', {"order":"asc","offset":offset,"limit":limit,"paramsMap":{"userId":"1","flowCode":"7"},"requestParam":{},"filter":{"searchValue":""},"formId":"1041","isView":null})
            .then(function (response) {
              console.log(response)
              if(initRows == null) {
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
          screenWidth: document.body.clientWidth,
          standDataColumn:{title:'name',imgUrl:null},
          showRowColumn:[{columnId:'taskName',columnName:'任务名称'},{columnId:'title',columnName:'标题'},{columnId:'procDefName',columnName:'环节名称'},{columnId:'taskCreateDate',columnName:'任务到达时间'}],
          pager:{offset:0,limit:10},
          ibuttons:[
            {buttonName:'审批',icon:'fas fa-edit',buttonId:113}
          ],
          rows: [],
          totalData:-1,

            otherData: {

            }
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
