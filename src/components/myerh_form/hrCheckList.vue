<template>
    <div>
      <checklist :title="title" :options="nameList" v-model="retDataChckList" :max=2 @on-change="change"></checklist>
    </div>
</template>

<script>

  import Checklist  from '@/components/checklist/index.vue'
    export default {
      name: "hrCheckList",
      methods:{
        getDictData () {

        },
        handleDataList (list) {
          for(var i=0 ;i<list.length; i++){
            var temp = list[i];
            this.codelist.push(temp.code);
            this.nameList.push(temp.name);
          }
        }
      },
      created(){
        if(this.dataList != null &&this.dataList.length >0) {
          this.handleDataList(this.dataList);
        }else {
          if(this.dictType == 'dict') {

          }else if(this.dictType == 'sql') {

          }
          this.handleDataList(this.dataList);
        }

      },watch:{
        retDataChckList (newVal,oldVal) {
          console.log(newVal)
          let retValue = [];
          for(var i=0; i<newVal.length; i++){
            var t = newVal[i];
            for(var k=0; k<this.nameList.length; k++){
              if(this.nameList[k] == t) {
                retValue.push(this.codelist[k]);
              }
            }
          }
          console.log(retValue)
        }
      },
      components: {
        Checklist

      },props:{
        dictId:{},
        dictType:{},
        isMutiple:{},
        dataList:{}, //下来数据 如果此数据有值 优先取此字段
        style:{}, //样式 shirnk分收缩样式 纵向展开式(portrait)  横向展开式（transverse）
        title:{}
      },data(){

        return {
          commonList: [ '中国', 'Japan', 'America' ],
          codelist:[],
          nameList:[],
          retDataChckList:null
        }
      }
    }
</script>

<style scoped>

</style>
