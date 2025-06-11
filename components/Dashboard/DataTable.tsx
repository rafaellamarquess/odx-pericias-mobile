import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { DadosItem } from '@/types/Dashboards';

interface DataTableProps {
  dadosAtuais: DadosItem[];
}

const DataTable: React.FC<DataTableProps> = ({ dadosAtuais }) => {
  if (!dadosAtuais || dadosAtuais.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
      {dadosAtuais.map((item, index) => (
        <View key={index} style={tw`flex-row justify-between py-2 border-b border-gray-200`}>
          <Text style={tw`text-gray-700 w-1/2`}>{item.categoria}</Text>
          <Text style={tw`text-gray-700 w-1/2 text-right`}>{item.quantidade}</Text>
        </View>
      ))}
    </View>
  );
};

export default DataTable;
