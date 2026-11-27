"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const FLAG_LABELS = {
  registration: "Регистрация",
  shop: "Магазин",
  messages: "Сообщения",
  paidAccess: "Платный уровень",
};

export default function AvvaMainPage() {
  const [flags, setFlags] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/avva/flags")
      .then((r) => r.json())
      .then((data) =>
        data.error ? setError(data.error) : setFlags(data.flags),
      )
      .catch(() => setError("Сервер не ответил"));
  }, []);

  const toggle = async (key) => {
    const newValue = !flags[key];
    // Меняем сразу, чтобы не мигало, и откатываем, если сервер не принял
    setFlags((prev) => ({ ...prev, [key]: newValue }));
    try {
      const res = await fetch("/api/avva/flags", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: newValue }),
      });
      const data = await res.json();
      if (data.error) {
        setFlags((prev) => ({ ...prev, [key]: !newValue }));
        setError(data.error);
      }
    } catch {
      setFlags((prev) => ({ ...prev, [key]: !newValue }));
      setError("Сервер не ответил");
    }
  };

  // Пока демо-цифры. Оживут, когда подключим журнал и пользователей к базе.
  const summary = [
    { label: "Пользователей", value: 47 },
    { label: "Онлайн", value: 3 },
    { label: "Нарушений за сутки", value: 2 },
    { label: "Ключей выдано", value: 0 },
  ];

  return (
    <div className={styles.page}>
      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Сводка за сегодня</h2>
        <div className={styles.summary}>
          {summary.map((s) => (
            <div className={styles.summaryItem} key={s.label}>
              <span className={styles.summaryValue}>{s.value}</span>
              <span className={styles.summaryLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Быстрые переключатели</h2>
        {flags === null ? (
          <p className={styles.hint}>Загружаю флаги…</p>
        ) : (
          <div className={styles.flags}>
            {Object.entries(flags).map(([key, value]) => (
              <div className={styles.flagRow} key={key}>
                <span className={styles.flagName}>
                  {FLAG_LABELS[key] || key}
                </span>
                <button
                  className={value ? styles.switchOn : styles.switchOff}
                  onClick={() => toggle(key)}
                >
                  {value ? "ВКЛ" : "ВЫКЛ"}
                </button>
              </div>
            ))}
          </div>
        )}
        <p className={styles.hint}>
          Выключенный блок перестаёт существовать для пользователей сайта.
        </p>
      </section>
    </div>
  );
}
