import axios from "axios";
import { PizzaItem, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async ({ sortBy, order, category, search, pagin }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://667ed03ef2cb59c38dc71e4f.mockapi.io/items?${pagin}&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
