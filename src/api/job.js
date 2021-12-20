import axios from "axios";

export function getJobs() {
  return axios.get("/jobs");
}

export function getJobByJobNumber(jobNumber) {
  return axios.get(`/jobs/${jobNumber}`);
}

export function saveJob(data) {
  return axios.post("/jobs", data);
}

export function updateJob(jobNumber, data) {
  return axios.put(`/jobs/${jobNumber}`, data);
}
