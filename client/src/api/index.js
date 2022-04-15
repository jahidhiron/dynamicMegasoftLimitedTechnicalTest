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

export const bannedTeacher = (id) => API.patch(`/teachers/banned/${id}`);
