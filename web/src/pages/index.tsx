import React from 'react';
import "./index.less";
import {Link,history} from "umi";
import { Layout, Menu, Badge, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretLeftOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
interface state {
  routeData:Record<string, any>[],
  headScrollData:Record<string, any>[],
  [k : string]:any
}

interface props {
}

export default class index extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      routeData:[],
      headScrollData:[],
      collapsed: false
    }
  }
  toggle  = ():void => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  goPageFUn = (data:string):void =>{
    history.push(data)
  }
  exiteFun = ():void => {
    window.sessionStorage.setItem('token','');
    window.sessionStorage.setItem('first','1');
    history.replace('/login')
  }
  leftMove = ():void => {
    let scrollDiv = document.getElementsByClassName('scrollDiv')[0]
    console.log(scrollDiv)
  }
  componentDidMount() {
    setTimeout(()=>{
      let a = [
        {
          name:'test',
          to:'/test',
          icon:'UserOutlined'
        },
        {
          name:'table',
          to:'/table',
          icon:'VideoCameraOutlined'
        },
        {
          name:'ShowMessage',
          to:'/ShowMessage',
          icon:'UploadOutlined'
        }
      ]
      let b = [...a]
      for (let i = 0; i < 20; i++) {
        let aa = JSON.parse(JSON.stringify(a[0]));
        aa.to = `aa.to${i}`
        b.push(aa)
      }

      this.setState({
        routeData : a
      })
      this.setState({
        headScrollData:b
      })
    },100)
  }
  public render() {
    return (
      <div className='mainCss'>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" ></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
              {
                this.state.routeData.map((ele,index)=>{
                  let ic = React.createElement((Icon as any)[ele.icon])
                  if(index===this.state.routeData.length-1){
                    return <Menu.Item icon={ic} key={index} onClick={()=>{
                      this.goPageFUn(ele.to)
                    }}>
                      {ele.name}
                      <span style={{display:"inline-block",color:'red',float:"right"}}>{index}</span>
                    </Menu.Item>
                  } else {
                    return <Menu.Item icon={ic}  key={index} onClick={()=>{
                      this.goPageFUn(ele.to)
                    }}>
                      {ele.name}
                    </Menu.Item>
                  }
                })
              }
              {/*<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">*/}
              {/*  <Menu.Item key="5">Option 5</Menu.Item>*/}
              {/*  <Menu.Item key="6">Option 6</Menu.Item>*/}
              {/*  <Menu.Item key="7">Option 7</Menu.Item>*/}
              {/*  <Menu.Item key="8">Option 8</Menu.Item>*/}
              {/*</SubMenu>*/}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="head">
                <div>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                  })}
                </div>
                <div>
                  <div className="scrollCla">
                    <div onClick={this.leftMove}><CaretLeftOutlined /></div>
                    <div>
                      <div className="scrollDiv">
                        {
                          this.state.headScrollData.map((ele)=>{
                            return<div key={ele.to}>
                              <Link to={ele.to} >
                                {ele.name}
                              </Link>
                            </div>
                          })
                        }
                      </div>
                    </div>
                    <div><CaretRightOutlined /></div>
                  </div>
                </div>
                <Button type="primary" size={"small"} onClick={this.exiteFun}>退出</Button>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '10px 10px',
                padding: 2,
                minHeight: 280,
              }}
            >
              <div className="mainView">
                { this.props.children }
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
