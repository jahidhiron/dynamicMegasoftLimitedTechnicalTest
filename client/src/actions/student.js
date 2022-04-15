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

// action creator for banned student
export const bannedStudent = (id) => async (dispatch) => {
  try {
    dispatch(bannedStudentStart());

    const { data } = await api.bannedStudent(id);

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
export const activeStudent = (id) => async (dispatch) => {
  try {
    dispatch(activeStudentStart());

    const { data } = await api.activeStudent(id);

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
export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch(deleteStudentStart());

    const { data } = await api.deleteStudent(id);

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
