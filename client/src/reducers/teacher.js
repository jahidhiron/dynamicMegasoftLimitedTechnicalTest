import { createSlice } from "@reduxjs/toolkit";

export const teacher = createSlice({
  name: "teacher",
  initialState: {
    isLoading: false,
    teacher: {},
    recentTeacher: [],
    banTeacher: [],
    unprofileTeacher: [],
    errors: false,
    isSuccess: false,
  },
  reducers: {
    // get teachers
    getTeachersStart: (state) => {
      state.isLoading = true;
    },
    getTeachersSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teacher = action?.payload;
    },
    getTeachersFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // get recent teacher
    getRecentTeachersStart: (state) => {
      state.isLoading = true;
    },
    getRecentTeachersSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recentTeacher = action?.payload;
    },
    getRecentTeachersFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // get unprofile teacher
    getUnprofileTeachersStart: (state) => {
      state.isLoading = true;
    },
    getUnprofileTeachersSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.unprofileTeacher = action?.payload;
    },
    getUnprofileTeachersFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // get ban teacher
    getBanTeachersStart: (state) => {
      state.isLoading = true;
    },
    getBanTeachersSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.banTeacher = action?.payload;
    },
    getBanTeachersFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // ban teacher
    bannedTeacherStart: (state) => {
      state.isLoading = true;
    },
    bannedTeacherSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teacher = action?.payload;
    },
    bannedTeacherFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // delete teacher
    activeTeacherStart: (state) => {
      state.isLoading = true;
    },
    activeTeacherSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teacher = action?.payload;
    },
    activeTeacherFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // delete teacher
    deleteTeacherStart: (state) => {
      state.isLoading = true;
    },
    deleteTeacherSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teacher = action?.payload;
    },
    deleteTeacherFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },
  },
});

export const {
  getTeachersStart,
  getTeachersSuccess,
  getTeachersFailure,
  bannedTeacherStart,
  bannedTeacherSuccess,
  bannedTeacherFailure,
  activeTeacherStart,
  activeTeacherSuccess,
  activeTeacherFailure,
  deleteTeacherStart,
  deleteTeacherSuccess,
  deleteTeacherFailure,
  getRecentTeachersStart,
  getRecentTeachersSuccess,
  getRecentTeachersFailure,
  getUnprofileTeachersStart,
  getUnprofileTeachersSuccess,
  getUnprofileTeachersFailure,
  getBanTeachersStart,
  getBanTeachersSuccess,
  getBanTeachersFailure,
} = teacher.actions;

export default teacher.reducer;
