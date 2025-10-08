import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen name="favorites" options={{ title: 'Favorite Cards' }} />
      <Stack.Screen name="private" options={{ title: 'Private Settings' }} />
      <Stack.Screen name="select-avatar" options={{ title: 'Select Avatar' }} />
    </Stack>
  );
}
