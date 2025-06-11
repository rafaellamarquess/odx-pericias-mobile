import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

const FormContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View
      style={tw`bg-white rounded-[15px] p-4 mx-5 my-3 shadow-lg`}
    >
      {children}
    </View>
  );
};

export default FormContainer;