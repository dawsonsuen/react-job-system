import React from "react";
import JobCard from "./JobCard";
import { getJobs } from "../../api/job";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb, Spin } from "antd";

export default class JobsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      jobs: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getJobs()
      .then((response) => {
        this.setState({ jobs: response.data });
        this.setState({ isLoading: false });
      })
      .catch((e) => {
        console.log("error fetching jobs");
        console.log(e);
        alert("error fetching job");
      });
  }

  render() {
    const { Header, Content, Footer, Sider } = Layout;

    const { isLoading } = this.state;
    if (isLoading)
      return (
        <div>
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </div>
      );

    return (
      <Layout>
        <Content>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Job</Breadcrumb.Item>
              <Link
                to="/jobs/edit/NEW"
                className="btn btn-sm btn-primary"
                style={{ margin: "10px", color: "white" }}
              >
                Add new Job
              </Link>
            </Breadcrumb>

            <div
              style={{
                background: "",
                padding: "0 0 0 0",
                margin: "auto",
                minHeight: 350,
              }}
            >
              {this.state.jobs.map((job) => (
                <JobCard job={job} key={job.JobNumber} />
              ))}
            </div>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
