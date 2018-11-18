<template>
  <div>
    <divider>上拉加载</divider>
    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="300px" ref="demo2" @on-pullup-loading="load2">
      <div class="box2">
        <cell-box style="height:60px;font-size:14px;color:#666" v-if="listData" v-for="(item,index) in listData" :link="item.path" is-link :key="index">
             <flexbox>
                <flexbox-item :span="2">
                    <div class="headerimg"><img src=""/></div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo">
                        <span>{{ item.assigneeName }}</span>
                        <span>{{ item.title }}</span>
                        <span style="float:right">五分钟前</span>
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
      n2: 10,
      pullupConfig2: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      },
        listDataMain:[],
        listData:[],
        total:'',
        offset:0,
        limit:10
    }
  },
  created () {
    this.menulist(1);
    
  },
  methods: {
    load2 () {
       if(this.listData.length === this.total){
          this.$refs.demo2.disablePullup()
            console.log('没有跟多数据');
       }else{
          this.menulist(2);
          console.log('上啦');
          this.$refs.demo2.donePullup()
       }

      setTimeout(() => {
        this.n2 += 10
        setTimeout(() => {
          this.$refs.demo2.donePullup()
        }, 100)
        if (this.n2 === 30) { // unload plugin
          setTimeout(() => {
            this.$refs.demo2.disablePullup()
          }, 100)
        }
      }, 2000)
    },
  menulist(m){
    this.$axios.post('/myehr/act/task/historic.action', {"order":"asc","offset":this.offset,"limit":this.limit,"paramsMap":{"userId":"1"},"requestParam":{},"filter":{"searchValue":""},"formId":"1041","isView":null})
        .then(function (response) {
            console.log(response,'菜单数据');
            if(m === 1){
                // this.listData = response.data.rows;
                this.$nextTick(() => {
                  this.$refs.demo2.reset()
                })
            }else{
                this.listData.concat(response.data.rows);
                 this.$nextTick(() => {
                  this.$refs.demo2.reset()
                })
                console.log(this.listData,'push新数据');
            }
            
            this.total = response.data.total;
            this.offset = this.offset + 1
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
  }

  },

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
