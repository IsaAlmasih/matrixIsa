"use client";

import React, { useState } from "react";

import styles from "../../blagosds/funds/styles.module.css";

// Исходные данные
const funds = [
  {
    id: 1,
    name: "Благотворительный Фонд СДС и ОУ",
    goal: "Образование",
    tasks: ["Обучение", "Развитие"],
    beneficiaries: "Молодые взрослые",
  },
  {
    id: 2,
    name: (
      <a href={"https://solidarnost.su/"}>
        "Благотворительный Фонд 'Солидарность'"
      </a>
    ),
    goal: "Помощь людям",
    tasks: ["Медицинская помощь"],
    beneficiaries: "Дети Молодые Взрослые",
  },
  {
    id: 3,
    name: (
      <a href={"https://podari-zhizn.ru/"}>
        "Благотворительный Фонд 'Подари жизнь'"
      </a>
    ),
    goal: "Помощь детям",
    tasks: ["Медицинская помощь"],
    beneficiaries: "Дети Молодые Взрослые",
  },
  {
    id: 4,
    name: (
      <a href={"https://geografiyadobra.ru/"}>
        {" "}
        "Благотворительный фонд 'География добра'"
      </a>
    ),
    goal: "Психологическое состояние граждан",
    tasks: ["Помощь людям"],
    beneficiaries: "Общественность",
  },
  {
    id: 5,
    name: (
      <a href={"https://foodbankrus.ru/"}>"Благотворительный фонд 'Русь'"</a>
    ),
    goal: "Помощь людям",
    tasks: ["Еда", "Поддержка людей"],
    beneficiaries: "Общественность",
  },
  {
    id: 6,
    name: (
      <a href={"https://aleshafond.ru/"}>"Благотворительный фонд 'Алеша'"</a>
    ),
    goal: "Психологическое состояние граждан",
    tasks: ["Помощь людям"],
    beneficiaries: "Общественность",
  },
  {
    id: 7,
    name: <a href={"https://mayak.help/"}>"Благотворительный фонд 'Дом с маяком'"</a>,
    goal: "Помощь детям",
    tasks: ["Помощь людям", "Помощь детям"],
    beneficiaries: "Дети Молодые Взрослые",
  },
  {
    id: 8,
    name: "Благотворительный Фонд СДС и ОУ",
    goal: "Образование",
    tasks: ["Обучение", "Развитие"],
    beneficiaries: "Молодые взрослые",
  },
  {
    id: 9,
    name: <a href={"https://solidarnost.su/"}>"Благотворительный Фонд 'Солидарность'"</a>,
    goal: "Помощь людям",
    tasks: ["Медицинская помощь"],
    beneficiaries: "Дети Молодые Взрослые",
  },
  {
    id: 10,
    name: (
      <a href={"https://podari-zhizn.ru/"}>
        "Благотворительный Фонд 'Подари жизнь'"
      </a>
    ),
    goal: "Помощь детям",
    tasks: ["Медицинская помощь"],
    beneficiaries: "Дети Молодые Взрослые",
  },
  {
    id: 11,
    name: (
      <a href={"https://geografiyadobra.ru/"}>
        "Благотворительный фонд 'География добра'"
      </a>
    ),
    goal: "Психологическое состояние граждан",
    tasks: ["Помощь людям"],
    beneficiaries: "Общественность",
  },
  {
    id: 12,
    name: (
      <a href={"https://foodbankrus.ru/"}>"Благотворительный фонд 'Русь'"</a>
    ),
    goal: "Помощь людям",
    tasks: ["Еда", "Поддержка людей"],
    beneficiaries: "Общественность",
  },
  {
    id: 13,
    name: (
      <a href={"https://aleshafond.ru/"}>"Благотворительный фонд 'Алеша'"</a>
    ),
    goal: "Психологическое состояние граждан",
    tasks: ["Помощь людям"],
    beneficiaries: "Общественность",
  },
  {
    id: 14,
    name: (
      <a href={"https://mayak.help/"}>
        "Благотворительный фонд 'Дом с маяком'"
      </a>
    ),
    goal: "Помощь детям",
    tasks: ["Помощь людям", "Помощь детям"],
    beneficiaries: "Дети Молодые Взрослые",
  },
];

export default function FundsPage() {
  const [filters, setFilters] = useState({
    goal: "",
    task: "",
    beneficiaries: "",
  });

  const [filteredFunds, setFilteredFunds] = useState(funds);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    let result = funds;

    if (filters.goal) {
      result = result.filter((f) => f.goal === filters.goal);
    }
    if (filters.task) {
      result = result.filter((f) => f.tasks.includes(filters.task));
    }
    if (filters.beneficiaries) {
      result = result.filter((f) => f.beneficiaries === filters.beneficiaries);
    }

    setFilteredFunds(result);
  };

  const resetFilters = () => {
    setFilters({ goal: "", task: "", beneficiaries: "" });
    setFilteredFunds(funds);
  };

  // Получаем уникальные значения для селектов
  const uniqueGoals = [...new Set(funds.map((f) => f.goal))];
  const uniqueTasks = [...new Set(funds.flatMap((f) => f.tasks))];
  const uniqueBeneficiaries = [...new Set(funds.map((f) => f.beneficiaries))];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperBoodu}>
        <h1>Список Благотворительных Фондов</h1>
        {/* Фильтры */}
        <div>
          <div>
            <label>
              Цель:
              <select
                name="goal"
                value={filters.goal}
                onChange={handleFilterChange}
              >
                <option value="">Все</option>
                {uniqueGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Задача:
              <select
                name="task"
                value={filters.task}
                onChange={handleFilterChange}
              >
                <option value="">Все</option>
                {uniqueTasks.map((task) => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Подопечные:
              <select
                name="beneficiaries"
                value={filters.beneficiaries}
                onChange={handleFilterChange}
              >
                <option value="">Все</option>
                {uniqueBeneficiaries.map((ben) => (
                  <option key={ben} value={ben}>
                    {ben}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={applyFilter}>
            Применить
          </button>
          <button onClick={resetFilters}>
            Сбросить
          </button>
        </div>
        {/* Список фондов */}
        <ul className={styles.bodiGrig}>
          {filteredFunds.length > 0 ? (
            filteredFunds.map((fund) => (
              <li
                key={fund.id}
                className={styles.blokOne}
              >
                <h3>{fund.name}</h3>
                <p>
                  <strong>Цель:</strong> {fund.goal}
                </p>
                <p>
                  <strong>Задачи:</strong>{" "}
                  {Array.isArray(fund.tasks)
                    ? fund.tasks.join(", ")
                    : "Нет задач"}
                </p>
                <p>
                  <strong>Подопечные:</strong> {fund.beneficiaries}
                </p>
              </li>
            ))
          ) : (
            <p>Нет фондов по выбранным фильтрам</p>
          )}
        </ul>
      </div>
    </div>
  );
}
