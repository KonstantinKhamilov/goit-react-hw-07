import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await axios.get("/contacts");
  return response.data;
});

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const response = await axios.post("/contacts", contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id) => {
    await axios.delete(`/contacts/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
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
        state.filteredItems = [...action.payload];
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
        const existingContact = state.items.find(
          (contact) =>
            contact.name === action.payload.name &&
            contact.number === action.payload.number
        );
        if (!existingContact) {
          state.items = [...state.items, action.payload];
          state.filteredItems = [...state.filteredItems, action.payload];
        }
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
        state.filteredItems = state.filteredItems.filter(
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
export const { changeFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
