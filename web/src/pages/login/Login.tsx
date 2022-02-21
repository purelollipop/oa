import React,{useEffect, useState} from 'react';
import {history} from 'umi';
import ajaxFun from "@/setting/proxy";
import {Input, Button, message} from 'antd';
import  './login.css';


interface props {}

const Login: React.FC<props> = (props) => {
  const [user,setUser] = useState<string>("")
  const [pass,setPass] = useState<string>("")

  return (
    <div className="login">
      <div>
        用户名<Input placeholder="Basic usage" onChange={(event)=>{
         setUser(event.target.value)
        }
      }/>
        密码<Input.Password placeholder="Basic usage" onChange={(event)=>{
          setPass(event.target.value)
        }
      }/>
      </div>
      <Button onClick={()=>{
        let data = {name:user,pas:pass}
        // if(!user){
        //   message.warning('用户名');
        // }
        ajaxFun('api/login','POST',data,{
          'Content-Type': 'application/json'
        }).then((res:Record<string, any>)=>{
          if(res.code){
            window.sessionStorage.setItem('token','123')
            window.sessionStorage.setItem('first','1')
            history.push('/')
          }else{
            message.error('登录失败');
          }
        })
      }}>登录</Button>
    </div>
  );
};
export default Login
