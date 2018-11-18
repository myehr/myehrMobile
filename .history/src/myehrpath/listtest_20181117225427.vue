<template>
    <div>
        <scroller  @on-scroll-bottom="onScrollBottom" height="50px" ref="scrollerBottom"  :scroll-bottom-offst="200" lock-x>
        <div class="box2"  id="listscroller" style="padding-bottom:40px;">
            <div v-for="n in 10" class="container">
                {{ n }}
            </div>
            <load-more tip="0"  v-bind:showLoading="loading" ></load-more>

        </div>
        </scroller>
    </div>
</template>

<script>
export default {
     name: 'warpBox',
     data () {
         return {
             loading:false
         }
     },
     created () {
         
     },
     methods: {
         onScrollBottom(){
             console.log('上啦事件');
         }
     }
}
</script>
