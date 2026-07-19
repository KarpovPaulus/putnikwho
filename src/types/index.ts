// Экскурсия — набор точек, объединённых одной темой/маршрутом
export interface Tour {
  id: string;
  title: string;
  description: string;
  coverImage: string; // URL или путь к картинке
  isFree: boolean;
}

// Точка на карте (Point of Interest), привязана к конкретной экскурсии
export interface POI {
  id: string;
  tourId: string; // ссылка на Tour, к которому относится точка
  title: string;
  lat: number; // широта
  lng: number; // долгота
  description: string;
  audioUrl: string; // ссылка на mp3-файл
  imageUrl: string;
  orderInTour: number; // порядковый номер точки в маршруте (1, 2, 3...)
}

// Прогресс пользователя — пока просто списки ID
export interface UserProgress {
  listenedPOIs: string[]; // id точек, которые уже прослушаны
  favoriteTours: string[]; // id избранных экскурсий
}
