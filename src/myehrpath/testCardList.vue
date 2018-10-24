<template>
    <div>
      <test-card-form2></test-card-form2>
      <div>
        <cell
          title="列表1"
          is-link
          :border-intent="false"
          :arrow-direction="isShow1 ? 'up' : 'down'"
          @click.native="isShow1 = !isShow1"></cell>
        <test-list1-config2  :contentHeight="contentHeight1"></test-list1-config2>
      </div>
      <div>
        <cell
          title="列表2"
          is-link
          :border-intent="true"
          :arrow-direction="isShow2 ? 'up' : 'down'"
          @click.native="isShow2 = !isShow2"></cell>
        <test-list1-config2  :contentHeight="contentHeight2"></test-list1-config2>
      </div>
    </div>
</template>

<script>
  import testList1Config2 from '@/myehrpath/testList1Config2.vue'
  import testCardForm2 from '@/myehrpath/testCardForm2.vue'
  import { Group} from 'vux'
  export default {
        name: "testCardList",
        components: {testList1Config2, testCardForm2,Group},
        watch:{
          isShow1(n,o){
            if(n === true) {
                this.contentHeight1 = "300px";
            }else {
              this.contentHeight1 = "0px";
            }
          },isShow2(n,o){
            if(n === true) {
              this.contentHeight2 = "300px";
            }else {
              this.contentHeight2 = "0px";
            }
          }
        },
        data(){
            return {
              isShow1:true,
              isShow2:false,
              contentHeight1:'300px',
              contentHeight2:'0px'
            }
        }
    }
</script>

<style scoped>

</style>
