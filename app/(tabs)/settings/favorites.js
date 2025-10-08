import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Card from '../../../components/Card';

const CARD_TARGET_WIDTH = 180;

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();

  const numColumns = Math.max(1, Math.floor(width / CARD_TARGET_WIDTH));

  const handleFavoriteChange = (removedCardId) => {
    setFavorites(currentFavorites => 
      currentFavorites.filter(card => card.id !== removedCardId)
    );
  };

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
      setLoading(false);
    };

    if (isFocused) {
      getFavorites();
    }
  }, [isFocused]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.messageText}>You have no favorite cards yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={favorites}
        renderItem={({ item }) => (
          <Card 
            card={item} 
            onFavoriteChange={handleFavoriteChange} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
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
  },
  messageText: {
    fontSize: 16,
  },
});
