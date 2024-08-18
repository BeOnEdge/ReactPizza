import React from "react";

import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/cart/slice";
import { CrossCircleIcon, MinusCircleIcon, PlusCircleIcon } from "./Icons";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  size: number;
  type: string;
  count: number;
  imageUrl: string;
};

export const CartItemBlock: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  size,
  type,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id, title, price, size, type, count, imageUrl }));
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    if (window.confirm("Тф действительно хочешь удалить товар?")) {
      dispatch(removeItem(id));
    }
  };
  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      </div>
      <div className='cart__item-info'>
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className='cart__item-count'>
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className='button button--outline button--circle cart__item-count-minus'
        >
          <MinusCircleIcon />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className='button button--outline button--circle cart__item-count-plus'
        >
          <PlusCircleIcon />
        </button>
      </div>
      <div className='cart__item-price'>
        <b>{price * count} ₽</b>
      </div>
      <div className='cart__item-remove'>
        <div
          onClick={onClickRemove}
          className='button button--outline button--circle'
        >
          <CrossCircleIcon />
        </div>
      </div>
    </div>
  );
};
