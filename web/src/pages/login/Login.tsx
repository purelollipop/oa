import React from 'react';
import {history} from 'umi';
import ajaxFun from "@/setting/proxy";

interface props {}

const Login: React.FC<props> = (props) => {
  return (
    <>
      <button onClick={()=>{
        window.sessionStorage.setItem('token','123')
        window.sessionStorage.setItem('first','1')
        let data = {name:'user',pas:'123456'}

        ajaxFun('api/login','POST',data,{
          'Content-Type': 'application/json'
        }).then((res:Record<string, any>)=>{
          console.log(res)
        })
       setTimeout(()=>{
         // window.location.reload()
         history.push('/')
       },500)
      }}>push</button>
      LoginLoginLoginLogin
    </>
  );
};
export default Login
