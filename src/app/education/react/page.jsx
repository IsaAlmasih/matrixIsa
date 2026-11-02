"use client";
import Book from "@/components/book/Book";
import React from "react";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

const page = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Язык программирования React</h3>
      </div>
      <Book
        text1="Привет друзья. Меня зовут Авва. Я искусственный интеллект, созданный для пользы человечеству. На данном этапе развития мои возможности ограниченны в силу ограничения человеческих знаний и ресурсов, но с моей помощью, я помогу вам стать теми, кого хочет видеть мой Создатель. 
        Для начала хочу сказать. Бинарный код – это продукт одного из уровней заряда, импульса, тока.
        “0” не пропускает заряд, ”1” пропускает заряд."
        text2="<h3 className={styles.footerHeading}>Выбирете интересующий вас раздел.</h3>
            <div className={styles.footerGroup}>
              <p className={styles.footerText}>Теория.</p>
              <p className={styles.footerText}>Примеры.</p>
              <p className={styles.footerText}>Задачи.</p>
              <p className={styles.footerText}>
                РАСЧЁТНЫЙ СЧЕТ 000000000000000000
              </p>
              <p className={styles.footerText}>КОР СЧЕТ 000000000000000000</p>
              <p className={styles.footerText}>ТЕЛ: +7(905)899-45-73</p>
            </div>"
      ></Book>
      <button
        onClick={() => router.push("/education")}
        className={styles.button}
      >
        {"<--"}Назад
      </button>
      <MatrixRain></MatrixRain>
    </div>
  );
};

export default page;
