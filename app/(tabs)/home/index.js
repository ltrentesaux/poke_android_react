import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, useWindowDimensions, Button } from 'react-native';
import { useGetLatestCardsQuery } from '@/api/pokemon';
import Card from '@/components/Card';

const CARD_TARGET_WIDTH = 180;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useGetLatestCardsQuery(page);
  const { cards, paging } = data || {};

  const numColumns = Math.max(1, Math.floor(width / CARD_TARGET_WIDTH));

  const handlePrevious = () => {
    setPage(p => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage(p => p + 1);
  };

  if (isLoading && !data) {
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
        ListFooterComponent={isFetching ? <ActivityIndicator style={{ margin: 20 }} /> : null}
      />

      {cards && cards.length > 0 && (
         <View style={styles.pagination}>
            <Button
              title="Previous"
              onPress={handlePrevious}
              disabled={page === 1 || isFetching}
            />
            <Text style={styles.pageText}>
              {paging ? `Page ${page} of ${paging.total}` : `Page ${page}`}
            </Text>
            <Button
              title="Next"
              onPress={handleNext}
              disabled={isFetching || (paging && page === paging.total)}
            />
          </View>
      )}
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
