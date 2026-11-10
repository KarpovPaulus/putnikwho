import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// RTK Query отдаёт ошибку одного из двух видов:
// FetchBaseQueryError — проблема запроса (status: число от сервера или строка-причина)
// SerializedError — исключение в нашем коде (редкость)
export function describeApiError(
  error: FetchBaseQueryError | SerializedError | undefined,
): string {
  if (error && "status" in error) {
    // Запрос не дошёл до сервера: нет сети, неверный адрес, VPN, брандмауэр
    if (error.status === "FETCH_ERROR" || error.status === "TIMEOUT_ERROR") {
      return "Нет связи с сервером";
    }
    // Сервер ответил, но с ошибкой (400 — неверные параметры, 500 — сбой на сервере)
    if (typeof error.status === "number") {
      return `Ошибка сервера (${error.status})`;
    }
  }
  return "Не удалось загрузить данные";
}
