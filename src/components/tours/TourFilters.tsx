import { Chip } from "@/components/ui";
import { layout, spacing } from "@/constants/theme";
import type { ToursQuery } from "@/types";
import { useState } from "react";
import { ScrollView } from "react-native";
import { CategoryPicker } from "./CategoryPicker";

// Фильтры = параметры запроса без текста поиска.
// Категории в приложении храним массивом id; в строку "id1,id2" превращаем перед запросом
export type TourFiltersValue = Omit<ToursQuery, "q" | "categories"> & {
  categoryIds?: string[];
};
export const EMPTY_FILTERS: TourFiltersValue = {};

type Price = NonNullable<TourFiltersValue["price"]>;
type Duration = NonNullable<TourFiltersValue["duration"]>;
type Format = NonNullable<TourFiltersValue["format"]>;

type ChipDef = {
  label: string;
  isActive: (f: TourFiltersValue) => boolean;
  toggle: (f: TourFiltersValue) => TourFiltersValue;
};

const priceChip = (label: string, price: Price): ChipDef => ({
  label,
  isActive: (f) => f.price === price,
  toggle: (f) => ({ ...f, price: f.price === price ? undefined : price }),
});

const durationChip = (label: string, duration: Duration): ChipDef => ({
  label,
  isActive: (f) => f.duration === duration,
  toggle: (f) => ({
    ...f,
    duration: f.duration === duration ? undefined : duration,
  }),
});

const formatChip = (label: string, format: Format): ChipDef => ({
  label,
  isActive: (f) => f.format === format,
  toggle: (f) => ({ ...f, format: f.format === format ? undefined : format }),
});

const kidsChip: ChipDef = {
  label: "Для детей",
  isActive: (f) => f.kids === true,
  toggle: (f) => ({ ...f, kids: f.kids ? undefined : true }),
};

const CHIPS: ChipDef[] = [
  priceChip("Бесплатные", "free"),
  priceChip("Платные", "paid"),
  durationChip("До 30 мин", "upTo30"),
  durationChip("До часа", "upTo60"),
  durationChip("Больше часа", "over60"),
  formatChip("Маршрут", "WITH_POINTS"),
  formatChip("Одно место", "SINGLE_PLACE"),
  kidsChip,
];

export function countActiveFilters(filters: TourFiltersValue): number {
  const categories = filters.categoryIds?.length ? 1 : 0;
  return CHIPS.filter((chip) => chip.isActive(filters)).length + categories;
}

// Фильтры приложения → параметры запроса к API
export function toToursQuery(filters: TourFiltersValue): Omit<ToursQuery, "q"> {
  const { categoryIds, ...rest } = filters;
  return {
    ...rest,
    categories: categoryIds?.length ? categoryIds.join(",") : undefined,
  };
}

type Props = {
  value: TourFiltersValue;
  onChange: (next: TourFiltersValue) => void;
};

export function TourFilters({ value, onChange }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const categoriesCount = value.categoryIds?.length ?? 0;

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ marginHorizontal: -layout.screenPadding }}
        contentContainerStyle={{
          paddingHorizontal: layout.screenPadding,
          gap: spacing.sm,
        }}
      >
        {countActiveFilters(value) > 0 && (
          <Chip label="Сбросить" onPress={() => onChange(EMPTY_FILTERS)} />
        )}
        <Chip
          label={
            categoriesCount ? `Категории · ${categoriesCount}` : "Категории"
          }
          selected={categoriesCount > 0}
          onPress={() => setPickerOpen(true)}
        />
        {CHIPS.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            selected={chip.isActive(value)}
            onPress={() => onChange(chip.toggle(value))}
          />
        ))}
      </ScrollView>

      <CategoryPicker
        visible={pickerOpen}
        selectedIds={value.categoryIds ?? []}
        onClose={() => setPickerOpen(false)}
        onApply={(ids) => {
          onChange({ ...value, categoryIds: ids.length ? ids : undefined });
          setPickerOpen(false);
        }}
      />
    </>
  );
}
