// Клиентские типы — то, что отдаёт API. Генерируются из бэкенда:
// npm run gen:api (бэкенд должен быть запущен). Руками не править.
// id точки и трека — это их stableId: к нему привязан прогресс.
import type { components } from "@/api/schema";

type Schemas = components["schemas"];

export type TourFormat = Schemas["TourFormat"];
export type VoiceType = Schemas["VoiceType"];
export type TourListItem = Schemas["TourListItemDto"];
export type TourDetails = Schemas["TourDetailsDto"];
export type Point = Schemas["PointDto"];
export type Track = Schemas["TrackDto"];
