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
