import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

// Define a tipagem para as props
type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <View style={tw`bg-white rounded-[10px] p-[15px] my-5 mx-5`}>
      {children}
    </View>
  );
};

export default FormContainer;