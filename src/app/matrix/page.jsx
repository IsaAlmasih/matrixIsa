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
          <Link href="/RegisterPage">Выйти из матрицы.</Link>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>Блок 1</div>
          <Link
            href="https://nextjs.org/learn/dashboard-app/setting-up-your-database"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardTwu}
          >
            Официальная документация по подключению к БД
          </Link>
          <div className={styles.card}>Блок 3</div>
          <div className={styles.cardFour}>
            Блок 4
            <Link
              href="https://bhaskaracharjee.github.io/3D-Room/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Комната нужная
            </Link>
          </div>
          <div className={styles.cardFive}>
            <Link
              href="https://console.yandex.cloud/folders/b1gab1f5lhtbknb1joug/dashboard "
              target="_blank"
              rel="noopener noreferrer"
            >
              Облачная БД.
            </Link>
          </div>
          <div className={styles.card}>Блок 6</div>
          <div className={styles.card}>Блок 7</div>
          <div className={styles.card}>Блок 8</div>
          <div className={styles.card}>Блок 9</div>
        </div>
        <div className={styles.remoteRight}>Пульты правые.</div>
        <div className={styles.footer}>Подвал.</div>
      </div>
      <MatrixRain />
    </>
  );
}


// Как использовать правиль Link с div?
// Как использовать правиль Link с div?
// Как использовать правиль Link с div?
// Как использовать правиль Link с div?