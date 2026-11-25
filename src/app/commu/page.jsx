// import {
//   FiMessageCircle,
//   FiChevronDown,
//   FiArrowLeft,
//   FiSearch,
//   FiSend,
//   FiUser, // Профиль
//   FiRss, // Лента
//   FiPhone, // Звонки
//   FiUsers, // Друзья
//   FiGrid, // Сообщества
//   FiCamera, // Фото
//   FiMusic, // Музыка
//   FiVideo, // Видео
//   FiMic, // Голоса
//   FiBookmark, // Закладки
//   FiBox, // Матрица
//   FiLayers, // Комната
//   FiBookOpen, // Учение
//   FiShoppingBag, // Магазины
//   FiBriefcase, // Работа
//   FiShoppingCart, // Покупатели
//   FiHelpCircle, // Поддержка
//   FiHome, // Главное
//   FiBell, // Уведомления
//   FiTrendingUp, // Продвижение
//   FiBook, // Обучение
//   FiCreditCard, // Финуслуги
// } from "react-icons/fi";


"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

import {
  FiMessageCircle,
  FiArrowLeft,
  FiSearch,
  FiSend,
  FiUser, // Профиль
  FiRss, // Лента
  FiPhone, // Звонки
  FiUsers, // Друзья
  FiGrid, // Сообщества
  FiCamera, // Фото
  FiMusic, // Музыка
  FiVideo, // Видео
  FiMic, // Голоса
  FiBookmark, // Закладки
  FiBox, // Матрица
  FiLayers, // Комната
  FiBookOpen, // Учение
  FiShoppingBag, // Магазины
  FiBriefcase, // Работа
  FiShoppingCart, // Покупатели
  FiHelpCircle, // Поддержка
  FiHome, // Главное
  FiBell, // Уведомления
  FiTrendingUp, // Продвижение
  FiBook, // Обучение
  FiCreditCard, // Финуслуги
} from "react-icons/fi";

import styles from "../commu/styles.module.css";

const commuMenu = [
  { label: "Профиль", icon: FiUser },
  { label: "Лента", icon: FiRss },
  { label: "Мессенджер", icon: FiMessageCircle },
  { label: "Звонки", icon: FiPhone },
  { label: "Друзья", icon: FiUsers },
  { label: "Сообщества", icon: FiGrid },
  { label: "Фото", icon: FiCamera },
  { label: "Музыка", icon: FiMusic },
  { label: "Видео", icon: FiVideo },
  { label: "Голоса", icon: FiMic },
  { label: "Закладки", icon: FiBookmark },
  // Пункты с реальными страницами — подставь свои маршруты
  { label: "Матрица", icon: FiBox, href: "/matrix" },
  { label: "Комната", icon: FiLayers, href: "/roomUser" },
  { label: "Учение", icon: FiBookOpen, href: "/education" },
  { label: "Магазины", icon: FiShoppingBag, href: "/shops" },
  { label: "Работа", icon: FiBriefcase, href: "/work" },
  { label: "Покупатели", icon: FiShoppingCart },
  { label: "Поддержка", icon: FiHelpCircle },
  { label: "Главное", icon: FiHome },
  { label: "Уведомления", icon: FiBell },
  { label: "Продвижение", icon: FiTrendingUp },
  { label: "Обучение", icon: FiBook },
  { label: "Финуслуги", icon: FiCreditCard },
];

export default function Commu() {
  const [messagesAuthStatus, setMessagesAuthStatus] = useState("unknown");
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  // Диалоги
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  // Сообщения
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Поиск пользователей
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Состояния загрузки
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [startingChat, setStartingChat] = useState(false);

  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // =====================================
  // Загрузка списка диалогов
  // =====================================

  const loadConversations = useCallback(async () => {
    try {
      setLoadingConversations(true);

      const response = await fetch("/api/conversations", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить диалоги");
      }

      const data = await response.json();

      const items = data.conversations || [];

      setConversations(items);

      return items;
    } catch (error) {
      console.error(error);
      setError("Не удалось загрузить список диалогов");

      return [];
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  // =====================================
  // Загрузка сообщений
  // =====================================

  const loadMessages = useCallback(async (conversationId) => {
    try {
      const response = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить сообщения");
      }

      const data = await response.json();

      setMessages(data.messages || []);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Не удалось загрузить сообщения");
    }
  }, []);

  // =====================================
  // Проверка авторизации при открытии виджета
  // =====================================

  const checkAuth = useCallback(async () => {
    setMessagesAuthStatus("checking");
    setError("");

    try {
      const response = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      if (response.status === 401) {
        setMessagesAuthStatus("unauthenticated");
        setConversations([]);
        setActiveConversation(null);
        setMessages([]);
        return;
      }

      if (!response.ok) {
        throw new Error("Не удалось проверить авторизацию");
      }

      const data = await response.json();

      if (!data.authenticated) {
        setMessagesAuthStatus("unauthenticated");
        setConversations([]);
        setActiveConversation(null);
        setMessages([]);
        return;
      }

      setMessagesAuthStatus("authenticated");
      await loadConversations();
    } catch (error) {
      console.error(error);
      setMessagesAuthStatus("error");
      setError("Не удалось проверить авторизацию. Попробуйте ещё раз.");
    }
  }, [loadConversations]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // =====================================
  // Поиск пользователей
  // =====================================

  useEffect(() => {
    if (userSearch.trim().length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const response = await fetch(
          `/api/users/search?q=${encodeURIComponent(userSearch.trim())}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Ошибка поиска пользователей");
        }

        const data = await response.json();

        if (!cancelled) {
          setSearchResults(data.users || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setSearchResults([]);
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [userSearch]);

  // =====================================
  // Создание нового диалога
  // =====================================

  const startConversation = async (targetUserId) => {
    try {
      setStartingChat(true);
      setError("");

      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetUserId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не удалось создать диалог");
      }

      // Обновляем список диалогов
      const updatedConversations = await loadConversations();

      // Ищем созданный диалог
      const conversation = updatedConversations.find(
        (item) => Number(item.user_id) === Number(targetUserId),
      );

      if (!conversation) {
        throw new Error("Диалог создан, но не найден в списке");
      }

      // Открываем переписку
      setActiveConversation(conversation);

      setMessages([]);
      setMessageText("");

      // Очищаем поиск
      setUserSearch("");
      setSearchResults([]);
    } catch (error) {
      console.error(error);

      setError(error.message || "Ошибка создания диалога");
    } finally {
      setStartingChat(false);
    }
  };

  // =====================================
  // Загрузка сообщений выбранного диалога
  // =====================================

  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoadingMessages(true);

        const response = await fetch(
          `/api/conversations/${activeConversation.conversation_id}/messages`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Ошибка загрузки сообщений");
        }

        const data = await response.json();

        if (!cancelled) {
          setMessages(data.messages || []);
          setError("");
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setError("Не удалось загрузить переписку");
        }
      } finally {
        if (!cancelled) {
          setLoadingMessages(false);
        }
      }
    };

    load();

    // Автоматическое обновление переписки
    const interval = setInterval(() => {
      if (!cancelled) {
        loadMessages(activeConversation.conversation_id);
      }
    }, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [activeConversation, loadMessages]);

  // =====================================
  // Прокрутка к последнему сообщению
  // =====================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================
  // Отправка сообщения
  // =====================================

  const sendMessage = async (e) => {
    if (e) e.preventDefault();

    const content = messageText.trim();

    if (!content || !activeConversation || sending) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const response = await fetch(
        `/api/conversations/${activeConversation.conversation_id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не удалось отправить сообщение");
      }

      setMessageText("");

      await loadMessages(activeConversation.conversation_id);
      await loadConversations();
    } catch (error) {
      console.error(error);

      setError(error.message || "Ошибка отправки сообщения");
    } finally {
      setSending(false);
    }
  };

  // =====================================
  // Открытие существующего диалога
  // =====================================

  const openConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages([]);
    setError("");
  };

  // =====================================
  // Возврат к списку диалогов
  // =====================================

  const backToConversations = () => {
    setActiveConversation(null);
    setMessages([]);
    setError("");

    loadConversations();
  };

  // =====================================
  // Фильтрация диалогов
  // =====================================

  const filteredConversations = conversations.filter((conversation) => {
    const value = userSearch.toLowerCase();

    return (
      conversation.username.toLowerCase().includes(value) ||
      conversation.email.toLowerCase().includes(value)
    );
  });

  // =====================================
  // JSX
  // =====================================

  return (
    <main className={styles.messagesPage}>
      <div className={styles.messagesPanel}>
          {/* Заголовок */}

          <div className={styles.messagesHeader}>
            <strong>Сообщения</strong>

            <span className={styles.onlineIndicator}>
              {messagesAuthStatus === "unauthenticated"
                ? "Требуется вход"
                : messagesAuthStatus === "checking"
                  ? "Проверка..."
                  : "Вы на связи"}
            </span>
          </div>

          {messagesAuthStatus === "checking" ? (
            <div className={styles.authPrompt} role="status">
              Проверяем авторизацию...
            </div>
          ) : messagesAuthStatus === "unauthenticated" ? (
            <div className={styles.authPrompt}>
              <FiMessageCircle aria-hidden="true" />
              <strong>Войдите, чтобы пользоваться чатом</strong>
              <span>
                Авторизуйтесь, чтобы просматривать диалоги и отправлять
                сообщения.
              </span>
              <Link href="/LoginPage" className={styles.authLink}>
                Авторизоваться
              </Link>
            </div>
          ) : messagesAuthStatus === "error" ? (
            <div className={styles.authPrompt} role="alert">
              <strong>{error}</strong>
              <button
                type="button"
                className={styles.authLink}
                onClick={checkAuth}
              >
                Повторить проверку
              </button>
            </div>
          ) : (
            <div className={styles.chatLayout}>
              {/* ================================= */}
              {/* Меню сообщества */}
              {/* ================================= */}

              <nav className={styles.menuColumn} aria-label="Меню сообщества">
                {commuMenu.map(({ label, icon: Icon, href }) =>
                  href ? (
                    <Link
                      key={label}
                      href={href}
                      className={styles.menuItem}
                      onClick={() => setActiveMenuItem(null)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  ) : (
                    <button
                      key={label}
                      type="button"
                      className={`${styles.menuItem} ${
                        activeMenuItem === label ? styles.menuItemActive : ""
                      }`}
                      onClick={() => setActiveMenuItem(label)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </button>
                  ),
                )}
              </nav>

              {/* ================================= */}
              {/* Список диалогов и поиск пользователей */}
              {/* ================================= */}

              <div
                className={`${styles.conversationsList} ${
                  activeConversation ? styles.conversationsListHidden : ""
                }`}
              >
                {/* Поиск пользователей */}

                <div className={styles.searchMessages}>
                  <FiSearch />

                  <input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Найти пользователя..."
                  />
                </div>

                {/* Результаты поиска */}

                {userSearch.trim().length >= 2 && (
                  <div className={styles.searchResults}>
                    <div className={styles.searchResultsTitle}>
                      Результаты поиска
                    </div>

                    {searchLoading && (
                      <p className={styles.searchStatus}>Поиск...</p>
                    )}

                    {!searchLoading && searchResults.length === 0 && (
                      <p className={styles.searchStatus}>
                        Пользователи не найдены
                      </p>
                    )}

                    {searchResults.map((user) => (
                      <div key={user.id} className={styles.searchUser}>
                        <div className={styles.userAvatar}>
                          {user.username.charAt(0).toUpperCase()}
                        </div>

                        <div className={styles.conversationInfo}>
                          <strong>{user.username}</strong>
                          <span>{user.email}</span>
                        </div>

                        <button
                          type="button"
                          disabled={startingChat}
                          onClick={() => startConversation(user.id)}
                          className={styles.startChatButton}
                        >
                          {startingChat ? "..." : "Написать"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Существующие диалоги */}

                <div className={styles.conversations}>
                  {loadingConversations && conversations.length === 0 && (
                    <div className={styles.chatEmpty}>Загрузка диалогов...</div>
                  )}

                  {!loadingConversations &&
                    filteredConversations.length === 0 &&
                    userSearch.trim().length < 2 && (
                      <div className={styles.chatEmpty}>
                        <FiMessageCircle />

                        <strong>Диалогов пока нет</strong>

                        <span>
                          Найдите пользователя выше, чтобы начать общение
                        </span>
                      </div>
                    )}

                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.conversation_id}
                      type="button"
                      className={`${styles.conversationItem} ${
                        activeConversation?.conversation_id ===
                        conversation.conversation_id
                          ? styles.conversationItemActive
                          : ""
                      }`}
                      onClick={() => openConversation(conversation)}
                    >
                      <div className={styles.userAvatar}>
                        {conversation.username.charAt(0).toUpperCase()}
                      </div>

                      <div className={styles.conversationInfo}>
                        <strong>{conversation.username}</strong>

                        <span>
                          {conversation.last_message || conversation.email}
                        </span>
                      </div>

                      {conversation.unread_count > 0 && (
                        <span className={styles.unreadBadge}>
                          {conversation.unread_count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================================= */}
              {/* Окно переписки */}
              {/* ================================= */}

              {activeMenuItem && !activeConversation ? (
                /* Заглушка выбранного раздела меню */
                <div className={styles.menuPlaceholder}>
                  <FiHelpCircle />

                  <strong>{activeMenuItem}</strong>

                  <span>
                    Раздел «{activeMenuItem}» скоро появится. Пока общайтесь в
                    мессенджере — выберите диалог слева.
                  </span>
                </div>
              ) : activeConversation ? (
                <div className={styles.chatWindow}>
                  {/* Собеседник */}

                  <div className={styles.chatUserHeader}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={backToConversations}
                      aria-label="Назад к диалогам"
                    >
                      <FiArrowLeft />
                    </button>

                    <div className={styles.userAvatar}>
                      {activeConversation.username.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{activeConversation.username}</strong>
                      <span>{activeConversation.email}</span>
                    </div>
                  </div>

                  {/* История сообщений */}

                  <div className={styles.chatMessages}>
                    {loadingMessages && messages.length === 0 && (
                      <div className={styles.chatEmpty}>
                        Загрузка сообщений...
                      </div>
                    )}

                    {!loadingMessages && messages.length === 0 && (
                      <div className={styles.chatEmpty}>
                        <FiMessageCircle />

                        <strong>Начните общение</strong>

                        <span>Напишите первое сообщение пользователю</span>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`${styles.messageRow} ${
                          message.is_mine ? styles.messageRowMine : ""
                        }`}
                      >
                        <div className={styles.messageBubble}>
                          <p>{message.content}</p>

                          <time>
                            {new Date(message.created_at).toLocaleTimeString(
                              "ru-RU",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </time>
                        </div>
                      </div>
                    ))}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Ошибка */}

                  {error && <div className={styles.chatError}>{error}</div>}

                  {/* Поле ввода */}

                  <form className={styles.chatInput} onSubmit={sendMessage}>
                    <input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Введите сообщение..."
                      maxLength={50000}
                    />

                    <button
                      type="submit"
                      disabled={!messageText.trim() || sending}
                      aria-label="Отправить сообщение"
                    >
                      <FiSend />
                    </button>
                  </form>
                </div>
              ) : (
                /* Заглушка, если диалог не выбран */

                <div className={styles.chatPlaceholder}>
                  <FiMessageCircle />

                  <strong>Выберите диалог</strong>

                  <span>
                    Выберите пользователя слева или найдите нового собеседника
                  </span>
                </div>
              )}
            </div>
          )}
      </div>
    </main>
  );
}
  