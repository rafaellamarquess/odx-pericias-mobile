import React from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';

type ConfirmSaveModalProps = {
  visible: boolean;
  onClose: () => void;
};

const ConfirmSaveModal: React.FC<ConfirmSaveModalProps> = ({ visible, onClose }) => {
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

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={tw`flex-1 justify-center items-center bg-black/50`}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            tw`bg-white rounded-[15px] p-4 w-10/12 max-w-[300px] items-center shadow-lg`, 
            { transform: [{ translateY }], elevation: 10 },
          ]}
        >
          <Text style={tw`text-[16px] text-[#2C3E50] font-bold mb-4 text-center`}> 
            Caso salvo com sucesso!
          </Text>
          <TouchableOpacity
            style={tw`bg-[#27AE60] rounded-[8px] py-2 px-5 shadow-md`} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white text-[14px] font-semibold`}> 
              OK
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmSaveModal;