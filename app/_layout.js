import { Stack, SplashScreen } from 'expo-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '@/api/pokemon';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="cards/[id]"
          options={{
            title: 'Card Details',
            headerShown: true,
          }}
        />
      </Stack>
    </Provider>
  );
}
