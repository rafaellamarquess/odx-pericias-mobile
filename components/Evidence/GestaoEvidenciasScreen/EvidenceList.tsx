import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { IEvidence } from '@/types/Evidence';
import { theme } from '@/constants/theme';

interface Props {
  filteredEvidences: (IEvidence & {
    vitima?: { _id: string; nome?: string; identificada?: boolean; sexo?: string; estadoCorpo?: string };
  })[];
  failedImages: Set<string>;
  setFailedImages: (images: Set<string>) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const EvidenceList = ({ filteredEvidences, failedImages, setFailedImages, onDelete, onEdit }: Props) => {
  const renderItem = ({
    item,
  }: {
    item: IEvidence & {
      vitima?: { _id: string; nome?: string; identificada?: boolean; sexo?: string; estadoCorpo?: string };
    };
  }) => (
    <View style={tw`bg-white p-4 rounded-xl mb-2 shadow-md border border-gray-200 mx-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-1`}>
          {item.tipo === 'imagem' && item.imagem && !failedImages.has(item._id) ? (
            <Image
              source={typeof item.imagem === 'string' ? { uri: item.imagem } : item.imagem} // Handle both URI and require
              style={tw`w-full h-32 rounded-xl mb-2`}
              resizeMode="cover"
              onError={() => setFailedImages(new Set(failedImages).add(item._id))}
            />
          ) : item.tipo === 'imagem' ? (
            <Text style={tw`text-gray-600 text-sm mb-2`}>Imagem não disponível</Text>
          ) : null}
          <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold`}>{item.categoria}</Text>
          <Text style={tw`text-gray-600 text-sm`}>Caso: {item.casoReferencia}</Text>
          <Text style={tw`text-gray-600 text-sm`}>Tipo: {item.tipo}</Text>
          <Text style={tw`text-gray-600 text-sm`}>Coletado por: {item.coletadoPor}</Text>
          {item.texto && <Text style={tw`text-gray-600 text-sm`}>Texto: {item.texto.substring(0, 50)}...</Text>}
          <Text style={tw`text-gray-600 text-sm`}>Upload: {new Date(item.dataUpload).toLocaleDateString()}</Text>
          <Text style={tw`text-gray-600 text-sm`}>Vítima: {item.vitima?.nome || 'Não identificada'}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity style={tw`p-2`} onPress={() => onEdit(item._id)}>
            <Image
              source={require('@/assets/images/edit.png')}
              style={tw`w-6 h-6`}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={tw`p-2`} onPress={() => onDelete(item._id)}>
            <Ionicons name="trash" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredEvidences}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={
        <Text style={tw`text-center text-gray-600 mt-4`}>Nenhuma evidência encontrada.</Text>
      }
      contentContainerStyle={tw`pb-20`}
    />
  );
};

export default EvidenceList;