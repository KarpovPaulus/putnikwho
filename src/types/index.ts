// Клиентские типы — «опубликованный вид» экскурсии для слушателя.
// Серверная модель (TourVersion, MediaFile, статусы модерации) сюда не попадает:
// API отдаёт уже собранную опубликованную версию.

export interface Tour {
  id: string;
  title: string;
  description: string;
  coverUrl: string | null; // null — показываем заглушку
  isPaid: boolean;
}

export interface Point {
  id: string; // id копии точки в конкретной версии экскурсии
  stableId: string; // сквозной id — общий для всех версий; к нему привязан прогресс
  tourId: string;
  title: string;
  lat: number;
  lng: number;
  description: string | null;
  photoUrl: string | null;
  orderInTour: number; // 1, 2, 3...
  tracks: Track[]; // уже отсортированы по orderInPoint
}

export interface Track {
  id: string;
  stableId: string;
  pointId: string;
  title: string;
  audioUrl: string;
  photoUrl: string | null;
  durationSec: number;
  orderInPoint: number;
}
