import * as api from "../api";
import {
  getTeachersStart,
  getTeachersSuccess,
  getTeachersFailure,
} from "../reducers/teacher";

// action creator get teachers
export const getTeachers = (size, page) => async (dispatch) => {
  try {
    dispatch(getTeachersStart());

    const { data } = await api.getTeachers(size, page);

    dispatch(getTeachersSuccess(data));
  } catch (error) {
    dispatch(
      getTeachersFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};
