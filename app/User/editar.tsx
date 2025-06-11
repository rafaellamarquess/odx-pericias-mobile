import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useState } from 'react';

export default function EditarScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Dados simulados (substitua por chamada ao backend na integração)
  const users = [
    { id: '1', name: 'Júlia Costa', role: 'Perita', register: 'CRO 061233', email: 'julia@example.com', password: 'senha123' },
    { id: '2', name: 'Roberta Silva', role: 'Administradora', register: 'RG 12345678', email: 'roberta@example.com', password: 'senha456' },
    { id: '3', name: 'Fulaninha de Tal', role: 'Assistente', register: 'RG 87654321', email: 'fulaninha@example.com', password: 'senha789' },
  ];

  const user = users.find((u) => u.id === id);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    rg: user?.register.startsWith('RG') ? user.register.replace('RG ', '') : '',
    cro: user?.register.startsWith('CRO') ? user.register.replace('CRO ', '') : '',
    role: user?.role || '',
    email: user?.email || '',
    password: user?.password || '',
  });

  const handleSaveChanges = () => {
    // Simulação de atualização (futuro backend)
    console.log('Usuário atualizado:', { id, ...formData });
    router.push('/User'); 
  };

  return (
    <View style={tw`flex-1 bg-[#F8F9FA]`}>
      <View style={tw`flex-row items-center justify-between p-4 bg-[#679AA3] rounded-b-2xl`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={36} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-semibold`}>Gestão de Usuários</Text>
        <Image
          source={require('../../assets/images/Logo-odx.png')}
          style={tw`w-8 h-8 ml-2`}
          resizeMode="contain"
        />
      </View>


      <View style={tw`flex-1 mx-4 mt-4 mb-20 p-6`}>
        <View style={tw`flex-row justify-between mt-4`}>
              <TouchableOpacity
                style={tw`bg-[#679AA3] py-2 px-4 rounded-md flex-1 mx-2`}
                onPress={() => router.push('/User')}
              >
                <Text style={tw`text-white text-sm font-semibold text-center`}>Início</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-[#679AA3] py-2 px-4 rounded-md flex-1 mx-2`}
                onPress={() => router.push('/User/editar')}
              >
                <Text style={tw`text-white text-sm font-semibold text-center`}>Editar Usuário</Text>
              </TouchableOpacity>
            </View>
        <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
          <Text style={tw`text-xl text-[#333] mb-4 font-semibold`}>Editar Usuário</Text>
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
            style={tw`bg-[#4A8481] py-2 px-4 rounded-md items-center mb-4`}
            // onPress={handleSaveChanges}
            onPress={() => router.push('/User')}
            >
            <Text style={tw`text-white text-sm font-semibold`}>Salvar Alterações</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}