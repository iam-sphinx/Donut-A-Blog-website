import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "../slices/userSlice.js";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const userPersistConfig = {
  key: "user",
  storage,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducers = combineReducers({
  user: userPersistedReducer,
});

export default configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
