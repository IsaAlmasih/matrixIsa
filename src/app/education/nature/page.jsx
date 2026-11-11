"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../nature/styles.module.css";


import Link from "next/link";
import MatrixRainCard from "../../../components/MatrixRainCard/MatrixRainCard";

export default function law() {
  const router = useRouter();

  return (
    <form>
      <div className={styles.wrapper}>
        <div className={styles.blok}>
          <div className={styles.blo}>
            <div className={styles.textGrid}>
              <div className={styles.textGridOne}>
                <MatrixRainCard
                name="Тема природы - Минеральное царство."></MatrixRainCard>
                {/* <Link href="/"></Link> */}
              </div>
              <div className={styles.textGridTwo}>
                <Link href="/">Тема природы - Растительное царство.</Link>
              </div>
              <div className={styles.textGridThree}>
                <Link href="/">Тема природы - Животное царство.</Link>
              </div>
              <div className={styles.textGridFour}>
                <Link href="/">Тема природы - Почвы — биокосное царство.</Link>
              </div>
              <div className={styles.textGridFive}>
                <Link href="/">Тема природы – Протистов царство.</Link>
              </div>
              <div className={styles.textGridSix}>
                <Link href="/">Тема природы – Монера и Дробянки царство.</Link>
              </div>
              <div className={styles.textGridSeven}>
                <Link href="/">Тема природы – царство грибов.</Link>
              </div>
              <div className={styles.textGridEight}>
                <Link href="/">Тама с .</Link>
              </div>
              <div className={styles.textGridTen}>
                <Link href="/additional/questionTen">
                  Тама с вопросами десятой Заповеди.
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.buttonLaw}>
          <a href="/PlanetPage">На главную. </a>
        </button>
      </div>
    </form>
  );
}
