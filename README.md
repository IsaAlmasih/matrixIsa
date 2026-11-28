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




Что уже сделано ✅
Сервер: Node.js 20, npm, git, nginx, PM2 установлены; пользователь matrixapp создан
База данных на сервере: пользователь matrix_user, база matrix, схема залита — все 4 таблицы на месте (app_users, conversations, conversation_participants, messages)


Что это? "Сессия — JWT в httpOnly-cookie на 7 дней. Для этапа «код подтверждения» это чуть расслабленно, но работает; ожесточить можно позже."


<!-- aхц9вW)XЬиi+&Ьw7доJReЮ6/ц1=%#u%3дАжТ+г:Rоik5MСkЦуRgFKПь1yHy6м*ыnHYУ5(R1}е4V|ьpoйХvгЬdЙEЩI]%3дАжТ+г:Rоik5MСkЦуRgFKПь1yHy6M7t)2ЖaШ1фо$чЩцGx>ёрf!lЖVЧюQЫzpя/ЗМЙ1ж:AOLUCдYMТх]MЪbon{14Е}%3дАжТ+г:Rоik5MСkЦуRgFKПь1yHy6м*ыnHYУ5(R1}е4V|ьpoйХvгЬdЙEЩI]%)nR1L:Ъ%д,ъNоБ4U^WаЫ TдMmwDд4Tё_(;Ё5/йн0?2$РВа?aт1gкd0ВSs4i%3дАжТ+г:Rоik5MСkЦуRgFKПь1yHy6ЙЖуИрt9~ЯFp+Gм}bЕTkarZТебG1АоЗvо*J^EvЧIЗXoХ7{1сFiIYМ*QKОCгйоТk%M-кMЩfМ*т~кKViип$E?~&^xь1фз7S1ьнРIе68|ЕTdpsЭе(JЗЖOфhLi[ЦcM7t)2ЖaШ1фо$чЩцGx>ёрf!lЖVЧюQЫzЕвdПэЧDэ[яаn&TJ#Йд4G94Ки1qДшtBЪ-h3Т9b{!o/4UЛxФ.1зFас_аAкQ|{fmиъ9е>uЛvюx([ТLЁz;1DУГЭоЪ69сп;]Г_иoрi3$С7йG6Мй7шvЗnW,Э1Дъс2НVкdпb4еУ7^M1ДФ(м$TмАpПlGIЮкXа?jНмйy19( (v.(PДщ3FjцЩu8бMДЩ0С@*НO;zБУэзbьб?zХКф^1ь5-$cХyЁ+ЙмM7t)2ЖaШ1фо$чЩцGx>ёрf!lЖVЧюQЫzLw;)о1хЖ+сШд>ФZK&ж5JLUСGFаЭ,LZ5еznЮП5S0фЦyOпSЮQrЛ#щСq2@П!-1]UЖюB6#bих5шг ям1ZЫcтБY>h3йEоЮ/Ё>ЗW1ЧI<ьenjяУчЦкYАь# п&цjЭ=-шм*ыnHYУ5(R1}е4V|ьpoйХvгЬdЙEЩI]5еznЮП5S0фЦyOпSЮQrЛ#щСq2@П!-1]Tё_(;Ё5/йн0?2$РВа?aт1gкd0ВSs4i%3дАжТ+г:Rоik5MСkЦуRgFKПь1yHy6vо*J^EvЧIЗXoХ7{1сFiIYМ*QKОCгйоЙЖуИрt9~ЯFp+Gм}bЕTkarZТебG1АоЗUЖюB6#bих5шг ям1ZЫcтБY>h3йEоЮ/Ё>ЗW1ЧI<ьenjяУчЦкYАь# п&цjЭ=-шM7t)2ЖaШ1фо$чЩцGx>ёрf!lЖVЧюQЫzЕвdПэЧDэ[яаn&TJ#Йд4G94Ки1qДшtBЪ-h3Т9b{!o/4UЛxФ.1зFас_аAкQ|{fmиъ9е>uЛvюx([ТLЁz;1DУГЭоЪ69сп;]Г_иoрi3$С7йG6Мй7шvЗnW,Э1Дъс2НVкdпb4еУ7^M1ДФ(м$TмАpПlGIЮкXа?jНмйy19( (v.(PДщ3FjцЩu8бMДЩ0С@r/yi4м1ПМфХ%ысЩЗщ|ЭbА@сj{{kЩ(кeWДё{%SЫH-ТS[оBУУ%Ыs1ChнB7БM)LъWMШbчUDS4жлЬФQ*щЫHыыЬUгчп1См9ГZЭt1O<CыsJTe_дл-иZэз[~QРыьCКХ]Г_иoрi3$С7йG6Мй7шvЗnW,Э1Дъс2Н -->