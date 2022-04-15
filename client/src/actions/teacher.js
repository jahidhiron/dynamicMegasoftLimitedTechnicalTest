import * as api from "../api";
import {
  getTeachersStart,
  getTeachersSuccess,
  getTeachersFailure,
} from "../reducers/teacher";

// action creator get teachers
export const getTeachers = (size, page, search) => async (dispatch) => {
  try {
    dispatch(getTeachersStart());
    console.log("search : ", search);

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
