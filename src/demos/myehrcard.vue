<template>
  <div >
    <group title="分组1">
      <!-- 自定义验证  -->
      <x-input title="姓名："  placeholder="请输入姓名" is-type="china-name" :aria-readonly="true"></x-input>

      <!-- 自定义验证  -->
      <x-input title="自定义验证：" :is-type="be2333"  placeholder="自定义验证" ></x-input>

      <!-- 系统自带验证 -->
      <x-input title="手机号码："  placeholder="请输手机号码" is-type="china-mobile"></x-input>

      <x-input title="邮箱：" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
    </group>
    <group title="分组2">
      <x-input title="长度限制:" placeholder="最小2最大5" :min="2" :max="5"></x-input>

      <x-input title="*必填:" placeholder="必填限制" required ></x-input>

      <check-icon :value.sync="defaultCheckValue" type="plain" > 单选选项</check-icon>
      <check-icon :value.sync="defaultCheckValue" type="plain" > 单选选项2</check-icon>
    </group>

    <group title="分组3">
      <calendar :readonly="false" v-model="defaultDate" title="选择日期:" disable-past placeholder="选择日期" ></calendar>

      <checklist title="下拉单选:" :options="commonList"  :max="1" ></checklist>

      <popup-picker title="下拉单选方式2" :data="list1"    placeholder="请选中"></popup-picker>

      <checklist title="下拉多选:" :options="commonList"  ></checklist>

      <x-switch title="开关式" ></x-switch>

      <datetime  title="选择时间(分):" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" ></datetime>
    </group>


  </div>
</template>

<script>
    import { XInput,Calendar, Group, XButton, Cell,CheckIcon,Checklist,XSwitch ,Datetime,PopupPicker} from 'vux'
    export default {
        name: "myehrcard",
        components: {
          XInput,
          Group,
          Cell,
          CheckIcon,
          Calendar,
          Checklist,
          XSwitch,
          Datetime,
          PopupPicker
        },
        data (){
          return {
            be2333: function (value) {
              return {
                valid: value === '2333',
                msg: 'Must be 2333'
              }
            },
            defaultCheckValue:true,
            defaultDate:'TODAY',
            commonList: [ '中国', '日本', '美国' ],
            radioValue:'中国',
            list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']]
          }
        }
    }
</script>

<style scoped>

</style>
