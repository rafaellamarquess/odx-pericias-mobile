import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Profile() {
  return (
    <View style={tw`flex-1 bg-[#679AA3] justify-center items-center`}>
      <Text style={tw`text-white text-2xl font-bold`}>Tela de Perfil</Text>
      <Text style={tw`text-white text-lg mt-2`}>Em desenvolvimento</Text>
    </View>
  );
}