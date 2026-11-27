"use client";

import { use } from "react";
import Link from "next/link";
import { BLOCKS } from "../../../../avva/blocks";
import styles from "./styles.module.css";

// Демо-персонал. Когда подключим базу — это заменит запрос к /api/avva/staff.
const MOCK_STAFF = [
  { id: 1, name: "Кирилл", blocks: ["nature", "science"], status: "активен" },
  { id: 2, name: "Мария", blocks: ["culture", "spiritual"], status: "активен" },
  { id: 3, name: "Олег", blocks: ["messages"], status: "ожидает ключ" },
  { id: 4, name: "Анна", blocks: ["shops"], status: "активен" },
  { id: 5, name: "Дмитрий", blocks: [], status: "ожидает ключ" },
];

// Демо-журнал сотрудника. Оживёт, когда свяжем с таблицей журнала.
const MOCK_EVENTS = [
  { date: "27.11", text: "Вход в панель" },
  { date: "26.11", text: "Изменение блока «Природа»" },
  { date: "25.11", text: "Выдан ключ" },
];

const label = (code) => BLOCKS.find((b) => b.code === code)?.label || code;

export default function StaffMemberPage({ params }) {
  const id = Number(use(params).id);
  const person = MOCK_STAFF.find((p) => p.id === id);

  if (!person) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.hint}>Сотрудник не найден.</p>
          <Link href="/avva-hall-17/staff" className={styles.backLink}>
            ← к списку персонала
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/avva-hall-17/staff" className={styles.backLink}>
        ← к списку персонала
      </Link>

      <section className={styles.card}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.name}>{person.name}</h2>
            <span
              className={
                person.status === "активен"
                  ? styles.statusOn
                  : styles.statusWait
              }
            >
              {person.status}
            </span>
          </div>
          <div className={styles.idBox}>
            <span className={styles.idLabel}>ID</span>
            <span className={styles.idValue}>{person.id}</span>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Блоки ответственности</h3>
        {person.blocks.length === 0 ? (
          <p className={styles.hint}>
            Блоков не назначено. Сотрудник видит только свой кабинет.
          </p>
        ) : (
          <div className={styles.blocksLine}>
            {person.blocks.map((code) => (
              <span className={styles.blockChip} key={code}>
                {label(code)}
              </span>
            ))}
          </div>
        )}

        <Link href={`/cabinet/${person.id}`} className={styles.backLink}>
          → открыть кабинет сотрудника (демо)
        </Link>
      </section>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Последние действия</h3>
        <div className={styles.events}>
          {MOCK_EVENTS.map((e, i) => (
            <div className={styles.eventRow} key={i}>
              <span className={styles.eventDate}>{e.date}</span>
              <span className={styles.eventText}>{e.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
