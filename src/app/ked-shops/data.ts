// ОКВЭД — виды экономической деятельности
export type OkvedCategory = {
  code: string;
  name: string;
};

export const OKVED_CATEGORIES: OkvedCategory[] = [
  { code: "47.91",name: "Торговля розничная по почте или по информационно-коммуникационной сети Интернет" },
  { code: "10", name: "Производство пищевых продуктов" },
  { code: "13", name: "Производство текстильных изделий" },
  { code: "28", name: "Производство машин и оборудования" },
  { code: "47", name: "Розничная торговля" },
  { code: "62", name: "Разработка компьютерного ПО" },
];

// Категории товаров
export type ProductCategory = string;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Папирусная бумага",
  "Продукты питания",
  "Одежда и обувь",
  "Электроника",
  "Хозяйственные товары",
  "Строительные материалы",
  "Канцелярия",
  
];

export type Product = {
  name: string;
  category: ProductCategory;
};

export type Shop = {
  id: number;
  name: string;
  okved: string; // код ОКВЭД
  href:string;
  description: string;
  city: string;
  products: Product[];
};

export const SHOPS: Shop[] = [
  {
    id: 1,
    name: "ИП Така С. С.",
    href: "/",
    okved: "47.91",
    description: "Торговля на маркетплейсах",
    city: "Москва",
    products: [
      { name: "Папирус А3", category: "Бумага для творчества" },
      { name: "Папирус А4", category: "Бумага для творчества" },
    ],
  },
  {
    id: 2,
    name: "GreenField Ltd",
    okved: "01",
    href: "/",
    description: "Фермерское хозяйство, злаковые культуры",
    city: "Тверь",
    products: [
      { name: "Пшеница", category: "Продукты питания" },
      { name: "Гречка", category: "Продукты питания" },
    ],
  },
  {
    id: 3,
    name: "ВкусныйДом",
    okved: "10",
    href: "/",
    description: "Производство молочной продукции",
    city: "Тула",
    products: [
      { name: "Молоко 3,2%", category: "Продукты питания" },
      { name: "Творог", category: "Продукты питания" },
    ],
  },
  {
    id: 4,
    name: "TexLine",
    okved: "13",
    href: "/",
    description: "Текстиль и швейное производство",
    city: "Иваново",
    products: [
      { name: "Постельное бельё", category: "Хозяйственные товары" },
      { name: "Халат махровый", category: "Одежда и обувь" },
    ],
  },
  {
    id: 5,
    name: "МашЗавод №1",
    okved: "28",
    href: "/",
    description: "Металлообработка и станкостроение",
    city: "Челябинск",
    products: [
      { name: "Станок токарный", category: "Строительные материалы" },
      { name: "Сварочный аппарат", category: "Строительные материалы" },
    ],
  },
  {
    id: 6,
    name: "Магнит-Маркет",
    okved: "47",
    href: "/",
    description: "Розничная сеть товаров для дома",
    city: "Казань",
    products: [
      { name: "Наушники беспроводные", category: "Электроника" },
      { name: "Рюкзак городской", category: "Одежда и обувь" },
      { name: "Тетрадь 48 листов", category: "Канцелярия" },
    ],
  },
  {
    id: 7,
    name: "DevSoft",
    okved: "62",
    href: "/",
    description: "Разработка сайтов и мобильных приложений",
    city: "Санкт-Петербург",
    products: [
      { name: "Лицензия CRM", category: "Электроника" },
      { name: "Хостинг на год", category: "Электроника" },
    ],
  },
];
