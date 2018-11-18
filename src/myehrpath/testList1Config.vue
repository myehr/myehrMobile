<template>
  <div class="testlist">
     <list1-component v-bind:rows="this.rows"   v-bind:standDataColumn="standDataColumn" v-bind:pager="pager" v-bind:showRowDataColumn="showRowColumn"
                      v-bind:right_buttons="right_buttons" v-bind:bottom_buttons="bottom_buttons" v-bind:slid_buttons="slid_buttons"
                      @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick"  @onScrollBottom="onScrollBottom" @onBlurQuery="onBlurQuery" :orderByColumn="orderByColumn" :isHowTopQuery="isHowTopQuery"
                      :filterColumnDatas="filterColumnDatas"  :winHeight="contentHeight" :formId="formId" >

     </list1-component>


  </div>
</template>

<script>
  import List1Component from '@/components/myehr_list1/list1Component.vue'
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
          if(buttonId === 2414) {
            //编辑按钮
            var param = {EMPEMPLOYEE_EMPID: "600"};
            this.gotoMyehrPath('/myehrpath/testCardForm',param,'编辑');
            return ;
          }
          //this.onRowClick(row);
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
            {"order":"asc","offset":offset,"limit":limit,"containerParam":{},"paramsMap":{},"requestParam":{},"orderByParam":orderByParam,"filter":filterParams,"userIds":null,"formId":this.formId,"isView":null,"heightGrade":[]}
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
          pager:{offset:0,limit:10},
          pager: {offset: 0, limit: 10},
          right_buttons: [
            {buttonName: '编辑', icon: 'fas fa-edit', buttonId: 2414}
          ],
          bottom_buttons: [
            {buttonName: '预览', icon: 'fas fa-edit', buttonId: 3032}
          ],
          slid_buttons: [
          ],
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
