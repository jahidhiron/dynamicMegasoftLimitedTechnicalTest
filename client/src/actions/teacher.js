import * as api from "../api";
import {
  getTeachersStart,
  getTeachersSuccess,
  getTeachersFailure,
} from "../reducers/teacher";

// action creator get teachers
export const getTeachers = () => async (dispatch) => {
  try {
    dispatch(getTeachersStart());

    const { data } = await api.getTeachers();

    dispatch(getTeachersSuccess(data));
  } catch (error) {
    dispatch(
      getTeachersFailure({
        message: error?.response?.data?.message,
      })
    );
  }
};
