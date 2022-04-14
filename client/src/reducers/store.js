import { configureStore } from "@reduxjs/toolkit";

import style from "./style";
import user from "./user";
import auth from "./auth";
import teacher from "./teacher";

export default configureStore({
  reducer: {
    style,
    user,
    auth,
    teacher,
  },
});
