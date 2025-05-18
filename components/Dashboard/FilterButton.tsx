import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { FiltroKey } from '@/Types/Dashboards';
import { filtros } from '@/constants/Dashboard';

interface FilterButtonsProps {
  filtroSelecionado: FiltroKey;
  setFiltroSelecionado: (key: FiltroKey) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filtroSelecionado, setFiltroSelecionado }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={tw`mb-4 -mx-4 px-4`}
      contentContainerStyle={tw`pr-8`}
    >
      {filtros.map((filtro) => (
        <TouchableOpacity
          key={filtro.key}
          onPress={() => setFiltroSelecionado(filtro.key as FiltroKey)}
          style={tw`px-4 py-2 rounded-md mr-2 ${
            filtroSelecionado === filtro.key 
              ? 'bg-blue-600 border border-blue-600' 
              : 'bg-gray-200 border border-gray-300'
          }`}
        >
          <Text style={tw`text-sm ${
            filtroSelecionado === filtro.key ? 'text-white' : 'text-gray-700'
          }`}>
            {filtro.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterButtons;