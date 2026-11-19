"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../products/styles.module.css";

import MatrixRainCard from "../../components/MatrixRainCard/MatrixRainCard";
import Link from "next/link";

export default function law() {
  const router = useRouter();
  const topics = [
    {
      className: styles.textGridOne,
      name: "Вид деятельности 55.",
      href: "/ked-shops",
    },
    {
      className: styles.textGridTwo,
      name: "Вид деятельности 55.",
      href: "/education/django",
    },
    {
      className: styles.textGridThree,
      name: "Вид деятельности 55.",
      href: "/",
    },
    {
      className: styles.textGridFour,
      name: "Вид деятельности 55.",
      href: "/",
    },
    {
      className: styles.textGridFive,
      name: "Вид деятельности 55.",
      href: "/",
    },
    {
      className: styles.textGridSix,
      name: "Вид деятельности 55.",
      href: "/",
    },
    {
      className: styles.textGridSeven,
      name: "Вид деятельности 55.",
      href: "/",
    },
    {
      className: styles.textGridEight,
      name: "Вид деятельности 55.",
      href: "/",
    },
    {
      className: styles.textGridTen,
      name: "Вид деятельности 55.",
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
          <a href="/PlanetPage">Назад. </a>
        </button>
      </div>
    </form>
  );
}
