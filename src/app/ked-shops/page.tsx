"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OKVED_CATEGORIES, PRODUCT_CATEGORIES, SHOPS } from "./data";
import styles from "./styles.module.css";
import Link from "next/link";

/* ---------- Универсальный выпадающий список ---------- */

function Dropdown({ items, value, onChange, allLabel, renderLabel }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const filtered = items.filter((item) =>
    renderLabel(item).toLowerCase().includes(query.toLowerCase()),
  );

  const selected = items.find((item) => item.code === value);
  const label = selected ? renderLabel(selected) : allLabel;

  const pick = (item) => {
    onChange(item ? item.code : "");
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
            placeholder="Поиск по ОКВЭД"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <ul className={styles.list}>
            <li
              className={`${styles.item} ${value === "" ? styles.itemActive : ""}`}
              onClick={() => pick(null)}
            >
              {allLabel}
            </li>
            {filtered.map((item) => (
              <li
                key={item.code}
                className={`${styles.item} ${value === item.code ? styles.itemActive : ""}`}
                onClick={() => pick(item)}
              >
                <span className={styles.code}>{item.code}</span>
                <span>{renderLabel(item)}</span>
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
  // три независимых фильтра
  const [okved, setOkved] = useState(""); // "" = все ОКВЭД
  const [query, setQuery] = useState(""); // поиск по наименованию товара
  const [category, setCategory] = useState(""); // "" = все категории товаров

  const shops = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SHOPS.filter((shop) => {
      // фильтр по ОКВЭД
      if (okved && shop.okved !== okved) return false;

      // фильтр по категории товара: у магазина есть хоть один товар этой категории
      if (category && !shop.products.some((p) => p.category === category)) {
        return false;
      }

      // фильтр по наименованию товара: есть хоть один товар, чьё имя содержит запрос
      if (q && !shop.products.some((p) => p.name.toLowerCase().includes(q))) {
        return false;
      }

      return true;
    });
  }, [okved, query, category]);

  // товары, попавшие под фильтры, — для подсветки на карточке
  const matchedProducts = (shop) => {
    const q = query.trim().toLowerCase();
    return shop.products.filter((p) => {
      if (category && p.category !== category) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  };

  const activeFilters = [okved, category, query.trim()].filter(Boolean).length;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог магазинов по ОКВЭД</h1>

      <div className={styles.filterBar}>
        <Dropdown
          items={OKVED_CATEGORIES}
          value={okved}
          onChange={setOkved}
          allLabel="Все ОКВЭД"
          renderLabel={(c) => `${c.code} — ${c.name}`}
        />

        <input
          className={styles.productSearch}
          placeholder="Наименование товара"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Dropdown
          items={PRODUCT_CATEGORIES.map((c) => ({ code: c, name: c }))}
          value={category}
          onChange={setCategory}
          allLabel="Все категории товаров"
          renderLabel={(c) => c.name}
        />

        <span className={styles.counter}>
          Найдено: {shops.length}
          {activeFilters > 0 && ` · фильтров: ${activeFilters}`}
        </span>
      </div>

      <div className={styles.grid}>
        {shops.map((shop) => {
          const matched = matchedProducts(shop);
          const okvedName = OKVED_CATEGORIES.find(
            (c) => c.code === shop.okved,
          )?.name;

          return (
            <Link href="/price/matrix" key={shop.id}>
              <article className={styles.card}>
                <div className={styles.cardBadge}>{shop.okved}</div>
                <h2 className={styles.cardTitle}>{shop.name}</h2>
                <p className={styles.cardDesc}>{shop.description}</p>

                <div className={styles.products}>
                  {matched.map((p) => (
                    <span key={p.name} className={styles.productTag}>
                      {p.name}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.cardCity}>{shop.city}</span>
                  <span className={styles.cardOkved}>{okvedName}</span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {shops.length === 0 && (
        <p className={styles.noResults}>
          Под эти фильтры пока ничего не подходит.
        </p>
      )}
    </main>
  );
}
