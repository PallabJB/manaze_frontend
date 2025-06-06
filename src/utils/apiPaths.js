export const  BASE_URL = 'http://localhost:8000';

// utils/apiPaths.js

export const API_PATHS = {
    AUTH:{
        REGISTER: '/api/auth/register', //REGISTER NEW USER
        LOGIN: '/api/auth/login', //LOGIN USER
        GET_PROFILE: '/api/auth/profile', //GET USER PROFILE
    },
    USERS:{
        GET_ALL_USERS: '/api/users', //GET ALL USERS
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //GET USER BY ID
        CREATE_USER: '/api/users', //CREATE NEW USER (ADMIN ONLY)
        UPDATE_USER: (userId) => `/api/users/${userId}`, //UPDATE USER BY ID
        DELETE_USER: (userId) => `/api/users/${userId}`, //DELETE USER BY ID
    },
    TASKS:{
        GET_DASHBOARD_DATA: '/api/tasks/dashboard-data', //GET DASHBOARD DATA
        GET_USER_DASHBOARD_DATA: '/api/tasks/user-dashboard-data', //GET USER DASHBOARD DATA
        GET_ALL_TASKS: '/api/tasks', //GET ALL TASKS(ADMIN: ALL, USER: ONLY ASSIGNED TASKS)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //GET TASK BY ID
        CREATE_TASK: '/api/tasks', //CREATE NEW TASK (ADMIN ONLY)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //UPDATE TASK BY ID
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //DELETE TASK BY ID(ADMIN ONLY)
        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //UPDATE TASK STATUS
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, //UPDATE TASK TODO CHECKLIST
    },
    REPORTS:{
        EXPORT_TASKS: '/api/reports/export/tasks', //EXPORT/DOWNLOAD TASKS TO CSV
        EXPORT_USERS: '/api/reports/export/users', //EXPORT/DOWNLOAD USER'S TASK REPORT
    },
    IMAGE:{
        UPLOAD_IMAGE: '/api/auth/upload-image', //UPLOAD IMAGE
    },
};