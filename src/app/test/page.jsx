"use client";
import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import Link from 'next/link';

const page = () => {
    const [res, setRes] = useState(null);
    const [view,setView] = useState(null)
useEffect(()=>{
      const fetchBlocks = async (blockData) => {
        try {
          // Отправляем POST запрос
          const response = await fetch(
            "http://localhost:8000/survey/api/blocks/",
            {
              method: "GET", // Указываем метод GET
              headers: {
                "Content-Type": "application/json", // Указываем, что данные отправляются как JSON
              },
              body: JSON.stringify(blockData), // Преобразуем объект в строку JSON
            }
          );

          // Проверяем, успешен ли запрос
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Парсим JSON-ответ
          const data = await response.json();
          setRes(data)

          // Выводим данные из ответа
          console.log("Block created:", data);
        } catch (error) {
          // Обрабатываем ошибки
          console.error("Error creating block:", error);
        }
      };
      fetchBlocks()
},[])
useEffect (()=>{
  setView(res)
},[res])

  return (
    <div className={styles.wrapper}>
      <div className={styles.include}>
        {view
          ? view.map((item, index) => (
              <button
                className={styles.wrappe}
                onClick={() => {
                  setView(item.blocks);
                }}
                key={index}
              >
                {item.text}
              </button>
            ))
          : ""}
      </div>
      <button onClick={() => setView(res)} className={styles.butt}>
        {"<--"}Назад
      </button>
      <Link href={"/"}>Вернуться на главную.</Link>
    </div>
  );
}

export default page