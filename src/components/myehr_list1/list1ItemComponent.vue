<template>
  <div>
  <div class="m-item">
    <div class="m-wrap">
      <div class="m-info">

          <div class="poster-c" v-show="isImgUrl" >
            <a  class="poster" style="opacity: 1; transition: opacity 0.5s ease-in;" v-bind:style="imgUrl">
              <i class="i-play"></i>
            </a>
          </div>
          <a  data-spm="d_440300_0_0_226591" class="m-item-content" v-on:click="onRowClick" >
            <div class="title" v-show="isShowTitle">
              <div class="show-name">{{title}}</div>
            </div>
            <div class="brief" v-for="(val, key, index) in showRowData">
              {{val}}
            </div>
          </a>

        <div class="btn-wrap">

          <div v-for="button in ibuttons" class="tpp-btn tpp-btn-primary brief"  v-on:click="buttomClick(button.buttonId)"  >
            <span v-bind:class="button.icon"  /> {{button.buttonName}}
          </div>




        <!--  <div  data-spm="d_440300_1_0_226591" class="tpp-btn tpp-btn-primary"> <span class="far fa-receipt"  /> 查看</div>
          <div href="" data-spm="d_440300_1_0_226591" class="tpp-btn tpp-btn-primary"><span class="fas fa-edit"  /> 修改</div>
          <div href="" data-spm="d_440300_1_0_226591" class="tpp-btn tpp-btn-primary"><span class="far fa-trash-alt"  /> 删除</div>-->

        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
    export default {
      name: "list1ItemComponent",
      created (){
          //处理数据

        if( this.standData.title == undefined || this.standData.title == null) {
          this.isShowTitle = false;
        }else {
          this.title =  this.standData.title
        }
        if( this.standData.imgUrl == undefined || this.standData.imgUrl  == null) {
          this.isImgUrl = false
        }else {
          this.imgUrl="background-image: url("+ this.standData.imgUrl+");"
          console.log(this.imgUrl)
        }

        console.log("(((((((((((((("+this.ibuttons)

      },
      props:{
        standData:{
          required:true
        },
        showRowData:{
          required:true
        },
        rowData:{
          required:true
        },
        ibuttons:{
          required:false
        }
      },
      data () {
        return {
          title:'ddddd标题',
          isShowTitle:true,
          imgUrl:null,
          isImgUrl:true
        }
      },
      methods:{
        getTitle:function () {
          return data.title;
        },
        buttomClick (buttonId){
          this.$emit('onRowButtonClick',buttonId,this.rowData);
        },
        onRowClick(){
          //this.$emit('onRowClick'.rowData);
          this.$emit('onRowClick',this.rowData);

        }
      }
    }
</script>

<style scoped>
  .container{
    -webkit-overflow-scrolling: touch;
  }
  .m-item {
    position: relative;
    background: #fff;
    padding-left: .9375rem;
    padding-left: 4vw;
  }
  .m-wrap{overflow-x:scroll;overflow-y:hidden;white-space:nowrap;-webkit-overflow-scrolling:touch}
  .m-info{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:.9375rem .9375rem .9375rem 0;padding:2vw 4vw 4vw 0}
  .poster-c{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;width:4.0625rem;width:17.3vw;height:5.9375rem;height:25.3vw;background-size:1.875rem 1.875rem;background-size:8vw 8vw}
  .poster {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    display: block;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }
  .m-item-content {
    padding-left: .625rem;
    padding-left: 2.7vw;
    padding-right: .625rem;
    padding-right: 2.7vw;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    overflow: hidden;
  }
  .btn-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: flex-end;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .title .show-name {
    color: #000;
    font-weight: 500;
    -webkit-box-flex: 0;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    max-width: 100%;
  }
  .brief {
    color: #777;
    font-size: 13px;
    margin-top: 3px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tpp-btn, .tpp-btn-primary {
    background-image: -webkit-linear-gradient(45deg,#ff7ba0,#ff4d64);
    background-image: linear-gradient(45deg,#ff7ba0,#ff4d64);
  }
  .tpp-btn {
    border: 0;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    background-color: transparent;
    box-sizing: border-box;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    margin: 5px;
    font-size: 12px;
    border-radius: 120px;
  }
  .m-item .m-wrap {
    /* background: transparent -webkit-linear-gradient(bottom,#ededed,#ededed 50%,transparent 0,transparent 0) 0 100% repeat-x; */
    background: transparent linear-gradient(0deg,#ededed,#ededed 50%,transparent 0,transparent 0) 0 100% repeat-x;
    background-size: 100% 1px;
  }
</style>
