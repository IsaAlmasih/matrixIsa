"use client";

// import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";

// Пока тестовые товары. Когда подключим базу — заменится запросом к /api/shop.
const MOCK_ITEMS = [
  {
    id: 1,
    name: "Акция Матрицы",
    desc: "Игровая ценная бумага. Не является инвестицией.",
    price: 150,
    tag: "акции",
  },
  {
    id: 2,
    name: "Ускоритель",
    desc: "Ускоряет процессы в Матрице на 24 часа.",
    price: 40,
    tag: "бонусы",
  },
  {
    id: 3,
    name: "Ключ-скидка",
    desc: "Скидка на следующий блок функционала.",
    price: 25,
    tag: "бонусы",
  },
  {
    id: 4,
    name: "Акция Матрицы ×10",
    desc: "Пакет из десяти акций со скидкой.",
    price: 1300,
    tag: "акции",
  },
];

const TAGS = [
  { code: "all", label: "Всё" },
  { code: "акции", label: "Акции" },
  { code: "бонусы", label: "Бонусы" },
];

export default function ShopPage() {
  const [items] = useState(MOCK_ITEMS);
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState(0);
  const [balance] = useState(500); // позже придёт из профиля пользователя

  const visible =
    filter === "all" ? items : items.filter((i) => i.tag === filter);
  const canBuy = (price) => balance >= price;

  const buy = (item) => {
    if (!canBuy(item.price)) return alert("Недостаточно средств на балансе.");
    setCart(cart + 1);
    alert(`«${item.name}» добавлено в покупку. (Пока демо — транзакций нет.)`);
  };

  return (
    <div className={styles.shop}>
      <header className={styles.header}>
        <h1>Магазин Матрицы</h1>
        <div className={styles.userBar}>
          <span>Баланс: {balance} MX</span>
          <span>Корзина: {cart}</span>
        </div>
      </header>

      <nav className={styles.tags}>
        {TAGS.map((t) => (
          <button
            key={t.code}
            className={filter === t.code ? styles.tagActive : styles.tag}
            onClick={() => setFilter(t.code)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className={styles.grid}>
        {visible.map((item) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.cardTag}>{item.tag}</div>
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
            <div className={styles.cardFooter}>
              <span className={styles.price}>{item.price} MX</span>
              <button
                className={canBuy(item.price) ? styles.buy : styles.buyDisabled}
                onClick={() => buy(item)}
              >
                Купить
              </button>
            </div>
          </article>
        ))}
      </section>

      <footer className={styles.note}>
        Игровая валюта не обменивается на реальные деньги.
      </footer>
    </div>
  );
}
