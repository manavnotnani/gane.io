import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { reducers } from "./Reducers/reducer";

/**CREATE PERSIST CONFIG */
const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**CREATE STORE */
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
