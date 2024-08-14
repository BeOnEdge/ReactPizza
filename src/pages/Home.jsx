import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import {
  selectFilter,
  setCategoryFilters,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import { sortList } from "../components/Sort";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryFilters, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { status, items } = useSelector(selectPizzas);

  const onChangeCategory = (id) => {
    dispatch(setCategoryFilters(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryFilters > 0 ? `category=${categoryFilters}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const pagin = `page=${currentPage}&limit=4`;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        pagin,
      })
    );
  };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryFilters, sort.sortProperty, searchValue, currentPage]);

  //Если был первый рендер то проверяем url-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryFilters,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryFilters, sort.sortProperty, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryFilters}
          clickCategories={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>

      {status === "error" ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка</h2>
          <p>К сожалению не удалось получить данные!</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
