import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { avatarArray } from '../../../utils/avatars';

export default function SelectAvatarScreen() {
  const router = useRouter();

  const handleSelectAvatar = (avatarId) => {
    router.push({ pathname: '/(tabs)/settings', params: { avatarId } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Avatar</Text>
      <FlatList
        data={avatarArray}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectAvatar(item.id)} style={styles.avatarContainer}>
            <Image source={item.source} style={styles.avatar} />
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
