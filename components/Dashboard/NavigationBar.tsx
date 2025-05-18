import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { navButtons } from '@/constants/Dashboard';

const NavigationBar: React.FC = () => {
  return (
    <View style={tw`flex-row flex-wrap justify-center gap-2 mb-4 px-2`}>
      {navButtons.map((btn) => (
        <TouchableOpacity 
          key={btn.label} 
          style={tw`bg-white p-3 rounded-md shadow-md w-[45%] items-center`}
        >
          <Text style={tw`text-2xl mb-1`}>{btn.icon}</Text>
          <Text style={tw`text-xs text-teal-500 text-center font-medium`}>
            {btn.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavigationBar;