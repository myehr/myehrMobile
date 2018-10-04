<template>

  <div class="demo-list-box" id="demo_list_box" :style="{height: `${height}px`}">
    <group-title>

      <span class="bigicon fab fa-accusoft " />
      <span class="bigicon">标题</span>
    </group-title>

    <flexbox :gutter="0" v-for="(data, index) in datas" :key="index">

      <flexbox-item :span="1/4" v-for="temp in data"  class="cbox vux-1px-t vux-tap-active" @click.native="go(temp.name.toLowerCase())">
        <div class="vux-1px-r cbox-inner ">
          <div class="rcorners1">

            <span v-bind:class="[ temp.iconcss, temp.fab,temp.fontSizeicon,temp.iconcolor]"  />

          </div>
          <div >
            <span style="font-size: 13px">{{temp.name | camelCase}}</span>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, VuxComponentListData as components } from 'vux'
  import { mapState ,GroupTitle } from 'vuex'
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
    name: 'myehrservice',
    components: {
      DemoList,
      Flexbox,
      FlexboxItem,
      GroupTitle
    },
    filters: {
      camelCase
    },
    created() {
      console.log(10000000000000)
      this.$axios.get('http://xunlian.55555.io:8082/sosoapi-web/pass/mock/7//goldCard/applyQrNo?memberCode=2323&sourceIp=2323',
        {

          headers: {
            'Access-Control-Allow-Origin': '* '
          }
        }
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });

    },
    activated () {
      document.querySelector('#demo_list_box').scrollTop = this.demoTop
    },
    mounted () {
      this.height = window.innerHeight - 46
    },
    methods: {
      go (name) {
        console.log(name)

      },
      gemenu (){
        axios.post('http://xunlian.55555.io:8082/sosoapi-web/pass/mock/7//goldCard/applyQrNo?memberCode=2323&sourceIp=2323',{})
          .then(function (response) {
            console.log(1)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      dealData (srcData){

        //数据处理  把上下级关系数据处理成两层
        let groups = new Map()

        for (let i = 0; i <srcData.length; i++) {
          let temp = srcData[i]
          if(temp.menuCode === 'F') {
            let group = temp
          }
          groups.push({
            name: '----',
            icon: ''
          })
        }
      },
      split (array) {
        let chunks = []
        let count = Math.ceil(array.length / 4)
        while (count > 0) {
          chunks.push(array.slice((count - 1) * 4, count * 4))
          count--
        }
        chunks = chunks.reverse()
        const lastList = chunks[chunks.length - 1]
        const lastLength = lastList.length
        if (lastLength < 4) {
          for (let i = 0; i < 4 - lastLength; i++) {
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
            {
              name:'薪酬城市',
              color:'red',
              iconcss:'fa-accusoft',
              fontSizeicon:'bigicon',
              fab:'fab',
              iconcolor:'white'
            },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-angular',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-adn',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-asymmetrik',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-avianex',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-apple',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-address-card',
            fontSizeicon:'bigicon',
            fab:'far',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-bell',
            fontSizeicon:'bigicon',
            fab:'far',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-bug',
            fontSizeicon:'bigicon',
            fab:'fas',
            iconcolor:'white'

          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-btc',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-audio-description',
            fontSizeicon:'bigicon',
            fab:'fas',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-btc',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-audio-description',
            fontSizeicon:'bigicon',
            fab:'fas',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-audio-description',
            fontSizeicon:'bigicon',
            fab:'fas',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-btc',
            fontSizeicon:'bigicon',
            fab:'fab',
            iconcolor:'white'
          },{
            name:'薪酬标准',
            color:'red',
            iconcss:'fa-audio-description',
            fontSizeicon:'bigicon',
            fab:'fas',
            iconcolor:'white'
          }
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

  .rcorners1 {
    border-radius: 25px;
    background: #8AC007;
    width:50px;
    height:50px;
    margin:0 auto;
    line-height: 4em;
    //margin:20,20,10,20;

  }

  .bigicon{
    font-size: 2em;
  }
  .red{
      color: red
    }
  .blue{
    color: #7FFFD4
  }
  .Brown{
    color: #A52A2A;
  }
  .white{
    color:#FAEBD7
  }

</style>
