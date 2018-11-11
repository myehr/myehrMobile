<template>
  <div>
    <tab :scroll-threshold="5">
      <tab-item v-for="(item, index) in tabList"  :key="index" @on-item-click="onItemClick(index)"  :selected="index===0">{{ item.title }}</tab-item>
    </tab>

    <keep-alive>
      <router-view class="router-view" ></router-view>
    </keep-alive>
    <!--<p>
      <router-link to="/user/foo">/user/foo</router-link><br>
      <router-link to="/user/foo/profile">/user/foo/profile</router-link><br>
      <router-link to="/user/foo/posts">/user/foo/posts</router-link><br>
    </p>
    <router-view name="mytabview"></router-view>-->

  </div>
</template>

<script>
  import  Tab from '@/components/tab/tab.vue'
  import  TabItem from '@/components/tab/tab-item';
  import worktab from './worktab.vue'
  export default {
    name: "worktab",
    components: {
      Tab,
      TabItem,
      worktab
    },
    data(){
      return {
        currentIndex : 0,
        tabList:[{title:'自助',path:'/myehrpath/work/userSelf',icon:''},{title:'招聘',path:'/myehrpath/testList2Component',icon:''},{title:'人事',path:'/myehrpath/login',icon:''},{title:'薪酬',path:'/myehrpath/testList1Component',icon:''},{title:'开发',path:'/myehrpath/testList1Component',icon:''}]
      }
    },
    created(){
      let children = [];

      children = [];
      for(var i=0 ;i<this.tabList.length; i++) {
        var temp = this.tabList[i];
        let chpath = temp.path.substring(1,temp.path.length);
        let filePath = temp.path.replace('/myehrpath','')
        children.push({
          path: chpath, component: () => import(`@/myehrpath${filePath}.vue`).then(m => m.default)
        });
      }
      let myroutes =  [
        {
          path: '/worktab',
          component: worktab,
          children:children
        }
      ]
      this.$router.addRoutes(myroutes);
      this.$router.push({path: '/worktab'+this.tabList[0].path})

    },
    methods: {
      onItemClick(index){
          this.currentIndex = index;
      }
  },
  activated(){
      this.$router.push({path: '/worktab'+this.tabList[this.currentIndex].path})
    },
  watch:{
      currentIndex(curVal,oldVal){
        this.$router.push({path: '/worktab'+this.tabList[curVal].path})
      }
    }
  }
</script>

<style scoped>
  .router-view {
    width: 100%;
    top: 46px;
  }
</style>
