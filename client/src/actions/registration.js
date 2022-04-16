import * as api from "../api";
import {
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
} from "../reducers/registration";

// action creator for create Registration
export const createRegistration = (newRegistration) => async (dispatch) => {
  try {
    dispatch(createRegistrationStart());

    const { data } = await api.createRegistration(newRegistration);

    dispatch(createRegistrationSuccess(data));
  } catch (error) {
    if (error?.response?.data?.errors) {
      dispatch(
        createRegistrationFailure({
          name: error?.response?.data?.errors?.name?.msg,
          description: error?.response?.data?.errors?.description?.msg,
        })
      );
    }
  }
};

// action creator for get Registrations
export const getRegistrations = (teacherId, studentId) => async (dispatch) => {
  try {
    dispatch(getRegistrationsStart());

    const { data } = await api.getRegistartions(teacherId, studentId);

    dispatch(getRegistrationsSuccess(data));
  } catch (error) {
    dispatch(
      getRegistrationsFailure({
        message: "Something went wrong",
      })
    );
  }
};

// action creator for get Registration
export const getRegistration = (id) => async (dispatch) => {
  try {
    dispatch(getRegistrationStart());

    const { data } = await api.getRegistartion(id);

    dispatch(getRegistrationSuccess(data));
  } catch (error) {
    dispatch(
      getRegistrationFailure({
        message: "Something went wrong",
      })
    );
  }
};

// action creator for update Registration
export const updateRegistration =
  (id, updatedRegistration) => async (dispatch) => {
    try {
      dispatch(updateRegistrationStart());

      const { data } = await api.updateRegistration(id, updatedRegistration);

      dispatch(updateRegistrationSuccess(data));
    } catch (error) {
      if (error?.response?.data?.errors) {
        dispatch(
          updateRegistrationFailure({
            name: error?.response?.data?.errors?.name?.msg,
            description: error?.response?.data?.errors?.description?.msg,
          })
        );
      }
    }
  };
