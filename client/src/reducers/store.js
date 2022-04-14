import { configureStore } from "@reduxjs/toolkit";

import user from "./user";
import auth from "./auth";
import style from "./style";

export default configureStore({
  reducer: {
    user,
    auth,
    style,
  },
});
