<template>
  <div>
    <tab :scroll-threshold="5">
      <tab-item v-for="(item, index) in tabList"  :key="index" @on-item-click="onItemClick(index)"   :selected="index===0">{{ item.title }}</tab-item>
    </tab>
    <div>
      <keep-alive    >
        <router-view class="router-view" ></router-view>
      </keep-alive>
    </div>


  </div>
</template>

<script>
  import  Tab from '@/components/tab/tab.vue'
  import  TabItem from '@/components/tab/tab-item';
  import worktab2 from './worktab2.vue'
  export default {
    name: "worktab2",
    components: {
      Tab,
      TabItem,
      worktab2
    },data(){
      return {
        currentIndex : 0,
        tabList:[{title:'自助',path:'/myehrpath/work/userSelf',icon:''},{title:'招聘',path:'/myehrpath/testList2Component',icon:''},{title:'人事',path:'/myehrpath/login',icon:''},{title:'薪酬',path:'/myehrpath/testList1Component',icon:''},{title:'开发',path:'/myehrpath/testList1Component',icon:''}]
      }
    },created(){
      let children = [];

      children = [];
      for(var i=0 ;i<this.tabList.length; i++) {
        var temp = this.tabList[i];
        let chpath = temp.path.substring(1,temp.path.length);
        let filePath = temp.path.replace('/myehrpath','')
        children.push({
          path: chpath, component: () => import(`@/myehrpath${filePath}.vue`).then(m => m.default),
          meta: {
            keepAlive: true
          }
        });
      }
      let myroutes =  [
        {
          path: '/worktab',
          component: worktab2,
          children:children,
          meta: {
            keepAlive: true
          }
        }
      ]
      this.$router.addRoutes(myroutes);
      console.log('createdcreatedcreatedcreatedcreatedcreated')
      this.$router.push({path: '/worktab'+this.tabList[0].path})

    },
    methods: {
      onItemClick(index){
       //   this.$router.push({path: '/worktab'+this.tabList[index].path})
        this.currentIndex = index;
      }
    },activated(){
      console.log(this.data)
      console.log(this.currentIndex+'activatedactivatedactivatedactivatedactivated')
      this.$router.push({path: '/worktab'+this.tabList[this.currentIndex].path})
    }
  }
</script>

<style scoped>
  .router-view {
    width: 100%;
    top: 46px;
  }
</style>
