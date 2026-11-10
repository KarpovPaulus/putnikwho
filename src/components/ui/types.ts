import type { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";

// Имена иконок Feather — TS подскажет и проверит опечатки
export type IconName = ComponentProps<typeof Feather>["name"];
