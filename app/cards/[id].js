import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useGetCardByIdQuery } from '@/api/pokemon';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: card, error, isLoading } = useGetCardByIdQuery(id);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!card) return;
    const checkFavorite = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteList = JSON.parse(favorites);
        setIsFavorite(favoriteList.some((fav) => fav.id === card.id));
      }
    };
    checkFavorite();
  }, [card]);

  const toggleFavorite = async () => {
    if (!card) return;
    const favorites = await AsyncStorage.getItem('favorites');
    let favoriteList = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      favoriteList = favoriteList.filter((fav) => fav.id !== card.id);
    } else {
      const cardSummary = { id: card.id, name: card.name, image: card.image };
      favoriteList.push(cardSummary);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteList));
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error || !card) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Could not load the card details.</Text>
      </View>
    );
  }

  const lowestPrice = card.prices?.cardmarket?.lowest_near_mint;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: card.name, 
          headerBackTitle: 'Back',
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite} style={{ marginRight: 15 }}>
              <FontAwesome 
                name={isFavorite ? 'heart' : 'heart-o'} 
                size={24} 
                color="red" 
              />
            </TouchableOpacity>
          ),
        }} 
      />

      <View style={styles.imageContainer}>
        <Image source={{ uri: card.image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{card.name_numbered}</Text>
        <Text style={styles.subtitle}>{card.episode?.series?.name} - {card.episode?.name}</Text>

        <View style={styles.infoRow}>
          <FontAwesome name="star" size={20} color="#FFD700" />
          <Text style={styles.infoText}>Rarity: {card.rarity}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <FontAwesome name="heartbeat" size={20} color="#E63946" />
          <Text style={styles.infoText}>HP: {card.hp}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome name="shield" size={20} color="#457B9D" />
          <Text style={styles.infoText}>Supertype: {card.supertype}</Text>
        </View>

        {lowestPrice && (
            <View style={styles.infoRow}>
                <FontAwesome name="eur" size={20} color="#2A9D8F" />
                <Text style={styles.infoText}>Lowest Price: {lowestPrice} {card.prices.cardmarket.currency}</Text>
            </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  imageContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 63 / 88, // Official Pokémon card aspect ratio
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 15,
  },
});
