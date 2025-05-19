import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Header: React.FC = () => {
  return (
    <View style={tw`bg-teal-500 p-4 mb-4 rounded-b-lg shadow-md`}>
      <View style={tw`bg-white p-4 rounded-lg flex-row justify-between items-center shadow-sm`}>
        <Text style={tw`text-xl font-bold text-teal-500`}>Bem vinda, Roberta Silva</Text>
        <Text style={tw`text-2xl`}>🦷</Text>
      </View>
    </View>
  );
};

export default Header;