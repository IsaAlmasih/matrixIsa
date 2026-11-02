import React from "react";
import styles from "../app/styles.module.css";
import Link from "next/link";

import { MatrixRain } from "./../components/MatrixRain/MatrixRain"

const page = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <Link href="/PlanetPage" className={styles.text}>
          Matrix
        </Link>
      </div>
      <MatrixRain></MatrixRain>
    </div>
  );
};

export default page;
