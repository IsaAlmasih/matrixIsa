"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "../education/styles.module.css";
// import { MatrixRain } from "@/components/MatrixRain/MatrixRain";
import ProductCard from "@/components/productCard/productCard";

import image from "../../assets//education/python.jpg";
import image1 from "../../assets/education/React_next_js.jpg";
import image2 from "../../assets/education/React.jpg";
import image3 from "../../assets/education/djang.jpg";

import { useRouter } from "next/navigation";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";
import Book from "@/components/book/Book";

import MatrixRainCard from "../../components/MatrixRainCard/MatrixRainCard";
import HTMLFlipBook from "react-pageflip";

const page = () => {
  const images3 = [
    {
      name: "React.",
      id: 1,
      image: image2.src,
      link: "/education/react",
      hasMatrixRain: false,
    },
    {
      name: "React Next js",
      id: 1,
      image: image2.src,
      link: "/education/react",
      hasMatrixRain: false,
    },
    {
      name: "Python",
      id: 1,
      image: image2.src,
      link: "/education/python",
      hasMatrixRain: false,
    },
    {
      name: "Revit",
      id: 1,
      image: image2.src,
      link: "/education/react",
      hasMatrixRain: false,
    },
    {
      name: "Django",
      id: 1,
      image: image2.src,
      link: "/education/django",
      hasMatrixRain: false,
    },
  ];
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(1920);
  useEffect(() => {
    setWidth(screen.width);

    const windowResize = () => {
      setWidth(screen.width);
    };
    window.addEventListener("resize", windowResize);

    return () => {
      window.addEventListener("resize", windowResize);
    };
  }, []);

  useEffect(() => {
    if (width < 480) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <div key="10" className={styles.mainWrapper}>
      <div className={styles.text}>Выберите интересующую тему.</div>
      <div className={styles.MatrixWrapper}>
        {images3 &&
          images3.map((image, index) => (
            <MatrixRainCard
              key={index}
              name={image.name}
              id={image.id}
              link={image.link}
              image={image.image}
            />
          ))}
      </div>
      <MatrixRain></MatrixRain>
      <button
        onClick={() => router.push("/PlanetPage")}
        className={styles.button}
      >
        {"<--"}Назад
      </button>
    </div>
  );
};

export default page;
