import React, {useEffect, useState} from 'react';
import ShowMessage from "./asyncMessage";
import {Button, Input, message, Modal, Table} from "antd";
import ajaxFun from "@/setting/proxy";

interface props {}
interface res {
  code:number,
  data:any[]
}

const index: React.FC<props> = (props) => {
  /* 表格数据  studentName | studentId | borrow*/
  const [listData, setlistData] = useState<Record<string, any>[]>([]);
  /* 新增学生弹窗开关 */
  const [addWindowFlag, setWindowFlag] = useState<boolean>(false);
  /* 新增学生名字 */
  const [addStudentName, setStudentName] = useState<string>("");

  const columns = [
    {
      title: '人名',
      dataIndex: 'studentName',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: '学籍号',
      dataIndex: 'studentId',
    },
    // {
    //   title: '借的书',
    //   dataIndex: 'borrow',
    // },
    {
      title: 'Action',
      render: (text:string, record:Record<string,any>) => (
        <div>
          <Button size={"small"} type="primary" danger onClick={deleteFun(record)}>删除</Button>
        </div>
      ),
    },
  ]
  function initFun(){
    ajaxFun('api/getStudent','GET').then((res:res)=>{
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].key = res.data[i].studentId
      }
      setlistData(res.data)
    })
  }
  /* 删除 */
  const deleteFun = (data:Record<string, any>)=>{
    return ()=>{
      ajaxFun('api/deleteStudent','POST',{studentId:data.studentId},{
        'Content-Type': 'application/json'
      }).then((res:Record<string, any>)=>{
        if(res.code){
          message.info('删除成功');
          initFun()
        }else{
          message.info('删除失败');
        }
      })
    }
  }
  /* 开启弹窗 */
  const showModal = () => {
    setWindowFlag(true);
  };
  /* 弹窗确定 同时新增学生*/
  const addWindowOk = () => {
    if(!addStudentName){
      message.info('书名不能为空');
    }
    ajaxFun('api/addStudent','POST',{studentName:addStudentName},{
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
  /* 关闭弹窗 同时新增学生*/
  const addWindowCancel = () => {
    setStudentName("")
    setWindowFlag(false);
  };

  useEffect(()=>{
    initFun()
  },[])
  return (
    <>
      <Button size={"small"} onClick={showModal}>新增学生信息</Button>
      <Modal title="新增学生" visible={addWindowFlag} onOk={addWindowOk} onCancel={addWindowCancel}>
        <div>
          人名
          <Input value={addStudentName} onChange={(event:any)=>{setStudentName(event.target.value)}}/>
        </div>
      </Modal>
      <Table columns={columns} dataSource={listData} />
    </>
  );
};

export default index
