import axios from 'axios';

export function fetchJobs() {
    return axios.get('/jobs');
}

export function fetchJobById(Id) {
    return axios.get(`/jobs/${Id}`);
}

export function saveJob(data) {
    return axios.post('/jobs',data);
}

export function updateJob(Id,data) {
    return axios.put(`/jobs/${Id}`, data);
}

export function deleteJob(Id) {
    return axios.delete(`/jobs/${Id}`);
}