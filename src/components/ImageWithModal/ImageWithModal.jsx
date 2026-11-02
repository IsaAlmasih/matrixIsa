// components/ImageWithModal.js
import { useState } from "react";
import Image from "next/image";
import styles from "./ImageWithModal.module.css";

const ImageWithModal = ({ src, alt, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={handleOpen}
        className={styles.clickableImage}
      />

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image className={styles.big}
              src={src}
              alt={alt}
              width={width * 2} // Увеличьте размер по необходимости
              height={height * 2}
            />
            <button className={styles.closeButton} onClick={handleClose}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageWithModal;
