<template>
  <div>
      测试数据块

  </div>
</template>

<script>
import { Scroller } from '@/components/scroller'
import { Divider } from '@/components/divider'

export default {
  components: {
    Scroller,
    Divider
  },
  methods: {
    loadMore () {
      setTimeout(() => {
        this.n += 10
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
      }, 2000)
    },
    refresh () {
      setTimeout(() => {
        this.n = 10
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
      }, 2000)
    },
    changePullupStatus (enabled) {
      if (enabled) {
        this.$refs.scroller.enablePullup()
        this.pullupEnabled = true
      } else {
        this.$refs.scroller.disablePullup()
        this.pullupEnabled = false
      }
    },
    loadMore1 () {
      setTimeout(() => {
        this.n1 += 10
        this.$nextTick(() => {
          this.$refs.scroller1.donePullup()
          if (this.n1 >= 30) {
            this.$refs.scroller1.disablePullup()
            console.log('No more data, Pullup disabled!')
          }
        })
      }, 2000)
    }
  },
  data () {
    return {
      n: 10,
      n1: 5,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
</style>
