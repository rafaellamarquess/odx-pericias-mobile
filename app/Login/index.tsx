import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    // Aqui poderia ter validação real
router.replace('/(tabs)/home');
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Login</Text>
      
      <TextInput
        style={tw`w-72 h-12 border border-gray-300 rounded-md mb-4 px-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={tw`w-72 h-12 border border-gray-300 rounded-md mb-6 px-4`}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}