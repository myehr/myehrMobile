<template>

  <div class="demo-list-box" id="demo_list_box" :style="{height: `${height}px`}">
    <group-title>

      <span class="bigicon fab fa-accusoft " />
      <span class="bigicon">流程发起</span>
    </group-title>

    <flexbox :gutter="0" v-for="(data, index) in datas" :key="index">

      <flexbox-item :span="1/4" v-for="temp in data"  class="cbox vux-1px-t vux-tap-active" @click.native="gotoStart(temp)">
        <div class="vux-1px-r cbox-inner ">
          <div class="rcorners1">

            <span class="fab fa-adn bigicon white"  />

          </div>
          <div >
            <span style="font-size: 13px">{{temp.name | camelCase}}</span>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem,GroupTitle,VuxComponentListData as components } from 'vux'
  import { mapState } from 'vuex'



  function camelCase (input) {
    let str = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
      return group1.toUpperCase()
    })

    str = str.replace(/_(.)/g, function (match, group1) {
      return group1.toUpperCase()
    })
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }

  export default {
    name: 'flowstart',
    components: {
      Flexbox,
      FlexboxItem,
      GroupTitle
    },
    filters: {
      camelCase
    },
    created() {

      this.$axios.post('/myehr/act/model/searchActModelList.action', {
        "order": "asc",
        "offset": 0,
        "limit": 10,
        "paramsMap": {
          "userId": "1"
        },
        "requestParam": {
          "flowType": "7"
        },
        "filter": {
          "searchValue": ""
        },
        "formId": "1041",
        "isView": null
      })
        .then(function (response) {
          var rows = response.data.rows;
          this.datas = this.split(rows);
          console.log(this.datas);
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });

    },
    activated () {
      document.querySelector('#demo_list_box').scrollTop = this.demoTop
    },
    mounted () {
      this.height = window.innerHeight - 46
    },
    methods: {
      gotoStart (temp) {
        console.log(temp)
        var businessUrl = "/myehr/form/selectBussinessIdByFormId.action?formId="+temp.actNodeFormId;
        //取businessid
        this.$axios.get(businessUrl).then(function (response) {
          console.log(response)
          var businessId = response.data;
          var formId = temp.actNodeFormId;
          var id = temp.id;
          var key = temp.key_;
          var url = '/myehr/form/toForm.action?formId='+formId+'&businessId='+businessId+'&id='+id +'&key'+key+'&flowAction=start&formType=APP';
          var query = {title:temp.name ,url:url};
          this.$router.push({path:'/myehrpath/iframe',query:query});
        }.bind(this))
          .catch(function (error) {
            console.log(error);
          });


      },
      split (array) {
        let chunks = []
        let count = Math.ceil(array.length / 4)
        while (count > 0) {
          chunks.push(array.slice((count - 1) * 4, count * 4))
          count--
        }
        chunks = chunks.reverse()
        const lastList = chunks[chunks.length - 1]
        const lastLength = lastList.length
        if (lastLength < 4) {
          for (let i = 0; i < 4 - lastLength; i++) {
            lastList.push({
              name: '----',
              icon: ''
            })
          }
        }
        return chunks
      }
    },
    data () {
      return {
        height: 0,
        datas: []
      }
    },
    computed: {
      ...mapState({
        demoTop: state => state.vux.demoScrollTop
      })
    }
  }
</script>

<style lang="less" scoped>
  .cbox {
    text-align: center;
  }
  .cbox-inner {
    padding: 15px 0;
    width: 100%;
    height: 100%;
  }
  .demo-list-box {
    margin-bottom: 10px;
    background-color: #fff;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .rcorners1 {
    border-radius: 25px;
    background: #8AC007;
    width:50px;
    height:50px;
    margin:0 auto;
    line-height: 3.8em;
    //margin:20,20,10,20;

  }

  .bigicon{
    font-size: 2em;
  }
  .red{
      color: red
    }
  .blue{
    color: #7FFFD4
  }
  .Brown{
    color: #A52A2A;
  }
  .white{
    color:#FAEBD7
  }

</style>
