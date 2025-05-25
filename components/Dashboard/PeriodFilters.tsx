import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface PeriodFiltersProps {
  mesFiltro: string;
  setMesFiltro: (mes: string) => void;
  dataFiltro: string;
  setDataFiltro: (data: string) => void;
}

const PeriodFilters: React.FC<PeriodFiltersProps> = ({ mesFiltro, setMesFiltro, dataFiltro, setDataFiltro }) => {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Filtros de Período</Text>
      <View style={tw`flex-row justify-between mb-2`}>
        <TextInput
          style={tw`border border-gray-300 p-2 rounded-lg flex-1 mr-2`}
          placeholder="Mês (YYYY-MM)"
          value={mesFiltro}
          onChangeText={setMesFiltro}
        />
        <TextInput
          style={tw`border border-gray-300 p-2 rounded-lg flex-1`}
          placeholder="Data (YYYY-MM-DD)"
          value={dataFiltro}
          onChangeText={setDataFiltro}
        />
      </View>
      <TouchableOpacity
        style={tw`bg-blue-500 p-2 rounded-lg`}
        onPress={() => {
          setMesFiltro(mesFiltro);
          setDataFiltro(dataFiltro);
        }}
      >
        <Text style={tw`text-white text-center`}>Aplicar Filtros</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PeriodFilters;