import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //for error handling
  middleware: (getDefaultMiddleware) =>
    //   Serializability check middleware: a custom middleware created specifically for use in Redux Toolkit
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
