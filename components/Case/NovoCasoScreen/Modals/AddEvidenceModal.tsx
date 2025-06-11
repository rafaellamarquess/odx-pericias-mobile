import React from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

type AddEvidenceModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const handleAddEvidence = () => {
    onClose(); // Close modal before navigating
    router.push('/Evidence/cadastrar');
  };

  const handleDecline = () => {
    onClose();
    router.push('/(tabs)/home'); // Updated to match your navigation structure
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <Animated.View
          style={[
            tw`bg-white rounded-[15px] p-4 w-10/12 max-w-[300px] items-center shadow-lg`,
            { transform: [{ translateY }], elevation: 10 },
          ]}
        >
          <Text style={tw`text-[16px] text-[#2C3E50] font-bold mb-4 text-center`}>
            Deseja adicionar evidências ao caso?
          </Text>
          <View style={tw`flex-row justify-between w-full`}>
            <TouchableOpacity
              style={tw`bg-[#27AE60] rounded-[8px] py-2 px-5 shadow-md`}
              onPress={handleAddEvidence}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white text-[14px] font-semibold`}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-[#E74C3C] rounded-[8px] py-2 px-5 shadow-md`}
              onPress={handleDecline}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white text-[14px] font-semibold`}>Não</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddEvidenceModal;