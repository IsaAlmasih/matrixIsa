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
      name: "Тема природы - Минеральное царство.",
      href: "/education/django",
    },
    {
      className: styles.textGridTwo,
      name: "Тема природы - Растительное царство.",
      href: "/education/django",
    },
    {
      className: styles.textGridThree,
      name: "Тема природы - Животное царство.",
      href: "/",
    },
    {
      className: styles.textGridFour,
      name: "Тема природы - Почвы — биокосное царство.",
      href: "/",
    },
    {
      className: styles.textGridFive,
      name: "Тема природы – Протистов царство.",
      href: "/",
    },
    {
      className: styles.textGridSix,
      name: "Тема природы – Монера и Дробянки царство.",
      href: "/",
    },
    {
      className: styles.textGridSeven,
      name: "Тема природы – царство грибов.",
      href: "/",
    },
    { className: styles.textGridEight, 
      name: "Космология.", 
      href: "/" },
    {
      className: styles.textGridTen,
      name: "Человек",
      href: "/",
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
