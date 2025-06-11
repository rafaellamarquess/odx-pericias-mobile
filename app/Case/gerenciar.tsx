import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatusFilter from '../../components/StatusFilter/StatusFilter';
import CaseList from '../../components/Case/GestaoCasosScreen/CaseList';
import FloatingActionButton from '../../components/Case/GestaoCasosScreen/FloatingActionButton';
import { ICase } from '../../types/Case';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const GestaoCasosScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredCases, setFilteredCases] = useState<ICase[]>([]);
  const statusOptions = ['Em andamento', 'Arquivado', 'Finalizado'];

  const [cases, setCases] = useState<ICase[]>([
    {
      _id: '1',
      titulo: 'Caso Exemplo 1',
      casoReferencia: 'CASO-001',
      status: 'Em andamento',
      dataCriacao: '2025-05-19',
      responsavel: 'João Silva',
      descricao: 'Descrição do caso exemplo 1.',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    {
      _id: '2',
      titulo: 'Caso Exemplo 2',
      casoReferencia: 'CASO-002',
      status: 'Finalizado',
      dataCriacao: '2025-05-19',
      responsavel: 'Maria Oliveira',
      descricao: 'Descrição do caso exemplo 2.',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
    },
    {
      _id: '3',
      titulo: 'Caso Exemplo 3',
      casoReferencia: 'CASO-003',
      status: 'Em andamento',
      dataCriacao: '2025-05-19',
      responsavel: 'Carlos Souza',
      descricao: 'Descrição do caso exemplo 3.',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
  ]);

  useEffect(() => {
    let filtered = [...cases];

    if (selectedStatus) {
      filtered = filtered.filter((caseItem) => caseItem.status === selectedStatus);
    }

    if (searchText.trim()) {
      filtered = filtered.filter(
        (caseItem) =>
          caseItem.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
          caseItem.casoReferencia.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCases(filtered);
  }, [cases, selectedStatus, searchText]);

  const toggleStatusFilter = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Confirmar Exclusão', 'Você deseja realmente excluir este caso?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setCases(cases.filter((c) => c._id !== id));
          setFilteredCases(cases.filter((c) => c._id !== id));
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        },
      },
    ]);
  };

  const handleEdit = (id: string) => {
    router.push(`/Case/editar`);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (authLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <Text style={tw`text-gray-600 mt-4`}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (authError) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <Text style={tw`text-red-500 text-center px-5`}>Erro de autenticação: {authError}</Text>
      </SafeAreaView>
    );
  }
  //DESCOMENTAR QUANDO IMPLEMENTAR AUTH
  // if (!user || !['admin', 'perito', 'assistente'].includes(user.perfil.toLowerCase())) {
  //   router.push('/(tabs)/home');
  //   return null;
  // }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <View style={tw`flex-1`}>
        <Header title="Gestão de Casos" />

        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <StatusFilter
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          toggleStatusFilter={toggleStatusFilter}
        />
        <CaseList
          filteredCases={filteredCases}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </View>
      <FloatingActionButton />
    </SafeAreaView>
  );
};

export default GestaoCasosScreen;