import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ sortBy, order, category, search, pagin }) => {
    const { data } = await axios.get(
      `https://667ed03ef2cb59c38dc71e4f.mockapi.io/items?${pagin}&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //Loading | Success | Error
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
