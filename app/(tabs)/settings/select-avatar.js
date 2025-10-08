import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const avatars = [
  'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Avatar1',
  'https://via.placeholder.com/150/00FF00/FFFFFF?Text=Avatar2',
  'https://via.placeholder.com/150/0000FF/FFFFFF?Text=Avatar3',
  'https://via.placeholder.com/150/FFFF00/000000?Text=Avatar4',
  'https://via.placeholder.com/150/FF00FF/FFFFFF?Text=Avatar5',
  'https://via.placeholder.com/150/00FFFF/000000?Text=Avatar6',
];

export default function SelectAvatarScreen() {
  const router = useRouter();

  const handleSelectAvatar = (avatarUri) => {
    router.push({ pathname: '/(tabs)/settings', params: { avatarUri } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Avatar</Text>
      <FlatList
        data={avatars}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectAvatar(item)} style={styles.avatarContainer}>
            <Image source={{ uri: item }} style={styles.avatar} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
