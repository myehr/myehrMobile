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
        getStandDataColumn () {
          return  {
            title:'name'
            //imgUrl:'https://gw.alicdn.com/i4/TB12mTCazfguuRjSszcXXbb7FXa_.jpg_160x160Q30s100.jpg_.webp'
          }
        },
        onScrollBottom(prows,pager){
          //分页回调

          this.loadData(prows,pager);
        },
        getIbuttons(){
          return this.ibuttons;
        },
        onRowButtonClick(buttonId,row){
          //点击每个按钮具体实现转交上层组件实现
          if(buttonId == '113') {
            this.onRowClick(row);
          }
          if(buttonId == '114') {
            this.onRowClick(row);
          }
        },
        onRowClick(row){
          console.log("打开审批")
          var url = "/myehr/FileList/getHtmlPicture.action?procInsId="+row.procInsId+'&formType=APP';
          //var url =  "";
          var query = {title:this.title,url:url};
          this.$router.push({path:'/myehrpath/iframe',query:query})

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
          this.$axios.post('/myehr/act/task/historic.action', {"order":"asc","offset":offset,"limit":limit,"paramsMap":{"userId":"1"},"requestParam":{},"filter":{"searchValue":""},"formId":"1041","isView":null})
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
          showRowColumn:[{columnId:'taskName',columnName:'任务名称'},{columnId:'title',columnName:'标题'},{columnId:'procDefName',columnName:'环节名称'},{columnId:'actEndTime',columnName:'任务结束时间'}],
          pager:{offset:0,limit:10},
          ibuttons:[

            {buttonName:'查看',icon:'fas fa-edit',buttonId:113},
            {buttonName:'驳回',icon:'fas fa-edit',buttonId:114}
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
