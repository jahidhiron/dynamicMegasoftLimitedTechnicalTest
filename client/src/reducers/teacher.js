import { createSlice } from "@reduxjs/toolkit";

export const teacher = createSlice({
  name: "teacher",
  initialState: {
    isLoading: false,
    teacher: {},
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
  deleteTeacherStart,
  deleteTeacherSuccess,
  deleteTeacherFailure,
} = teacher.actions;

export default teacher.reducer;
