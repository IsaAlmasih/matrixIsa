"use client";
import React, { useRef, useState } from "react";

import styles from "./styles.module.css";

import { Link } from "next/link";

import ImageWithModal from "../../components/ImageWithModal/ImageWithModal";
import imag from "./154.jpg";
import imag1 from "./11111.jpg";
import imag2 from "./11111.jpg";
import imag3 from "./11111.jpg";
import imag4 from "./11111.jpg";
import imag5 from "./11111.jpg";
import imag6 from "./11111.jpg";
import imag7 from "./11111.jpg";
import imag8 from "./11111.jpg";
import imag9 from "./11111.jpg";
import imag10 from "./154.jpg";
import imag11 from "./11111.jpg";
import imag12 from "./11111.jpg";
import imag13 from "./11111.jpg";
import imag14 from "./11111.jpg";
import imag15 from "./154.jpg";
import imag16 from "./11111.jpg";
import imag17 from "./11111.jpg";
import imag18 from "./11111.jpg";
import imag19 from "./11111.jpg";
import imag20 from "./154.jpg";
import imag21 from "./11111.jpg";
import imag22 from "./11111.jpg";
import imag23 from "./11111.jpg";
import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

const Page = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  // const img1 = useRef(null); //useRef - это ссылка (null) = это значение. const img1 - это то куда пишем ссылку
  // const onClick = () => {
  //   if (!isOpen1){
  //   img1.current.styles.position="absolute";
  //   // img1.current.styles.position = "top";
  //   // img1.current.styles.position = "left";
  //   img1.current.style.maxWidth = "400px";
  //   img1.current.style.width = "400px";}
  //   else {
  //   img1.current.style.maxWidth = "250px";
  //   img1.current.style.width = "250px";}
  //   setIsOpen1(!isOpen1)

  // };
  return (
    <div className={styles.wrapper}>
      <div className={styles.imges}>
        <ImageWithModal
          src={imag.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag1.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag2.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag3.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag4.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag5.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag6.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag7.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag8.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag9.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag10.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag11.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag12.src}
          alt={"Книга Ключи"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag13.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag14.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag15.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag16.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag17.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag18.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag19.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag20.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag21.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag22.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
        <ImageWithModal
          src={imag23.src}
          alt={"Книга Вечный Завет"}
          width={150}
          height={250}
        />
      </div>
      <div className={styles.wrappe}>
        <a href="112.pdf">Книга Вечный Завет.</a>
        <a href="1001.pdf">Книга Ключи.</a>
        <a href="/PlanetPage">Вернутся на главную.</a>
      </div>
    </div>
  );
};
export default Page;
