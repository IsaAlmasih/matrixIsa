"use client";
import Link from "next/link";

import styles from "./styles.module.css";

import React from "react";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

const page = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div>Выпущено тап 34 + 50.</div>
        <div>Стоимость тапы 115 рублей.</div>
        <Link href="/price/society/othot">Отчёт 2024</Link>
        <div>Бюджет Акционерного общества 9680 рублей.</div>
        <Link href="/price">Вернуться.</Link>
      </div>
      <MatrixRain></MatrixRain>
    </div>
  );
};

export default page;
