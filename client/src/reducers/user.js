import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isChangePasswordLoading: false,
    user: {},
    errors: false,
    isSuccess: false,
    isChangePasswordSuccess: false,
    isChangePasswordError: false,
    activityLogs: [],
  },
  reducers: {
    // add user
    addUserStart: (state) => {
      state.isLoading = true;
    },
    addUserSuccess: (state, action) => {
      state.isSuccess = true;
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.isLoading = false;
      state.user = action?.payload;
    },
    addUserFailure: (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // update profile
    updateProfileStart: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    updateProfileSuccess: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.isSuccess = true;
      state.isLoading = false;
      state.user = action?.payload;
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // get single user
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action?.payload;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },

    // chnage password
    changePasswordStart: (state) => {
      state.isLoading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isChangePasswordLoading = true;
      state.isChangePasswordSuccess = true;
      state.isChangePasswordError = false;
      state.user = action?.payload;
    },
    changePasswordFailure: (state, action) => {
      state.isChangePasswordLoading = false;
      state.isChangePasswordSuccess = false;
      state.isChangePasswordError = action?.payload;
    },

    // chnage password
    getActivityLogsStart: (state) => {
      state.isLoading = true;
    },
    getActivityLogsSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.activityLogs = action?.payload;
    },
    getActivityLogsFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action?.payload;
    },
  },
});

export const {
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  getActivityLogsStart,
  getActivityLogsSuccess,
  getActivityLogsFailure,
} = users.actions;

export default users.reducer;
