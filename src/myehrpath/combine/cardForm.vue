<template>
    <div>
        <test-card-form :compParams="params"></test-card-form>
    </div>
</template>

<script>

    import  testCardForm from '@/myehrpath/testCardForm.vue'

    export default {
        name: "cardForm",
        components: {
          testCardForm
        },data(){
          return {
            params:{"EMPEMPLOYEE_EMPID":"258"}
          }
      }
    }
</script>

<style scoped>

</style>
