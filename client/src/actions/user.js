import {
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
} from "../reducers/user";
import { authSuccess } from "../reducers/auth";
import * as api from "../api";

// action creator for signup
export const signup = (newUser) => async (dispatch) => {
  try {
    dispatch(addUserStart());

    const { data } = await api.addUser(newUser);

    dispatch(addUserSuccess(data));
    dispatch(authSuccess(data));
  } catch (error) {
    dispatch(
      addUserFailure({
        name: error?.response?.data?.errors?.name?.msg,
        email: error?.response?.data?.errors?.email?.msg,
        password: error?.response?.data?.errors?.password?.msg,
        accountType: error?.response?.data?.errors?.accountType?.msg,
      })
    );
  }
};

// action creator for update profile
export const updateProfile = (updatedProfile, id) => async (dispatch) => {
  try {
    dispatch(updateProfileStart());

    const { data } = await api.updateProfile(updatedProfile, id);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(
      updateProfileFailure({
        phone: "phone?.msg",
      })
    );
  }
};

// action creator for update profile
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(getUserStart());

    const { data } = await api.getUser(id);
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(
      getUserFailure({
        message: "Something went wrong",
      })
    );
  }
};

// action creator for chnage password
export const changePassword = (id, state) => async (dispatch) => {
  try {
    dispatch(changePasswordStart());

    const { data } = await api.changePassword(id, state);
    dispatch(changePasswordSuccess(data));
  } catch (error) {
    console.log(error.response);

    if (error?.response?.data?.errors) {
      dispatch(
        changePasswordFailure({
          newPassword: error?.response?.data?.errors?.newPassword?.msg,
        })
      );
    } else {
      dispatch(
        changePasswordFailure({
          oldPassword: error?.response?.data?.message,
        })
      );
    }
  }
};

export const signupWithGoogle = (newUser, navigate) => async (dispatch) => {
  try {
    dispatch(addUserStart());

    const { data } = await api.signupWithGoogle(newUser);

    dispatch(addUserSuccess(data));
    dispatch(authSuccess(data));

    navigate("/home");
  } catch (error) {
    const { email, password } = error?.response?.data?.errors;

    dispatch(addUserFailure({ email: email?.msg, password: password?.msg }));
  }
};
