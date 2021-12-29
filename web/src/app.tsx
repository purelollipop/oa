import { history } from 'umi';
import React from 'React';
console.log('app.tsx')
let extraRoutes:Record<string, any>[] = [];
export function patchRoutes({ routes }:any) {
  console.log('patchRoute')
  let token = window.sessionStorage.getItem('token')
  let href = window.location.href.split('/')
  extraRoutes = [
    {
      component: require('@/pages/index').default,
      routes:[
        { path: '/test', component: require('@/pages/test1/Test').default},
        { path: '/table', component: require('@/pages/table/Table').default},
        { path: '/ShowMessage', component: require('@/pages/message/index').default},
        {
          component: require('@/pages/404').default,
        },
      ]
    },
  ]
  routes[1].routes = extraRoutes
  if(token){
    fetch('/get').then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then((res) => {

      let first:string | null = window.sessionStorage.getItem('first')
      if(Number(first)){
        history.push('/')
        window.sessionStorage.setItem('first','0')
      }else{
        history.replace(`/${href[href.length-1]}`)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
export function render(oldRender:any) {
  console.log('render')
  oldRender();
}
