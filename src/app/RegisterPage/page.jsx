"use client";

import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./styles.module.css";
import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

const Page = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      acceptedPolicy: false,
    },

    validate(values) {
      const errors = {};

      if (!values.login) {
        errors.login = "Введите почту";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.login)) {
        errors.login = "Введите корректную почту";
      }

      if (!values.password) {
        errors.password = "Введите пароль";
      } else if (values.password.length < 8) {
        errors.password = "Минимум 8 символов";
      }

      if (!values.acceptedPolicy) {
        errors.acceptedPolicy =
          "Необходимо согласиться с политикой конфиденциальности";
      }

      return errors;
    },

    async onSubmit(values, { setStatus, setSubmitting }) {
      try {
        setStatus(undefined);

        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.login,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus({ error: data.message || "Ошибка регистрации" });
          return;
        }

        // Аккаунт создан — на страницу входа
        router.push("/LoginPage");
      } catch (err) {
        console.error(err);
        setStatus({ error: "Не удалось связаться с сервером" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <MatrixRain />
      <div className={styles.blockLoginUser}>
        <h3 className={styles.textAuth}>Регистрация</h3>
        <div className={styles.blockFormLogin}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.blockInput}>
              <label htmlFor="email">Введите почту</label>
              <input
                id="email"
                type="email"
                name="login"
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.login && formik.errors.login && (
                <p>{formik.errors.login}</p>
              )}
            </div>

            <div className={styles.blockInput}>
              <label htmlFor="pass">Введите пароль</label>
              <input
                id="pass"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>

            <div className={styles.selectRole}>
              <h3>Ваше имя: «Пользователь»</h3>
            </div>

            <div className={styles.politic}>
              <label htmlFor="politic">
                <input
                  type="checkbox"
                  id="politic"
                  name="acceptedPolicy"
                  checked={formik.values.acceptedPolicy}
                  onChange={formik.handleChange}
                />
                <Link href="/privacy" className={styles.smallText}>
                  <small>Политика конфиденциальности</small>
                </Link>
              </label>
              {formik.errors.acceptedPolicy && (
                <p>{formik.errors.acceptedPolicy}</p>
              )}
            </div>

            {formik.status?.error && <p>{formik.status.error}</p>}

            <button
              type="submit"
              className={styles.btnLogin}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>

          <div className={styles.blockWithTextRegAcc}>
            <p className={styles.textCreateAcc}>
              Если уже есть аккаунт, ты можешь авторизоваться
            </p>
            <div>
              <Link href="/LoginPage" className={styles.smallText}>
                <small>Авторизоваться</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
