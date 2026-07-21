import { POI, Tour } from "../types";
import { mockPOIs } from "./pois";
import { mockTours } from "./tours";

// Единая точка доступа к данным приложения.
// Пока источник — статичные mock-массивы. Позже внутренности этих функций
// заменим на запросы к бэку (RTK Query), а экраны останутся без изменений.

// Все экскурсии (для списка на главном экране)
export function getTours(): Tour[] {
  return mockTours;
}

// Одна экскурсия по id
export function getTourById(tourId: string): Tour | undefined {
  return mockTours.find((tour) => tour.id === tourId);
}

// Точки конкретной экскурсии, отсортированные по порядку в маршруте (1, 2, 3...).
// Сортировку держим здесь, чтобы экраны получали точки уже в правильном порядке.
export function getPOIsByTour(tourId: string): POI[] {
  return mockPOIs
    .filter((poi) => poi.tourId === tourId)
    .sort((a, b) => a.orderInTour - b.orderInTour);
}

// Одна точка по id
export function getPOIById(id: string): POI | undefined {
  return mockPOIs.find((poi) => poi.id === id);
}
