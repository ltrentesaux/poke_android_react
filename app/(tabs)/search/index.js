import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSearchCardsQuery } from '../../../api/pokemon';
import Search from '../../../components/Search';
import Card from '../../../components/Card';

const CARD_TARGET_WIDTH = 180;

export default function SearchScreen() {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { width } = useWindowDimensions();

  const numColumns = Math.max(1, Math.floor(width / CARD_TARGET_WIDTH));

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== searchTerm) {
        setSearchTerm(inputValue);
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, searchTerm]);

  const { data, error, isFetching } = useSearchCardsQuery(
    { name: searchTerm, page: page },
    { skip: !searchTerm }
  );

  const { cards, paging } = data || {};

  const loadMore = () => {
    if (!isFetching && paging && page < paging.total) {
      setPage(p => p + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Search 
        value={inputValue} 
        onSearch={setInputValue} 
        placeholder="Enter Pokémon name..." 
      />
      
      {isFetching && !data ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : error ? (
        <Text style={styles.messageText}>An error occurred. Please try again.</Text>
      ) : cards?.length > 0 ? (
        <FlatList
          key={numColumns}
          data={cards}
          renderItem={({ item }) => <Card card={item} />}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetching && data ? <ActivityIndicator style={{ margin: 10 }} /> : null}
        />
      ) : (
        searchTerm && !isFetching && <Text style={styles.messageText}>No results for "{searchTerm}"</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  messageText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
