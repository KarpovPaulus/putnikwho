import { POI } from "../types";

export const mockPOIs: POI[] = [
  {
    id: "1",
    tourId: "tour-1",
    title: "Эрмитаж",
    lat: 59.9398,
    lng: 30.3146,
    description:
      "Один из крупнейших художественных музеев мира, расположен в Зимнем дворце.",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    imageUrl: "https://example.com/images/hermitage.jpg",
    orderInTour: 1,
  },
  {
    id: "2",
    tourId: "tour-1",
    title: "Дворцовая площадь",
    lat: 59.9387,
    lng: 30.3159,
    description:
      "Главная площадь Санкт-Петербурга с Александровской колонной в центре.",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    imageUrl: "https://example.com/images/palace-square.jpg",
    orderInTour: 2,
  },
  {
    id: "3",
    tourId: "tour-1",
    title: "Исаакиевский собор",
    lat: 59.9343,
    lng: 30.3061,
    description: "Крупнейший православный храм Санкт-Петербурга.",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    imageUrl: "https://example.com/images/isaac-cathedral.jpg",
    orderInTour: 3,
  },
  {
    id: "4",
    tourId: "tour-1",
    title: "Спас на Крови",
    lat: 59.9401,
    lng: 30.3288,
    description:
      "Храм Воскресения Христова, построен на месте убийства Александра II.",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    imageUrl: "https://example.com/images/spas-na-krovi.jpg",
    orderInTour: 4,
  },
  {
    id: "5",
    tourId: "tour-1",
    title: "Петропавловская крепость",
    lat: 59.95,
    lng: 30.3167,
    description:
      "Историческое ядро Санкт-Петербурга, основанное Петром I в 1703 году.",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    imageUrl: "https://example.com/images/peter-paul-fortress.jpg",
    orderInTour: 5,
  },
];
