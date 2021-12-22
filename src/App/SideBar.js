import React from 'react';
import Profile from '../User/Profile';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {fakeAuth} from '../User/SigninView';

const { SubMenu } = Menu;
const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      <a onClick={() => { if (window.confirm('Are you sure you wish to sign out?'))
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</a>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

export default class SideBar extends React.Component {
    render(){
        const { Sider } = Layout;

        return (
            <Sider className='sidebar' width={198} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />User Profile</span>}>
            <Menu.Item key="1"><Profile/></Menu.Item>
            <Menu.Item key="2"><a style={{color:'#1890ff'}} href="https://login.live.com/">My Email</a></Menu.Item>
            <Menu.Item key="3"><AuthButton /></Menu.Item>
          </SubMenu>
          
        </Menu>
      </Sider>
        )
    }
}
