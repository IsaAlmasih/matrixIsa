import React from "react";

import styles from "./styles.module.css";

const cartItem = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.quantity}>{props.quantity}</div>
      <div className={styles.price}>{props.price}</div>
      <img src={props.imag.src} />
    </div>
  );
};

export default cartItem;
