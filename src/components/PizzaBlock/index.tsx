import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItemById } from "../../redux/cart/selectors";
import { CartItem } from "../../redux/cart/types";
import { addItem } from "../../redux/cart/slice";
import { PlusIcon } from "../Icons";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const typeNames = ["тонкое", "традиционное"];
export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typeNames[activeType],
      count: 0,
    };
    dispatch(addItem(item));
  };

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link key={id} to={`/pizza/${id}`}>
          <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
          <h4 className='pizza-block__title'>{title}</h4>
        </Link>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                className={activeSize === i ? "active" : ""}
                onClick={() => setActiveSize(i)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className='button button--outline button--add'
          >
            <PlusIcon />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
