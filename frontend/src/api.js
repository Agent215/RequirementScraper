import axios from "axios";

export function login(username, password) {
    return axios.post('/api/login', { username, password })
        .then(response => response.data);
}

export function getCompletedCourses(user_id) {
    return axios.get(`/api/user/${user_id}/courses`)
        .then(response => response.data);
}

export function getRequirements(user_id) {
    return axios.get(`/api/user/${user_id}/requirements`)
        .then(response => response.data);
}