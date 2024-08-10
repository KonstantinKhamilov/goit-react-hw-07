import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  contacts: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  filter: "",
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action) {
      const newContact = action.payload;
      const existingContact = state.contacts.find(
        (contact) =>
          contact.name === newContact.name &&
          contact.number === newContact.number
      );

      if (existingContact) {
        state.error = "Контакт с таким именем и номером уже существует";
      } else if (!newContact.name || !newContact.number) {
        state.error = "Пожалуйста, введите имя и номер телефона";
      } else {
        const newContactWithId = { ...newContact, id: uuidv4() };
        state.contacts.push(newContactWithId);
      }
    },
    deleteContact(state, action) {
      const contactId = action.payload;
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== contactId
      );
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { addContact, deleteContact, changeFilter, clearError } =
  contactsSlice.actions;
export default contactsSlice.reducer;
export const selectError = (state) => state.contacts.error;
