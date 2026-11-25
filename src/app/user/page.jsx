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

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  { label: "Сообщения", icon: FiMessageCircle, href: "/commu" },
];

export default function UserPage() {
  const [activeModal, setActiveModal] = useState(null);
  const closeTimer = useRef(null);

  const cancelModalClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleModalClose = () => {
    cancelModalClose();
    closeTimer.current = setTimeout(() => {
      setActiveModal(null);
      closeTimer.current = null;
    }, 250);
  };

  const openNavigationModal = (label, element) => {
    cancelModalClose();

    const bounds = element.getBoundingClientRect();
    const isMobile = window.innerWidth <= 600;
    const modalWidth = Math.min(isMobile ? 260 : 360, window.innerWidth - 24);
    const rightPosition = bounds.right + 12;
    const left = isMobile
      ? window.innerWidth - modalWidth - 12
      : rightPosition + modalWidth <= window.innerWidth - 12
        ? rightPosition
        : Math.max(12, bounds.left - modalWidth - 12);
    const top = Math.max(
      12,
      Math.min(bounds.top, window.innerHeight - 192),
    );

    setActiveModal({ label, left, top });
  };

  useEffect(() => {
    if (!activeModal) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveModal(null);
    };
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest("[data-expandable-item]")) {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      cancelModalClose();
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [activeModal]);

  return (
    <main className={styles.page}>
      {/* Боковая навигация */}

      <aside className={styles.sidebar}>
        <nav className={styles.navigation} aria-label="Навигация кабинета">
          {navigation.map(({ label, icon: Icon, expandable, href }) =>
            label === "Сообщения" ? (
              <Link
                key={label}
                href={href}
                className={styles.navigationItem}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ) : expandable ? (
              <div
                key={label}
                className={styles.expandableItem}
                data-expandable-item
                onMouseEnter={(event) =>
                  openNavigationModal(label, event.currentTarget)
                }
                onMouseLeave={scheduleModalClose}
              >
                <button
                  type="button"
                  className={styles.navigationItem}
                  aria-haspopup="dialog"
                  aria-expanded={activeModal?.label === label}
                  onFocus={(event) =>
                    openNavigationModal(label, event.currentTarget)
                  }
                  onClick={(event) =>
                    openNavigationModal(label, event.currentTarget)
                  }
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <FiChevronRight className={styles.expandIcon} />
                </button>

                {activeModal?.label === label && (
                  <section
                    className={styles.navigationModal}
                    role="dialog"
                    aria-label={label}
                    style={{ left: activeModal.left, top: activeModal.top }}
                    onMouseEnter={cancelModalClose}
                    onMouseLeave={scheduleModalClose}
                  >
                    <button
                      type="button"
                      className={styles.modalClose}
                      aria-label="Закрыть"
                      onClick={() => setActiveModal(null)}
                    >
                      ×
                    </button>
                    <h2>{label}</h2>
                    <p>Настройки этого раздела будут доступны здесь.</p>
                  </section>
                )}
              </div>
            ) : (
              <button
                key={label}
                type="button"
                className={styles.navigationItem}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            ),
          )}
        </nav>
      </aside>

      <MatrixRain></MatrixRain>
    </main>
  );
}
