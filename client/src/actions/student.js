import * as api from "../api";
import {
  getStudentsStart,
  getStudentsSuccess,
  getStudentsFailure,
  bannedStudentStart,
  bannedStudentSuccess,
  bannedStudentFailure,
  activeStudentStart,
  activeStudentSuccess,
  activeStudentFailure,
  deleteStudentStart,
  deleteStudentSuccess,
  deleteStudentFailure,
  getRecentStudentsStart,
  getRecentStudentsSuccess,
  getRecentStudentsFailure,
  getUnprofileStudentsStart,
  getUnprofileStudentsSuccess,
  getUnprofileStudentsFailure,
  getBanStudentsStart,
  getBanStudentsSuccess,
  getBanStudentsFailure,
} from "../reducers/student";

// action creator for get students
export const getStudents = (size, page, search) => async (dispatch) => {
  try {
    dispatch(getStudentsStart());

    const { data } = await api.getStudents(size, page, search);

    dispatch(getStudentsSuccess(data));
  } catch (error) {
    dispatch(
      getStudentsFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};

// action creator for get recent student
export const getRecentStudents = () => async (dispatch) => {
  try {
    dispatch(getRecentStudentsStart());

    const { data } = await api.getRecentStudents();

    dispatch(getRecentStudentsSuccess(data));
  } catch (error) {
    dispatch(
      getRecentStudentsFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};

// action creator for get unprofile student
export const getUnprofileStudents = (size, page) => async (dispatch) => {
  try {
    dispatch(getUnprofileStudentsStart());

    const { data } = await api.getUnprofileStudents(size, page);

    dispatch(getUnprofileStudentsSuccess(data));
  } catch (error) {
    dispatch(
      getUnprofileStudentsFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};

// action creator for get ban student
export const getBanStudents = (page, size) => async (dispatch) => {
  try {
    dispatch(getBanStudentsStart());

    const { data } = await api.getBanStudents(page, size);

    dispatch(getBanStudentsSuccess(data));
  } catch (error) {
    dispatch(
      getBanStudentsFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};

// action creator for banned student
export const bannedStudent = (id, adminId) => async (dispatch) => {
  try {
    dispatch(bannedStudentStart());

    const { data } = await api.bannedStudent(id, adminId);

    dispatch(bannedStudentSuccess(data));
  } catch (error) {
    dispatch(
      bannedStudentFailure({
        message: error?.response?.data?.message,
        status: error?.response?.data?.status,
      })
    );
  }
};

// action creator for banned student
export const activeStudent = (id, adminId) => async (dispatch) => {
  try {
    dispatch(activeStudentStart());

    const { data } = await api.activeStudent(id, adminId);

    dispatch(activeStudentSuccess(data));
  } catch (error) {
    dispatch(
      activeStudentFailure({
        message: error?.response?.data?.message,
        activeStatus: error?.response?.data?.activeStatus,
      })
    );
  }
};

// action creator for delete student
export const deleteStudent = (id, adminId) => async (dispatch) => {
  try {
    dispatch(deleteStudentStart());

    const { data } = await api.deleteStudent(id, adminId);

    dispatch(deleteStudentSuccess(data));
  } catch (error) {
    dispatch(
      deleteStudentFailure({
        message: error?.response?.data?.message,
        deleteStatus: error?.response?.data?.deleteStatus,
      })
    );
  }
};
