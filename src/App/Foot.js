import React from "react";
import { Layout } from "antd";

export default class Foot extends React.Component {
  render() {
    const { Footer } = Layout;

    return (
      <Footer className="footer">
        <div className="span3">
          <h4>HELP AND SUPPORT</h4>
          Administrator: <span style={{ color: "#1890ff" }}>Dawson Sun</span>
          <br></br>
          Email: <a href="mailto:sdc880123@gmail.com">sdc880123@gmail.com</a>
        </div>
        <div className="span4">
          <h4>QUICK LINKS</h4>
          <a href="https://www.downergroup.com/assetmanagement">Downer</a>
        </div>
      </Footer>
    );
  }
}
