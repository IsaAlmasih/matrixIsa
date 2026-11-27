"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const [authStatus, setAuthStatus] = useState("checking");
  const [authError, setAuthError] = useState("");
  const authCheckSequenceRef = useRef(0);
  const href = authStatus === "authenticated" ? "/matrix" : "/LoginPage";

  const checkAuth = useCallback(async () => {
    const requestId = ++authCheckSequenceRef.current;
    setAuthStatus("checking");
    setAuthError("");

    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });

      if (requestId !== authCheckSequenceRef.current) return;

      if (response.status === 401) {
        setAuthStatus("unauthenticated");
        return;
      }

      if (!response.ok) {
        throw new Error("Не удалось проверить авторизацию");
      }

      const data = await response.json();
      if (requestId !== authCheckSequenceRef.current) return;

      setAuthStatus(
        data.authenticated ? "authenticated" : "unauthenticated",
      );
    } catch (error) {
      if (requestId !== authCheckSequenceRef.current) return;

      console.error("Account authorization check error:", error);
      setAuthError("Не удалось проверить авторизацию. Попробуйте ещё раз.");
      setAuthStatus("error");
    }
  }, []);

  const openAccountModal = () => {
    setIsAccountModalOpen(true);
    checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const headerClasses = clsx(styles.header, {
    [styles.isVisible]: isVisible,
  });

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (!response.ok) {
        throw new Error("Не удалось выйти из аккаунта");
      }

      setAuthStatus("unauthenticated");
      router.replace("/");
      setIsAccountModalOpen(false);
    } catch (error) {
      console.error("Account logout error:", error);
      setAuthError("Не удалось выйти из аккаунта. Попробуйте ещё раз.");
      setAuthStatus("error");
    }
  };

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
      <button
        type="button"
        className={styles.profileButton}
        onClick={openAccountModal}
        aria-label="Открыть меню аккаунта"
        aria-haspopup="dialog"
        aria-expanded={isAccountModalOpen}
      >
        <Image src={Imag4} height={50} width={50} alt="" />
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.openPopup}
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
        </svg>
      </button>
      {isOpen &&
        createPortal(
          <div
            className={styles.popup}
            onClick={() => setIsOpen(false)}
          >
            <section
              className={styles.content}
              role="dialog"
              aria-modal="true"
              aria-label="Меню"
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.headContent}>
                <p>Меню</p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <path
                      d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 41.1924 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.navigation}>
                <Link href="/">Главная страница</Link>
                <Link href="/user">Личный кабинет</Link>
              </div>
            </section>
          </div>,
          document.body,
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
              {authStatus === "checking" && (
                <p className={styles.accountStatus} role="status">
                  Проверяем авторизацию...
                </p>
              )}
              {authStatus === "error" && (
                <>
                  <p className={styles.accountStatus} role="alert">
                    {authError}
                  </p>
                  <button
                    type="button"
                    className={styles.accountLogout}
                    onClick={checkAuth}
                  >
                    Повторить проверку
                  </button>
                </>
              )}
              {authStatus === "unauthenticated" && (
                <>
                  <Link
                    href="/LoginPage"
                    className={styles.accountLink}
                    onClick={() => setIsAccountModalOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link
                    href="/RegisterPage"
                    className={styles.accountLink}
                    onClick={() => setIsAccountModalOpen(false)}
                  >
                    Зарегистрироваться
                  </Link>
                </>
              )}
              {authStatus === "authenticated" && (
                <Link
                  href="/user"
                  className={styles.accountLink}
                  onClick={() => setIsAccountModalOpen(false)}
                >
                  Личный кабинет
                </Link>
              )}
              {authStatus === "authenticated" && (
                <button
                  type="button"
                  className={styles.accountLogout}
                  onClick={logout}
                >
                  Выйти из матрицы
                </button>
              )}
            </section>
          </div>,
          document.body,
        )}
    </header>
  );
};

export default Header;
