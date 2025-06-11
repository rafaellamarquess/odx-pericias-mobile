// components/Case/GestaoCasosScreen/FloatingActionButton.tsx
import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import tw from 'twrnc';

interface FloatingActionButtonProps {
  onPress: () => void;
  title: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={tw`bg-[#4A8481] rounded-full p-4 absolute bottom-5 right-5 ${
        Platform.OS === 'ios'
          ? 'shadow-md shadow-gray-500/50'
          : 'elevation-8'
      }`}
      onPress={onPress}
    >
      <Text style={tw`text-white text-lg font-bold`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;