// components/Evidence/NovaEvidenceScreen/Modals/AddImageModal.tsx
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import tw from 'twrnc';

interface AddImageModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelect: (uri: string) => void;
}

export default function AddImageModal({ visible, onClose, onImageSelect }: AddImageModalProps) {
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.errorCode) {
        Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
      } else if (response.assets && response.assets[0].uri) {
        onImageSelect(response.assets[0].uri);
        onClose();
      }
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <View style={tw`bg-white rounded-xl p-6 w-80`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>Selecionar Imagem</Text>
          <TouchableOpacity
            style={tw`bg-[#4A8481] py-3 rounded-md mb-4`}
            onPress={handleImagePick}
          >
            <Text style={tw`text-white text-center font-medium`}>Escolher da Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-gray-500 py-3 rounded-md`}
            onPress={onClose}
          >
            <Text style={tw`text-white text-center font-medium`}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}