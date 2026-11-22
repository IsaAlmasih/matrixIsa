import Image from "next/image";

import styles from "./styils.module.css";

import Link from "next/link";

import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.remoteLeft}>Пульты</div>
        {/* <div className={styles.Btn}>
          <Link href="/RegisterPage">Выйти из матрицы.</Link>
        </div> */}
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
              href="https://github.com/BhaskarAcharjee/3D-Room"
              target="_blank"
              rel="noopener noreferrer"
            >
              Комната нужная
            </Link>
          </div>
          <div className={styles.cardFive}>Облачная БД.</div>
          <Link
            href="https://sketchfab.com/3d-models/umamusume-gym-room-77b2d62fef414edd980f79c1e2828a04"
            className={styles.card}
          >
            Классф 3д
          </Link>
          <div className={styles.card}>Блок 7</div>
          <Link href="/roomUser" className={styles.card}>
            Комната.
          </Link>
          <div className={styles.card}>Блок 9</div>
        </div>
        <div className={styles.remoteRight}>Пульты правые.</div>
        <div className={styles.footer}>Подвал.</div>
      </div>
      <MatrixRain />
    </>
  );
}
