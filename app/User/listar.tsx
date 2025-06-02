import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function ListarScreen() {
  const router = useRouter();

  const users = [
    { id: '1', name: 'Júlia Costa', role: 'Perita', register: 'CRO 061233' },
    { id: '2', name: 'Roberta Silva', role: 'Administradora', register: 'RG 12345678' },
    { id: '3', name: 'Fulaninha de Tal', role: 'Assistente', register: 'RG 87654321' },
  ];

  return (
    <View style={tw`flex-1 bg-[#F8F9FA]`}>
      <View style={tw`flex-row items-center justify-between p-4 bg-[#679AA3] rounded-b-2xl`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={36} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-semibold`}>Lista de Usuários</Text>
        <Image
          source={require('../../assets/images/logo.png')}
          style={tw`w-8 h-8 ml-2`}
          resizeMode="contain"
        />
      </View>

      <View style={tw`flex-1 mx-4 mt-4 mb-20 p-6`}>
        <Text style={tw`text-2xl text-[#333] mb-6 font-semibold pl-2`}>Usuários Cadastrados</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map((user) => (
            <View
              key={user.id}
              style={tw`w-full p-4 border border-gray-300 rounded-md mb-4 flex-row items-center shadow-sm bg-gray-50`}
            >
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-semibold text-[#416C72]`}>{user.name}</Text>
                <Text style={tw`text-gray-600 text-sm`}>{user.role}</Text>
              </View>
              <View style={tw`w-px h-10 bg-gray-300 mx-4`} />
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-gray-600 text-sm`}>{user.register}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}