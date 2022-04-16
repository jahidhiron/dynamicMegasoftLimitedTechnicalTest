import { createSlice } from "@reduxjs/toolkit";

export const registration = createSlice({
  name: "registration",
  initialState: {
    isLoading: false,
    errors: false,

    registrations: [],
    registration: {},
    message: {},

    iscreateRegistrationSuccess: false,
    isGetRegistrationsSuccess: false,
    isGetRegistrationSuccess: false,
    isUpdateRegistrationSuccess: false,

    isCreateRegistrationError: false,
    isGetRegistrationsError: false,
    isGetRegistrationError: false,
    isUpdateRegistrationError: false,
  },
  reducers: {
    // create registration
    createRegistrationStart: (state) => {
      state.isLoading = true;
      state.iscreateRegistrationSuccess = false;
      state.iscreateRegistrationError = false;
    },
    createRegistrationSuccess: (state, action) => {
      state.isLoading = false;
      state.iscreateRegistrationSuccess = true;
      state.registration = action?.payload;
    },
    createRegistrationFailure: (state, action) => {
      state.isLoading = false;
      state.iscreateRegistrationSuccess = false;
      state.iscreateRegistrationError = action?.payload;
    },

    // get registrations
    getRegistrationsStart: (state) => {
      state.isGetRegistrationsSuccess = false;
      state.isLoading = true;
      state.isGetRegistrationsError = false;
    },
    getRegistrationsSuccess: (state, action) => {
      state.isLoading = false;
      state.isGetRegistrationsSuccess = true;
      state.registrations = action?.payload;
    },
    getRegistrationsFailure: (state, action) => {
      state.isLoading = false;
      state.isGetRegistrationsSuccess = false;
      state.isGetRegistrationsError = action?.payload;
    },

    // get registration
    getRegistrationStart: (state) => {
      state.isLoading = true;
      state.isGetRegistrationSuccess = false;
      state.isGetRegistrationError = false;
    },
    getRegistrationSuccess: (state, action) => {
      state.isLoading = false;
      state.isGetRegistrationSuccess = true;
      state.registration = action?.payload;
    },
    getRegistrationFailure: (state, action) => {
      state.isLoading = false;
      state.isGetRegistrationSuccess = false;
      state.isGetRegistrationError = action?.payload;
    },

    // update registration
    updateRegistrationStart: (state) => {
      state.isLoading = true;
      state.isUpdateRegistrationSuccess = false;
      state.isUpdateRegistrationError = false;
    },
    updateRegistrationSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdateRegistrationSuccess = true;
      state.registration = action?.payload;
    },
    updateRegistrationFailure: (state, action) => {
      state.isLoading = false;
      state.isUpdateRegistrationSuccess = false;
      state.isUpdateRegistrationError = action?.payload;
    },
  },
});

export const {
  createRegistrationStart,
  createRegistrationSuccess,
  createRegistrationFailure,
  getRegistrationsStart,
  getRegistrationsSuccess,
  getRegistrationsFailure,
  getRegistrationStart,
  getRegistrationSuccess,
  getRegistrationFailure,
  updateRegistrationStart,
  updateRegistrationSuccess,
  updateRegistrationFailure,
} = registration.actions;

export default registration.reducer;
