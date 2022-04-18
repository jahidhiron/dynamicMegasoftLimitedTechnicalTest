import { createSlice } from "@reduxjs/toolkit";

export const quiz = createSlice({
  name: "quiz",
  initialState: {
    quizs: [],
    quiz: {},

    // create
    iscreateQuizLoading: false,
    iscreateQuizSuccess: false,
    isCreateQuizError: false,
  },
  reducers: {
    // create course
    createQuizStart: (state) => {
      state.iscreateQuizLoading = true;
      state.iscreateQuizSuccess = false;
      state.iscreateQuizError = false;
    },
    createQuizSuccess: (state, action) => {
      state.iscreateQuizLoading = false;
      state.iscreateQuizSuccess = true;
      state.quiz = action?.payload;
    },
    createQuizFailure: (state, action) => {
      state.iscreateQuizLoading = false;
      state.iscreateQuizSuccess = false;
      state.iscreateQuizError = action?.payload;
    },
  },
});

export const { createQuizStart, createQuizSuccess, createQuizFailure } =
  quiz.actions;

export default quiz.reducer;
