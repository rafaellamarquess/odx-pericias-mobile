import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useState } from 'react';

export default function CadastroScreen() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    rg: '',
    cro: '',
    role: '',
    email: '',
    password: '',
  });

  const handleAddUser = () => {
    console.log('Usuário adicionado:', formData);
    setShowForm(false);
  };

  const handleBackToUsers = () => {
    setShowForm(true);
    router.push('/User/listar'); // Redireciona para a tela ListarScreen
    setFormData({ name: '', rg: '', cro: '', role: '', email: '', password: '' });
  };

  return (
    <View style={tw`flex-1 bg-[#F8F9FA]`}>
      <View style={tw`flex-row items-center justify-between p-4 bg-[#679AA3] rounded-b-2xl`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={36} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-semibold`}>Gestão de Usuários</Text>
        <Image
          source={require('../../assets/images/logo.png')}
          style={tw`w-8 h-8 ml-2`}
          resizeMode="contain"
        />
      </View>

      <View style={tw`flex-1 mx-4 mt-4 mb-20 p-6`}>
        {showForm ? (
          <View style={tw`mt-6 p-4 bg-white rounded-lg shadow-md`}>
            <Text style={tw`text-xl text-[#333] mb-4 font-semibold`}>Informações do Usuário</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded-md`}
              placeholder="Nome"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded-md`}
              placeholder="Registro Geral (RG)"
              value={formData.rg}
              onChangeText={(text) => setFormData({ ...formData, rg: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded-md`}
              placeholder="CRO (Somente para perito)"
              value={formData.cro}
              onChangeText={(text) => setFormData({ ...formData, cro: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded-md`}
              placeholder="Função (ex: perito, adm e etc)"
              value={formData.role}
              onChangeText={(text) => setFormData({ ...formData, role: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded-md`}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded-md`}
              placeholder="Senha"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
            <TouchableOpacity
              style={tw`bg-[#4A8481] py-2 px-4 rounded-md items-center`}
              onPress={handleAddUser}
            >
              <Text style={tw`text-white text-sm font-semibold`}>Adicionar Usuário</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`flex-1 justify-center items-center p-6`}>
            <View style={tw`bg-white p-4 rounded-lg shadow-md items-center`}>
              <Text style={tw`text-lg text-[#4A8481] mb-2 font-semibold`}>Finalizado!</Text>
              <Text style={tw`text-gray-600 text-center`}>
                O usuário ({formData.name || 'nome usuário'}) foi adicionado com sucesso em nosso sistema!
              </Text>
            </View>
            <TouchableOpacity
              style={tw`mt-6 bg-[#4A8481] py-2 px-4 rounded-md`}
              onPress={handleBackToUsers}
            >
              <Text style={tw`text-white text-sm font-semibold`}>Visualizar Usuários</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}