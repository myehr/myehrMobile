<template>
    <div class="box_listcard">
      <test-card-form2 v-model="formData" :params="cardParams"></test-card-form2>



      <div>
        <div  v-on:click="isShow1 = !isShow1"  data-v-1548e98c="" class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
          <div  class="weui-cell__hd"></div> <div class="vux-cell-bd vux-cell-primary">
          <p>
            <label class="vux-label" style="margin-right: 20px" >列表1</label>
            <x-button mini type="primary"   @click.native="addNew1" >添加</x-button>
          </p>
          <span class="vux-label-desc"></span></div>
          <div  :class="{'vux-cell-arrow-down':!isShow1,'vux-cell-arrow-up':isShow1}"  class="weui-cell__ft vux-cell-arrow-transition ">  <!---->
          </div>
        </div>


        <test-list1-config2  :contentHeight="contentHeight1" :params="listParams1" ></test-list1-config2>
      </div>
      <div>
        <div  v-on:click="isShow2 = !isShow2"  data-v-1548e98c="" class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
          <div  class="weui-cell__hd"></div> <div class="vux-cell-bd vux-cell-primary">
          <p>
            <label class="vux-label" style="margin-right: 20px" >列表2</label>
            <x-button mini type="primary"   @click.native="addNew2" >添加</x-button>
          </p>
          <span class="vux-label-desc"></span></div>
          <div  :class="{'vux-cell-arrow-down':!isShow2,'vux-cell-arrow-up':isShow2}"  class="weui-cell__ft vux-cell-arrow-transition ">  <!---->
          </div>
        </div>
        <test-list1-config2  :contentHeight="contentHeight2" :params="listParams2"></test-list1-config2>
      </div>
    </div>
</template>

<script>
  import testList1Config2 from '@/myehrpath/testList1Config2.vue'
  import testCardForm2 from '@/myehrpath/testCardForm2.vue'
  import XButton from '@/components/x-button/index.vue'
  import { Group} from 'vux'
  export default {
        name: "testCardList",
        components: {testList1Config2, testCardForm2,Group,XButton},
        methods:{
          addNew1(){
            this.gotoMyehrPath('/myehrpath/testList1Config2Edit',{isInit:false,row:{}},'添加');
          },
          addNew2(){
            this.gotoMyehrPath('/myehrpath/testList1Config2Edit',{isInit:false,row:{}},'添加');
          }
        },
        created(){
          this.inParams = this.$route.query;
          this.cardParams = this.inParams;
        },
        watch:{
          formData(n,o){
            console.log('****************************************')
            console.log(n)
            this.listParams1 = {}
          },
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
              contentHeight2:'0px',
              formData:null,
              //卡片参数
              cardParams:null,
              inParams:null,
              //列表参数
              listParams1:null,
              listParams2:null
            }
        }
    }
</script>

<style scoped>
  .box_listcard{
    margin-bottom: 50px;
  }
</style>
