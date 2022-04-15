import axios from "axios";

const API = axios.create();

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// user API end point
export const addUser = (newUser) => API.post("/users", newUser);

export const signupWithGoogle = (newUser) =>
  API.post("/users/signup-with-google", newUser);

export const updateProfile = (updatedUser, id) =>
  API.patch(`/users/${id}`, updatedUser);

export const getUser = (id) => API.get(`/users/${id}`);

export const changePassword = (id, state) =>
  API.patch(`/users/change-password/${id}`, state);

// auth API end point
export const login = (userCredential) => API.post("/auth", userCredential);

// teacher API end point
export const getTeachers = (size, page, search) =>
  API.get(`/teachers?size=${size}&page=${page}&search=${search}`);

export const getRecentTeachers = () => API.get("/teachers/recent-teacher");

export const getUnprofileTeachers = (size, page) =>
  API.get(`/teachers/unprofile-teacher?page=${page}&size=${size}`);

export const getBanTeachers = (size, page) =>
  API.get(`/teachers/ban-teacher?page=${page}&size=${size}`);

export const bannedTeacher = (id) => API.patch(`/teachers/banned/${id}`);

export const activeTeacher = (id) => API.patch(`/teachers/active/${id}`);

export const deleteTeacher = (id) => API.delete(`/teachers/${id}`);

// student API end point
export const getStudents = (size, page, search) =>
  API.get(`/students?size=${size}&page=${page}&search=${search}`);

export const getRecentStudents = () => API.get("/students/recent-student");

export const getUnprofileStudents = (size, page) =>
  API.get(`/students/unprofile-student?page=${page}&size=${size}`);

export const getBanStudents = (size, page) =>
  API.get(`/students/ban-student?page=${page}&size=${size}`);

export const bannedStudent = (id) => API.patch(`/students/banned/${id}`);

export const activeStudent = (id) => API.patch(`/students/active/${id}`);

export const deleteStudent = (id) => API.delete(`/students/${id}`);
