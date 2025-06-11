import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { height, width } = Dimensions.get('window');
  const isDesktop = height > 800;
  const containerWidth = isDesktop ? '40%' : '100%';
  const containerMarginHorizontal = isDesktop ? 16 : 0;

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    router.replace('/(tabs)/home');
  };

  return (
    <View style={tw`flex-1 bg-[#364153] justify-end`}>
      <View style={tw`flex-row items-center mb-30`}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={tw`w-50 h-80 mr-10`}
        />
        <View>
          <Text style={tw`text-3xl font-bold text-[#416C72] mb-2`}>ODX</Text>
          <Text style={tw`text-2xl font-medium text-white`}>PERÍCIAS</Text>
        </View>
      </View>
      <Text style={tw`text-white text-center mb-4`}>Faça login para acessar suas perícias</Text>
      <View style={[tw`bg-white p-6`, { width: '100%', marginHorizontal: 0, borderTopLeftRadius: 25, borderTopRightRadius: 25 }]}>
        <Text style={tw`text-gray-600 text-sm mb-2`}>Email</Text>
        <TextInput
          style={tw`w-full h-12 bg-gray-100 rounded-md mb-4 px-4 border border-gray-300`}
          placeholder="Digite seu email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={tw`text-gray-600 text-sm mb-2`}>Senha</Text>
        <TextInput
          style={tw`w-full h-12 bg-gray-100 rounded-md mb-6 px-4 border border-gray-300`}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={tw`w-full bg-[#416C72] py-3 rounded-md mb-2`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-center font-medium`}>Entrar</Text>
        </TouchableOpacity>
        <Text style={tw`text-[#416C72] text-center text-sm`}>Esqueci minha senha</Text>
      </View>
    </View>
  );
}