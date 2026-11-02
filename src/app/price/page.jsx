"use client";
import React from "react";
import styles from "./styles.module.css";

import { useRouter } from "next/navigation";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";
import Link from "next/link";

const page = () => {
const router=useRouter()
  return (
      <div className={styles.wrappe}>
        <nav className={styles.wrapper}>
          <Link href={"/price/matrix"}>АО "Матрица" (Matrix)</Link>
          <Link href={"/price/tapatim"}>ИП "Тапатим"</Link>
          <Link href={"/price/sdsioy"}>Благотворительный фонд "СДС и ОУ"</Link>
          <Link href={"/"}>Ваша организация.</Link>
        </nav>
        <center>
          {/* <p>
            Здравствуйте. На данном этапе мы только формируем всё и
            согласовываем все составляющие. Если вы хотите продать свою акцию,
            напишите на адрес этой почты imperiya66.ru@gmail.com вам заплатят за
            возврат акции. Ваш скан акции должен быть один в один с нашим сканом
            вашей акции. Второй момент. Вы можете проявить терпение подождав,
            когда акция тапы вырастит в цене, а после её продать. Есть третий
            способ. Вы можете как владелец тапы принимать участие в жизни нашей
            формирующийся компании. По всем вопросам напишите по адресу выше.
          </p> */}
        </center>
        <button onClick={() => router.push("/")} className={styles.butt}>
          {"<--"}Назад
        </button>
      <MatrixRain></MatrixRain>
      </div>
  );
};

export default page;
