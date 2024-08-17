import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🤕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению данной страницы нет в нашем интернет-магазине</p>
    </div>
  );
};
