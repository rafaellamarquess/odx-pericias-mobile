import { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, View, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar/SearchBar';
import StatusFilter from '@/components/StatusFilter/StatusFilter';
import EvidenceList from '@/components/Evidence/GestaoEvidenciasScreen/EvidenceList';
import FloatingActionButton from '@/components/Evidence/GestaoEvidenciasScreen/FloatingActionButton';
import { IEvidence } from '@/types/Evidence';
import { IVitima } from '@/types/Vitima';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const EvidenceManagementScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const statusOptions = ['Todos', 'Identificada', 'Não Identificada'];
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock data
  const [evidences, setEvidences] = useState<(IEvidence & { vitima?: IVitima })[]>([
    {
      _id: '1',
      casoReferencia: 'CASO-001',
      tipo: 'texto',
      categoria: 'Relatório Dental',
      coletadoPor: 'João Silva',
      texto: 'Análise da arcada dentária mostra fratura no maxilar.',
      vitima: {
        _id: 'v1',
        nome: 'João Pedro',
        identificada: true,
        sexo: 'masculino',
        estadoCorpo: 'inteiro',
      },
      vitimaId: 'v1',
      dataUpload: '2025-06-10',
    },
    {
      _id: '2',
      casoReferencia: 'CASO-002',
      tipo: 'imagem',
      categoria: 'Radiografia',
      coletadoPor: 'Maria Oliveira',
      imagem: '../assets/images/radiografia.png',
      vitima: {
        _id: 'v2',
        nome: 'Não Identificada',
        identificada: false,
        sexo: 'feminino',
        estadoCorpo: 'fragmentado',
      },
      vitimaId: 'v2',
      dataUpload: '2025-06-10',
    },
  ]);

  const [vitimas, setVitimas] = useState<IVitima[]>([
    {
      _id: 'v1',
      nome: 'João Doe',
      dataNascimento: '1990-01-01',
      idadeAproximada: 35,
      nacionalidade: 'Brasileira',
      cidade: 'São Paulo',
      sexo: 'masculino',
      estadoCorpo: 'inteiro',
      lesoes: 'Fratura no maxilar',
      identificada: true,
      caso: 'CASO-001',
    },
    {
      _id: 'v2',
      nome: 'Não Identificada',
      idadeAproximada: 30,
      nacionalidade: 'Desconhecida',
      cidade: 'Rio de Janeiro',
      sexo: 'feminino',
      estadoCorpo: 'fragmentado',
      lesoes: 'Lesões no crânio',
      identificada: false,
      caso: 'CASO-002',
    },
  ]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

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
    Alert.alert('Confirmar Exclusão', 'Você deseja realmente excluir esta evidência?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setEvidences(evidences.filter((e) => e._id !== id));
          setSuccess('Evidência deletada com sucesso.');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setActiveEvidenceId(null);
        },
      },
    ]);
  };

  const handleEdit = (id: string) => {
    router.push({ pathname: '/Evidence/editar', params: { id } });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setActiveEvidenceId(null);
  };

  const onLongPress = (id: string) => {
    setActiveEvidenceId(id === activeEvidenceId ? null : id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const onOutsidePress = () => {
    setActiveEvidenceId(null);
  };

  const filteredEvidences = useMemo(() => {
    let result = [...evidences];

    if (selectedStatus && selectedStatus !== 'Todos') {
      const isIdentificada = selectedStatus === 'Identificada';
      result = result.filter((evidence) => evidence.vitima?.identificada === isIdentificada);
    }

    if (searchText.trim()) {
      result = result.filter(
        (evidence) =>
          evidence.categoria.toLowerCase().includes(searchText.toLowerCase()) ||
          evidence.casoReferencia.toLowerCase().includes(searchText.toLowerCase()) ||
          evidence.texto?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return result;
  }, [evidences, selectedStatus, searchText]);

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

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <TouchableWithoutFeedback onPress={onOutsidePress}>
        <View style={tw`flex-1`}>
          <Header title="GESTÃO DE EVIDÊNCIAS" />
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <StatusFilter
            statusOptions={statusOptions}
            selectedStatus={selectedStatus}
            toggleStatusFilter={toggleStatusFilter}
          />
          {error && <Text style={tw`text-red-500 text-sm mx-5 mb-4 text-center`}>{error}</Text>}
          {success && <Text style={tw`text-green-600 text-sm mx-5 mb-4 text-center`}>{success}</Text>}
          <EvidenceList
            filteredEvidences={filteredEvidences}
            onDelete={handleDelete}
            onEdit={handleEdit}
            failedImages={new Set<string>()}
            setFailedImages={() => {}}
          />
        </View>
      </TouchableWithoutFeedback>
      <FloatingActionButton />
    </SafeAreaView>
  );
};

export default EvidenceManagementScreen;