import React from "react";

function Categories({ value, clickCategories }) {
  // const [activeIndex, setActiveIndex] = React.useState(0);

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
}
export default Categories;
