import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
  //for error handling
  middleware: (getDefaultMiddleware) =>
    //   Serializability check middleware: a custom middleware created specifically for use in Redux Toolkit
    getDefaultMiddleware({ serializableCheck: false }),
});
