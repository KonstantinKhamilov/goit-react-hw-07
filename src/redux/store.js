import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const persistConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
});

export default store;
