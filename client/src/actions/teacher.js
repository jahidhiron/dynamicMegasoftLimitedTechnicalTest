import * as api from "../api";
import {
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
} from "../reducers/teacher";

// action creator for get teachers
export const getTeachers = (size, page, search) => async (dispatch) => {
  try {
    dispatch(getTeachersStart());

    const { data } = await api.getTeachers(size, page, search);

    dispatch(getTeachersSuccess(data));
  } catch (error) {
    dispatch(
      getTeachersFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};

// action creator for banned teacher
export const bannedTeacher = (id) => async (dispatch) => {
  try {
    dispatch(bannedTeacherStart());

    const { data } = await api.bannedTeacher(id);

    dispatch(bannedTeacherSuccess(data));
  } catch (error) {
    dispatch(
      bannedTeacherFailure({
        message: error?.response?.data?.message,
        status: error?.response?.data?.status,
      })
    );
  }
};

// action creator for banned teacher
export const activeTeacher = (id) => async (dispatch) => {
  try {
    dispatch(activeTeacherStart());

    const { data } = await api.activeTeacher(id);

    dispatch(activeTeacherSuccess(data));
  } catch (error) {
    dispatch(
      activeTeacherFailure({
        message: error?.response?.data?.message,
        activeStatus: error?.response?.data?.activeStatus,
      })
    );
  }
};

// action creator for delete teacher
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch(deleteTeacherStart());

    const { data } = await api.deleteTeacher(id);

    dispatch(deleteTeacherSuccess(data));
  } catch (error) {
    dispatch(
      deleteTeacherFailure({
        message: error?.response?.data?.message,
        deleteStatus: error?.response?.data?.deleteStatus,
      })
    );
  }
};
