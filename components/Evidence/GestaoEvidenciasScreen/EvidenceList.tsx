import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TouchableWithoutFeedback,
  } from 'react-native';
  import tw from 'twrnc';
  import { Ionicons } from '@expo/vector-icons';
  import { useRouter } from 'expo-router';
  import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
  import * as Haptics from 'expo-haptics';
  import { IEvidence, } from '../../../types/Evidence';
  import { IVitima } from '../../../types/Vitima';
  
  interface EvidenceListProps {
    filteredEvidences: (IEvidence & { vitima?: IVitima })[];
    onDelete: (id: string) => void;
    activeEvidenceId: string | null;
    onLongPress: (id: string) => void;
    onOutsidePress: () => void;
    failedImages: Set<string>;
    setFailedImages: (set: Set<string>) => void;
  }
  
  const EvidenceList = ({
    filteredEvidences,
    onDelete,
    activeEvidenceId,
    onLongPress,
    onOutsidePress,
    failedImages,
    setFailedImages,
  }: EvidenceListProps) => {
    const router = useRouter();
  
    const renderItem = ({ item }: { item: IEvidence & { vitima?: IVitima } }) => (
      <TouchableWithoutFeedback onPress={onOutsidePress}>
        <TouchableWithoutFeedback
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onLongPress(item._id);
          }}
        >      </TouchableWithoutFeedback>

          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={tw`mx-5 mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-200 elevation-4`}
          >
          {item.tipo?.toLowerCase() === 'imagem' && item.imagem && !failedImages.has(item._id) && (
            <Image
              source={{ uri: item.imagem }}
              style={tw`w-full h-48 rounded-md mb-4`}
              resizeMode="cover"
              onError={() => setFailedImages(new Set(failedImages).add(item._id))}
            />
          )}
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-bold`}>Caso:</Text>{' '}
            {typeof item.caso === 'string' ? item.caso : item.caso?.casoReferencia || 'N/A'}
          </Text>
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-bold`}>Categoria:</Text> {item.categoria || 'N/A'}
          </Text>
          {item.tipo?.toLowerCase() === 'texto' && (
            <Text style={tw`text-gray-700 mb-1`}>
              <Text style={tw`font-bold`}>Texto:</Text>{' '}
              {item.texto ? item.texto.substring(0, 100) + '...' : 'N/A'}
            </Text>
          )}
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-bold`}>Coletado por:</Text> {item.coletadoPor || 'N/A'}
          </Text>
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-bold`}>Data de Upload:</Text>{' '}
            {item.dataUpload ? new Date(item.dataUpload).toLocaleDateString('pt-BR') : 'N/A'}
          </Text>
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-bold`}>Vítima:</Text>{' '}
            {item.vitima?.nome || 'Não identificada'}
          </Text>
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-bold`}>Status:</Text>{' '}
            {item.vitima?.identificada ? 'Identificada' : 'Não Identificada'}
          </Text>
          {activeEvidenceId === item._id && (
            <View style={tw`flex-row justify-end gap-4 mt-4`}>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push({
                    pathname: '/Evidence/editar',
                    params: { evidenceId: item._id },
                  });
                }}
              >
                <Ionicons name="pencil" size={24} color="#4A8481" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onDelete(item._id);
                }}
              >
                <Ionicons name="trash" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
            
          )}
        </Animated.View>
        </TouchableWithoutFeedback>

    );
  
    return (
      <FlatList
        data={filteredEvidences}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={tw`pb-20`}
        ListEmptyComponent={
          <Text style={tw`text-gray-600 text-center mt-10`}>
            Nenhuma evidência encontrada.
          </Text>
        }
      />
    );
  };
  
  export default EvidenceList;