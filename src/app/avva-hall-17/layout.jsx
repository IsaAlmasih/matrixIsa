import styles from "./styles.module.css";

// Группы меню. У каждого раздела — своя страница и своя роль (ключ).
// Пока страницы-разделы не созданы, ссылки ведут на '#' и помечены «скоро».
const MENU_GROUPS = [
  {
    title: "Основное",
    items: [
      { code: "main", label: "Главная", href: "/avva-hall-17", ready: true },
      { code: "avva", label: "Страница Аввы", href: "#", soon: true },
      { code: "users", label: "Пользователи", href: "#", soon: true },
      {
        code: "staff",
        label: "Персонал матрицы",
        href: "/avva-hall-17/staff",
        ready: true,
      },

      { code: "messages", label: "Сообщения", href: "#", soon: true },
    ],
  },
  {
    title: "Наполнение",
    items: [
      {
        code: "nature",
        label: "Природа (то, о чём заботиться)",
        href: "#",
        soon: true,
      },
      {
        code: "culture",
        label: "Культура (правила использования)",
        href: "#",
        soon: true,
      },
      { code: "science", label: "Наука (инструменты)", href: "#", soon: true },
      {
        code: "spiritual",
        label: "Настройка страницы Духовное",
        href: "#",
        soon: true,
      },
      {
        code: "matrixPage",
        label: "Настройка страницы Матрицы",
        href: "#",
        soon: true,
      },
      { code: "rooms3d", label: "Настройка 3D-комнат", href: "#", soon: true },
    ],
  },
  {
    title: "Роли и доступ",
    items: [
      { code: "keys", label: "Ключи", href: "#", soon: true },
      { code: "journal", label: "Журнал", href: "#", soon: true },
    ],
  },
  {
    title: "Финансы и торговля",
    items: [
      { code: "shops", label: "Магазины", href: "#", soon: true },
      { code: "accounting", label: "Бухгалтерия", href: "#", soon: true },
      { code: "partnership", label: "Сотрудничество", href: "#", soon: true },
      { code: "ads", label: "Реклама", href: "#", soon: true },
    ],
  },
  {
    title: "Служебное",
    items: [
      { code: "features", label: "Функционал", href: "#", soon: true },
      { code: "stats", label: "Статистика", href: "#", soon: true },
    ],
  },
];

export default function AvvaLayout({ children }) {
  return (
    <div className={styles.panel}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>АVVА</div>
        <nav className={styles.menu}>
          {MENU_GROUPS.map((group) => (
            <div className={styles.menuGroup} key={group.title}>
              <div className={styles.groupTitle}>{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.code}
                  href={item.href}
                  className={
                    item.ready ? styles.menuItemActive : styles.menuItem
                  }
                  aria-disabled={item.soon ? "true" : undefined}
                >
                  {item.label}
                  {item.soon && <span className={styles.soon}>скоро</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className={styles.content}>
        <header className={styles.topbar}>
          <span className={styles.topbarTitle}>Панель управления</span>
          <span className={styles.adminBadge}>admin</span>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
