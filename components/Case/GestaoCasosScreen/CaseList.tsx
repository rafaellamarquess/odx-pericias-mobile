import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ICase } from '../../../types/Case';
import { Platform } from 'react-native';

interface CaseListProps {
  filteredCases: ICase[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedCase: Partial<ICase>) => void;
}

const handleEditCase = (id: string) => {
  router.push(`/Case/editar?id=${id}`);
};

const CaseList = ({ filteredCases, onDelete, onEdit }: CaseListProps) => {
  const router = useRouter();

  const renderItem = ({ item }: { item: ICase }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={tw`mx-5 mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-200 elevation-4`}
    >
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Referência:</Text> {item.casoReferencia}
      </Text>
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Título:</Text> {item.titulo}
      </Text>
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Status:</Text> {item.status}
      </Text>
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Responsável:</Text> {item.responsavel}
      </Text>
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Data de Criação:</Text>{' '}
        {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
      </Text>
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Cidade:</Text> {item.cidade || 'N/A'}
      </Text>
      <Text style={tw`text-gray-700 mb-1`}>
        <Text style={tw`font-bold`}>Estado:</Text> {item.estado || 'N/A'}
      </Text>
      <View style={tw`flex-row justify-end gap-4 mt-4`}>
              <TouchableOpacity
                  style={tw`mr-2`}
                  onPress={() => handleEditCase(item._id)}
                >
                  <Image
                    source={require('../../../assets/images/edit.png')}
                    style={tw`w-6 h-6`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            onDelete(item._id);
          }}
        >
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <FlatList
      data={filteredCases}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={tw`pb-20`}
      ListEmptyComponent={
        <Text style={tw`text-gray-600 text-center mt-10`}>Nenhum caso encontrado.</Text>
      }
    />
  );
};

export default CaseList;