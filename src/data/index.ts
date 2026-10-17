import { Point, Tour } from "@/types";
import { mockPoints } from "./points";
import { mockTours } from "./tours";

// Единая точка доступа к данным приложения.
// Пока источник — моки. В 0.1 внутренности заменим на запросы к API,
// а экраны останутся без изменений.

export function getTours(): Tour[] {
  return mockTours;
}

export function getTourById(tourId: string): Tour | undefined {
  return mockTours.find((tour) => tour.id === tourId);
}

// Точки экскурсии в порядке маршрута (1, 2, 3...)
export function getPointsByTour(tourId: string): Point[] {
  return mockPoints
    .filter((point) => point.tourId === tourId)
    .sort((a, b) => a.orderInTour - b.orderInTour);
}

export function getPointById(pointId: string): Point | undefined {
  return mockPoints.find((point) => point.id === pointId);
}
