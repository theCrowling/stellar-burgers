# Stellar Burgers
Веб-приложение для заказа бургеров с конструктором ингредиентов, личным кабинетом и историей заказов.  
Собери и закажи свой космический бургер 🚀.

## Функционал
- Конструктор бургера с возможностью перетаскивания ингредиентов.  
- Добавление/удаление ингредиентов и подсчёт стоимости.  
- Оформление заказа и просмотр статуса.
- Личный кабинет с возможностью авторизации, регистрации и смены пароля.
- История заказов пользователя.  
- Маршрутизация между страницами (конструктор, корзина, профиль/история).  
- Управление состоянием через Redux Toolkit.

## Технологии
- React  
- TypeScript  
- Redux Toolkit  
- Webpack (сборка)  
- Jest + Cypress (тесты)  

## Демонстрация
- Ссылка на репозиторий: `https://github.com/theCroliwng/stellar-burger`

## Скриншоты
#### Конструктор бругера
<img width="900" alt="image" src="https://github.com/user-attachments/assets/34817909-b237-4101-b701-bac0830815d8" />

#### Лента заказов
<img width="900" alt="image" src="https://github.com/user-attachments/assets/4acf3c20-906d-46bc-bf9b-f935866222b2" />

#### Личный кабинет
<img width="900" alt="image" src="https://github.com/user-attachments/assets/badd9c22-cb0b-4069-a256-5ab0db757978" />

## Установка и запуск (локально)

```bash
# клонировать репозиторий
git clone https://github.com/theCrowling/stellar-burgers.git
cd stellar-burgers

# установить зависимости
npm install
# или
yarn

# запустить в режиме разработки
npm run start
# или
yarn start

# запуск тестов
npm run test
npm cypress:open

## Важно:
Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.
