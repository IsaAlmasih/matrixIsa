"use client";
import React, { use } from "react";
import styles from "./styles.module.css";
import Category from "@/components/Category/Category";
// import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

import image from "../../../assets/113111.jpg";
import image1 from "../../../assets/142221.jpg";
import image2 from "../../../assets/11111111.jpg";

const services = [

  { id: 1, name: "Товар 5.", image, description: "...", link: "" },
  { id: 2, name: "Товар 6.", image, description: "...", link: "" },
  { id: 3, name: "Товар 7", image, description: "...", link: "" },
  { id: 4, name: "Товар 8", image, description: "...", link: "" },
];

import { useRouter } from "next/navigation";
const page = () => {
  // const images = [image.src, image1.src, image2.src];
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.text}>Страница товаров</div> */}
      <div className={styles.image}>
        Страница товаров для творчества.
        <div className="category-list">
          {services.map(({ id, name, image, link }) => (
            <Category id={id} categoryName={name} image={image} href={link} />
          ))}
        </div>
      </div>
      <button
        onClick={() => router.push("/products")}
        className={styles.button}
      >
        {"<--"}Назад
      </button>
    </div>
  );
};

export default page;
