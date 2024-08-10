import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  filter: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { changeFilter: setFilter } = filtersSlice.actions; // переименованный экспорт
export default filtersSlice.reducer;

export function getFilterComponent(dispatch, filter) {
  return React.createElement(
    "label",
    null,
    "Фильтр:",
    React.createElement("input", {
      type: "text",
      value: filter,
      onChange: (e) => {
        dispatch(setFilter(e.target.value)); // используйте переименованный экспорт
      },
    })
  );
}
