<template>
  <basic-container>
    <div v-if="showIndex == 1">
      <avue-crud v-bind="bindVal"
                 :key="reload"
                 ref="crud"
                 v-on="onEvent"
                 v-model="form"
                 v-model:page="page"
                 v-if="loadFlag"
                 :table-loading="loading"
                 :cell-style="cellStyle"
      >
        <!-- 右侧按钮 -->
        <template v-if="tableOption.buttonList" #menu="{row}">
          <template v-for="item in tableOption.buttonList.menuList">
            <el-button v-if="item.info?(item.mode == 'commd' || item.mode == 'dialog') && (row[item.info.props] == item.info.show || row[item.info.props] == item.info.show1):item.mode == 'commd' || item.mode == 'dialog'"  :type="item.type?item.type:'primary'" plain @click="changeOpen(row,item.component,item.title,item.mode,item.dialogWidth,item.path,item.params)" :icon="item.icon" text>{{item.name}}</el-button>
            <el-button v-if="item.mode == 'router' && row[item.info.prop] == item.info.show" type="primary" @click="routerFn(row,item)" :icon="item.icon" text>{{item.name}}</el-button>
            <el-button v-if="item.mode == 'switch' && (row[item.info.prop] == item.info.show || row[item.info.prop] == item.info.show1)" type="primary" @click="switchFn(row,item)" :icon="item.icon" text>{{item.name}}</el-button>
            <el-button v-if="item.mode == 'add'" type="primary" @click="addFn(row)" :icon="item.icon" text>{{item.name}}</el-button>
            <el-button v-if="item.mode == 'change' && (row[item.info.props] == item.info.show || row[item.info.props] == item.info.show1)" type="primary" @click="switchFn(row,item)" :icon="item.icon" text>{{item.name}}</el-button>
          </template>
        </template>
        <!-- 上方按钮 -->
        <template  #menu-left>
          <template v-for="item in tableOption.buttonList.menuLeftList" v-if="tableOption.buttonList">
            <el-button v-if="item.mode == 'commd' || item.mode == 'dialog'" :icon="item.icon"  @click="changeOpen(row,item.component,item.title,item.mode,item.dialogWidth,item.path)" :type="item.type?item.type:'primary'" plain>{{item.name}}</el-button>
            <el-button v-if="item.mode == 'router'" :icon="item.icon" >{{item.name}}</el-button>
            <el-button v-if="item.mode == 'request'" :icon="item.icon" @click="changeRequest(item)">{{item.name}}</el-button>
<!--            <el-tag v-if="item.mode == 'tag'"  :type="item.type" style="margin-right:20px;">{{item.name}}:{{item.info.prop}}</el-tag>-->
          </template>
          <!-- 左上角tag-->
          <template v-if="top">
            <el-tag :type="item.style" v-for="(item,key) in top">{{item.label}}：{{item.value}}</el-tag>
          </template>
        </template>
        <!-- 列表tag-->
<!--        <template #menu="{row}">-->
<!--          <el-button type="primary" icon="Document" text @click="templateConfig(row)">模板配置</el-button>-->
<!--        </template>-->
      </avue-crud>
    </div>
    <!-- 打开页面样式 -->
    <div v-if="showIndex == 2" class="detail">
      <div>
        <div class="header">
        <span>
          <div class="header_div" @click="showIndex = 1">
            <el-icon><Back/></el-icon>
            <span>{{ comTitle?comTitle:'返回' }}</span>
          </div>
        </span>
        </div>
        <div class="btm"></div>
      </div>
      <component :is="bottomPanel" ref="comRef" @close="close" @refreshData="refreshData"></component>
    </div>
    <!-- 弹框样式 -->
    <el-dialog :title="comTitle?comTitle:'返回'" v-model="dialogVisible" @close="dialogVisible = false" :width="dialogWidth?dialogWidth:'60%'">
      <component :is="bottomPanel" ref="comRef" @close="close" @refreshData="refreshData"></component>
    </el-dialog>
  </basic-container>
</template>

<script>
import {getOption} from "@/api/link/dynamiclink";
import {check} from "@/api/currency";
import {checkForm} from "@/api/currency";
export default  window.$crudCommons({
  data(){
    return{
      bottomPanel:null,
      reload: Math.random(),
      loadFlag: false,
      moduleName: "",
      query: {},
      tableOption: {
        index: true,
        buttonList: {
          menuList: [],
          menuLeftList: [],
          headerList: []
        }
      },
      dialogVisible: false,
      certificateList: {},
      idValue: '',
      codeVisible: false,
      chooseCode: {},
      showIndex:1,// 1:列表 2:組件
      comView:'',
      comTitle:'',
      dialogWidth:'',
    }
  },
  methods:{
    init(data,params){
      this.dataClear();
      this.params = params ? params : {}
      this.showIndex = 1;
      this.tableOption = {
        index: true,
        buttonList: {
          menuList: [],
          menuLeftList: [],
          headerList: []
        }
      }
      this.getTableOption(data);
    },
    getTableOption(data){
      if(!data.linkCode){ //固定值
        if(data.listUrl){
          this.listUrl = data.listUrl
        }else{
          this.listUrl = data.moduleName +'/page'
        }
        if(data.moduleName){
          this.moduleName = data.moduleName;
        }
        if(data.listType){
          this.listType = data.listType
        }else{
          this.listType = ""
        }
        this.tableOption = data;
        this.tableColumn = data.column;
        this.menuList();
        this.loadFlag = true;
        this.loading = false;
        this.reload = Math.random()
      }else{ //动态值
        getOption(data.linkCode).then(res=>{
          let resData = res.data.data;
          if(data.listUrl){
            this.listUrl = data.listUrl
          }else{
            this.listUrl = data.moduleName +'/page'
          }
          if(data.moduleName){
            this.moduleName = data.moduleName;
          }
          if(data.listType){
            this.listType = data.listType
          }else{
            this.listType = ""
          }
          if(data.menu){ // js中操作显示按钮的显示隐藏  //../../componentClass/export/oneSales/detail.js
            Object.keys(data.menu).forEach((item,index) =>{
              resData[item] = Object.values(data.menu)[index]
            })
          }
          if(data.buttonList){ //自定义操作按钮
            resData.buttonList = data.buttonList;
          }
          resData.searchMenuSpan = 6;
          this.tableOption = resData;
          this.tableColumn = resData.column;
          this.menuList();
          this.loadFlag = true;
          this.loading = false;
          this.reload = Math.random()
        })
      }
    },
    menuList(){
      if(this.tableOption.buttonList){
        this.tableOption.buttonList.menuList = []
        this.tableOption.buttonList.menuLeftList = []
        this.tableOption.buttonList.headerList = []
        this.tableOption.buttonList.forEach(i=>{
          switch (i.menuType){
            case 'menu':
              this.tableOption.buttonList.menuList.push(i)
              break;
            case 'menuLeft':
              this.tableOption.buttonList.menuLeftList.push(i)
              break;
            default:
              return
          }
        })
      }
    },
    switchFn(row,item){
      let url = item.info.url
      // let prop = item.info.prop
      let params = item.info.prop;
      params.id = row.id;
      params.coopInfoId = row.coopInfoId

      // if(url  && item.info.value){
      if(url){
        // row[item.info.prop] = item.info.value
        // let id = row.id
        if(item.info.type == 'form'){
          checkForm(url,params,item.info.method).then(res =>{
            if(item.info.success){
              this.$message.success(item.info.success)
            }
            this.getList();
          })
        }else{
          check(url,params,item.info.method).then(res =>{
            this.getList();
          })
        }

      }
    },
    routerFn(row,item){
      let url = item.info.url
      let prop =  item.info.prop
      if(url){
        if(prop && item.info.value){
          this.$router.push({path:url,params:{[prop]: item.info.value}})
        }else {
          this.$router.push(url)
        }
      }
    },
    changeOpen(row,component,title,mode,dialogWidth,path,params){
      const modules = import.meta.glob('../../**/**/**/**/*.vue');
      let result = modules[component+'.vue'];
      if(result){
        result().then(res=>{
            this.bottomPanel = res.default
        }).catch(err=>{
          console.log('err=',err)
        })
      }
      if(mode == 'dialog'){ // 弹框
        this.dialogVisible = true
      }
      if(mode == 'commd'){
        this.showIndex = 2;
      }
      this.comView = component;
      this.comTitle = title;
      this.dialogWidth = dialogWidth;
      let obj = {...params}; //params 搜索参数
      if(obj){
        Object.keys(obj).forEach(key=>{
          obj[key] = row[obj[key]]
        })
      }
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$refs.comRef.init(row,title,path,obj);
        },200)
      })
    },
    //左上角按钮接口事件
    changeRequest(item){
      let param = {}
      check(item.info.url,param,item.info.method?item.info.method:'post').then(res=>{
        this.$message.success(item.info.success);
        this.getList();
      });
    },
    addFn(row){
      this.$refs.crud.option.column.filter((item) => {
        if (item.prop === "parentId") {
          item.value = row.id;
          item.addDisabled = true;
        }
      });
      this.$refs.crud.rowAdd();
    },
    close(){
      this.showIndex = 1;
      this.dialogVisible = false;
    },
    refreshData(){
      this.showIndex = 1;
      this.dialogVisible = false;
      this.getList();
    },
    //个别页面特殊处理
    //套餐使用分析和租户使用分析 状态样式
    cellStyle({row,column,rowIndex,columnIndex}) {
      let path = this.$route.path;
      if(path == '/operate/tenantAnalysis/index'){ //租户使用分析
        if (columnIndex == 6) {
          return row.type == 1? {color: "red"}:{color: "#e8d550"}
        }
      }
      if(path == '/operate/packageUse/index'){ //套餐使用分析
        if (columnIndex == 5) {
          return row.waringType == 0? {color: "red"}:{color: "#e8d550"}
        }
      }
      if(path == '/filing/source/index'){
          if (columnIndex == 6) {
            return row.authStatus == 1? {color: "green"}:{color: "red"}
          }
      }
    },

  }
})
</script>

<style scoped lang="scss">
:deep(.el-dialog__header){
  border-bottom:1px solid #f0f0f0;
}
:deep(.el-dialog__body){
  padding:15px 20px;
}
.detail {
  height: 100%;
  overflow: auto;
  z-index: 999;
  .header {
    padding: 0 22px 20px 22px;
    font-size: 20px;
    color: rgba(0, 0, 0, .85);
    .header_div {
      display: inline-block;
      cursor: pointer;
      i {
        font-size: 24px;
        margin-right: 5px;
        vertical-align: top;
        margin-top:3px;
      }
      &:hover {
        color: #1890ff;
      }
      span {
        font-weight: bold;
      }
    }
  }
}
.btm {
  margin: 0 8px;
  height: 1px;
  border-bottom: 1px solid #eee;
}
.el-tag{
  margin-right:15px;
}
:deep(.avue-crud__img){
  display: block;
}

</style>
