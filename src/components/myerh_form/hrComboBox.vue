<template>
  <div>
      <popup-picker :title="title" @onValidChange="onValidChange" v-model="this.currentValue"  @on-show="onShow" :disabled="disabled" :placeholder="placeholder"
                    :is-type="checkType" :required="required"  :data="dataList" :columns="1"></popup-picker>
  </div>
</template>

<script>
  import  PopupPicker from '@/components/popup-picker/index.vue'
  import  Picker from '@/components/picker/index.vue'
  import  Cell from '@/components/cell/index.vue'
  export default {
    components: {
      PopupPicker,
      Picker,
      Cell
    },
    props: {
      title: {},
      value: {type: Object},
      required: {},
      disabled: {},
      placeholder: {},
      checkType: {},
      dataList:[],
      dictValues:[]//传入字典信息
    },
    methods: {
      onShow () {
        console.log(this.dictValues)
      },
      onValidChange (n) {
        this.$emit('onValidChange', n)
      }
    },
    created () {
      this.currentValue = this.value
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
          if (n == null || n === '' || n === undefined) {
            this.valid = false
          } else {
            this.valid = true
          }
        }
        this.$emit('input', n)
      }
    },
    data () {
      return {
        data () {
          return {
            currentValue: null,
            valid: true,
            dictValue:{}
          }
        }
      }
    }
  }
</script>

<style scoped>
  .picker-buttons {
    margin: 0 15px;
  }
</style>
