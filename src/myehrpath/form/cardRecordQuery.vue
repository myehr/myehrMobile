<template>
  <div>

    <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:ibuttons="ibuttons"
                     @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery" :filterColumnDatas="filterColumnDatas">

    </list1-component>
    <div style="text-align: center;padding-top:100px;" v-if="totalData==0">
      <label>无数据</label>
    </div>


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
          console.log(window.onresize())
        })
      }
    },
    mounted : function() {
      console.log('111111111111111111')

    },
    name: "cardRecordQuery",
    methods :{
      onScrollBottom(prows,pager,filterParam,orderByParam){
        //分页回调
        this.loadData(prows,pager,filterParam,orderByParam);
      },
      getIbuttons(){
        return this.ibuttons;
      },
      onRowButtonClick(buttonId,row){
        //点击每个按钮具体实现转交上层组件实现
        this.onRowClick(row);
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
      loadData(initRows,pager,filterParams,orderByParam){
        console.log('查询')
        console.log(filterParams)
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
        isHowTopQuery:false,
        filterColumnDatas:[ { name:'ATTENDCARDIMPORT_AC_CHECKTIME', lableName:'刷卡时间', type:'datetime',format:'YYYY-MM-DD HH:mm', dictId:'test', defaultValue:'' }],
        screenWidth: document.body.clientWidth,
        standDataColumn:{title:'EMPVEMPLOYEE_CNAME',imgUrl:null},
        showRowColumn:[{columnId:'EMPVEMPLOYEE_EMPCODE',columnName:'工号'},
          {columnId:'EMPVEMPLOYEE_DEPID_DICTNAME',columnName:'部门'},
          {columnId:'ATTENDCARDIMPORT_AC_CARDNO',columnName:'考勤卡号'},
          {columnId:'ATTENDCARDIMPORT_AC_CHECKTIME_NEWDATE',columnName:'刷卡时间'}
        ],
        pager:{offset:0,limit:10},
        ibuttons:[{buttonName:'查看',icon:'fas fa-edit',buttonId:113,buttonPosition:'right'}],
        rows: [],
        totalData:-1,
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
