import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface ConfirmSaveModalProps {
  visible: boolean;
  onClose: () => void;
}

const ConfirmSaveModal: React.FC<ConfirmSaveModalProps> = ({ visible, onClose }) => {
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
            Evidência Registrada!
          </Text>
          <Text style={tw`text-[14px] text-[#555] mb-6 text-center`}>
            A evidência foi salva com sucesso. Deseja continuar?
          </Text>
          <TouchableOpacity
            style={tw`bg-[#4A8481] rounded-[8px] py-3 items-center`}
            onPress={onClose}
          >
            <Text style={tw`text-white text-[16px] font-bold`}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmSaveModal;