"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OKED_CATEGORIES, SHOPS } from "./data";
import styles from "./styles.module.css";

import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

/* ---------- Выпадающий список ОКЭД ---------- */

function OkedDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  // закрытие по клику мимо списка
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = OKED_CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.code.includes(query),
  );

  const selected = OKED_CATEGORIES.find((c) => c.code === value);
  const label = selected
    ? `${selected.code} — ${selected.name}`
    : "Все категории ОКЭД";

  const pick = (c) => {
    onChange(c ? c.code : "");
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={styles.dropdownWrapper} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.triggerLabel}>{label}</span>
        <span className={`${styles.arrow} ${open ? styles.arrowUp : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className={styles.panel}>
          <input
            className={styles.search}
            placeholder="Поиск по названию или коду"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <ul className={styles.list}>
            <li
              className={`${styles.item} ${value === "" ? styles.itemActive : ""}`}
              onClick={() => pick(null)}
            >
              Все категории ОКЭД
            </li>
            {filtered.map((c) => (
              <li
                key={c.code}
                className={`${styles.item} ${value === c.code ? styles.itemActive : ""}`}
                onClick={() => pick(c)}
              >
                <span className={styles.code}>{c.code}</span>
                <span>{c.name}</span>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className={styles.empty}>Ничего не найдено</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Страница каталога ---------- */

export default function ShopsPage() {
  const [oked, setOked] = useState("");

  const shops = useMemo(
    () => (oked ? SHOPS.filter((s) => s.oked === oked) : SHOPS),
    [oked],
  );

  const categoryName = oked
    ? OKED_CATEGORIES.find((c) => c.code === oked)?.name
    : null;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог магазинов по ОКЭД</h1>

      <div className={styles.filterBar}>
        <OkedDropdown value={oked} onChange={setOked} />
        <span className={styles.counter}>Найдено: {shops.length}</span>
      </div>

      {categoryName && (
        <p className={styles.activeCategory}>
          Вид деятельности: <b>{categoryName}</b>
        </p>
      )}

      <div className={styles.grid}>
        {shops.map((shop) => (
          <article key={shop.id} className={styles.card}>
            <div className={styles.cardBadge}>{shop.oked}</div>
            <h2 className={styles.cardTitle}>{shop.name}</h2>
            <p className={styles.cardDesc}>{shop.description}</p>
            <div className={styles.cardFooter}>
              <span className={styles.cardCity}>{shop.city}</span>
              <span className={styles.cardOked}>
                {OKED_CATEGORIES.find((c) => c.code === shop.oked)?.name}
              </span>
            </div>
          </article>
        ))}
      </div>
      <MatrixRain></MatrixRain>
      {shops.length === 0 && (
        <p className={styles.noResults}>
          По этой категории пока нет магазинов.
        </p>
      )}
    </main>
  );
}
