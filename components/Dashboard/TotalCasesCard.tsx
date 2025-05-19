import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import styles from '@/styles/Dashboard';

interface TotalCasesCardProps {
  totalCasos: number;
}

const TotalCasesCard: React.FC<TotalCasesCardProps> = ({ totalCasos }) => {
  return (
    <View style={[styles.card, tw`shadow-lg`]}>
      <Text style={styles.cardTitle}>Total de Casos Registrados</Text>
      <Text style={styles.cardValue}>{totalCasos}</Text>
    </View>
  );
};

export default TotalCasesCard;