export enum Status {
  LOADING = "loading",
  SUCCES = "success",
  ERROR = "error",
}

export interface PizzasSliceState {
  items: PizzaItem[];
  status: Status;
}

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: number;
  count: number;
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  pagin: string;
};
