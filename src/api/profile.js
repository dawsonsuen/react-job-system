import axios from 'axios';

export function fetchProfiles() {
    return axios.get('/profile');
}

export function fetchProfileById(Id) {
    return axios.get(`/profile/${Id}`);
}

export function saveProfile(data) {
    return axios.post('/profile',data);
}

export function updateProfile(Id,data) {
    return axios.put(`/profile/${Id}`, data);
}

export function deleteProfile(Id) {
    return axios.delete(`/profile/${Id}`);
}