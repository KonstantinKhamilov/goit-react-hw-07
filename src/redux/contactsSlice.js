import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

axios.defaults.baseURL = "https://66b762ce7f7b1c6d8f1bbfb3.mockapi.io";

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    filter: "",
  },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload];
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  (state) => state.contacts.items,
  (state) => state.contacts.filters.filter,
  (items, filter) =>
    items.filter((contact) => {
      const name = contact.name.toLowerCase();
      const number = contact.number.toLowerCase();
      const filterValue = filter.toLowerCase();
      return name.includes(filterValue) || number.includes(filterValue);
    })
);

export const { changeFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
