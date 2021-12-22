import React from "react";
import { fetchJobs } from "../api/job";
import { Link } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Spin,
  Table
} from "antd";
import SideBar from "../App/SideBar";
import moment from 'moment'

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
    fetchJobs()
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
    const columns = [
      {
        title: "Job No.",
        dataIndex: "jobNumber",
        key: "jobNumber",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Job Type",
        dataIndex: "jobType",
        key: "jobType",
      },
      {
        title: "Job Status",
        dataIndex: "jobStatus",
        key: "jobStatus",
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "Completion Date",
        dataIndex: "completionDate",
        key: "completionDate",
      },
      {
        title: "Hour Effort",
        dataIndex: "hourEffort",
        key: "hourEffort",
      },
      {
        title: "Last Modified",
        dataIndex: "lastModified",
        key: "lastModified",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
    ];
    const data = this.state.jobs.map((job) => ({
      key: job.jobNumber,
      jobNumber: job.jobNumber,
      address: job.address,
      description: job.description,
      jobType: job.jobType,
      jobStatus: job.jobStatus,
      startDate: moment(job.startDate).format("YYYY-MM-DD"),
      completionDate:  moment(job.completionDate).format("YYYY-MM-DD"),
      hourEffort: job.hourEffort,
      lastModified: moment(job.lastModified).format("YYYY-MM-DD HH:MM:SS"),
      action: (job.jobStatus === 'Completed' ? <div>Can't be updated</div> :
        <Link
          to={`/jobs/edit/${job.jobNumber}`}
          className="btn edit glyphicon glyphicon-pencil"
        />
      ),
    }));

    const {  Content } = Layout;

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
        <SideBar />
        <Content>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Job</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to="/jobs/edit/NEW"
                  className="btn btn-sm btn-primary"
                  style={{ margin: "10px", color: "white" }}
                >
                  Add new Job
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>

            <Table columns={columns} dataSource={data} />
          </Layout>
        </Content>
      </Layout>
    );
  }
}
