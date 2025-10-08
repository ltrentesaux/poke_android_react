import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Card = ({ card, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const cardId = card.id;

  useEffect(() => {
    const checkFavorite = async () => {
      if (!cardId) return;
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteList = JSON.parse(favorites);
        setIsFavorite(favoriteList.some((fav) => fav.id === cardId));
      }
    };
    checkFavorite();
  }, [cardId]);

  useEffect(() => {
    setImageError(false);
  }, [card.image]);

  const toggleFavorite = async () => {
    if (!cardId) return;
    let favorites = await AsyncStorage.getItem('favorites');
    let favoriteList = favorites ? JSON.parse(favorites) : [];

    const isCurrentlyFavorite = favoriteList.some(fav => fav.id === cardId);

    if (isCurrentlyFavorite) {
      favoriteList = favoriteList.filter((fav) => fav.id !== cardId);
    } else {
      favoriteList.push(card);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteList));
    setIsFavorite(!isCurrentlyFavorite);

    if (onFavoriteChange) {
      onFavoriteChange(cardId, !isCurrentlyFavorite);
    }
  };

  const handleCardPress = () => {
    router.push(`/(tabs)/cards/${cardId}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.imageContainer}>
          {imageError || !card.image ? (
            <View style={[styles.image, styles.placeholder]}>
              <FontAwesome name="photo" size={50} color="#ccc" />
            </View>
          ) : (
            <Image
              source={{ uri: card.image }}
              style={styles.image}
              onError={() => setImageError(true)}
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.title} numberOfLines={1}>{card.name}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.heartContainer}>
          <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    maxWidth: 200,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  heartContainer: {
    padding: 5,
  },
});

export default Card;
