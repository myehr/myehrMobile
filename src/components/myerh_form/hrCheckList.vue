<template>
    <div>
      <checklist :title="title" :options="nameList" v-model="retDataChckList" :max="max" @on-change="change"></checklist>
      {{ value }}
    </div>
</template>

<script>

  import Checklist  from '@/components/checklist/index.vue'
    export default {
      name: "hrCheckList",
      methods:{
        getDictData () {

        },
        handleDataList (list,defaultVal) {
          for(var i=0 ;i<list.length; i++){
            var temp = list[i];
            this.codelist.push(temp.code);
            this.nameList.push(temp.name);
          }
          if(defaultVal) {
            let arr = defaultVal.split(',')
            for(var i=0 ;i<list.length; i++){
              var temp = list[i];
              for(var t=0; t<arr.length ; t++) {
                if(temp.code === arr[t]) {
                  arr[t] = temp.name;
                }
              }
            }
            this.retDataChckList = arr;
          }

        }
      },
      created(){
        if(this.dataList != null &&this.dataList.length >0) {
          this.handleDataList(this.dataList,this.value );
        }else {
          if(this.dictType == 'dict') {

          }else if(this.dictType == 'sql') {

          }
          this.handleDataList(this.dataList);

        }
        if(this.isMutiple === true || this.isMutiple==='true' ) {
          this.max = this.nameList.length;
        }

      },watch:{
        value(n,o){
          if(this.n == null) {
            return;
          }
          let newVal = n.split(',');
          let retValue = [];
          for(var i=0; i<newVal.length; i++){
            var t = newVal[i];
            for(var k=0; k<this.codeList.length; k++){
              if(this.codeList[k] == t) {
                retValue.push(this.namelist[k]);
              }
            }
          }
          this.retDataChckListv = retValue ;

        },
        retDataChckList (newVal,oldVal) {
          console.log(this.msg+"   msg")
          let retValue = [];
          for(var i=0; i<newVal.length; i++){
            var t = newVal[i];
            for(var k=0; k<this.nameList.length; k++){
              if(this.nameList[k] == t) {
                retValue.push(this.codelist[k]);
              }
            }
          }
          this.$emit('input',  retValue.toString());
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
        value:{type:Object}
      },data(){

        return {
          commonList: [ '中国', 'Japan', 'America' ],
          codelist:[],
          nameList:[],
          max:1,
          retDataChckList:['张三'],
          msg:null
        }
      }
    }
</script>

<style scoped>

</style>
