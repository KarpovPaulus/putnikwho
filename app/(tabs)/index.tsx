import { useGetToursQuery } from "@/api";
import { describeApiError } from "@/api/errors";
import { TourCard } from "@/components/tours/TourCard";
import {
  countActiveFilters,
  EMPTY_FILTERS,
  toToursQuery,
  TourFilters,
  type TourFiltersValue,
} from "@/components/tours/TourFilters";
import {
  AppText,
  Button,
  Divider,
  Screen,
  SearchField,
  useBottomInset,
} from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useTheme } from "@/hooks/useTheme";
import type { ToursQuery } from "@/types";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

export default function ToursScreen() {
  const [search, setSearch] = useState(""); // что в поле прямо сейчас
  const [filters, setFilters] = useState<TourFiltersValue>(EMPTY_FILTERS);
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearch = useDebouncedValue(search.trim(), 300);

  // Новый объект на каждом рендере — это нормально: RTK Query сравнивает
  // аргументы по содержимому, а не по ссылке, и лишних запросов не будет
  const params: ToursQuery = {
    ...toToursQuery(filters),
    q: debouncedSearch || undefined,
  };

  // data — последний полученный ответ (пока грузится новый, на экране остаётся старый список
  // и он не «мигает» пустотой); isFetching — идёт любой запрос, isLoading — самый первый
  const { data, isLoading, isFetching, error, refetch } =
    useGetToursQuery(params);

  const { colors } = useTheme();
  const bottom = useBottomInset();
  const isFiltered =
    Boolean(debouncedSearch) || countActiveFilters(filters) > 0;

  const resetAll = () => {
    setSearch("");
    setFilters(EMPTY_FILTERS);
  };

  // Свой флаг для «потянуть вниз»: isFetching не подходит — он включается
  // и при смене фильтров, и тогда индикатор обновления дёргался бы на каждый чип
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const openTour = (tourId: string) =>
    router.push({ pathname: "/tour/[tourId]", params: { tourId } });

  // Шапка передаётся в ListHeaderComponent ЭЛЕМЕНТОМ (JSX), а не функцией-компонентом —
  // иначе поле поиска пересоздавалось бы на каждый ввод и клавиатура закрывалась
  const header = (
    <View style={{ gap: spacing.lg, paddingTop: spacing.lg }}>
      <AppText variant="display">Экскурсии</AppText>
      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder="Экскурсия или место"
      />
      <TourFilters value={filters} onChange={setFilters} />
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}
      >
        <AppText variant="overline" tone="secondary">
          {isFiltered ? `Найдено: ${data?.length ?? 0}` : "Популярное"}
        </AppText>
        {isFetching && !isLoading && !refreshing && (
          <ActivityIndicator size="small" color={colors.textSecondary} />
        )}
      </View>
      <Divider />
    </View>
  );

  const emptyState = isLoading ? (
    <ActivityIndicator
      style={{ marginTop: spacing.xxxl }}
      color={colors.textSecondary}
    />
  ) : error ? (
    <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
      <AppText tone="secondary">{describeApiError(error)}</AppText>
      <Button title="Повторить" variant="secondary" onPress={refetch} />
    </View>
  ) : isFiltered ? (
    <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
      <AppText tone="secondary">
        Ничего не нашлось. Попробуй изменить запрос или фильтры.
      </AppText>
      <Button title="Сбросить всё" variant="secondary" onPress={resetAll} />
    </View>
  ) : (
    <AppText tone="secondary" style={{ marginTop: spacing.lg }}>
      Экскурсий пока нет
    </AppText>
  );

  return (
    <Screen>
      <FlatList
        data={data ?? []}
        keyExtractor={(tour) => tour.id}
        renderItem={({ item }) => (
          <TourCard tour={item} onPress={() => openTour(item.id)} />
        )}
        ItemSeparatorComponent={Divider}
        ListHeaderComponent={header}
        ListEmptyComponent={emptyState}
        ListFooterComponent={data?.length ? <Divider /> : null}
        contentContainerStyle={{ paddingBottom: bottom }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // тап по карточке при открытой клавиатуре сразу открывает её
        keyboardDismissMode="on-drag" // начал листать — клавиатура спряталась
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.textSecondary}
            colors={[colors.accent]}
          />
        }
      />
    </Screen>
  );
}
