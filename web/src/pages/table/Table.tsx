import React, {useEffect, useState} from 'react';
import ajaxFun from "@/setting/proxy";
import {Button, Table, Modal, Input, message, Space} from "antd";

interface props {}
interface borrowObj {
  borrowBookId:number|null,
  borrowName:string,
}

const TableComponent: React.FC<props> = (props) => {
  /* 表格数据  bookName | bookId | borrow | borrowName*/
  const [listData, setlistData] = useState<Record<string, any>[]>([]);
  /* 新增书籍弹窗开关 */
  const [addWindowFlag, setWindowFlag] = useState<boolean>(false);
  /* 新增书籍名字 */
  const [addBookName, setAddBookName] = useState<string>("");
  /* 借阅书籍弹窗开关 */
  const [borrowFlag, setborrowFlag] = useState<boolean>(false);
  const [borrowObj, setBorrowObj] = useState<borrowObj>({
    borrowBookId:null,
    borrowName:"",
  });

  const columns = [
    {
      title: 'bookName',
      dataIndex: 'bookName',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: 'bookId',
      dataIndex: 'bookId',
    },
    {
      title: 'borrow',
      dataIndex: 'borrowName',
    },
    {
      title: 'Action',
      render: (text:string, record:Record<string,any>) => (
        <div>
          <Button size={"small"} onClick={borrowFun(record)}>借书</Button>
          <Button size={"small"} type="primary">还书</Button>
          <Button size={"small"} type="primary" danger>删除</Button>
        </div>
      ),
    },
  ];
  function initFun(){
    ajaxFun('api/getBook','GET').then((res:Record<string, any>[])=>{
      for (let i = 0; i < res.length; i++) {
        res[i].key = res[i].bookId
      }
      setlistData(res)
    })
  }
  /* 开启弹窗 */
  const showModal = () => {
    setWindowFlag(true);
  };
  /* 弹窗确定 同时新增书籍*/
  const addWindowOk = () => {
    if(!addBookName){
      message.info('书名不能为空');
    }
    ajaxFun('api/addBook','POST',{bookName:addBookName},{
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
  /* 关闭弹窗 同时新增书籍*/
  const addWindowCancel = () => {
    setAddBookName("")
    setWindowFlag(false);
  };
  /* 借书 */
  const borrowFun = function (data:any){
    return ()=>{
      setBorrowObj({
        borrowBookId:data.bookId,
        borrowName:'',
      })
      setborrowFlag(true)
    }
  }
  const borrowWindowOk = () => {
    if(!borrowObj.borrowName){
      message.info('学生号不能为空');
    }
    ajaxFun('api/borrowBook',
      'POST',
      {bookId:borrowObj.borrowBookId,borrowName:borrowObj.borrowName}
    ).then((res:Record<string, any>)=>{
      if(res.code){
        initFun()
        borrowWindowCancel()
        message.info('添加成功');
        setborrowFlag(false);
      }else{
        message.info(res.codeMessage);
      }
    })
  };
  const borrowWindowCancel = () => {
    setBorrowObj({borrowBookId:null, borrowName:"",})
    setborrowFlag(false);
  };
  /* 还书 */
  /* 删除书 */
  useEffect(()=>{
    initFun()
  },[])
  return (
    <>
      <Modal title="新增书籍" visible={addWindowFlag} onOk={addWindowOk} onCancel={addWindowCancel}>
        <div>
          书名
          <Input value={addBookName} onChange={(event:any)=>{setAddBookName(event.target.value)}}/>
        </div>
      </Modal>
      <Modal title="借阅书籍" visible={borrowFlag} onOk={borrowWindowOk} onCancel={borrowWindowCancel}>
        <div>
          学生号
          <Input value={borrowObj.borrowName} onChange={(event:any)=>{
            let id = borrowObj.borrowBookId
            setBorrowObj({borrowBookId:id,borrowName:event.target.value})
          }}/>
        </div>
      </Modal>
      <Button size={"small"} onClick={showModal}>新增书籍</Button>
      <Table columns={columns} dataSource={listData} />
    </>
  );
};

export default TableComponent
