import React from "react";

type CategoriesProps = {
  value: number;
  clickCategories: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, clickCategories }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((name, i) => (
          <li
            key={i}
            onClick={() => clickCategories(i)}
            className={value === i ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
