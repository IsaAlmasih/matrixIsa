"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../nature/styles.module.css";

import Link from "next/link";
import MatrixRainCard from "../../../components/MatrixRainCard/MatrixRainCard";

export default function law() {
  const router = useRouter();
  const topics = [
    {
      className: styles.textGridOne,
      name: "Библиотеки программирования.",
      href: "/",
    },
    {
      className: styles.textGridTwo,
      name: "Тема культуры - Растительное царство.",
      href: "/education/django",
    },
    {
      className: styles.textGridThree,
      name: "Библиотеки  книг.",
      href: "/keys",
    },
    {
      className: styles.textGridFour,
      name: "ЯП React.",
      href: "/education/react",
    },
    {
      className: styles.textGridFive,
      name: "Библиотеки.",
      href: "/",
    },
    {
      className: styles.textGridSix,
      name: "ЯП Python",
      href: "/education/python",
    },
    {
      className: styles.textGridSeven,
      name: "ЯП django.",
      href: "/education/django",
    },
    { className: styles.textGridEight, name: "Тама с .", href: "/" },
    {
      className: styles.textGridTen,
      name: "Тама о ИИ",
      href: "/additional/questionTen",
    },
  ];

  return (
    <form>
      <div className={styles.wrapper}>
        <div className={styles.blok}>
          <div className={styles.blo}>
            <div className={styles.textGrid}>
              {topics.map(({ className, name, href }) => (
                <div key={name} className={className}>
                  {href ? (
                    <Link href={href} className={styles.cardLink}>
                      <MatrixRainCard name={name} />
                    </Link>
                  ) : (
                    <MatrixRainCard name={name} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className={styles.buttonLaw}>
          <a href="/education">Назад. </a>
        </button>
      </div>
    </form>
  );
}
