"use client";

import { use } from "react";
import CabinetShell from "../../../../../avva/cabinet-shell";
import { getStaffById } from "../../../../../avva/staff";
import { BLOCKS } from "../../../../../avva/blocks";
import styles from "../../../../../avva/cabinet.module.css";

export default function BlockPage({ params }) {
  const { id, code } = use(params);
  const person = getStaffById(id);
  const block = BLOCKS.find((b) => b.code === code);

  if (!person || !block) {
    return (
      <CabinetShell person={person || { id, name: "?", blocks: [] }}>
        <p className={styles.hint}>Страница не найдена.</p>
      </CabinetShell>
    );
  }

  if (!person.blocks.includes(code)) {
    return (
      <CabinetShell person={person}>
        <h1 className={styles.title}>{block.label}</h1>
        <p className={styles.hint}>
          У тебя нет ключа к этому блоку. Обратись к Авве.
        </p>
      </CabinetShell>
    );
  }

  return (
    <CabinetShell person={person} activeCode={code}>
      <h1 className={styles.title}>{block.label}</h1>
      <p className={styles.hint}>
        Рабочее место блока. Инструменты появятся по мере сборки — каждый блок
        получит свой набор.
      </p>
    </CabinetShell>
  );
}
