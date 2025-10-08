import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Search = ({ value, onSearch, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search...'}
        value={value}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Search;
