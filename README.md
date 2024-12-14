# Online Code Editor

## Описание проекта

**Online Code Editor** — это веб-приложение, которое позволяет пользователям писать, запускать и получать результаты выполнения кода на двух языках программирования: **Python** и **Go**.

### Основной функционал:
- Поддержка выбора языка программирования.
- Редактор кода с подсветкой синтаксиса.
- Выполнение кода на сервере с отображением результата.
- Современный и удобный пользовательский интерфейс.

---

## Технологии

- **Frontend**: React.js
- **Backend**: Node.js с использованием Express.js.
- **База данных**: MongoDB для хранения истории выполнения кода.
- **Интерпретаторы**: Python и Go.
- **Библиотеки**:
    - `@monaco-editor/react` или `react-codemirror` для редактора кода.
    - `child_process` для выполнения кода на сервере.
    - `mongoose` для работы с MongoDB.

---

## Установка и запуск

### 1. Запуск Backend

1. Перейдите в папку `backend`: cd backend
   - Установите зависимости: npm install.
   - Запустите бэкенд:  node server.js
   - Сервер будет доступен по адресу: http://localhost:3001.

### 2. Запуск Frontend
1. Перейдите в папку `frontend`: cd frontend
   - Установите зависимости: npm install
   - Запустите фронтенд: npm start
   - Приложение будет доступно по адресу: http://localhost:3000.