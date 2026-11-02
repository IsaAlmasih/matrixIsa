"use client";
import Link from "next/link";

import styles from "./styles.module.css";

import React from "react";
import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

const page = () => {
  return (
    <div>
      <div>
        <Link href={"/price"} className={styles.wrapper}>
          Благотворительный Фонд "СДС и ОУ".
        </Link>
      </div>
      {/* <MatrixRain></MatrixRain> */}
    </div>
  );
};

export default page;
