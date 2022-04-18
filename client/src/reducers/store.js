import { configureStore } from "@reduxjs/toolkit";

import style from "./style";
import user from "./user";
import auth from "./auth";
import teacher from "./teacher";
import student from "./student";
import course from "./course";
import registration from "./registration";
import quiz from "./quiz";

export default configureStore({
  reducer: {
    style,
    user,
    auth,
    teacher,
    student,
    course,
    registration,
    quiz,
  },
});
