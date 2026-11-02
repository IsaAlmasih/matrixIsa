"use client";
import Link from "next/link";

import styles from "./styles.module.css";

import React from "react";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

const page = () => {
  return (
    <div className={styles.wrappe}>
      <div className={styles.wrapper}>
        <Link href={"/"}>Вернуться.</Link>
        <Link href={"/UserAgreement.pdf"}>Пользовательское соглашение .</Link>
        <a href={"/deta_Ip.pdf"}>Политика.</a>
        <Link href={"/contacts.pdf"}>Реквизиты.</Link>
        <Link href={"/PrivacyPolicy.pdf"}>Пользовательское..</Link>
        <Link href={"/PlanetPage"}>Вернутся назад.</Link>
      </div>
      <MatrixRain></MatrixRain>
    </div>
  );
};

export default page;
