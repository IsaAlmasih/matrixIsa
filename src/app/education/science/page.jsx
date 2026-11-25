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
      name: "Программирование.",
      href: "/",
    },
    {
      className: styles.textGridTwo,
      name: "Телевидение",
      href: "/",
    },
    {
      className: styles.textGridThree,
      name: "Игры",
      href: "/",
    },
    {
      className: styles.textGridFour,
      name: "Организации",
      href: "/ked-shops",
    },
    {
      className: styles.textGridFive,
      name: "Музыка",
      href: "/",
    },
    {
      className: styles.textGridSix,
      name: "4",
      href: "/",
    },
    {
      className: styles.textGridSeven,
      name: "6",
      href: "/",
    },
    { className: styles.textGridEight, name: "Тама 7 с .", href: "/" },
    {
      className: styles.textGridTen,
      name: "8",
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
