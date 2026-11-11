"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./styles.module.css";

import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

const Page = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  // Проверяем, авторизован ли пользователь
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (response.ok) {
          router.replace("/study");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();
  }, [router]);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },

    onSubmit: async (values, { setSubmitting }) => {
      setError("");

      try {
        const response = await fetch("/api/users/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: values.login,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Ошибка авторизации");
          return;
        }

        // Сервер уже установил HttpOnly-cookie
        router.replace("/user");
      } catch (error) {
        console.error("Login error:", error);
        setError("Не удалось подключиться к серверу");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <MatrixRain />

      <div className={styles.blockLoginUser}>
        <h3 className={styles.textAuth}>Авторизация</h3>

        <div className={styles.blockFormLogin}>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="login" className={styles.labelAuth}>
              Почта
            </label>

            <input
              type="email"
              name="login"
              id="login"
              className="login"
              maxLength={254}
              required
              value={formik.values.login}
              onChange={formik.handleChange}
            />

            <label htmlFor="password" className={styles.labelAuth}>
              Пароль
            </label>

            <input
              type="password"
              name="password"
              id="password"
              className="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            {error && <p className={styles.error}>{error}</p>}

            <button
              className={styles.btnLogin}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Входим..." : "Войти"}
            </button>
          </form>

          <div className={styles.blockWithTextRegAcc}>
            <p className={styles.textCreateAcc}>
              Ещё нет аккаунта? Создай его, нажав на ссылку ниже
            </p>

            <Link href="/RegistrPage" className={styles.smallText}>
              <small>Зарегистрировать аккаунт</small>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
