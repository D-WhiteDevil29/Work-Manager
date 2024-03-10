import { httpAxios } from "@/helper/httpHelper"

export const signUp = async (user) => {
    const regUser = await httpAxios.post('/api/users', user).then((response) => response.data);
    return regUser;
}

export const login = async (logindata) => {
    const result = await httpAxios.post('/api/login', logindata).then((response) => response.data);
    return result;
}

export async function currentUser() {
    const result = await httpAxios.get('/api/current').then((response) => response.data);
    return result;
}

export async function logout() {
    const result = await httpAxios.post('/api/logout').then((response) => response.data);
    return result;
}

export async function updateUserById(userId, userData) {
    const result = await httpAxios.put(`/api/users/${userId}`, userData).then((response) => response.data);
    return result;
}

export async function deleteUserById(userId) {
    const result = await httpAxios.delete(`/api/users/${userId}`).then((response) => response.data);
    return result;
}

export async function updateUserPassById(userId, userData) {
    const result = await httpAxios.put(`/api/users/${userId}`, userData).then((response) => response.data);
    return result;
}

export async function sendUserEmail() {
    const result = await httpAxios.post(`/api/send/`).then((response) => response.data);
    return result;
}

export async function getUserByEmail(userEmail) {
    const result = await httpAxios.post(`/api/email/`, userEmail).then((response) => response.data);
    return result;
}

