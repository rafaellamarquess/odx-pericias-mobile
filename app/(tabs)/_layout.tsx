import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw`bg-white shadow-md border-t border-gray-200`,
        tabBarActiveTintColor: '#416C72',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}