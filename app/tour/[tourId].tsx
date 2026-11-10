import { useGetTourQuery } from "@/api";
import { AppText, Divider, Screen } from "@/components/ui";
import { spacing } from "@/constants/theme";
import { skipToken } from "@reduxjs/toolkit/query";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import { ActivityIndicator, Pressable, ScrollView } from "react-native";

// Временная версия: название, описание, точки. Вёрстка по макету — отдельный шаг 0.2
export default function TourScreen() {
  const { tourId } = useLocalSearchParams<{ tourId: string }>();
  const { data: tour, isLoading, error } = useGetTourQuery(tourId ?? skipToken);

  if (isLoading) {
    return (
      <Screen safeTop={false} style={{ justifyContent: "center" }}>
        <ActivityIndicator />
      </Screen>
    );
  }

  if (error || !tour) {
    return (
      <Screen safeTop={false}>
        <AppText tone="secondary" style={{ marginTop: spacing.lg }}>
          Не удалось загрузить экскурсию
        </AppText>
      </Screen>
    );
  }

  return (
    <Screen safeTop={false}>
      <ScrollView
        contentContainerStyle={{ gap: spacing.md, paddingVertical: spacing.lg }}
      >
        <AppText variant="title">{tour.title}</AppText>
        {tour.description ? (
          <AppText variant="reading">{tour.description}</AppText>
        ) : null}

        <AppText
          variant="overline"
          tone="secondary"
          style={{ marginTop: spacing.lg }}
        >
          Точки
        </AppText>
        <Divider />
        {tour.points.map((point, i) => (
          <Fragment key={point.id}>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/point/[pointId]",
                  params: { pointId: point.id, tourId: tour.id },
                })
              }
              style={({ pressed }) => [
                { paddingVertical: spacing.sm },
                pressed && { opacity: 0.7 },
              ]}
            >
              <AppText variant="subheading">
                {tour.orderMatters ? `${i + 1}. ` : ""}
                {point.title}
              </AppText>
            </Pressable>
            <Divider />
          </Fragment>
        ))}
      </ScrollView>
    </Screen>
  );
}
