import React from 'react';
import "./index.less";
import {Link,history} from "umi";
import { Layout, Menu, Badge, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
interface state {
  routeData:Record<string, any>[],
  [k : string]:any
}

interface props {
}

export default class index extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      routeData:[],
      collapsed: false
    }
  }
  toggle  = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentDidMount() {
    setTimeout(()=>{
      let a = [
        {
          name:'test',
          to:'/test'
        },
        {
          name:'table',
          to:'/table'
        },
        {
          name:'ShowMessage',
          to:'/ShowMessage'
        }
      ]
      this.setState({
        routeData : a
      })
    },1000)
  }
  public render() {
    return (
      <div className='mainCss'>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
                <Badge count={25}  size={"small"}/>
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
                <span >Page index head</span>
                <div style={{display:'inline-block'}}>
                  {
                    this.state.routeData.map((ele)=>{
                      return <Link to={ele.to} key={ele.to}>{ele.name}</Link>
                    })
                  }
                </div>
                <Button type="primary" size={"small"} onClick={()=>{
                  window.sessionStorage.setItem('token','');
                  window.sessionStorage.setItem('first','1');
                  history.replace('/login')
                  // window.location.reload()
                }}>退出</Button>
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
