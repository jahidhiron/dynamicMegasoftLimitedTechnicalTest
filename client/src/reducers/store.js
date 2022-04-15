import { configureStore } from "@reduxjs/toolkit";

import style from "./style";
import user from "./user";
import auth from "./auth";
import teacher from "./teacher";
import student from "./student";

export default configureStore({
  reducer: {
    style,
    user,
    auth,
    teacher,
    student,
  },
});
