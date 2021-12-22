import React from "react";
import { Drawer, List, Divider, Col, Row } from "antd";

const pStyle = {
  fontSize: 16,
  lineHeight: "24px",
  display: "block",
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => {
  return (
    <div
      style={{
        fontSize: 14,
        lineHeight: "22px",
        marginBottom: 7,
        color: "rgba(0,0,0,0.65)",
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: "inline-block",
          color: "rgba(0,0,0,0.85)",
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: false,
      // error: null,
      profile: {},
    };
  }
  // componentDidMount() {
  //   // const {Id} = this.props.match.params;

  //   fetchProfileById(1).then((response) => {
  //     this.setState({ profile: response.data });
  //   });
  // }
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { Name, UserId, PhoneNumber, EmailAddress, City, State } =
      this.state.profile;

    return (
      <div className="profile">
        <List
          dataSource={[
            {
              name: { Name },
            },
          ]}
          //   bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[<a onClick={this.showDrawer}>View Profile</a>]}
            />
          )}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
          <p style={pStyle}>Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content={Name} />{" "}
            </Col>
            <Col span={12}>
              <DescriptionItem title="User ID" content={UserId} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content={City} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="State" content={State} />
            </Col>
          </Row>
      
          <Divider />
          <p style={pStyle}>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content={EmailAddress} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content={PhoneNumber} />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

export default Profile;
