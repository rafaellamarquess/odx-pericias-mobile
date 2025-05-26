// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@/components/Dashboard/Header';
import NavigationBar from '@/components/Dashboard/NavigationBar';
import DashboardScreen from './DashboardScreen';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NavigationBar />
      <DashboardScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
