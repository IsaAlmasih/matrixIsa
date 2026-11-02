"use client";
import React, { use } from "react";
import styles from "./styles.module.css";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

import image from "../../../assets/4444.png";
import image1 from "../../../assets/444444.png";
import image2 from "../../../assets/book4.jpg";

import { useRouter } from "next/navigation";

import ProductCard from "@/components/productCard/productCard";
import Category from "@/components/Category/Category";

const books = [
  {
    id: 1,
    type: "book",
    image,
    name: "Книга 1",
    isbn: 123125135135,
    description: "Краткое описание",
    price: 2000,
    author: "Pushkin",
    link: "/ditails/detail1",
  },
  {
    id: 2,
    type: "book",
    image: image1,
    name: "Книга 2",
    isbn: 123125135135,
    description: "Краткое описание",
    price: 2000,
    author: "Pushkin",
    link: "/ditails/detail2",
  },
  {
    id: 3,
    type: "book",
    image: image2,
    name: "Книга 3",
    isbn: 123125135135,
    description: "Краткое описание",
    price: 2000,
    author: "Pushkin",
    link: "/ditails/detail3",
  },
  {
    id: 4,
    type: "book",
    image,
    name: "Сотрудничество.",
    isbn: 123125135135,
    link: "/ditails/detail4",
  },
];

const page = () => {
  const images = [image.src, image1.src, image2.src];
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Это страница книг!</div>
        <div className="category-list">
          {/* {" "}
          {images.map((src, index) => (
            <img key={index} src={src} />
          ))} */}
          {/* {books && books.map((book) => <ProductCard product={book} />)} */}
          {books &&
            books.map(({ id, name, image, link }) => (
              <Category id={id} categoryName={name} image={image} href={link} />
            ))}
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
