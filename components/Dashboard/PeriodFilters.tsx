import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';

interface PeriodFiltersProps {
  mesFiltro: string;
  setMesFiltro: (value: string) => void;
  onFiltrar: () => void;
}

const PeriodFilters: React.FC<PeriodFiltersProps> = ({ mesFiltro, setMesFiltro, onFiltrar }) => {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Filtro por Mês</Text>
      <View style={styles.inputContainer}>
        <Text style={tw`text-gray-700 mb-1`}>Mês (YYYY-MM)</Text>
        <TextInput
          style={tw`border border-gray-300 rounded p-2`}
          value={mesFiltro}
          onChangeText={setMesFiltro}
          placeholder="Ex.: 2025-05"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={tw`bg-blue-600 py-2 rounded`}
        onPress={onFiltrar}
      >
        <Text style={tw`text-white text-center text-base font-semibold`}>Filtrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
});

export default PeriodFilters;
