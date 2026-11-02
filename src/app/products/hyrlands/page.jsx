"use client";
import React, { use } from "react";
import styles from "./styles.module.css";
import Category from "@/components/Category/Category";
// import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

import image from "../../../assets/113111.jpg";
import image1 from "../../../assets/142221.jpg";
import image2 from "../../../assets/11111111.jpg";

const services = [
  {
    id: 1,
    name: "Товар 9.",
    image,
    description: "...",
    link: "/ditails/detail5",
  },
  {
    id: 2,
    name: "Товар 10.",
    image,
    description: "...",
    link: "/ditails/detail6",
  },
  {
    id: 3,
    name: "Товар 11",
    image,
    description: "...",
    link: "/ditails/detail7",
  },
  {
    id: 4,
    name: "Товар 12",
    image,
    description: "...",
    link: "/ditails/detail8",
  },
];

import { useRouter } from "next/navigation";
const page = () => {
  // const images = [image.src, image1.src, image2.src];
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.text}>Страница товаров</div> */}
      <div className={styles.image}>
        Страница товаров нового года.
        <div className="category-list">
          {services.map(({ id, name, image, link }) => (
            <Category id={id} categoryName={name} image={image} href={link} />
          ))}
        </div>
      </div>
      <button
        onClick={() => router.push("/products")}
        className={styles.button}
      >
        {"<--"}Назад
      </button>
    </div>
  );
};

export default page;

















// "use client";
// import React, { use } from "react";
// import styles from "./styles.module.css";
// import { MatrixRain } from "@/components/MatrixRain/MatrixRain";

// import image from "../../../assets/4444.png";
// import image1 from "../../../assets/444444.png";
// import image2 from "../../../assets/book4.jpg";

// import { useRouter } from "next/navigation";
// const page = () => {
//   const images = [image.src, image1.src, image2.src];
//   const router = useRouter();
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.text}>Это страница Гирлянды!</div>
//       <div className={styles.image}>
//         Картинки.
//         <div className={styles.images}>
//           {" "}
//           {images.map((src, index) => (
//             <img key={index} src={src} />
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={() => router.push("/products")}
//         className={styles.button}
//       >
//         {"<--"}Назад
//       </button>
//     </div>
//   );
// };

// export default page;
