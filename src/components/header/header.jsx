"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "next/link";

import Image from "next/image";
import logo from "../../assets/141.jpg";
import Imag4 from "../../assets/education/141.jpg";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerClasses = clsx(styles.header, {
    [styles.isVisible]: isVisible,
  });
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    localStorage.removeItem("user");
    router.replace("/");
    setIsAccountModalOpen(false)
  };

  const [href, setHref] = useState("/LoginPage");

  useEffect(() => {
    setHref(localStorage.getItem("user") ? "/matrix" : "/LoginPage");
  }, []);

  useEffect(() => {
    if (!isAccountModalOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsAccountModalOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isAccountModalOpen]);

  return (
    <header className={headerClasses}>
      <Link className={styles.logo} href={href}>
        <Image src={logo} width={45} height={45} alt="logo" />
        Matrix
      </Link>
      <div className={styles.btn}>
        <Link href="/PlanetPage">На главную</Link>
      </div>
      {/* <div className={styles.navigation}>
        <button onClick={logout}>Выйти из матрицы.</button>
      </div> */}
      <button
        type="button"
        className={styles.profileButton}
        onClick={() => setIsAccountModalOpen(true)}
        aria-label="Открыть меню аккаунта"
        aria-haspopup="dialog"
        aria-expanded={isAccountModalOpen}
      >
        <Image src={Imag4} height={50} width={50} alt="" />
      </button>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.openPopup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.content}>
            <div className={styles.headContent}>
              <p>Меню</p>
              <button onClick={() => setIsOpen(!isOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.navigation}>
              <Link href={"/PlanetPage"}>Главная страница</Link>
              <Link href={"/about"}>О нас</Link>
              <Link href={"/"}>Контакты</Link>
              <Link href={"/user"}>Личный кабинет</Link>
            </div>
          </div>
        </div>
      )}
      {isAccountModalOpen &&
        createPortal(
          <div
            className={styles.accountOverlay}
            onClick={() => setIsAccountModalOpen(false)}
          >
            <section
              className={styles.accountModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="account-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.accountClose}
                onClick={() => setIsAccountModalOpen(false)}
                aria-label="Закрыть"
              >
                ×
              </button>
              <h2 id="account-modal-title">Аккаунт</h2>
              <Link
                href="/user"
                className={styles.accountLink}
                onClick={() => setIsAccountModalOpen(false)}
              >
                Личный кабинет
              </Link>
              <button
                type="button"
                className={styles.accountLogout}
                onClick={logout}
              >
                Выйти из матрицы
              </button>
            </section>
          </div>,
          document.body,
        )}
    </header>
  );
};

export default Header;
