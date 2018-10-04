<template>
  <div>
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>

<i18n>
Yeah! You make it:
  zh-CN: 操作成功
Msg description:
  zh-CN: 内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:void(0);">文字链接</a>
Primary button:
  zh-CN: 推荐操作
Secondary button:
  zh-CN: 返回首页
</i18n>

<script>
import { Msg, Divider, XButton } from 'vux'

export default {
  name: "mmsg",
  components: {
    Msg,
    Divider,
    XButton
  },
  methods: {
    changeIcon () {
      if (!this.icon || this.icon === 'success') {
        this.icon = 'warn'
        return
      }
      if (this.icon === 'warn') {
        this.icon = 'info'
        return
      }
      if (this.icon === 'info') {
        this.icon = 'waiting'
        return
      }
      if (this.icon === 'waiting') {
        this.icon = 'success'
      }
    }
  },
  data () {
    return {
      title: this.$route.query.title,
      description:this.$route.query.desc,
      icon: this.$route.query.icon,
      buttons: [ {
        type: 'primary',
        text: this.$route.query.buttonText,
        link: '/'
      }]
    }
  }
}
</script>
