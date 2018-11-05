<template>
    <div>
      <lc_branchstaffing v-model="formData" :params="cardParams"></lc_branchstaffing>
      <div>
        <cell
          title="人员调配"
          is-link
          :border-intent="false"
          :arrow-direction="isShow0 ? 'up' : 'down'"
          @click.native="isShow0 = !isShow0"></cell>	  
        <lc_branchffing  :contentHeight="contentHeight0" :initParams="listParams0" ></lc_branchffing>
      </div>
      <div>
        <cell
          title="备注"
          is-link
          :border-intent="false"
          :arrow-direction="isShow1 ? 'up' : 'down'"
          @click.native="isShow1 = !isShow1"></cell>	  
        <lc_remark  :contentHeight="contentHeight1" :initParams="listParams1" ></lc_remark>
      </div>
    	<div style="margin-bottom:50px">
    		<cell
    			title="审批记录" 
    			is-link 
    			:border-intent="false" 
    			:arrow-direction="isShow ? 'up' : 'down'" 
    			@click.native="isShow = !isShow"></cell> 
    		<comentLists  :contentHeight="contentHeight" :initParams="componentParams" ></comentLists> 
    	</div>
    </div>
</template>
<script>
  import lc_branchstaffing from '@/myehrpath/form/TP_management/Xiamenprocess/lc_personnel/LC_Branchstaffing.vue'
  import lc_branchffing from '@/myehrpath/form/TP_management/Xiamenprocess/lc_personnel/LC_Branchffing.vue'
  import lc_remark from '@/myehrpath/form/TP_management/Xiamenprocess/lc_personnel/LC_REMARK.vue'
  import Group from '@/components/group/index.vue'
  import comentLists from '@/myehrpath/common/comentLists.vue'
  export default {
        name: "LC_Branchstaffing_tab",
        components: {lc_branchstaffing,lc_branchffing,lc_remark,Group,comentLists},
        created(){
          this.inParams = this.$route.query;
          this.cardParams = this.inParams;
          this.componentParams = this.inParams;
          	 this.listParams0 = this.inParams
          	 this.listParams1 = this.inParams
        },
        watch:{
          formData(n,o){
            this.listParams1 = {}
          },
          isShow(n,o){
            if(n === true) {
              this.contentHeight = "300px";
            }else {
              this.contentHeight = "0px";
            }
          },
          isShow0(n,o){
            if(n === true) {
                this.contentHeight0 = "300px";
            }else {
              this.contentHeight0 = "0px";
            }
          },
          isShow1(n,o){
            if(n === true) {
                this.contentHeight1 = "300px";
            }else {
              this.contentHeight1 = "0px";
            }
          },
        },
        data(){
            return {
              isShow:true,
              contentHeight:'300px',
              isShow0:false,
              contentHeight0:'0px',
              listParams0:null,
              isShow1:false,
              contentHeight1:'0px',
              listParams1:null,
              //卡片参数
              cardParams:null,
              inParams:null,
              formData:null
            }
        }
    }
</script>
<style scoped>
</style>
