"use client";
import React from "react";
import styles from "./styles.module.css";

import { useRouter } from "next/navigation";
import { MatrixRain } from "../../components/MatrixRain/MatrixRain";
import Link from "next/link";

const page = () => {
const router=useRouter()
  return (
    <div className={styles.wrappe}>
      <nav className={styles.wrapper}>
        <Link href={"/price/matrix"}>АО "Матрица" (Matrix)</Link>
        <Link href={"/price/tapatim"}>ИП "Тапатим"</Link>
        <Link href={"/price/sdsioy"}>Благотворительный фонд "СДС и ОУ"</Link>
        <Link href={"/matrix"}>Ваша организация.</Link>
      </nav>
      <button onClick={() => router.push("/")} className={styles.butt}>
        {"<--"}Назад
      </button>
      <MatrixRain></MatrixRain>
    </div>
  );
};  

export default page;
