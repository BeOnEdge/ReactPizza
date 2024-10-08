import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CartItemBlock, CartEmpty } from "../components";

import { selectCart } from "../redux/cart/selectors";
import { clearItems } from "../redux/cart/slice";
import { ArrowLeftIcon, CartIcon, ClearIcon } from "../components/Icons";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const onClickClear = () => {
    if (window.confirm("Вы действительно хотите очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className='container container__cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2 className='content__title'>
            <CartIcon />
            Корзина
          </h2>
          <div onClick={onClickClear} className='cart__clear'>
            <ClearIcon />

            <span>Очистить корзину</span>
          </div>
        </div>
        <div className='content__items'>
          {items.map((item: any) => (
            <CartItemBlock key={item.id} {...item} />
          ))}
        </div>
        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              {" "}
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              <ArrowLeftIcon />

              <span>Вернуться назад</span>
            </Link>
            <div className='button pay-btn'>
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
