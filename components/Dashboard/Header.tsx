import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

const Header: React.FC = () => {
  return (
    <View style={tw`bg-[#679AA3] p-4 mb-4 rounded-b-lg shadow-md`}>
      <View style={tw`bg-[#73A5AE] p-4 rounded-lg flex-row justify-between items-center shadow-sm`}>
        <Text style={tw`text-xl font-bold text-[#FFFFFF]`}>Bem vinda, Roberta Silva</Text>
       
      </View>
    </View>
  );
};

export default Header;