import { useEffect, useState } from "react";

// Возвращает value, но с опозданием: обновляется, только когда value
// не менялось delayMs миллисекунд. Каждая новая буква сбрасывает таймер.
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer); // value изменилось раньше — старый таймер отменяем
  }, [value, delayMs]);

  return debounced;
}
