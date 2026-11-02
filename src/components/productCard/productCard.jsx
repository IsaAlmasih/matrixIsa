"use client";
// components/ProductCard.js
import Image from "next/image";
import styles from "./ProductCard.module.css";

import useStore from "../../stores/cart";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
// import { MatrixRainCart } from "../MatrixRainCart/MatrixRainCart";

const ProductCard = ({ product, hasMatrixRain }) => {
  const addToCart = useStore((state) => state.addToCart);
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [isBuyed, setIsBuyed] = useState(
    cart.find((cartItem) => cartItem.id === product.id) ? true : false
  );

  const handleIncrease = (itemId) => {
    increaseQuantity(itemId);
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = (itemId) => {
    if (quantity > 1) {
      decreaseQuantity(itemId);
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.card}>
      <Image
        src={product.image}
        alt={product.name}
        className={styles.image}
        width={150}
        height={150}
      />
      {/* {hasMatrixRain && <MatrixRainCart />} */}
      <Link href={product.link}>
        <h3 className={styles.name}>{product.name}</h3>
      </Link>

      {/* <p className={styles.price}>{product.price}p</p> */}
      {/* <a href={product.link}><button>Описание</button></a> */}
      {/* <button
        className={styles.button}
        onClick={() => {
          if (isBuyed) {
            removeFromCart(product.id);
            setIsBuyed(false);
          } else {
            addToCart(product);
            setIsBuyed(true);
          }
        }}
      >
        {isBuyed ? "Удалить из корзины" : "Перейти"}
      </button> */}
      {isBuyed && (
        <>
          <span>
            {product.name} (x{quantity}) - {product.price}
          </span>
          <button
            onClick={() => handleIncrease(product.id)}
            style={{ marginLeft: "10px" }}
          >
            +
          </button>
          <button
            onClick={() => handleDecrease(product.id)}
            style={{ marginLeft: "5px" }}
          >
            -
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
