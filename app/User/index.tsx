import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/Header';

export default function IndexScreen() {
  const router = useRouter();

  const users = [
    { id: '1', name: 'Júlia Costa', role: 'Perita', register: 'CRO 061233' },
    { id: '2', name: 'Roberta Silva', role: 'Administradora', register: 'RG 12345678' },
    { id: '3', name: 'Fulaninha de Tal', role: 'Assistente', register: 'RG 87654321' },
  ];

  const handleEditUser = (id: string) => {
    router.push(`/User/editar?id=${id}`);
  };

  const handleDeleteUser = (id: string) => {
    console.log('Usuário deletado:', id);
    // Aqui adicionar uma chamada ao backend para deletar o usuário
  };

  return (
    <View style={tw`flex-1 bg-[#F8F9FA]`}>
      {/* HEADER */}
      <Header title="Gestão de Usuários" />


      {/* Área Principal */}
      <View style={tw`flex-1 mx-4 mt-4 mb-20 p-6`}>
        <Text style={tw`text-2xl text-[#333] mb-6 font-semibold pl-2`}>Usuários Cadastrados</Text>
        <View style={tw`flex-row justify-between mb-4 items-center`}>
          <TouchableOpacity style={tw`bg-[#4A8481] py-2 px-4 rounded-md`}
            onPress={() => router.push('/User/cadastrar')}
          >
            <Text style={tw`text-white text-sm font-semibold`}>Cadastrar Novo Usuário</Text>
          </TouchableOpacity>
        </View>

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
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity
                  style={tw`mr-2`}
                  onPress={() => handleEditUser(user.id)}
                >
                  <Image
                    source={require('../../assets/images/edit.png')}
                    style={tw`w-6 h-6`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <Ionicons name="trash-outline" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}