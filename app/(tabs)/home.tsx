import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import Dashboard from '../../components/Dashboard/Index';
import Header from '../../components/Header';

// Mock do useAuth
const useAuth = () => {
  const [user, setUser] = useState({
    nome: 'Roberta Silva',
    perfil: 'admin',
  });
  const [loading, setLoading] = useState(false);
  return { user, loading, error: null };
};

const handleLogout = () => {
  console.log("Logout realizado");
  router.push("/Login");
};

export default function Home() {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  const { width } = Dimensions.get('window');
  const isDesktop = width > 800;

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/Login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F8F9FA]`}>
        <Text style={tw`text-white text-lg`}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F8F9FA]`}>
        <Text style={tw`text-red-600 text-lg`}>{error}</Text>
      </View>
    );
  }

  if (!user) return null;

  const menuItems = [
    {
      title: 'Gestão de Usuários',
      icon: 'people',
      path: '/User',
      allowed: ['admin'],
    },
    {
      title: 'Novo Caso',
      icon: 'note-add',
      path: '/Case/cadastrar',
      allowed: ['admin', 'perito'],
    },
    {
      title: 'Nova Evidência',
      icon: 'science',
      path: '/Evidence/cadastrar',
      allowed: ['admin', 'perito', 'assistente'],
    },
    {
      title: 'Elaborar Laudos',
      icon: 'description',
      path: '/Laudo/cadastrar',
      allowed: ['admin', 'perito', 'assistente'],
    },
    {
      title: 'Elaborar Relatório',
      icon: 'bar-chart',
      path: '/Report/cadastrar',
      allowed: ['admin', 'perito', 'assistente'],
    },
    {
      title: 'Gestão Geral',
      icon: 'folder-open',
      path: '/GestaoGeral',
      allowed: ['admin', 'perito', 'assistente'],
    },
    {
      title: 'Dashboard',
      icon: 'visibility',
      path: '/Dashboard',
      allowed: ['admin', 'perito', 'assistente'],
    },
  ];

  return (
    <View style={tw`flex-1 bg-[#F8F9FA]`}>
      {/* HEADER */}
      <Header title={`Bem Vinda(o), ${user.nome}`} />

        {/* Menu */}
        <View style={tw`p-6 mx-4 mt-4 bg-white rounded-2xl shadow-md`}>
          <Text style={tw`text-gray-800 text-lg font-semibold mb-4 text-center`}>O que deseja fazer?</Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {menuItems
              .filter((item) => item.allowed.includes(user.perfil.toLowerCase()))
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.path as any)}
                  style={tw`w-[48%] bg-gray-50 p-4 rounded-xl mb-4 items-center border border-gray-200 shadow-sm`}
                >
                  <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={30} color="#416C72" />
                  <Text style={tw`mt-2 text-sm font-medium text-gray-800 text-center`}>{item.title}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Dashboard */}
        <View style={tw`p-6 mx-4 mt-4 bg-white rounded-2xl shadow-md`}>
          <Text style={tw`text-gray-800 text-lg font-semibold mb-4 text-center`}>Dashboard</Text>
          <Dashboard />
        </View>
    </View>
  );
}