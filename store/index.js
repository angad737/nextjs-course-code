import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notification-slice";
import commentReducer from "./comments-slice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    comment: commentReducer,
  },
});

export default store;
