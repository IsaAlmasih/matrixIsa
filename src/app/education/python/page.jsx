"use client";
import Book from "@/components/book/Book";
import React from "react";

import styles from "../../education/python/styles.module.css";
import { useRouter } from "next/navigation";

import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className={styles.wrapper}>
        <h4>Язык программирования Python</h4>
        <div className={styles.wrap}>
          <div className={styles.container}>
            <Book
              text1={`<a href="/">Переменные</a>
                            <a href="/">Операторы</a>
                            <a href="/">Циклы</a>
                            <a href="/">Списки</a>
                            <a href="/">Словари</a>
                            <a href="/">Строки</a>
                            <a href="/">Функции</a>
                            <a href="/">Классы</a>
                            Перед вами несколько тем, выберите интересующую. `}
              text2={`Здравствуйте. Рад видеть вас на своём сайте. По мере возможности стараюсь делать всё для вашего развития и в первую очередь хочу сказать, Вежливость, залог успеха. Смелость, справедливость, добродушие = сильные люди! Для того, чтобы нам с вами увидеться, вам нужно ответить на вопросы по этой ссылке. В случае всех верных ответов при нажатии на кнопку вы прой-дёте на скрытые страницы. 
                  `}
            ></Book>
          </div>
        </div>
          <button
            onClick={() => router.push("/education")}
            className={styles.button}
          >
            {"<--"}Назад
          </button>
      </div>
      <MatrixRain></MatrixRain>

    </div>
  );
};

export default page;
