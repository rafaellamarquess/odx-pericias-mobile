import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface TotalCasesCardProps {
  totalCasos: number;
}

const TotalCasesCard: React.FC<TotalCasesCardProps> = ({ totalCasos }) => {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
      <Text style={tw`text-lg font-bold`}>Total de Casos</Text>
      <Text style={tw`text-2xl text-blue-500`}>{totalCasos}</Text>
    </View>
  );
};

export default TotalCasesCard;