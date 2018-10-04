<template>
  <div class="demo-list-box" id="demo_list_box" :style="{height: `${height}px`}">
      <flexbox :gutter="0" v-for="(data, index) in datas" :key="index">
        <flexbox-item :span="1/3" v-for="temp in data" :key="temp.name" class="cbox vux-1px-t vux-tap-active" @click.native="go(temp.name.toLowerCase())">
          <div class="vux-1px-r cbox-inner">
            <span class="demo-icon demo-icon-big"  ></span>
            <br>
            <span :style="{fontSize: temp.name.length > 12 ? '12px' : ''}">{{temp.name | camelCase}}</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
</template>

<script>
import { Flexbox, FlexboxItem, VuxComponentListData as components } from 'vux'
import { mapState } from 'vuex'
import DemoList from './DemoList'

function camelCase (input) {
  let str = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase()
  })

  str = str.replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase()
  })
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export default {
  name: 'demoList',
  components: {
    DemoList,
    Flexbox,
    FlexboxItem
  },
  filters: {
    camelCase
  },
  activated () {
    document.querySelector('#demo_list_box').scrollTop = this.demoTop
  },
  mounted () {
    this.height = window.innerHeight - 46 - 53
  },
  methods: {
    go (name) {
      console.log(name)

    },
    split (array) {
        let chunks = []
        let count = Math.ceil(array.length / 3)
        while (count > 0) {
          chunks.push(array.slice((count - 1) * 3, count * 3))
          count--
        }
        chunks = chunks.reverse()
        const lastList = chunks[chunks.length - 1]
        const lastLength = lastList.length
        if (lastLength < 3) {
          for (let i = 0; i < 3 - lastLength; i++) {
            lastList.push({
              name: '----',
              icon: ''
            })
          }
        }
      return chunks
    }
  },
  data () {
    return {
      height: 0,
      datas: this.split( [
            {name:'薪酬城市'},
        {name:'薪酬标准'},
        {name:'薪资等级'},
        {name:'加班标准'},
        {name:'社保类型'},
        {name:'薪酬账套'},
        {name:'薪酬城市'},
        {name:'薪酬标准'},
        {name:'薪资等级'},
        {name:'加班标准'},
        {name:'社保类型'},
        {name:'薪酬账套'},
        {name:'薪酬城市'},
        {name:'薪酬标准'},
        {name:'薪资等级'},
        {name:'加班标准'},
        {name:'社保类型'},
        {name:'薪酬账套'},
        {name:'薪酬城市'},
        {name:'薪酬标准'},
        {name:'薪资等级'},
        {name:'加班标准'},
        {name:'社保类型'},
        {name:'薪酬账套'},
        {name:'薪酬城市'},
        {name:'薪酬标准'},
        {name:'薪资等级'},
        {name:'加班标准'},
        {name:'社保类型'},
        {name:'薪酬账套'},
        {name:'薪酬城市'},
        {name:'薪酬标准'},
        {name:'薪资等级'},
        {name:'加班标准'},
        {name:'社保类型'},
        {name:'薪酬账套'}
          ]
      )
    }
  },
  computed: {
    ...mapState({
      demoTop: state => state.vux.demoScrollTop
    })
  }
}
</script>

<style lang="less" scoped>
.cbox {
  text-align: center;
}
.cbox-inner {
  padding: 15px 0;
  width: 100%;
  height: 100%;
}
.demo-list-box {
  margin-bottom: 10px;
  background-color: #fff;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
