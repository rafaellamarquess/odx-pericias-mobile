import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title = 'Adicionar um Novo Caso' }) => {
  return (
    <View
      style={tw`bg-[#679AA3] flex-row items-center justify-between px-5 py-2.5 mb-2.5 rounded-b-2 shadow-lg shadow-black shadow-opacity-30 shadow-offset-0-1 shadow-radius-4`}
    >
      <Text style={tw`text-lg font-bold text-white text-center flex-1`}>{title}</Text>
    </View>
  );
};

export default Header;