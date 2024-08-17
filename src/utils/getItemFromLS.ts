import { CartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getItemFromLS = () => {
  const data = localStorage.getItem("item");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  return {
    items: items as CartItem[],
    totalPrice,
  };
};
