import React from 'react';
import {history} from 'umi';

interface props {}

const Login: React.FC<props> = (props) => {
  console.log('logo.tsx')
  return (
    <>
      <button onClick={()=>{
        window.sessionStorage.setItem('token','123')
        window.sessionStorage.setItem('first','1')
        let data = {name:'user',pas:'123456'}
        fetch('api/login',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data)
        }).then(res=>{
          res.json()
        }).then(res=>{
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
