import { Point } from "@/types";

// Пока одно аудио на всех. Плеер всё равно играет локальный файл —
// реальные audioUrl появятся вместе с бэкендом.
const MOCK_AUDIO =
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";

// В моках id = "<stableId>-v1", чтобы не путать два id между собой
export const mockPoints: Point[] = [
  {
    id: "point-1-v1",
    stableId: "point-1",
    tourId: "tour-1",
    title: "Эрмитаж",
    lat: 59.9398,
    lng: 30.3146,
    description:
      "Один из крупнейших художественных музеев мира, расположен в Зимнем дворце.",
    photoUrl: null,
    orderInTour: 1,
    tracks: [
      {
        id: "track-1-v1",
        stableId: "track-1",
        pointId: "point-1-v1",
        title: "История дворца",
        audioUrl: MOCK_AUDIO,
        photoUrl: null,
        durationSec: 180,
        orderInPoint: 1,
      },
      {
        id: "track-2-v1",
        stableId: "track-2",
        pointId: "point-1-v1",
        title: "Коллекция",
        audioUrl: MOCK_AUDIO,
        photoUrl: null,
        durationSec: 240,
        orderInPoint: 2,
      },
    ],
  },
  {
    id: "point-2-v1",
    stableId: "point-2",
    tourId: "tour-1",
    title: "Дворцовая площадь",
    lat: 59.9387,
    lng: 30.3159,
    description:
      "Главная площадь Санкт-Петербурга с Александровской колонной в центре.",
    photoUrl: null,
    orderInTour: 2,
    tracks: [
      {
        id: "track-3-v1",
        stableId: "track-3",
        pointId: "point-2-v1",
        title: "Александровская колонна",
        audioUrl: MOCK_AUDIO,
        photoUrl: null,
        durationSec: 150,
        orderInPoint: 1,
      },
    ],
  },
  {
    id: "point-3-v1",
    stableId: "point-3",
    tourId: "tour-1",
    title: "Исаакиевский собор",
    lat: 59.9343,
    lng: 30.3061,
    description: "Крупнейший православный храм Санкт-Петербурга.",
    photoUrl: null,
    orderInTour: 3,
    tracks: [
      {
        id: "track-4-v1",
        stableId: "track-4",
        pointId: "point-3-v1",
        title: "Строительство собора",
        audioUrl: MOCK_AUDIO,
        photoUrl: null,
        durationSec: 200,
        orderInPoint: 1,
      },
    ],
  },
  {
    id: "point-4-v1",
    stableId: "point-4",
    tourId: "tour-1",
    title: "Спас на Крови",
    lat: 59.9401,
    lng: 30.3288,
    description:
      "Храм Воскресения Христова, построен на месте убийства Александра II.",
    photoUrl: null,
    orderInTour: 4,
    tracks: [
      {
        id: "track-5-v1",
        stableId: "track-5",
        pointId: "point-4-v1",
        title: "Мозаики храма",
        audioUrl: MOCK_AUDIO,
        photoUrl: null,
        durationSec: 170,
        orderInPoint: 1,
      },
    ],
  },
  {
    id: "point-5-v1",
    stableId: "point-5",
    tourId: "tour-1",
    title: "Петропавловская крепость",
    lat: 59.95,
    lng: 30.3167,
    description:
      "Историческое ядро Санкт-Петербурга, основанное Петром I в 1703 году.",
    photoUrl: null,
    orderInTour: 5,
    tracks: [
      {
        id: "track-6-v1",
        stableId: "track-6",
        pointId: "point-5-v1",
        title: "Основание города",
        audioUrl: MOCK_AUDIO,
        photoUrl: null,
        durationSec: 220,
        orderInPoint: 1,
      },
    ],
  },
];
