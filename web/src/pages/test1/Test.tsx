import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, Button, Input, Modal, message} from 'antd';
import ajaxFun from "@/setting/proxy";
interface props {}
interface user{
  user:string,
  password:string
}
function Test () {
  const [listData, setlistData] = useState<Record<string, any>[]>([])
  const [addWindowFlag, setAddWindowFlag] = useState<boolean>(false)
  const [addUser,setAddUser] = useState<user>({
    user:"",
    password:""
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: 'licenses',
      dataIndex: 'id',
    },
    {
      title: '操作',
      render:(text:string,record:any) =>
        <>
          <Button danger onClick={deleteFun(record)}>删除</Button>
        </>,
    },
  ];
  /* 新增 */
  const addFun = ()=>{
    setAddWindowFlag(true)
  }
  /* 删除 */
  const deleteFun = (data:any)=>{
    return ()=>{
      ajaxFun('api/deleteUser','POST',{
        id:data.id
      }).then((res:Record<string, any>)=>{
       if(res.code){
         message.success('操作成功')
         initFun()
       }else{
         message.success(`操作失败${res.codeMessage}`)
       }
      })
    }
  }
  /* 弹窗确定 同时用户*/
  const addWindowOk = () => {
    if(!addUser){
      message.info('用户名不能为空');
    }
    ajaxFun('api/addUser','POST',{name:addUser.user,pass:addUser.password},{
      'Content-Type': 'application/json'
    }).then((res:Record<string, any>)=>{
      if(res.code){
        message.info('添加成功');
        addWindowCancel()
        initFun()
      }else{
        message.info('添加失败');
      }
    })
  };
  /* 关闭弹窗 同时新增用户*/
  const addWindowCancel = () => {
    setAddUser({
      user:"",
      password:""
    })
    setAddWindowFlag(false);
  };
  function initFun(){
    ajaxFun('api/userList','GET').then((res:Record<string, any>[])=>{
      for (let i = 0; i < res.length; i++) {
        res[i].key = res[i].id
      }
      setlistData(res)
    })
  }
  useEffect(()=>{
    initFun()
  },[])
  return (
    <>
      <Modal title="新增用户" visible={addWindowFlag} onOk={addWindowOk} onCancel={addWindowCancel}>
        <div>
          用户名
          <Input value={addUser.user} onChange={
            (event:any)=>{setAddUser({user:event.target.value,password:addUser.password})}
          }/>
          密码
          <Input value={addUser.password} onChange={
            (event:any)=>{setAddUser({user:addUser.user,password:event.target.value})}
          }/>
        </div>
      </Modal>
      <Button size={"small"} onClick={addFun}>添加</Button>
      <Table columns={columns} dataSource={listData} />
    </>
  );
};
// Test.wrappers = ['@/wrappers/auth']
export default Test
