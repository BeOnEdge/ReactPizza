export type SortItem = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

export interface FilterSliceState {
  searchValue: string;
  categoryFilters: number;
  currentPage: number;
  sort: SortItem;
}
