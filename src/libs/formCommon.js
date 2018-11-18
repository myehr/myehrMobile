//获取cookie、
export function setDefaultValue(i,formthis,sessionData) {
  var tempColumn = formthis.dataColumn[i];
  //初始化设置
  if (tempColumn.columnTypeDetail.textboxDataFromType === 'session') { //默认值为session回话参数时。
    let session = getSessionData();
    let formValue = tempColumn.columnTypeDetail.textboxDataFromValue;
    //后面实现
  }
  if (tempColumn.columnTypeDetail.textboxDataFromType === 'parameter') { //默认值为页面请求过来的参数表
    // let param = this.paramData;
    let param = {p1: 100, p2: '1111'};
    let formValue = tempColumn.columnTypeDetail.textboxDataFromValue;
    console.log(formValue + '************************88')
    formthis.formData[tempColumn.columnId] = param[formValue];
  }
  if (tempColumn.columnTypeDetail.textboxDataFromType === 'constant') { //默认值为常量参数
    let formValue = tempColumn.columnTypeDetail.textboxDataFromValue;
    formthis.formData[tempColumn.columnId] = formValue;
  }
  if (tempColumn.columnTypeDetail.textboxDataFromType === 'currentdate') { //默认值为常量参数
    let date = new Date();
    let formatTime = dateFormat(date);
    formthis.formData[tempColumn.columnId] = formatTime;
  }
  if (tempColumn.columnTypeDetail.textboxDataFromType === 'initFun') { //默认值为自定义函数

    let formValue = tempColumn.columnTypeDetail.textboxDataFromValue;
    formthis.formData[tempColumn.columnId] = (eval("formthis." + formValue + "('" + tempColumn.columnId + "');"));
  }
}

export function refreshDictCache(formId, buttonId,_this) {
  _this.$axios.post('/myehr/form/refreshDictCache.action?formId=' + formId + '&buttonId=' + buttonId)
    .then(function (response) {
    }.bind(this))
    .catch(function (error) {

    });

}

/**
 * 获取表单初始化过滤参数
 * @param queryParam 路由跳转传入参数
 * @param compParam  组件传入参数
 */
export function getInitFilterParam(queryParam,compParam,filterConfig) {

 // 0: {id: "", text: "请选择..."}
//  1: {id: "session", text: "会话数据"}
 // 2: {id: "parameter", text: "参数数据"}
 // 3: {id: "constant", text: "常量"}
 // 4: {id: "initFun", text: "自定义初始化方案"}
 // 5: {id: "customParam", text: "容器参数"}
 // 6: {id: "urlParam", text: "url参数"

  //合并对象
  Object.assign(queryParam, compParam);
  var result = {};
  if(filterConfig!=null &&filterConfig.length > 0 ) {
    for(var i=0; i<filterConfig.length; i++) {
      if(filterConfig[i].paramType === 'parameter') {
        if(queryParam[filterConfig[i].paramValue] != null ) {
          result[filterConfig[i].paramName] = queryParam[filterConfig[i].paramValue];
        }
      }
    }
  }else {
    return {};
  }
  return result;
}
export function dateFormat(date,format) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if(format === 'YYYY-MM-DD') {
    return  year+'-'+month+'-'+day;
  }
  if(format === 'YYYY-MM-DD HH') {
    return  year+'-'+month+'-'+day+' '+hour;
  }
  if(format === 'YYYY-MM-DD HH:mm') {
    return  year+'-'+month+'-'+day+' '+hour+":"+minute;
  }
  if(format === 'YYYY-MM-DD HH:mm:SS') {
    return  year+'-'+month+'-'+day+' '+hour+":"+minute+":"+second;
  }
   return  year+'-'+month+'-'+day+' '+hour+":"+minute+":"+second;
}
