"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOCKS } from "../../../avva/blocks";
import styles from "./styles.module.css";

// Демо-персонал. Когда подключим базу — придёт из /api/avva/staff.
const MOCK_STAFF = [
  { id: 1, name: "Кирилл", blocks: ["nature", "science"], status: "активен" },
  { id: 2, name: "Мария", blocks: ["culture", "spiritual"], status: "активен" },
  { id: 3, name: "Олег", blocks: ["messages"], status: "ожидает ключ" },
  { id: 4, name: "Анна", blocks: ["shops"], status: "активен" },
  { id: 5, name: "Дмитрий", blocks: [], status: "ожидает ключ" },
];

export default function StaffPage() {
  const [staff, setStaff] = useState(MOCK_STAFF);
  const [editingId, setEditingId] = useState(null);

  const toggleBlock = (staffId, blockCode) => {
    setStaff((prev) =>
      prev.map((person) => {
        if (person.id !== staffId) return person;
        const has = person.blocks.includes(blockCode);
        return {
          ...person,
          blocks: has
            ? person.blocks.filter((b) => b !== blockCode)
            : [...person.blocks, blockCode],
        };
      }),
    );
    // Позже здесь будет PATCH к /api/avva/staff — как у флагов.
  };

  const setStatus = (staffId, newStatus) => {
    setStaff((prev) =>
      prev.map((p) => (p.id === staffId ? { ...p, status: newStatus } : p)),
    );
  };

  const label = (code) => BLOCKS.find((b) => b.code === code)?.label || code;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2 className={styles.title}>Персонал матрицы</h2>
        <p className={styles.hint}>
          Каждому сотруднику закрепляются блоки, за которые он отвечает.
          Сотрудник без блоков не видит ничего, кроме своего кабинета.
        </p>

        <div className={styles.list}>
          {staff.map((person) => (
            <article className={styles.row} key={person.id}>
              <div className={styles.rowHead}>
                <Link
                  href={`/avva-hall-17/staff/${person.id}`}
                  className={styles.nameLink}
                >
                  {person.name}
                </Link>
                <span
                  className={
                    person.status === "активен"
                      ? styles.statusOn
                      : styles.statusWait
                  }
                >
                  {person.status}
                </span>
                <div className={styles.rowActions}>
                  {person.status === "активен" ? (
                    <button
                      className={styles.smallBtn}
                      onClick={() => setStatus(person.id, "приостановлен")}
                    >
                      Приостановить
                    </button>
                  ) : (
                    <button
                      className={styles.smallBtn}
                      onClick={() => setStatus(person.id, "активен")}
                    >
                      Активировать
                    </button>
                  )}
                  <button
                    className={
                      editingId === person.id
                        ? styles.smallBtnActive
                        : styles.smallBtn
                    }
                    onClick={() =>
                      setEditingId(editingId === person.id ? null : person.id)
                    }
                  >
                    {editingId === person.id ? "Готово" : "Назначить блоки"}
                  </button>
                </div>
              </div>

              <div className={styles.blocksLine}>
                {person.blocks.length === 0 ? (
                  <span className={styles.noBlocks}>блоков не назначено</span>
                ) : (
                  person.blocks.map((code) => (
                    <span className={styles.blockChip} key={code}>
                      {label(code)}
                    </span>
                  ))
                )}
              </div>

              {editingId === person.id && (
                <div className={styles.picker}>
                  {BLOCKS.map((b) => {
                    const active = person.blocks.includes(b.code);
                    return (
                      <button
                        key={b.code}
                        className={active ? styles.chipOn : styles.chip}
                        onClick={() => toggleBlock(person.id, b.code)}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.title}>Новый сотрудник</h2>
        <p className={styles.hint}>
          Добавление в базу и выдача ключей появятся на следующем шаге — когда
          связем персонал с таблицами пользователей и ключей.
        </p>
      </section>
    </div>
  );
}
