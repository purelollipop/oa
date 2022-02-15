import React, {useEffect, useState} from 'react';
import ajaxFun from "@/setting/proxy";
import {Button, Table, Tag, Space,} from "antd";

interface props {

}

const TableComponent: React.FC<props> = (props) => {
  const [listData, setlistData] = useState<Record<string, any>[]>([]);
  const columns = [
    {
      title: 'bookName',
      dataIndex: 'username',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: 'bookId',
      dataIndex: 'idcode',
    },
    {
      title: 'borrow',
      dataIndex: 'className',
    },
  ];
  function initFun(){
    ajaxFun('api/bookList','GET').then((res:Record<string, any>[])=>{
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

export default TableComponent
