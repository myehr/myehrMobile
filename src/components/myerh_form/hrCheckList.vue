<template>
  <div class="vux-x-input weui-cell  weui-cell:before">
    <div class="weui-cell__hd">
      <label for="vux-x-input-uosjx" class="weui-label" style="width: 4em;">{{title}}</label>
    </div>
    <div class="weui-cell__bd weui-cell__primary" style="text-align: right" v-if="readonly !== true">
      <checklist  class="weui-cell__bd weui-cell__primary"  :options="nameList" v-model="retDataChckList" :max="max" @on-change="change"></checklist>
    </div>
    <div class="weui-cell__ft" v-if="readonly !== true">
      <i class="weui-icon weui_icon_clear weui-icon-clear" style="display: none;"></i>
      <i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" :title="errorMessage" style="" v-if="!valid" v-on:click="showErrorMsg"></i>
    </div>
    <div v-if="readonly === true">
      {{ readOnlyText }}
    </div >
    <toast v-model="shoToaskMsg" type="text" :time="800" is-show-mask :text="errorMessage"  ></toast>


  </div>
  <!--  <popup-header id="vux-x-input-sc1cr" :left-text="$t('cancel')" :right-text="13131213" title="2332432"></popup-header>-->

   <!-- {{ value }}
    <x-switch v-model="show1" title="选择"></x-switch>

    &lt;!&ndash; 弹出 &ndash;&gt;
    <div v-transfer-dom >
      <popup v-model="show1">
        &lt;!&ndash; group already has a top border, so we need to hide header's bottom border&ndash;&gt;
        <popup-header
          left-text="取消"
          right-text="确认"
          title="请选择"
          :show-bottom-border="false"
          @on-click-left="show1 = false"
          @on-click-right="show1 = false"></popup-header>
        <group gutter="0">
          <radio v-model="selectValue" :options="['北京', '上海', '南京', '武汉']"></radio>
        </group>
      </popup>
    </div>-->
  </div>
</template>

<!--<i18n>
  cancel:
  zh-CN: 取消
  done:
  zh-CN: 确定
  Please select your card:
  zh-CN: 请选择银行卡
  used with Popup:
  zh-CN: Popup 中使用
  Card 1:
  zh-CN: 招商银行
  Card 2:
  zh-CN: 工商银行
  Card 3:
  zh-CN: 农业银行
  Card 4:
  zh-CN: 增加银行卡
</i18n>-->


<script>
  import Checklist  from '@/components/checklist/index.vue'
  import Toast from '@/components/toast/index.vue'
 /* import PopupHeader from '@/components/popup-header/index.vue'
  import Popup from '@/components/popup/index.vue'
  import XSwitch  from '@/components/x-switch/index.vue'
  import Radio from '@/components/radio/index.vue'
  import TransferDom from '@/directives/transfer-dom'*/
  export default {
    name: "hrCheckList",
    components: {
      Toast,
      Checklist/*,
      PopupHeader,
      Popup,
      XSwitch,
      Radio*/
    },/*directives: {
      TransferDom
    },*/
    methods:{
      getDictData () {

      },
      showErrorMsg(){
        this.shoToaskMsg= true;
      },
      getNameByCode(){
        if(this.value == null || this.value === '') {
          return null;
        }
        var textVal = [];
        var arr = this.value.split(',');
        for(var i=0; i<this.codeList.length; i++){
          for(var k=0; k<arr.length; k++){
            if(this.codeList[i] === arr[k]) {
              textVal.push(this.nameList[i]);
            }
          }

        }
        return textVal.toString();
      },
      handleDataList (list,defaultVal) {
        for(var i=0 ;i<list.length; i++){
          var temp = list[i];
          this.codeList.push(temp.code);
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
      if(this.readonly === true) {
        this.readOnlyText =  this.getNameByCode(this.value);
        return ;
      }
      if(this.required === true || this.required === 'true') {
        if(this.retDataChckList === null ||this.retDataChckList.length ===0) {
          this.valid = false;
        }
      }

    },watch:{
      valid (newVal, oldVal) {
        this.$emit('onValidChange',newVal);
      },
      selectValue(n,o){
        console.log(o)
      },
      value(n,o){
         if(n == null || n == '') {
           if(this.required == true || this.required == 'true' ){
             this.valid = false;
           }
           this.retDataChckList = null;
           return ;
         }
        this.valid = true;
        this.$emit('onValidChange',this.valid );
        let newVal = n.split(',');
        let retValue = [];
        for(var i=0; i<newVal.length; i++){
          var t = newVal[i];
          for(var k=0; k<this.codeList.length; k++){
            if(this.codeList[k] == t) {
              retValue.push(this.nameList[k]);
            }
          }
        }
        this.retDataChckList = retValue ;

      },
      retDataChckList (newVal,oldVal) {
        console.log(newVal+'*********')
        let retValue = [];
        for(var i=0; i<newVal.length; i++){
          var t = newVal[i];
          for(var k=0; k<this.nameList.length; k++){
            if(this.nameList[k] == t) {
              retValue.push(this.codeList[k]);
            }
          }
        }
        if(this.required === true || this.required === 'true') {
          if(newVal === null ||newVal.length ===0) {
            this.valid = false;
          }else {
            this.valid = true;
          }
        }
        this.$emit('input',  retValue.toString());
      }
    },props:{
      dictId:{},
      dictType:{},
      isMutiple:{},
      dataList:{}, //下来数据 如果此数据有值 优先取此字段
      style:{}, //样式 shirnk分收缩样式 纵向展开式(portrait)  横向展开式（transverse）
      value:{type:Object},
      required:{},
      readonly:{},
      title:{}
    },data(){

      return {
        readOnlyText:null,
        commonList: [ '中国', 'Japan', 'America' ],
        codeList:[],
        nameList:[],
        max:1,
        retDataChckList:['张三'],
        msg:null,
        show1:false,
        selectValue:null,
        valid:true,
        errorMessage:'必选项',
        shoToaskMsg:false
      }
    }
  }
</script>

<style scoped>
  .inline {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
</style>
