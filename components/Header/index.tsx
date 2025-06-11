// components/Header.tsx
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import tw from 'twrnc';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { handleLogout } = useAuth();

  return (
    <View style={[tw`flex-row items-center justify-between py-5 px-4 bg-[#679AA3] rounded-b-2xl`, { minHeight: 110 }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="chevron-back" size={36} color="white" />
      </TouchableOpacity>
      <Text style={tw`text-white text-lg font-semibold`}>{title}</Text>
      <View style={tw`flex-row items-center`}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={tw`w-8 h-8 ml-2`}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={handleLogout} style={tw`ml-4`}>
          <Icon name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;