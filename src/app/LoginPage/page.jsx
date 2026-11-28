"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./styles.module.css";
import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState("credentials"); // credentials → code
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Уже залогиненных сразу отправляем в /matrix
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          router.replace("/matrix");
        }
      } catch (err) {
        console.error("Auth check error:", err);
      }
    };

    checkAuth();
  }, [router]);

  // Этап 1: почта + пароль → сервер выдаёт код, но не сессию
  const credentialsForm = useFormik({
    initialValues: {
      login: "",
      password: "",
    },

    validate(values) {
      const errors = {};
      if (!values.login) errors.login = "Введите почту";
      if (!values.password) errors.password = "Введите пароль";
      return errors;
    },

    onSubmit: async (values) => {
      setError("");
      setSubmitting(true);

      try {
        const response = await fetch("/api/users/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.login,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Ошибка авторизации");
          return;
        }

        if (data.pending) {
          // Пароль верный — переходим к вводу кода
          setEmail(data.email);
          setCode("");
          setStep("code");
          return;
        }

        setError("Неожиданный ответ сервера");
      } catch (err) {
        console.error("Login error:", err);
        setError("Не удалось подключиться к серверу");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Этап 2: код подтверждения → verify выдаёт сессию
  const codeForm = useFormik({
    initialValues: {
      code: "",
    },

    validate(values) {
      const errors = {};
      if (!values.code) errors.code = "Введите код";
      else if (!/^\d{6}$/.test(values.code))
        errors.code = "Код состоит из 6 цифр";
      return errors;
    },

    onSubmit: async (values) => {
      setError("");
      setSubmitting(true);

      try {
        const response = await fetch("/api/users/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            code: values.code.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Неверный код");
          return;
        }

        // Сессия получена — в матрицу
        router.replace("/matrix");
      } catch (err) {
        console.error("Verify error:", err);
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
        <div className={styles.blockFormLogin}>
          {step === "credentials" ? (
            <>
              <h3 className={styles.textAuth}>Авторизация</h3>

              <form onSubmit={credentialsForm.handleSubmit}>
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
                  value={credentialsForm.values.login}
                  onChange={credentialsForm.handleChange}
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
                  value={credentialsForm.values.password}
                  onChange={credentialsForm.handleChange}
                />

                {credentialsForm.errors.login && (
                  <p className={styles.error}>{credentialsForm.errors.login}</p>
                )}
                {credentialsForm.errors.password && (
                  <p className={styles.error}>
                    {credentialsForm.errors.password}
                  </p>
                )}

                {error && <p className={styles.error}>{error}</p>}

                <button
                  className={styles.btnLogin}
                  type="submit"
                  disabled={credentialsForm.isSubmitting || submitting}
                >
                  {submitting ? "Входим..." : "Войти"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className={styles.textAuth}>Подтверждение</h3>
              <p className={styles.textCreateAcc}>
                Введите 6-значный код, отправленный на {email}
              </p>

              <form onSubmit={codeForm.handleSubmit}>
                <label htmlFor="code" className={styles.labelAuth}>
                  Код
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  className="password"
                  value={codeForm.values.code}
                  onChange={codeForm.handleChange}
                  style={{ letterSpacing: "0.4em", textAlign: "center" }}
                />

                {codeForm.errors.code && (
                  <p className={styles.error}>{codeForm.errors.code}</p>
                )}

                {error && <p className={styles.error}>{error}</p>}

                <button
                  className={styles.btnLogin}
                  type="submit"
                  disabled={codeForm.isSubmitting || submitting}
                >
                  {submitting ? "Проверяем..." : "Подтвердить"}
                </button>
              </form>
            </>
          )}

          <div className={styles.blockWithTextRegAcc}>
            <p className={styles.textCreateAcc}>
              Ещё нет аккаунта? Создай его, нажав на ссылку ниже
            </p>
            <Link href="/RegisterPage" className={styles.smallText}>
              <small>Зарегистрировать аккаунт</small>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
