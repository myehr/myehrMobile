<template>
  <div class="testlist">
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn" v-bind:ibuttons="ibuttons"
                      @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"
                      :filterColumnDatas="filterColumnDatas"  :winHeight="contentHeight" :formId="formId" >

     </list1-component>


  </div>
</template>

<script>
  import  {List1Component} from 'vux'
  import  { setDefaultValue,dateFormat ,getInitFilterParam} from '@/libs/formCommon.js'
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
        },currentRow:{
          handler(newValue, oldValue) {
            this.$emit('onRowChange',newValue,oldValue)
          },
          deep: true
        }
      },
      mounted : function() {
       // console.log('111111111111111111')

      },props:{
        value: {},
        compParams: {},
        contentHeight:{}
      },
      name: "testList1Config",
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
        onRowClick(row,oldRow){
          //固定写法，设置当前行变量
          if(this.currentRow !== this.row) {
            this.$emit('onRowChange',row,this.currentRow)
          }
          this.currentRow = row;
          var url = "/myehr/form/toForm.action?formId="+row.formId+"&key="+row.procDefKey+"&isInit=true&taskId="+row.taskId+"&procInsId="+row.procInsId+"&businessId="+row.businessId+'&formType=APP';
          //var url =  "";
          let pageTitle = row.title;
          var query = {pageTitle:pageTitle,title:this.title,url:url};
          this.$router.push({path:'/myehrpath/iframe',query:query})

        },buttonClickCallBack(buttonId,datas,retcode){
          this.$emit('onButtonClickEnd',this.formId,buttonId,datas,retcode);
        },
        onBlurQuery(value){
          var old = this.filterParams ;
          old[rtyuiop] = value;
          this.loadData(null,null,old,this.orderByParam);
        },
        loadData(initRows,pager,filterParams,orderByParam){
          if (filterParams == null) {
            filterParams = {}
          }
         // Object.assign();
          var result = getInitFilterParam(this.queryParam, this.compParams, this.filterConfig)
          this.filterParams = filterParams;
          orderByParam = orderByParam==null ?[] :orderByParam;
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
            {"order":"asc","offset":offset,"limit":limit,"containerParam":{},"paramsMap":{},"requestParam":{},"filter":filterParams,"userIds":null,"formId":this.formId,"isView":null,"heightGrade":[]}
            )
            .then(function (response) {
              if(response.data) {
                if(initRows == null||startFlag == 0) {
                  this.rows = response.data.rows;
                  this.totalData = response.data.total;
                }else {
                  this.rows = initRows.concat(response.data.rows);
                }
                this.$emit('onLoadData', this.formId,this.rows,result,'9999')
              }else {
                this.$emit('onLoadData', this.formId,this.rows,result,'9999')
              }


            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
      },

      data () {
        return {
          orderByParam:{},
          filterParams:{},
          orderByColumn:[ {name:'id',type:'list',lableName:'序列',defaultOrderBy:'asc',checked:false}, {name:'code',type:'default',lableName:'编码',defaultOrderBy:'asc',checked:false}, {name:'name',type:'list',lableName:'名称',defaultOrderBy:'asc',checked:false}, {name:'date',type:'list',lableName:'创建日期',defaultOrderBy:'asc',checked:false} ],
          filterColumnDatas:[ { name:'v1', lableName:'多选', type:'checkbox', dictId:'dict|CHILDSTATUS', defaultValue:'' }, { name:'v2', type:'radio', lableName:'单选', dictId:'dict|CHILDSTATUS', defaultValue:'' }, { name:'v3', lableName:'显示名字', type:'date', dictId:'dict|CHILDSTATUS', defaultValue:'' }, { name:'v4', lableName:'显示名字', type:'textbox', dictId:'dict|CHILDSTATUS', defaultValue:'' }, { name:'v5', lableName:'显示名字', type:'textbox', dictId:'dict|CHILDSTATUS', defaultValue:'' } ],
          screenWidth: document.body.clientWidth,
          standDataColumn:{title:'EMPVEMPLOYEE_CNAME',imgUrl:null},
          showRowColumn:[{columnId:'EMPVEMPLOYEE_EMPCODE',columnName:'工号'},{columnId:'EMPVEMPLOYEE_ENAME',columnName:'英文名'},{columnId:'EMPVEMPLOYEE_COMPID_DICTNAME',columnName:'所在公司'},
              {columnId:'EMPVEMPLOYEE_CERTNO',columnName:'身份证号'},
              {columnId:'EMPVEMPLOYEE_JOBID_DICTNAME',columnName:'职务'}
            ],
          pager:{offset:0,limit:10},
          ibuttons:[{buttonName:'在职背景',icon:'fas fa-edit',buttonId:113,area:"right"}],
          rows: [],
          currentRow:null,
          totalData:-1,
          isHowTopQuery:false,
          queryParam:this.$route.query, //页面请求参数
          filterConfig: [{paramType: 'parameter', paramValue: 'EMPEMPLOYEE_EMPID', paramName: 'EMPEMPLOYEE_EMPID'}], // 过滤配置
          formId:2131
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
