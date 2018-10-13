<template>

  <div class="demo-list-box" id="demo_list_box" :style="{height: `${height}px`}">

    <group-title>
      <span class=" fab fa-accusoft " />
      <span class="">考勤</span>
    </group-title>

    <grid :cols="4" :show-lr-borders="false">
      <grid-item @on-item-click="itemClick(temp)" v-for="temp in datas" :key="i" style="text-align: center">
        <div>
          <div class="rcorners1 " style="text-align: center ;line-height:50px">
            <span class="icon iconfont icon-qingchuxuanze imgfontsize" ></span>
          </div>
          <div class="grid-center">
            <span style="font-size: 12px">{{getTitle(temp.title)}}</span>
          </div>
          </div>
      </grid-item>
    </grid>

  </div>
</template>

<script>

  import  Grid from '@/components/grid/grid.vue'
  import  GridItem from '@/components/grid/grid-item.vue'
  import GroupTitle from '@/components/group-title'


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
      Grid,
      GridItem,
      GroupTitle
    },
    filters: {
      camelCase
    },
    created() {


    },
    activated () {
      document.querySelector('#demo_list_box').scrollTop = this.demoTop
    },
    mounted () {
      this.height = window.innerHeight - 46
    },
    methods: {
      getTitle(title){
        if(title.length>6) {
          return title.substring(0,5)+'..';
        }else {
          return title;
        }
      },
      itemClick(item){
        console.log(item)
        this.gotoMyehrPath(item.path,null,item.title);
      }
    },
    data () {
      return {
        height: 0,
        datas: [{title:'刷卡查询',path:'/myehrpath/form/cardRecordQuery',code:'',id:'',icon:''},{title:'有薪假查询',path:'/myehrpath/form/feeDayQuery',code:'',id:'',icon:''},{title:'刷卡记录',path:'',code:'',id:'',icon:''},{title:'加班记录',path:'',code:'',id:'',icon:''},{title:'月考勤汇总查询',path:'',code:'',id:'',icon:''},{title:'考勤异常查询',path:'',code:'',id:'',icon:''}]
      }
    },
    computed: {

    }
  }
</script>
<style lang="css">
  @import  "../../styles/myehr/icon/list/iconfont.css";
</style>
<style lang="less" scoped>


  .rcorners1 {
    border-radius: 25px;
    background: #8AC007;
    width:50px;
    height:50px;
    margin:0 auto;
    //margin:20,20,10,20;

  }

  .imgfontsize{
    font-size: 30px;
  }

  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .weui-grids {
    background-color: #fff;
  }
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
