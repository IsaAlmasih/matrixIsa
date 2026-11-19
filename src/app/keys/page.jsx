"use client";
import React, { useRef, useState } from "react";

import styles from "./styles.module.css";

import { Link } from "next/link";

import ImageWithModal from "../../components/ImageWithModal/ImageWithModal";
import imag from "./154.jpg";
import imag1 from "./11111.jpg";
import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

const Page = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const images = [
    { src: imag.src, 
      alt: "Книга Вечный Завет" },
    ...Array.from({ length: 14 }, () => ({
      src: imag1.src,
      alt: "Книга Ключи",
    })),
  ];
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
      <div className={styles.imageGrid}>
        {images.map((image, index) => (
          <div className={styles.imageCard} key={`${image.alt}-${index}`}>
            <ImageWithModal
              src={image.src}
              alt={image.alt}
              width={300}
              height={400}
            />
          </div>
        ))}
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
