"use client";
import React, { use, useEffect, useState } from "react";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

import styles from "./styles.module.css";
import HTMLFlipBook from "react-pageflip";

import { useRouter } from "next/navigation";

const Book = (props) => {
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


  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        <HTMLFlipBook
          width={isMobile ? 500 : 500}
          height={isMobile ? 600 : 600}
          className={styles.book}
        >
          <div
            className={styles.firstPage}
            dangerouslySetInnerHTML={{ __html: props.text1 }}
          ></div>
          <div
            className={styles.secondPage}
            dangerouslySetInnerHTML={{ __html: props.text2 }}
          >
          </div>
          <div className={styles.thirdPage}>
            <>{props.text3}</>
          </div>
          <div className={styles.secondPage}>
            <>{props.text4}</>
          </div>
          <div className={styles.firstPage}>
            <>{props.text5}</>
          </div>
          <div className={styles.secondPage}>
            <>{props.text6}</>
          </div>
          <div className={styles.firstPage}>
            <>{props.text7}</>
          </div>
          <div className={styles.secondPage}>
            <>{props.text8}</>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Book;








