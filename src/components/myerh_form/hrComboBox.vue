<template>
  <div class="vux-x-input weui-cell  weui-cell:before">
    <div class="weui-cell__hd">
      <label for="vux-x-input-uosjx" class="weui-label" style="width: 4em;">{{title}}</label>
    </div>
    <div class="weui-cell__bd weui-cell__primary" style="text-align: right"  v-if="readonly !== true">
      <popup-picker  @onValidChange="onValidChange" v-model="currentValue"  @on-show="onShow" :disabled="readonly" :placeholder="placeholder"
                    :is-type="checkType"   :data="dataList" :columns="1" showName="true"></popup-picker>
    </div>

    <div v-if="readonly === true" style="width:100%;text-align: right">
        {{ readOnlyText }}
    </div >

    <div class="weui-cell__ft" v-if="readonly !== true">
      <i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" :title="errorMessage" style="" v-if="valid===false" v-on:click="showErrorMsg"></i>
    </div>
    <toast v-model="shoToaskMsg" type="text" :time="800" is-show-mask :text="errorMessage"  ></toast>
  </div>
</template>

<script>
  import  PopupPicker from '@/components/popup-picker/index.vue'
  import  Picker from '@/components/picker/index.vue'
  import  Cell from '@/components/cell/index.vue'
  import Toast from '@/components/toast/index.vue'
  export default {
    components: {
      PopupPicker,
      Picker,
      Cell,
      Toast
    },
    props: {
      title: {},
      value: {type: Object},
      required: {},
      readonly: {},
      placeholder: {},
      checkType: {},
      data:[]
    },
    methods: {
      onShow () {
      //  console.log(this.dataList)
      },
      onValidChange (n) {
        this.$emit('onValidChange', n)
      },showErrorMsg(){
        this.shoToaskMsg= true;
      }
    },
    created () {
      if(this.readonly === true) {
        this.readOnlyText = '';
        for(var i=0; i<this.data.length; i++) {
          if(this.value === this.data[i].code) {
            this.readOnlyText = this.data[i].name;
          }
        }
        return ;
      }
      if(this.data) {
        for(var i=0; i<this.data.length; i++) {
          this.dataList.push({value:this.data[i].code,name:this.data[i].name})
        }
      }
      if(this.value != null) {
        this.currentValue = this.value.toString().split(',')
      }

      if (this.required === true || this.required === 'true') {
        if (this.value == null || this.value === '' || this.value === undefined) {

          this.valid = false
        } else {
          this.valid = true
        }
      }
    },
    watch: {
      valid (n, o) {
        this.$emit('onValidChange', n)
      },
      currentValue (n, o) {
        if (this.required === true || this.required === 'true') {
          if (n == null || n === ''|| n === undefined ||n == ''  ) {
            this.valid = false
          } else {
            this.valid = true
          }
        }
        this.$emit('input', n != null?n.toString():null)
      }
    },
    data () {
      return {
        currentValue: null,
        valid: true,
        dictValue:{},
        dataList:[],
        shoToaskMsg:false,
        errorMessage:'必选项',
        readOnlyText:null
      }
    }
  }
</script>

<style scoped>
  .picker-buttons {
    margin: 0 15px;
  }
</style>
