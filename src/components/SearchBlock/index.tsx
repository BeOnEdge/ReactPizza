import React from "react";
import debounce from "lodash.debounce";
import styles from "./SearchBlock.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";
import { CrossIcon } from "../Icons";

export const SearchBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы ...'
      />
      {value && (
        <CrossIcon onClickClear={onClickClear} clearIcon={styles.clearIcon} />
      )}
    </div>
  );
};
