import axios from "axios";

export function login(username, password) {
    return axios.post('/api/login', { username, password });
}

export function setUser(username, password) {
    return axios.put("/api/user", { username, password });
}

export function getCompletedCourses(user_id) {
    return axios.get(`/api/user/${user_id}/courses`);
}

export function getRequirements(user_id) {
    return axios.get(`/api/user/${user_id}/requirements`);
}