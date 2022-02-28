import { message } from 'antd';
let base = ''
if(process.env.NODE_ENV === "development"){
  base = "http://localhost:8082/"
}
interface headOption{
  "Content-Type": string
  [key: string]: string
}
interface httpObj{
  url: string,
  method: string,
  data?: Record<string, unknown>,
  option?: headOption,
}

declare type methods = 'get' |'GET'| 'post'|'POST' | 'delete'|'DELETE' | 'put'|'PUT'

function ajaxFun(obj: httpObj): any
function ajaxFun(url: string,method: methods,data?: object,option?: headOption): any
function ajaxFun(urlOrObj: httpObj | string,method?: methods,data?: any,option?: headOption): any{
  const token = window.sessionStorage.getItem('token')
  const token_type = window.sessionStorage.getItem('token_type')
  let url = "";
  let head: headOption = {
    "Content-Type":'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    "Authorization":`${token_type} ${token}`
  }
  let initObj = {}
  if(typeof urlOrObj !== 'object'){
    if(option){
      head = option
      head.Authorization = `${token_type} ${token}`
    }
    url = `${base}${urlOrObj}`;
    if(method === 'get'){
      if(typeof data === 'object'){
        Object.keys(data).map((ele,val)=>{
          if(val){
            url = `${url}&${ele}=${data[ele]}`
          } else {
            url = `${url}?${ele}=${data[ele]}`
          }
        })
      }
      initObj = {
        method: 'get',
        headers: head,
      }
    } else {
      initObj = {
        method: method,
        headers: head,
        body: JSON.stringify(data)
      }
    }
  } else {
    url = urlOrObj.url;
    if(urlOrObj.option){
      head = urlOrObj.option
      head.Authorization = `${token_type} ${token}`
    }
    url = `${base}${url}`
    if(urlOrObj.method === 'get'){
      if(typeof urlOrObj.data === 'object'){
        Object.keys(urlOrObj.data).map((ele,val)=>{
          if(val){
            url = `${url}&${ele}=${urlOrObj.data![ele]}`
          } else {
            url = `${url}?${ele}=${urlOrObj.data![ele]}`
          }
        })
      }
      initObj = {
        method: 'get',
        headers: head,
      }
    } else {
      initObj = {
        method: urlOrObj.method,
        headers: head,
        body: JSON.stringify(urlOrObj.data)
      }
    }
  }
  const myRequest = new Request(url, {...initObj});
  return new Promise((resolve,reject)=>{
    fetch(myRequest).then(res=>{
      if(res.ok){
        return res.json()
      }else{
        return message.error(`错误状态码为${res.status} - 错误信息为${res.statusText}`,8);
      }
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
      return message.error(`请求错误${err}`,5);
    })
  })
}

export default ajaxFun
