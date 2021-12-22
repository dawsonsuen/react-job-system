import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "../styles/images/downer_logo.png";
export default class TopNav extends React.Component {
  render() {
    const { Header } = Layout;

    return (
      <Header>
        <div className="logo">
          <img src={logo} alt="Downer"></img>
          Job System
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/jobs">Job</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
