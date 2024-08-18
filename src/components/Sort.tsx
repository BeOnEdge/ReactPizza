import React from "react";
import { useDispatch } from "react-redux";
import { SortItem } from "../redux/filter/types";
import { setSort } from "../redux/filter/slice";
import { ArrowIcon } from "./Icons";

type SortProps = {
  value: SortItem;
};

export const sortList: SortItem[] = [
  { name: "популярности>", sortProperty: "rating" },
  { name: "популярности<", sortProperty: "-rating" },
  { name: "цене>", sortProperty: "price" },
  { name: "цене<", sortProperty: "-price" },
  { name: "алфавиту>", sortProperty: "title" },
  { name: "алфавиту<", sortProperty: "-title" },
];
export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  // const sort = useSelector(selectFilterSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", clickOutside);

    return () => document.body.removeEventListener("click", clickOutside);
  }, []);
  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <ArrowIcon />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
