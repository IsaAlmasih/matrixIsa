"use client";
import React from "react";

import styles from "./styles.module.css";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blok}>
        <div className={styles.text}>
          <p className={styles.textTsar}>
            Индекс 462432 Город. Орск., ул. Живописная, дом 21.
          </p>
          <p className={styles.textTsar}>tsarstvie.ru@gmail.com</p>
          <Link href="/PlanetPage" className={styles.textTsar}>
            Вернуться на главную.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;