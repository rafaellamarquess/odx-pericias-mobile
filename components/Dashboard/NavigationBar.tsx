import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { navButtons } from '@/constants/Dashboard';

const NavigationBar: React.FC = () => {
  return (
    <View style={tw`flex-row justify-between px-4 mb-3`}>
      {navButtons.map((btn) => (
        <TouchableOpacity
          key={btn.label}
          style={tw`bg-white p-2 w-[18%] rounded-lg items-center shadow-sm`}
        >
          <FontAwesomeIcon
            icon={btn.icon}
            size={20}
            color="#006666"
            style={tw`mb-1`}
          />
          <Text style={tw`text-[10px] text-teal-600 text-center font-medium leading-3`}>
            {btn.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavigationBar;
