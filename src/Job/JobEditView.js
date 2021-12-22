import React, { Component } from "react";
import { fetchJobById, fetchJobs, saveJob, updateJob } from "../api/job";
import Button from "../UI/Button.js";
import { Layout, DatePicker, InputNumber, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import SideBar from "../App/SideBar";
// import moment from "moment";
var moment = require("moment-timezone");

export default class JobEditView extends Component {
  constructor(props) {
    super(props);
    if (this._isNEW()) {
      this.state = { job: {} };
    } else {
      this.state = {
        job: {
          jobStatus: "Available",
        },
        jobs: [],
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _isNEW() {
    const { Id } = this.props.match.params;
    return Id === "NEW";
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const job = { ...this.state.job };
    job[name] = value;
    this.setState({ job });
  }

  handleStartDateInput(date, dateString) {
    const job = { ...this.state.job };
    var selectedDate = dateString;
    var now = moment().format("YYYY-MM-DD");
    if (selectedDate < now) {
      alert("Job Start date cannot be in past");
    } else {
      job["startDate"] = selectedDate;
      this.setState({ job });
    }
  }

  handleCompletionDateInput(date, dateString) {
    const job = { ...this.state.job };
    job["completionDate"] = dateString;
    this.setState({ job });
  }

  handleHourInput(value) {
    const job = { ...this.state.job };
    job["hourEffort"] = value;
    this.setState({ job });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { jobNumber } = this.state.job;
    const data = this.state.job;
    var now = moment().format("YYYY-MM-DD");
    var isDuplicate = false;
    var startDateAddress = data["startDate"] + data["address"];
    this.state.jobs
      ? this.state.jobs.map((item) => {
          if (
            startDateAddress === item["startDate"] + item["address"] &&
            data["jobNumber" !== item["jobNumber"]]
          ) {
            isDuplicate = true;
          }
        })
      : null;

    if (data["jobType"] === "Temporary" && data["jobStatus"] === "Completed") {
      alert("A temporary job cannot be completed!");
    } else if (data["startDate"] < now) {
      alert("Job Start date cannot be in past!");
    } else if (isDuplicate) {
      alert(
        "Job Start date, address combination is unique! Please change to another Job Start date, address combination."
      );
    } else {
      if (this._isNEW()) {
        data["lastModified"] = moment().tz("Australia/Sydney");
        this.setState({ data });
        console.log(data);
        saveJob(data).then((response) => {
          this.setState({ job: response.data, isSaving: true });
          alert("Job added!");
        });
        this.props.history.push("/jobs");
      } else {
        data["lastModified"] = moment().tz("Australia/Sydney");
        this.setState({ data });
        console.log(data);

        updateJob(jobNumber, data).then((response) => {
          this.setState({ job: response.data, isSaving: true });
          alert("Detail saved!");
          this.props.history.push("/jobs");
        });
      }
    }
  }

  handleCancel(event) {
    this.props.history.push("/jobs");
  }

  componentDidMount() {
    const { Id } = this.props.match.params;
    if ("NEW" === Id) {
      this.setState({ job: {}, isEditing: true });
      return;
    }

    fetchJobById(Id)
      .then((response) => {
        this.setState({ job: response.data });
      })
      .catch((e) => {
        alert("error fetching job!");
      });

    fetchJobs()
      .then((response) => {
        this.setState({ jobs: response.data });
        this.setState({ isLoading: false });
      })
      .catch((e) => {
        console.log("error fetching jobs!");
        console.log(e);
        alert("error fetching jobs!");
      });
  }

  render() {
    const { Content } = Layout;

    const { job } = this.state;
    const inputProps = (placeholder, attr, ...rest) => ({
      placeholder,
      name: attr,
      value: job[attr] || "",
      className: "form-control",
      onChange: this.handleInputChange.bind(this),
    });

    return (
      <Layout>
        <SideBar />
        <Content>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Job</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to="/jobs"
                  className="btn btn-sm btn-primary"
                  style={{ margin: "10px", color: "white" }}
                >
                  Back
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <form onSubmit={this.handleSubmit}>
              <table border="1" className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Address</th>
                    <td>
                      <input {...inputProps("Address", "address")} />
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <input {...inputProps("Description", "description")} />
                    </td>
                  </tr>
                  <tr>
                    <th>Job Type</th>
                    <td>
                      <div>
                        <input
                          type="radio"
                          name="jobType"
                          value="Temporary"
                          onChange={this.handleInputChange.bind(this)}
                          id="Temporary"
                          checked={
                            job["jobType"] === "Temporary" ? true : false
                          }
                        />
                        <label htmlFor="Temporary">Temporary</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="jobType"
                          value="Permanent"
                          onChange={this.handleInputChange.bind(this)}
                          id="Permanent"
                          checked={
                            job["jobType"] === "Permanent" ? true : false
                          }
                        />
                        <label htmlFor="Permanent">Permanent</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Job Status</th>
                    <td>
                      <select
                        name="jobStatus"
                        onChange={this.handleInputChange.bind(this)}
                        defaultValue={
                          job["jobStatus"] === "Completed"
                            ? "Completed"
                            : "Available"
                        }
                      >
                        <option value="Available">AVAILABLE</option>
                        <option value="Completed">COMPLETED</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Start Date</th>
                    <td>
                      <DatePicker
                        name="startDate"
                        onChange={this.handleStartDateInput.bind(this)}
                        placeholder={moment(job["startDate"]).format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Completion Date</th>
                    <td>
                      <DatePicker
                        name="completionDate"
                        onChange={this.handleCompletionDateInput.bind(this)}
                        placeholder={moment(job["completionDate"]).format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Hour Effort</th>
                    <td>
                      <InputNumber
                        name="hourEffort"
                        min={0}
                        max={12}
                        step={0.1}
                        value={job["hourEffort"]}
                        defaultValue={0.0}
                        onChange={this.handleHourInput.bind(this)}
                      />
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <Button className="save">Save</Button>
                  </tr>
                </tbody>
              </table>
            </form>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
