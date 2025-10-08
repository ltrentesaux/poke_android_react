import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
      }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
       <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
