import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useGetLatestCardsQuery } from '@/api/pokemon';
import Card from '@/components/Card';

const CARD_TARGET_WIDTH = 180;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useGetLatestCardsQuery(page);
  const { cards, paging } = data || {};

  const numColumns = Math.max(1, Math.floor(width / CARD_TARGET_WIDTH));

  const loadMore = () => {
    if (!isFetching && paging && page < paging.total) {
      setPage(p => p + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error fetching data: {error.toString()}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={cards || []}
        renderItem={({ item }) => <Card card={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator style={{ margin: 20 }} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
  },
});
