<template>
  <div>
    <div style="padding: 15px;">
      <button-tab v-for="(menu,index) in menus"    >

            <button-tab-item selected   v-if="index === 0"  >{{menu.name}}  |{{ index }}|</button-tab-item>

            <button-tab-item    v-else  >{{menu.name}}  |{{ index }}|</button-tab-item>

      </button-tab>

    </div>
  </div>
</template>

<i18n>
  Today:
  zh-CN: 今天
  This Month:
  zh-CN: 本月
  Articles:
  zh-CN: 文章
  Products:
  zh-CN: 商品
  Articles sync:
  zh-CN: 文章同步
  Products sync:
  zh-CN: 商品同步
  All Messages:
  zh-CN: 所有消息
  New Messages:
  zh-CN: 新消息
  Red Dot:
  zh-CN: 红点
  Use v-model to set selected item:
  zh-CN: 使用 v-model 设置当前选中项
</i18n>

<script>
  import { ButtonTab, ButtonTabItem, Divider } from 'vux'

  export default {
    components: {
      ButtonTab,
      ButtonTabItem,
      Divider
    },
    methods: {
      consoleIndex () {
        console.log('click demo01', this.demo01)
      },
      selected (name) {

        if(name === '系统'){
          return 'selected'
        }
      }
    },
    data () {
      return {
        demo01: 0,
        menus:[
          {name:'薪酬'},
          {name:'绩效'},
          {name:'考核'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'},
          {name:'机构'}

        ],
        selected:'selected'
      }
    },
    watch:{
      selected: function (){


      }

    }
  }
</script>
