import { createSlice } from "@reduxjs/toolkit";

export const course = createSlice({
  name: "course",
  initialState: {
    isLoading: false,
    errors: false,

    courses: [],
    course: {},
    message: {},
    searchCourse: [],

    iscreateCourseSuccess: false,
    isGetCoursesSuccess: false,
    isGetCourseSuccess: false,
    isUpdateCourseSuccess: false,
    isDeleteCourseSuccess: false,
    isSearchCourseSuccess: false,

    isCreateCourseError: false,
    isGetCoursesError: false,
    isGetCourseError: false,
    isUpdateCourseError: false,
    isDeleteCourseError: false,
    isSearchCourseError: false,
  },
  reducers: {
    // create course
    createCourseStart: (state) => {
      state.isLoading = true;
      state.iscreateCourseSuccess = false;
      state.iscreateCourseError = false;
    },
    createCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.iscreateCourseSuccess = true;
      state.course = action?.payload;
    },
    createCourseFailure: (state, action) => {
      state.isLoading = false;
      state.iscreateCourseSuccess = false;
      state.iscreateCourseError = action?.payload;
    },

    // get courses
    getCoursesStart: (state) => {
      state.isGetCoursesSuccess = false;
      state.isLoading = true;
      state.isGetCoursesError = false;
    },
    getCoursesSuccess: (state, action) => {
      state.isLoading = false;
      state.isGetCoursesSuccess = true;
      state.courses = action?.payload;
    },
    getCoursesFailure: (state, action) => {
      state.isLoading = false;
      state.isGetCoursesSuccess = false;
      state.isGetCoursesError = action?.payload;
    },

    // get courses
    getCourseStart: (state) => {
      state.isLoading = true;
      state.isGetCourseSuccess = false;
      state.isGetCourseError = false;
    },
    getCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isGetCourseSuccess = true;
      state.course = action?.payload;
    },
    getCourseFailure: (state, action) => {
      state.isLoading = false;
      state.isGetCourseSuccess = false;
      state.isGetCourseError = action?.payload;
    },

    // update courses
    updateCourseStart: (state) => {
      state.isLoading = true;
      state.isUpdateCourseSuccess = false;
      state.isUpdateCourseError = false;
    },
    updateCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdateCourseSuccess = true;
      state.course = action?.payload;
    },
    updateCourseFailure: (state, action) => {
      state.isLoading = false;
      state.isUpdateCourseSuccess = false;
      state.isUpdateCourseError = action?.payload;
    },

    // delete courses
    deleteCourseStart: (state) => {
      state.isLoading = true;
      state.isDeleteCourseSuccess = false;
      state.isDeleteCourseError = false;
    },
    deleteCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isDeleteCourseSuccess = true;
      state.message = action?.payload;
    },
    deleteCourseFailure: (state, action) => {
      state.isLoading = false;
      state.isDeleteCourseSuccess = false;
      state.isDeleteCourseError = action?.payload;
    },

    // delete courses
    searchCourseStart: (state) => {
      state.isLoading = true;
      state.isSearchCourseSuccess = false;
      state.isSearchCourseError = false;
    },
    searchCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isSearchCourseSuccess = true;
      state.searchCourseData = action?.payload;
    },
    searchCourseFailure: (state, action) => {
      state.isLoading = false;
      state.isSearchCourseSuccess = false;
      state.isSearchCourseError = action?.payload;
    },
  },
});

export const {
  createCourseStart,
  createCourseSuccess,
  createCourseFailure,
  getCoursesStart,
  getCoursesSuccess,
  getCoursesFailure,
  getCourseStart,
  getCourseSuccess,
  getCourseFailure,
  updateCourseStart,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
  deleteCourseFailure,
  searchCourseStart,
  searchCourseSuccess,
  searchCourseFailure,
} = course.actions;

export default course.reducer;
