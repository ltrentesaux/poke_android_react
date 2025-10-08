export const avatarImages = {
  avatar1: require('../assets/images/avatar/10f13510774061.560eadfde5b61.png'),
  avatar2: require('../assets/images/avatar/322790.jpg'),
  avatar3: require('../assets/images/avatar/f495741d749f713e849e305c60df60e5.jpg'),
  avatar4: require('../assets/images/avatar/images.png'),
};

export const avatarArray = Object.keys(avatarImages).map(key => ({
    id: key,
    source: avatarImages[key]
}));
