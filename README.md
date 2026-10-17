# PutnikWho

Аудиогид: экскурсия → точки → треки. Expo SDK 54, React Native, TypeScript.

Документы по продукту — в knowledge проекта:
«Навигация и пользовательские сценарии», «Модель данных».

## Запуск

```bash
npm install
npx expo start -c
```

Открывать в dev-клиенте (не в Expo Go — нужны нативные модули).

## Dev-клиент

Пересобирать только при нативных изменениях: добавлен/удалён нативный пакет,
изменены разрешения, плагины или `infoPlist` в `app.json`.

```bash
eas build --profile development --platform android
```

Зависимости ставить через `npx expo install <пакет>`, а не `npm install`,
чтобы версии совпадали с SDK. Не запускать `npm audit fix --force`.

## Проверки

```bash
npx tsc --noEmit
npx expo lint
npx expo-doctor
```

## Структура

- `app/` — экраны и роуты (expo-router, файловая маршрутизация)
- `src/data/` — доступ к данным (пока моки, в 0.1 — API)
- `src/types/` — клиентские типы: Tour, Point, Track
- `src/store/` — Redux Toolkit
- `src/constants/theme.ts` — основа дизайн-токенов
- `src/utils/` — утилиты
- Импорты через `@/` → `src/`
