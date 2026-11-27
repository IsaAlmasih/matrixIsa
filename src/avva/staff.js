// Единый список персонала. Демо; когда подключим базу — заменится на API.
export const MOCK_STAFF = [
  { id: 1, name: "Кирилл", blocks: ["nature", "science"], status: "активен" },
  { id: 2, name: "Мария", blocks: ["culture", "spiritual"], status: "активен" },
  { id: 3, name: "Олег", blocks: ["messages"], status: "ожидает ключ" },
  { id: 4, name: "Анна", blocks: ["shops"], status: "активен" },
  { id: 5, name: "Дмитрий", blocks: [], status: "ожидает ключ" },
];

export const getStaffById = (id) =>
  MOCK_STAFF.find((p) => p.id === Number(id)) || null;
