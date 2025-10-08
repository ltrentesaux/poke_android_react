import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

const USERNAME_KEY = 'user_pseudo';

export default function SettingsScreen() {
  const [pseudo, setPseudo] = useState('');
  const [savedPseudo, setSavedPseudo] = useState('');

  useEffect(() => {
    const loadPseudo = async () => {
      const storedPseudo = await AsyncStorage.getItem(USERNAME_KEY);
      if (storedPseudo) {
        setPseudo(storedPseudo);
        setSavedPseudo(storedPseudo);
      }
    };
    loadPseudo();
  }, []);

  const handleSave = async () => {
    if (!pseudo.trim()) {
      Alert.alert('Error', 'Pseudo cannot be empty.');
      return;
    }
    await AsyncStorage.setItem(USERNAME_KEY, pseudo);
    setSavedPseudo(pseudo);
    Alert.alert('Success', 'Pseudo saved!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Current Pseudo: {savedPseudo || 'Not set'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new pseudo"
          value={pseudo}
          onChangeText={setPseudo}
        />
        <Button title="Save Pseudo" onPress={handleSave} />
      </View>

      <View style={styles.section}>
        <Link href="/settings/favorites" asChild>
          <Button title="View Favorite Cards" />
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
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
