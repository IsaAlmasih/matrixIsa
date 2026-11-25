//  {
//   FiBarChart2, // Настройка страницы Природа.\\
//   FiBell, // Реклама.\\
//   FiBriefcase, // Работа с объявлениями.\\
//   FiChevronDown, // Кнопка открытия виджета.\\
//   FiChevronRight, // Из боковой навигации.\\
//   FiDollarSign, // Финансы.\\
//   FiFileText, // Настройка 3 д Комнаты.\\
//   FiGrid, // Настройка страницы Матрицы.\\
//   FiPackage, // Заказы.\\
//   FiSend, // Отправить сообщение.\\
//   FiSettings, // Профиль и настройки.\\
//   FiShield, // Профессиональный план.\\
//   FiTrendingUp, // Продвижение.\\
//   FiUsers, // Настройка страницы Духовное.\\
//   FiArrowLeft, // Назад к диалогам.\\
//   FiSearch, // Поиск пользователей.\\
//   FiMessageCircle, // Сообщения.\\
// } from "react-icons/fi";

"use client";

import { useState } from "react";

import {
  FiBarChart2,
  FiBell,
  FiBriefcase,
  FiChevronRight,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiPackage,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiMessageCircle,
} from "react-icons/fi";

import styles from "./styles.module.css";
import Commu from "../commu/page";
import { MatrixRain } from "../../components/MatrixRain/MatrixRain";

const navigation = [
  { label: "Настройка страницы Матрицы.", icon: FiGrid, href: "/dashboard" },
  {
    label: "Настройка 3 д Комнаты.",
    icon: FiFileText,
    href: "/",
  },
  { label: "Заказы", icon: FiPackage, href: "/dashboard/orders" },
  {
    label: "Работа с объявлениями",
    icon: FiBriefcase,
    href: "/dashboard/listings-manage",
    expandable: true,
  },
  {
    label: "Настройка страницы Духовное.",
    icon: FiUsers,
    href: "/dashboard/clients",
    expandable: true,
  },
  {
    label: "Настройка страницы Природа.",
    icon: FiBarChart2,
    href: "/dashboard/analytics",
  },
  { label: "Продвижение", icon: FiTrendingUp, href: "/dashboard/promotion" },
  { label: "Реклама", icon: FiBell, href: "/dashboard/ads" },
  { label: "Профессиональный план", icon: FiShield, href: "/dashboard/pro" },
  {
    label: "Финансы",
    icon: FiDollarSign,
    href: "/",
    expandable: true,
  },
  {
    label: "Профиль и настройки",
    icon: FiSettings,
    href: "/commu",
    expandable: true,
  },
  { label: "Сообщения", icon: FiMessageCircle, href: "/" },
];

export default function UserPage() {
  const [activeNavigation, setActiveNavigation] = useState("Мои объявления");
  const [messagesOpen, setMessagesOpen] = useState(false);

  return (
    <main className={styles.page}>
      {/* Боковая навигация */}

      <aside className={styles.sidebar}>
        <nav className={styles.navigation} aria-label="Навигация кабинета">
          {navigation.map(({ label, icon: Icon, expandable }) => (
            <button
              key={label}
              type="button"
              className={`${styles.navigationItem} ${
                activeNavigation === label ? styles.navigationItemActive : ""
              }`}
              onClick={() => {
                setActiveNavigation(label);

                if (label === "Сообщения") {
                  setMessagesOpen(true);
                }
              }}
              aria-current={activeNavigation === label ? "page" : undefined}
            >
              <Icon aria-hidden="true" />

              <span>{label}</span>

              {expandable && <FiChevronRight className={styles.expandIcon} />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Виджет сообщений */}

    <Commu
        open={messagesOpen}
        onOpen={() => setMessagesOpen(true)}
        onClose={() => setMessagesOpen(false)}
      />

      <MatrixRain></MatrixRain>
    </main>
  );
}
