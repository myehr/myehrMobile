<template>
  <div>
    <divider>上拉刷新</divider>
    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="300px" ref="demo2" @on-pullup-loading="load2">
      <div class="box2">
        <cell-box style="height:60px;font-size:14px;color:#666" v-for="(item,index) in listData" is-link :key="index">
             <flexbox>
                <flexbox-item :span="2">
                    <div class="headerimg"><img src=""/></div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo">
                        <span>{{ item.assigneeName }}</span>
                        <span>{{ item.title }}</span>
                        <span></span>
                    </div>
                     <div class="flex-demo">
                       {{ item.taskCreateDate }}
                    </div>
                    <div class="flex-demo">
                       {{ item.taskCreateDate }}
                    </div>
                </flexbox-item>
            </flexbox>
        </cell-box>
      </div>
    </scroller>
  </div>
</template>

<i18n>
Pull Up to Refresh:
  zh-CN: 上拉刷新
placeholder:
  zh-CN: 占位
'Loading...':
  zh-CN: 努力加载中
</i18n>

<script>
import { Scroller, Divider, Spinner,CellBox,Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    Scroller,
    Divider,
    Spinner,
    CellBox,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
        listData:[]  
    }
  },
  created () {
    this.menulist();
  },
  methods: {
    load2 () {
      // setTimeout(() => {
      //   this.n2 += 10
      //   setTimeout(() => {
      //     this.$refs.demo2.donePullup()
      //   }, 100)
      //   if (this.n2 === 30) { // unload plugin
      //     setTimeout(() => {
      //       this.$refs.demo2.disablePullup()
      //     }, 100)
      //   }
      // }, 2000)
    },
  menulist(){
    let offset = 0
    let limit = 10
    this.$axios.post('/myehr/act/task/todoForMobile.action',{"order":"asc","offset":offset,"limit":limit,"paramsMap":{"userId":"1","flowCode":"7"},"requestParam":{},"filter":{"searchValue":""},"formId":"1041","isView":null})
        .then(function (response) {
            console.log(response,'菜单数据');
            this.listData = response.data.rows;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
  }

  },
  data () {
    return {
      n2: 10,
      pullupConfig2: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.pullup-arrow {
  display: block;
  transition: all linear 0.2s;
  -webkit-transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
.headerimg{
    height: 40px;
    width: 40px;
    background: red;
}
</style>
