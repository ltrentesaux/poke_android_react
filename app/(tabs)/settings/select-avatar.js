import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const avatars = [
  { id: 'avatar1', source: require('../../../assets/images/avatar/10f13510774061.560eadfde5b61.png') },
  { id: 'avatar2', source: require('../../../assets/images/avatar/322790.jpg') },
  { id: 'avatar3', source: require('../../../assets/images/avatar/f495741d749f713e849e305c60df60e5.jpg') },
  { id: 'avatar4', source: require('../../../assets/images/avatar/images.png') },
];

export default function SelectAvatarScreen() {
  const router = useRouter();

  const handleSelectAvatar = (avatarSource) => {
    // Resolve the asset to get a URI that can be passed as a param
    const resolvedAsset = Image.resolveAssetSource(avatarSource);
    router.push({ pathname: '/(tabs)/settings', params: { avatarUri: resolvedAsset.uri } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Avatar</Text>
      <FlatList
        data={avatars}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectAvatar(item.source)} style={styles.avatarContainer}>
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
