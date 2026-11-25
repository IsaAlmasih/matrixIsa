Страницы фирм ведут на одну страницу.
В зависимости от контента, карточки становятся шире.
Как сделать переадресации в конструкторе?



Профиль
Лента
Мессенджер
Звонки
Друзья
Сообщества
Фото
Музыка
Видео
Голоса
Закладки
На страницу матрицы. 
На страницу комнаты. 
на страницу учения. 
На страницу магазинов.
На страницу работы.
Покупатели
Поддержка
Главное
Уведомления
Продвижение
Обучение
Финуслуги


Команда для создания таблицы через павур шел.

psql -h 127.0.0.1 -p 5432 -U postgres -d matrix

И сама форма +\- от фантазий

-- Таблица пользователей (для авторизации)
CREATE TABLE IF NOT EXISTS app_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица диалогов (чатов)
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    type VARCHAR(50) DEFAULT 'private', -- 'private' или 'group'
    created_by INT REFERENCES app_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сообщений
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Индекс для быстрого получения сообщений по диалогу
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
