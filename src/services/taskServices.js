import { httpAxios } from "@/helper/httpHelper"

export const addTask = async (task) => {
    const result = await httpAxios.post('/api/tasks/', task).then((response) => response.data);
    return result;
}

export const getUserTasks = async (userId) => {
    const result = await httpAxios.get(`/api/users/${userId}/tasks`).then((response) => response.data);
    return result;
}

export const getTaskById = async (taskId) => {
    const result = await httpAxios.get(`/api/tasks/${taskId}`).then((response) => response.data);
    return result;
}
export const updateTaskById = async (taskId, task) => {
    const result = await httpAxios.put(`/api/tasks/${taskId}`, task).then((response) => response.data);
    return result;
}
export const deleteTaskById = async (taskId) => {
    const result = await httpAxios.delete(`/api/tasks/${taskId}`).then((response) => response.data);
    return result;
}