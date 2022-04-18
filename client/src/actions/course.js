import * as api from "../api";
import {
  createCourseStart,
  createCourseSuccess,
  createCourseFailure,
  getCoursesStart,
  getCoursesSuccess,
  getCoursesFailure,
  getCourseStart,
  getCourseSuccess,
  getCourseFailure,
  updateCourseStart,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
  deleteCourseFailure,
  searchCourseStart,
  searchCourseSuccess,
  searchCourseFailure,
} from "../reducers/course";

// action creator for create course
export const createCourse = (newCourse) => async (dispatch) => {
  try {
    dispatch(createCourseStart());

    const { data } = await api.createCourse(newCourse);

    dispatch(createCourseSuccess(data));
  } catch (error) {
    if (error?.response?.data?.message) {
      dispatch(
        createCourseFailure({
          name: error?.response?.data?.message,
        })
      );
    }
    if (error?.response?.data?.errors) {
      dispatch(
        createCourseFailure({
          description: error?.response?.data?.errors?.description?.msg,
        })
      );
    }
  }
};

// action creator for get courses
export const getCourses = (id) => async (dispatch) => {
  try {
    dispatch(getCoursesStart());

    const { data } = await api.getCourses(id);

    dispatch(getCoursesSuccess(data));
  } catch (error) {
    dispatch(
      getCoursesFailure({
        message: "Something went wrong",
      })
    );
  }
};

// action creator for get course
export const getCourse = (id) => async (dispatch) => {
  try {
    dispatch(getCourseStart());

    const { data } = await api.getCourse(id);

    dispatch(getCourseSuccess(data));
  } catch (error) {
    dispatch(
      getCourseFailure({
        message: "Something went wrong",
      })
    );
  }
};

// action creator for update course
export const updateCourse =
  (id, updatedCourse, teacherId) => async (dispatch) => {
    try {
      dispatch(updateCourseStart());

      const { data } = await api.updateCourse(id, updatedCourse, teacherId);

      dispatch(updateCourseSuccess(data));
    } catch (error) {
      if (error?.response?.data?.errors) {
        dispatch(
          updateCourseFailure({
            name: error?.response?.data?.errors?.name?.msg,
            description: error?.response?.data?.errors?.description?.msg,
          })
        );
      }
    }
  };

// action creator for delete course
export const deleteCourse = (id, teacherId) => async (dispatch) => {
  try {
    dispatch(deleteCourseStart());

    const { data } = await api.deleteCourse(id, teacherId);

    dispatch(deleteCourseSuccess(data));
  } catch (error) {
    if (error?.response?.data?.errors) {
      dispatch(
        deleteCourseFailure({
          name: "Something went wrong",
        })
      );
    }
  }
};

// action creator for search course
export const searchCourse = (search, id) => async (dispatch) => {
  try {
    dispatch(searchCourseStart());

    const { data } = await api.searchCourse(search, id);

    dispatch(searchCourseSuccess(data));
  } catch (error) {
    if (error?.response?.data?.errors) {
      dispatch(
        searchCourseFailure({
          name: "Nothing found",
        })
      );
    }
  }
};
