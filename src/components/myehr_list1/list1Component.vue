<template>
  <div class="container ">
    <search  v-model="commonFilterParam" v-if="isHowTopQuery==true" :auto-fixed="false"></search>
    <div slot="content" class="card-demo-flex">
      <div class="vux-1px-r"  v-on:click="showOrderByList= !showOrderByList"  v-if="listOrderByColumn.length>0">
        <span>{{ listOrderByCheckName==null?'排序字段':listOrderByCheckName  }}</span>
        <span class="icon iconfont  icon-down2 redIcon"  v-if="listOrderByCheck=='asc'" />
        <span class="icon iconfont icon-up2 redIcon"  v-if="listOrderByCheck=='desc'" />
        <span class="icon iconfont  icon-down redIcon"  v-if="listOrderByCheck==null" />
      </div>
      <div class="vux-1px-r" v-if="defaultOrderByColumn != null" v-on:click="setOrderBy">
        <span>{{defaultOrderByColumn.lableName}}排序</span>
        <span class="icon iconfont  icon-down2 redIcon"  v-if="orderBy=='asc'" />
        <span class="icon iconfont  icon-up2 redIcon"   v-if="orderBy=='desc'" />
        <span class="icon iconfont  icon-remove1 redIcon"   v-if="orderBy==null" />

      </div>
      <div class="vux-1px-r" v-if="hasFilterColumnDatas()" v-on:click="clickShowFilter" >
        <span class="fas fa-filter" style="color: red; font-size:9px"></span>
        <span   >筛选</span>

      </div>

    </div>
    <scroller  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"  :scroll-bottom-offst="200" lock-x :height="getWindowHeight()" >
      <div class="box2"  id="listscroller" style="padding-bottom:40px;">
        <!--<p v-for="i in bottomCount">placeholder {{i}}</p>-->

        <div v-for="row in rows" class="container">
          <list1-item-component v-bind:standData="getStandData(row)" v-bind:showRowData="getShowRow(row)" v-bind:rowData="row" v-bind:right_buttons="right_buttons" v-bind:bottom_buttons="bottom_buttons"
                                @onRowClick="onRowClick" @onRowButtonClick="onRowButtonClick" ></list1-item-component>
        </div>
        <load-more tip="0"  v-bind:showLoading="loading" ></load-more>

      </div>
    </scroller>
    <!-- 过滤框 -->
    <div v-transfer-dom  style="background: white">
      <popup v-model="showFilter" position="right">
        <div style="width:300px;">

          <FormCreateQuery ref="headerChild" :filterColumnDatas="filterColumnDatas">

          </FormCreateQuery>

          <div style="margin-bottom: 50px">

          </div>
          <!-- 按钮区域 -->
          <div  style="position:fixed; bottom:0; right:0;width: 300px;overflow:hidden;">
            <flexbox>
              <flexbox-item>
                <x-button type="primary">重置</x-button>
              </flexbox-item>
              <flexbox-item>
                <x-button type="warn" @click.native="startQuery">确认</x-button>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </popup>
    </div>
    <!-- 排序字段显示 -->
    <div v-transfer-dom>
      <popup v-model="showOrderByList"  height="200px">
        <div class="popup2">
          <x-table  :cell-bordered="false" :content-bordered="true" style="background-color:#fff;">
            <thead>
            <tr style="background-color: #F7F7F7">
              <th  class="orderByTitle"  colspan="2">排序字段</th>
              <th  class="orderByTitle" v-on:click="clearOrderByOther"  style="text-align: right;padding-right: 10px;" colspan="2"><span class="icon iconfont icon-qingchuxuanze"></span>清除</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(temp,index)  in listOrderByColumn"  v-on:click="setOrderByOther(index)">
              <td  textAlign="left" width="30px"> <i class="icon iconfont icon-ok" v-if="temp.checked"></i></td>
              <td  textAlign="left" width="40%"> {{temp.lableName}}</td>
              <td  >

                <span class="icon iconfont icon-down2" style="color: red; font-size:14px" v-if="temp.defaultOrderBy == 'asc'" />
                <span class="icon iconfont icon-up2" style="color: red; font-size:14px" v-if="temp.defaultOrderBy == 'desc'" />
              </td>

            </tr>

            </tbody>
          </x-table>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>

  import List1ItemComponent from './list1ItemComponent'
  import Scroller from '../scroller'
  import LoadMore from '../load-more'
  import Search from '../search'
  import Popup from '../popup'
  import TransferDom from '../../directives/transfer-dom'
  import CheckerItem from '../checker/checker-item.vue'
  import Checker from '../checker/checker.vue'
  import XButton from '../x-button'
  import Flexbox from '../flexbox/flexbox.vue'
  import FlexboxItem from '../flexbox/flexbox-item.vue'
  import XInput from '../x-input'
  import Datetime from '../Datetime'
  import FormCreateQuery from '../myerh_form/formCreateQuery.vue'
  import XTable from '../x-table'

  export default {
    directives: {
      TransferDom
    },
    components: {
      List1ItemComponent,
      Scroller,
      LoadMore,
      Search,
      Popup,
      CheckerItem,
      Checker,
      XButton,
      FlexboxItem,
      Flexbox,
      XInput,
      Datetime,
      FormCreateQuery,
      XTable
    },
    name: 'list1Component',
    watch: {
      'rows': function (newVal, oldVal) {
        this.onFetching = false
        this.loading = false
      },
      'commonFilterParam': function (newVal, oldVal) {
        this.blurQuery()
      }
    },
    methods: {
      blurQuery () {
        // commonFilterParam
        this.$emit('onBlurQuery', this.commonFilterParam)
      },
      clearOrderByOther () {
        for (var i = 0; i < this.listOrderByColumn.length; i++) {
          this.listOrderByColumn[i].checked = false
        }
        this.orderBy = null
        this.orderByParam = null
        this.showOrderByList = false
        this.listOrderByCheckName = null
        this.listOrderByCheck = null
        this.startQuery()
      },
      setOrderByOther (index) {
        this.listOrderByColumn[index].defaultOrderBy = this.listOrderByColumn[index].defaultOrderBy == 'asc' ? 'desc' : 'asc'
        this.listOrderByColumn[index].checked = true
        this.listOrderByCheckName = this.listOrderByColumn[index].lableName
        for (var i = 0; i < this.listOrderByColumn.length; i++) {
          if (i != index) {
            this.listOrderByColumn[i].checked = false
          }
        }
        this.orderBy = this.listOrderByColumn[index].defaultOrderBy
        this.listOrderByCheck = this.orderBy
        this.orderByParam = {name: this.listOrderByColumn[index].name, orderBy: this.orderBy}
        this.showOrderByList = false
        this.startQuery()
      },
      setOrderBy () {
        // 默认排序字段点击
        this.orderBy = this.orderBy == 'asc' ? 'desc' : 'asc'
        this.orderByParam = {name: this.defaultOrderByColumn.name, orderBy: this.orderBy}
        for (var i = 0; i < this.listOrderByColumn.length; i++) {
          this.listOrderByColumn[i].checked = false
        }
        this.listOrderByCheckName = null
        this.listOrderByCheck = null
        this.startQuery()
      },
      getDictList (dictId) {
        console.log(this.filterColumnValueData_temp[0])
        var dictDatas = dictId.split('|')
        this.$axios.post('/myehr/dict/getselectdatasAll.action',
          [{'formColumnGuiType': dictDatas[0], 'formColumnUsName': dictDatas[1], 'formColumnId': ''}]
        ).then(function (response) {
          console.log(response)
          var data = response.data[0]
          if (data != null) {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            console.log(data)
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            return data
            //return [{id: '1', name: '张三'}, {id: '2', name: '李四'}, {id: '3', name: '张三3'}, {id: '4', name: '李四4'}, {id: '5', name: '张三5'}, {id: '6', name: '李四6'}, {id: '7', name: '李四6'}, {id: '8', name: '李四6'}]
          } else {
            return [{code: '1', name: '张三'}, {code: '2', name: '李四'}, {code: '3', name: '张三3'}, {code: '4', name: '李四4'}, {code: '5', name: '张三5'}, {code: '6', name: '李四6'}, {code: '7', name: '李四6'}, {code: '8', name: '李四6'}]
          }
        }.bind(this))
          .catch(function (error) {
            console.log(error);
          });

      },
      startQuery () {
        console.log('综合查询条件')
        let ctime = new Date().getTime()
        if (ctime - this.qtime <= 500) {
          // alert('频发查询忽略'+this.qtime+'-'+ctime);
          console.log('频发查询忽略' + this.qtime + '-' + ctime)
          return
        }
        this.qtime = ctime
        this.loadData(null)
      },
      getFilterParam () { // 执行查询
        this.showFilter = false
        if (this.$refs.headerChild) {
          return this.$refs.headerChild.getFormData()
        }
        return null
      },
      clickShowFilter () {
        if (this.showFilter == true) {
          this.showFilter = false
        }
        if (this.showFilter == false) {
          this.showFilter = true
        }
      },
      getWindowHeight () {
      //  console.log('windheight:((((((((('+this.winHeight)
        if(this.winHeight == null) {
          let height = document.documentElement.clientHeight - 53;
          return height + 'px'
          // return window.innerHeight + 'px'
        }else {
          return this.winHeight;
        }

      },
      getStandData (row) {
        if (this.standDataColumn != null) {
          var stitle = null
          if (this.standDataColumn.title) {
            stitle = row[this.standDataColumn.title]
          }
          var simgUrl = null
          if (this.standDataColumn.title) {
            simgUrl = row[this.standDataColumn.imgUrl]
          }
          return {
            title: stitle,
            imgUrl: simgUrl
          }
        }
      },
      onScrollBottom () {
        console.log('this.onFetching' + this.onFetching)
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.loading = true
          setTimeout(() => {
            this.bottomCount += 10

            var offset = this.pager.offset
            var limit = this.pager.limit
            this.loadData({offset: offset + limit, limit: limit})
            this.$nextTick(() => {
              // this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
            this.loading = false
          }, 2000)
        }
      },
      loadData (pager) {
        this.$emit('onScrollBottom', this.rows, pager, this.getFilterParam(), this.orderByParam)
      },
      getShowRow (row) { // 抽取需要显示的数
        var result = {}
        if (this.showRowDataColumn != null) {
          for (var i = 0; i < this.showRowDataColumn.length; i++) {
            let columnId = this.showRowDataColumn[i].columnId
            let columnName = this.showRowDataColumn[i].columnName
            result[columnId] = columnName + '：' + row[columnId]
          }
        }
        return result
      },
      onRowButtonClick (buttonId, row) {
        this.$emit('onRowButtonClick', buttonId, row)
      },
      onRowClick (row) {
        this.$emit('onRowClick', row)
      },
      hasFilterColumnDatas () {
        if (this.filterColumnDatas) {
          if (this.filterColumnDatas.length == 0) {
            return false
          }
          return true
        } else {
          return false
        }
      }
    },
    hasDefaultOrderByColumn () {

    },
    props: {
      winHeight:{},
      right_buttons: {

      },
      bottom_buttons: {

      },
      isHowTopQuery: {},
      filterColumnDatas: {
        type: Array,
        default: function () {
          return []
        }
      },
      orderByColumn: {
        type: Array,
        default: function () {
          return []
        }
      },
      showRowDataColumn: {

      },
      standDataColumn: {

      },
      rows: {

      },
      pager: {

      }
    },
    data () {
      return {
        commonFilterParam: null,
        bottomCount: 30,
        onFetching: false,
        loading: true,
        showFilter: false,
        okisdisable: false,
        demo5: '1,2',
        qtime: new Date().getTime(),
        defaultOrderByColumn: null,
        listOrderByColumn: [],
        listOrderByCheckName: null,
        listOrderByCheck: null,
        orderBy: 'asc',
        orderByParam: null,
        showOrderByList: false
      }
    },
    created () {
      if (this.orderByColumn) {
        for (var i = 0; i < this.orderByColumn.length; i++) {
          if (this.orderByColumn[i].type == 'default') {
            this.defaultOrderByColumn = this.orderByColumn[i]
          } else {
            this.listOrderByColumn.push(this.orderByColumn[i])
          }
        }
      }
    }

  }
</script>

<style lang="css">
  @import  "../../styles/myehr/icon/list/iconfont.css";
</style>

<style scoped >


  .sp {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .card-demo-flex {
    display: flex;
  }
  .vux-1px-r {
    padding: 7px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 13px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }

  .container {
    /* margin-bottom: 0px;
     width: 100%;
     overflow: scroll;*/
    -webkit-overflow-scrolling: touch;
  }

  .demo5-item {
    margin-bottom: 10px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
    padding: 5px 10px 5px 10px;
  }

  .demo5-item-selected {
    background: #ffffff url(../../imgs/active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }

  .noscroll{
    position: fixed;
    left: 0;
    top: 20;
    width: 100%;
  }
  .orderByTitle{
    text-align:left;padding-left:10px;color: #828282;font-size: 16px;
  }
  .redIcon{
    color: red; font-size:9px
  }




</style>
