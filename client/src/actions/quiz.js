import * as api from "../api";
import {
  createQuizStart,
  createQuizSuccess,
  createQuizFailure,
} from "../reducers/quiz";

// action creator for create quiz
export const createQuiz = (newCourse) => async (dispatch) => {
  try {
    dispatch(createQuizStart());

    const { data } = await api.createCourse(newCourse);

    dispatch(createQuizSuccess(data));
  } catch (error) {
    if (error?.response?.data?.message) {
      dispatch(
        createQuizFailure({
          name: error?.response?.data?.message,
        })
      );
    }
    if (error?.response?.data?.errors) {
      dispatch(
        createQuizFailure({
          name: error?.response?.data?.errors?.name?.msg,
          description: error?.response?.data?.errors?.description?.msg,
          quiz: error?.response?.data?.errors?.quiz?.msg,
        })
      );
    }
  }
};
