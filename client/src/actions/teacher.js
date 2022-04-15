import * as api from "../api";
import {
  getTeachersStart,
  getTeachersSuccess,
  getTeachersFailure,
  bannedTeacherStart,
  bannedTeacherSuccess,
  bannedTeacherFailure,
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
