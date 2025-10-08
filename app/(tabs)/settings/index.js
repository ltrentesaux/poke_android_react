import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { avatarImages } from '../../../utils/avatars';

export default function SettingsScreen() {
  const [pseudo, setPseudo] = useState('admin');
  const [avatarId, setAvatarId] = useState('avatar1');
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.avatarId && avatarImages[params.avatarId]) {
      setAvatarId(params.avatarId);
    }
  }, [params.avatarId]);

  const handleEditPicture = () => {
    router.push('/(tabs)/settings/select-avatar');
  };

  return (
    <View style={styles.container}>
        <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
                <Image source={avatarImages[avatarId]} style={styles.profileImage} />
                <TouchableOpacity style={styles.editButton} onPress={handleEditPicture}>
                    <FontAwesome name="pencil" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.pseudoText}>{pseudo}</Text>
        </View>

      <View style={styles.section}>
        <Link href="/(tabs)/settings/favorites" asChild>
          <Button title="View Favorite Cards" />
        </Link>
      </View>
      <View style={styles.section}>
        <Link href="/(tabs)/settings/private" asChild>
          <Button title="Private Settings" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'grey',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  pseudoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
    width: '100%',
  },
});
