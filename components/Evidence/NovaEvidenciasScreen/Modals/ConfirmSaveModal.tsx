// components/Evidence/NovaEvidenceScreen/Modals/ConfirmSaveModal.tsx
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface ConfirmSaveModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ConfirmSaveModal({ visible, onClose }: ConfirmSaveModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <View style={tw`bg-white rounded-xl p-6 w-80`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>Evidência Cadastrada</Text>
          <Text style={tw`text-gray-600 mb-6`}>A evidência foi registrada com sucesso!</Text>
          <TouchableOpacity
            style={tw`bg-[#4A8481] py-3 rounded-md`}
            onPress={onClose}
          >
            <Text style={tw`text-white text-center font-medium`}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}