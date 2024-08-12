import React from "react";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";
import styles from "./SearchBlock.module.scss";

const SearchBlock = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );
  const onChangeInput = (event) => {
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
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z'
            fill='#000'
          ></path>
        </svg>
      )}
    </div>
  );
};

export default SearchBlock;
