// src/components/Dashboard/PeriodFilters.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import tw from 'twrnc';

interface PeriodFiltersProps {
  mesFiltro: string;
  setMesFiltro: (value: string) => void;
  dataFiltro: string;
  setDataFiltro: (value: string) => void;
}

const PeriodFilters: React.FC<PeriodFiltersProps> = ({ mesFiltro, setMesFiltro, dataFiltro, setDataFiltro }) => {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Filtros de Período</Text>
      <View style={styles.inputContainer}>
        <Text style={tw`text-gray-700 mb-1`}>Mês (YYYY-MM)</Text>
        <TextInput
          style={tw`border border-gray-300 rounded p-2`}
          value={mesFiltro}
          onChangeText={setMesFiltro}
          placeholder="Ex.: 2025-05"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={tw`text-gray-700 mb-1`}>Data (YYYY-MM-DD)</Text>
        <TextInput
          style={tw`border border-gray-300 rounded p-2`}
          value={dataFiltro}
          onChangeText={setDataFiltro}
          placeholder="Ex.: 2025-05-01"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
});

export default PeriodFilters;