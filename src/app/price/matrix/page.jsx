"use client";
import Link from "next/link";

import styles from "./styles.module.css";

import React from "react";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

const page = () => {
  return (
    <div>
      <Link href={"/price"}></Link>
      <div className={styles.wrapper}>
        <center>
          <p>
            Здравствуйте. На данном этапе мы только формируем всё и
            согласовываем все составляющие. Если вы хотите продать свою акцию,
            напишите на адрес этой почты imperiya66.ru@gmail.com вам заплатят за
            возврат акции. Ваш скан акции должен быть один в один с нашим сканом
            вашей акции. Второй момент. Вы можете проявить терпение подождав,
            когда акция тапы вырастит в цене, а после её продать. Есть третий
            способ. Вы можете как владелец тапы принимать участие в жизни нашей
            формирующийся компании. По всем вопросам напишите по адресу выше.
          </p>
        </center>
        <Link href="/price/society" className={styles.text}>
          Перейти в общество.
        </Link>
      </div>
      <MatrixRain></MatrixRain>
    </div>
  );
};

export default page;
