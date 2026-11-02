import Image from "next/image";

import styles from "./styils.module.css";

import Link from "next/link";

import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.remoteLeft}>Пульты</div>
        <div className={styles.Btn}>
          <Link href="/planetPage">Выйти из матрицы.</Link>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>Блок 1</div>
          <div className={styles.card}>Блок 2</div>
          <div className={styles.card}>Блок 3</div>
          <div className={styles.card}>
            Блок 4
            <Link href="https://bhaskaracharjee.github.io/3D-Room/">
              Комната нужная
            </Link>
          </div>
          <div className={styles.card}>Блок 5</div>
          <div className={styles.card}>Блок 6</div>
          <div className={styles.card}>Блок 7</div>
          <div className={styles.card}>Блок 8</div>
          <div className={styles.card}>Блок 9</div>
        </div>
        <div className={styles.remoteRight}>Пульты правые.</div>
        <div className={styles.footer}>Подвал.</div>
      </div>
      <MatrixRain/>
    </>
  );
}
