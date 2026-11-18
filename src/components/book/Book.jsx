"use client";
import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";
import HTMLFlipBook from "react-pageflip";

const PAGE_COUNT = 8;

const Book = (props) => {
  const bookRef = useRef(null);
  const pendingPageSelectionRef = useRef(null);
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const isMobile = viewport.width <= 768 || viewport.height <= 500;
  const availableHeight = viewport.height - (props.fitViewport ? 220 : 160);
  const pageWidth = Math.floor(
    isMobile
      ? Math.max(
          160,
          Math.min(500, viewport.width - 32, availableHeight * (5 / 6)),
        )
      : 500,
  );
  const pageHeight = Math.floor(
    isMobile
      ? Math.max(180, Math.min(600, availableHeight, pageWidth * 1.2))
      : props.fitViewport
        ? Math.max(180, Math.min(600, availableHeight))
        : 600,
  );
  const selectorCount = isMobile ? PAGE_COUNT : Math.ceil(PAGE_COUNT / 2);

  const handleFlip = (event) => {
    setCurrentPage(event.data);
    if (pendingPageSelectionRef.current !== null) {
      setSelectedPage(pendingPageSelectionRef.current);
      pendingPageSelectionRef.current = null;
    } else {
      setSelectedPage(event.data);
    }
  };

  const selectPage = (selectorIndex) => {
    const pageIndex = isMobile ? selectorIndex : selectorIndex * 2;
    setSelectedPage(pageIndex);

    if (pageIndex === currentPage) return;

    pendingPageSelectionRef.current = pageIndex;
    bookRef.current?.pageFlip().turnToPage(pageIndex);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bookContainer}>
        <HTMLFlipBook
          key={`${pageWidth}x${pageHeight}-${isMobile}`}
          width={pageWidth}
          height={pageHeight}
          className={styles.book}
          ref={bookRef}
          usePortrait={isMobile}
          useMouseEvents={false}
          onFlip={handleFlip}
          onInit={() => {
            setCurrentPage(0);
            setSelectedPage(0);
            pendingPageSelectionRef.current = null;
          }}
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
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navigationButton}
            onClick={() => bookRef.current?.pageFlip().flipPrev()}
            disabled={currentPage === 0}
            aria-label="Предыдущая страница"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.navigationButton}
            onClick={() => bookRef.current?.pageFlip().flipNext()}
            disabled={currentPage === 7}
            aria-label="Следующая страница"
          >
            →
          </button>
        </div>
      </div>
      <nav className={styles.pageSelector} aria-label="Выбор страницы">
        {Array.from({ length: selectorCount }, (_, selectorIndex) => {
          const pageIndex = isMobile ? selectorIndex : selectorIndex * 2;

          return (
            <button
              key={selectorIndex}
              type="button"
              className={styles.pageButton}
              onClick={() => selectPage(selectorIndex)}
              aria-label={
                isMobile
                  ? `Перейти на страницу ${pageIndex + 1}`
                  : `Перейти к развороту ${selectorIndex + 1}`
              }
              aria-current={selectedPage === pageIndex ? "page" : undefined}
            >
              {selectorIndex + 1}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Book;
