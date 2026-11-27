"use client";

import Link from "next/link";
import { BLOCKS } from "./blocks";
import styles from "./cabinet.module.css";

export default function CabinetShell({ person, activeCode, children }) {
  const myBlocks = person.blocks
    .map((code) => BLOCKS.find((b) => b.code === code))
    .filter(Boolean);

  return (
    <div className={styles.panel}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>{person.name}</div>
        <div className={styles.groupTitle}>Мои блоки</div>
        <nav className={styles.menu}>
          <Link
            href={`/cabinet/${person.id}`}
            className={activeCode ? styles.menuItem : styles.menuItemActive}
          >
            Сводка
          </Link>
          {myBlocks.map((b) => (
            <Link
              key={b.code}
              href={`/cabinet/${person.id}/${b.code}`}
              className={
                activeCode === b.code ? styles.menuItemActive : styles.menuItem
              }
            >
              {b.label}
            </Link>
          ))}
        </nav>
        <div className={styles.footerNote}>Кабинет сотрудника</div>
      </aside>

      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
