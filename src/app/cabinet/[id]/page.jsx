"use client";

import { use } from "react";
import Link from "next/link";
import CabinetShell from "../../../avva/cabinet-shell";
import { getStaffById } from "../../../avva/staff";
import { BLOCKS } from "../../../avva/blocks";
import styles from "../../../avva/cabinet.module.css";

const label = (code) => BLOCKS.find((b) => b.code === code)?.label || code;

export default function CabinetPage({ params }) {
  const id = use(params).id;
  const person = getStaffById(id);

  if (!person) {
    return (
      <div className={styles.panel}>
        <div className={styles.content}>
          <p className={styles.hint}>Кабинет не найден.</p>
        </div>
      </div>
    );
  }

  const myBlocks = person.blocks
    .map((code) => BLOCKS.find((b) => b.code === code))
    .filter(Boolean);

  return (
    <CabinetShell person={person}>
      <h1 className={styles.title}>Сводка</h1>
      <p className={styles.hint}>
        Здесь только твои блоки. Чужие разделы в этом кабинете не существуют.
      </p>

      <div className={styles.cards}>
        {myBlocks.map((b) => (
          <Link
            key={b.code}
            href={`/cabinet/${person.id}/${b.code}`}
            className={styles.cardLink}
          >
            <span className={styles.cardLabel}>{b.label}</span>
            <span className={styles.cardHint}>открыть блок →</span>
          </Link>
        ))}
      </div>

      <div className={styles.notice}>
        <span className={styles.hint}>
          Статус: {person.status}. Функционал каждого блока собирается по мере
          готовности — сейчас это заглушки.
        </span>
      </div>
    </CabinetShell>
  );
}
