import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { PlusIcon } from "../components/Icons";

const FullPizza: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchIdPizza() {
      try {
        const { data } = await axios.get(
          `https://667ed03ef2cb59c38dc71e4f.mockapi.io/items/${params.id}`
        );
        setPizza(data);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    }
    fetchIdPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className='container full-pizza'>
      <img className='pizza-block__image' src={pizza.imageUrl} alt='Pizza' />
      <div className='full-pizza__text-block'>
        <h2 className='full-pizza__title'>{pizza.title}</h2>
        <p>Вкусно!</p>
        <h4 className='full-pizza__price'>{pizza.price} ₽</h4>
        <button className='button button--outline button--add'>
          <PlusIcon />
          <span>Добавить</span>
          {/* {addedCount > 0 && <i>{addedCount}</i>} */}
        </button>
      </div>
    </div>
  );
};

export default FullPizza;
