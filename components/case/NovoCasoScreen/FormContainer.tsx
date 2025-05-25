import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

const FormContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View
      style={tw`bg-white rounded-[15px] p-4 mx-5 my-3 shadow-lg`} // Adiciona sombra e arredondamento
      // elevation: 5 adiciona sombra no Android
      // shadow-lg adiciona sombra no iOS
    >
      {children}
    </View>
  );
};

export default FormContainer;