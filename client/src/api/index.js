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

export const getRecentTeachers = () => API.delete("/teachers/recent-teacher");

export const getUnprofileTeachers = () =>
  API.delete("/teachers/unprofile-teacher");

export const getBanTeachers = () => API.delete("/teachers/ban-teacher");

export const bannedTeacher = (id) => API.patch(`/teachers/banned/${id}`);

export const activeTeacher = (id) => API.patch(`/teachers/active/${id}`);

export const deleteTeacher = (id) => API.delete(`/teachers/${id}`);

// student API end point
export const getStudents = (size, page, search) =>
  API.get(`/students?size=${size}&page=${page}&search=${search}`);

export const getRecentStudents = () => API.delete("/teachers/recent-student");

export const getUnprofileStudents = () =>
  API.delete("/teachers/unprofile-student");

export const getBanStudents = () => API.delete("/teachers/ban-student");

export const bannedStudent = (id) => API.patch(`/students/banned/${id}`);

export const activeStudent = (id) => API.patch(`/students/active/${id}`);

export const deleteStudent = (id) => API.delete(`/students/${id}`);
