import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import * as ImagePicker from 'react-native-image-picker';

interface AddImageModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelect: (uri: string) => void;
}

const AddImageModal: React.FC<AddImageModalProps> = ({ visible, onClose, onImageSelect }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (!result.didCancel && result.assets && result.assets[0].uri) {
      onImageSelect(result.assets[0].uri);
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <View style={tw`bg-white rounded-[15px] p-6 w-[90%] shadow-lg`}>
          <Text style={tw`text-[18px] text-[#333] font-bold mb-4 text-center`}>
            Selecionar Imagem
          </Text>
          <TouchableOpacity
            style={tw`bg-[#4A8481] rounded-[8px] py-3 mb-3 items-center`}
            onPress={pickImage}
          >
            <Text style={tw`text-white text-[16px] font-bold`}>Escolher da Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-gray-300 rounded-[8px] py-3 items-center`}
            onPress={onClose}
          >
            <Text style={tw`text-[#333] text-[16px] font-bold`}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddImageModal;