import React, {useEffect, useState} from 'react';
import { Table, Tag, Space,Button  } from 'antd';
import ajaxFun from "@/setting/proxy";
interface props {}

function Test () {
  const [listData, setlistData] = useState<Record<string, any>[]>([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: 'licenses',
      dataIndex: 'idcode',
    },
    {
      title: 'class',
      dataIndex: 'className',
    },
  ];
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
      <Button size={"small"}>添加</Button>
      <Table columns={columns} dataSource={listData} />
    </>
  );
};
// Test.wrappers = ['@/wrappers/auth']
export default Test
