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

export const bannedTeacher = (id, adminId) =>
  API.patch(`/teachers/banned/${id}?adminId=${adminId}`);

export const activeTeacher = (id, adminId) =>
  API.patch(`/teachers/active/${id}?adminId=${adminId}`);

export const deleteTeacher = (id, adminId) =>
  API.delete(`/teachers/${id}?adminId=${adminId}`);

// student API end point
export const getStudents = (size, page, search) =>
  API.get(`/students?size=${size}&page=${page}&search=${search}`);

export const getRecentStudents = () => API.get("/students/recent-student");

export const getUnprofileStudents = (size, page) =>
  API.get(`/students/unprofile-student?page=${page}&size=${size}`);

export const getBanStudents = (size, page) =>
  API.get(`/students/ban-student?page=${page}&size=${size}`);

export const bannedStudent = (id, adminId) =>
  API.patch(`/students/banned/${id}?adminId=${adminId}`);

export const activeStudent = (id, adminId) =>
  API.patch(`/students/active/${id}?adminId=${adminId}`);

export const deleteStudent = (id, adminId) =>
  API.delete(`/students/${id}?adminId=${adminId}`);

// course api end point
export const createCourse = (newCourse) => API.post("/courses", newCourse);

export const getCourses = (id) => API.get(`/courses?teacherId=${id}`);

export const getCourse = (id) => API.get(`/courses/${id}`);

export const updateCourse = (id, updatedCourse, teacherId) =>
  API.patch(`/courses/${id}?teacherId=${teacherId}`, updatedCourse);

export const deleteCourse = (id, teacherId) =>
  API.delete(`/courses/${id}?teacherId=${teacherId}`);

export const searchCourse = (search, id) =>
  API.get(`/courses/search?search=${search}&teacherId=${id}`);

// registration api end point
export const createRegistration = (newRegistration) =>
  API.post("/registrations", newRegistration);

export const getRegistartion = (id) => API.get(`/registrations/${id}`);

export const getRegistartions = (teacherId, studentId) =>
  API.get(`/registrations?teacherId=${teacherId}&studentId=${studentId}`);

export const updateRegistration = (id) => API.patch(`/registrations/${id}`);

// quiz api end point
export const createQuiz = (newQuiz) => API.post("/quizs", newQuiz);
