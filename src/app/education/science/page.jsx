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
      name: "Тема культуры - Минеральное царство.",
      href: "/education/django",
    },
    {
      className: styles.textGridTwo,
      name: "Тема культуры - Растительное царство.",
      href: "/education/django",
    },
    {
      className: styles.textGridThree,
      name: "Тема культуры - Животное царство.",
      href: "/",
    },
    {
      className: styles.textGridFour,
      name: "Тема культуры - Почвы — биокосное царство.",
      href: "/",
    },
    {
      className: styles.textGridFive,
      name: "Тема культуры – Протистов царство.",
      href: "/",
    },
    {
      className: styles.textGridSix,
      name: "Тема культуры – Монера и Дробянки царство.",
      href: "/",
    },
    {
      className: styles.textGridSeven,
      name: "Тема культуры – царство грибов.",
      href: "/",
    },
    { className: styles.textGridEight, name: "Тама с .", href: "/" },
    {
      className: styles.textGridTen,
      name: "Тама с культуры культуры культуры.",
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
