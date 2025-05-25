import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { FiltroKey } from '@/Types/Dashboards';

const filtros: { label: string; key: FiltroKey }[] = [
  { label: 'Vítima', key: 'vitima' },
  { label: 'Sexo', key: 'sexo' },
  { label: 'Estado', key: 'estado' },
  { label: 'Lesões', key: 'lesoes' },
  { label: 'Cidade', key: 'cidade' },
];

interface FilterButtonsProps {
  filtroSelecionado: FiltroKey;
  setFiltroSelecionado: (filtro: FiltroKey) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filtroSelecionado, setFiltroSelecionado }) => {
  return (
    <View style={tw`flex-row flex-wrap mb-4`}>
      {filtros.map((filtro) => (
        <TouchableOpacity
          key={filtro.key}
          style={tw`p-2 m-1 rounded-lg ${filtroSelecionado === filtro.key ? 'bg-blue-500' : 'bg-gray-200'}`}
          onPress={() => setFiltroSelecionado(filtro.key)}
        >
          <Text style={tw`${filtroSelecionado === filtro.key ? 'text-white' : 'text-gray-700'}`}>
            {filtro.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterButtons;