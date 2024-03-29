import { history } from 'umi';
import React from 'React';
let extraRoutes:Record<string, any>[] = [];
export function patchRoutes({ routes }:any) {
  // let token = window.sessionStorage.getItem('token')
  // let href = window.location.href.split('/')
  extraRoutes = [
    {
      component: require('@/pages/index').default,
      routes:[
        { path: '/test', component: require('@/pages/test1/Test').default},
        { path: '/table', component: require('@/pages/table/Table').default},
        { path: '/ShowMessage', component: require('@/pages/message/index').default},
        { path: '/', redirect: '/test'},
        {
          component: require('@/pages/404').default,
        },
      ]
    },
  ]
  // routes[1].routes = extraRoutes
 /* if(token){
    fetch('/api/getData').then(res=>{
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
  }*/
}
export function render(oldRender:any) {
  console.log('render')
  oldRender();
}
