"use client";
import React, { useRef, useEffect, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import styles from "./styles.module.css";
import HTMLFlipBook from "react-pageflip";

const Book = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(1920);
  const bookRef = useRef(null);

  useEffect(() => {
    setWidth(screen.width);

    const windowResize = () => {
      setWidth(screen.width);
    };
    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(width < 480);
  }, [width]);

  const flipNext = () => bookRef.current?.pageFlip().flipNext();
  const flipPrev = () => bookRef.current?.pageFlip().flipPrev();

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.arrowLeft}
        onClick={flipPrev}
        aria-label="Предыдущая страница"
      >
        <ArrowBackIosIcon />
      </button>

      <HTMLFlipBook
        ref={bookRef}
        width={500}
        height={600}
        className={styles.book}
        showCover={true}
        useMouseEvents={false}
        useSwipe={false}
      >
        <div
          className={styles.firstPage}
          dangerouslySetInnerHTML={{ __html: props.text1 }}
        ></div>
        <div
          className={styles.secondPage}
          dangerouslySetInnerHTML={{ __html: props.text2 }}
        ></div>
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

      <button
        className={styles.arrowRight}
        onClick={flipNext}
        aria-label="Следующая страница"
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default Book;
