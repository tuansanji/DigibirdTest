import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { addressSlice } from "./slice/addressSlice";
import { userSlice } from "./slice/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "queryParams"],
};

const rootReducer = combineReducers({
  address: addressSlice.reducer,
  auth: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
