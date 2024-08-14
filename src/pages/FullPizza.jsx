import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchIdPizza() {
      try {
        const { data } = await axios.get(
          `https://667ed03ef2cb59c38dc71e4f.mockapi.io/items/${params.id}`
        );
        setPizza(data);
      } catch (err) {
        console.log(err);
        navigate('/')
      }
    }
    fetchIdPizza();
  }, []);
  console.log(pizza);

  if (!pizza) {
    return "Загрузка...";
  }
  return (
    <div className='container full-pizza'>
      <img className='pizza-block__image' src={pizza.imageUrl} alt='Pizza' />
      <div className='full-pizza__text-block'>
        <h2 className='full-pizza__title'>{pizza.title}</h2>
        <p>Вкусно!</p>
        <h4 className='full-pizza__price'>{pizza.price} ₽</h4>
        <button className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {/* {addedCount > 0 && <i>{addedCount}</i>} */}
        </button>
      </div>
    </div>
  );
};

export default FullPizza;
