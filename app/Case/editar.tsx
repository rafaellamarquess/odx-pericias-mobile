import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { ICase } from '@/types/Case';
import { theme } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const EditarCasoScreen = () => {
  const router = useRouter();
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const { user, loading: authLoading, error: authError } = useAuth();

  // Mock data
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
      status: 'Arquivado',
      dataCriacao: '2025-05-25',
      responsavel: 'Carlos Souza',
      descricao: 'Descrição do caso exemplo 3.',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
  ]);

  const [caseData, setCaseData] = useState<Partial<ICase>>({
    titulo: '',
    descricao: '',
    status: 'Em andamento',
    cidade: '',
    estado: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusOptions = ['Em andamento', 'Arquivado', 'Finalizado'];

  useEffect(() => {
    if (caseId) {
      const foundCase = cases.find((c) => c._id === caseId);
      if (foundCase) {
        setCaseData({
          titulo: foundCase.titulo,
          descricao: foundCase.descricao,
          status: foundCase.status,
          cidade: foundCase.cidade,
          estado: foundCase.estado,
        });
        setLoading(false);
      } else {
        setError('Caso não encontrado.');
        setLoading(false);
      }
    } else {
      setError('ID do caso inválido.');
      setLoading(false);
    }
  }, [caseId]);

  const handleUpdate = () => {
    if (!caseData.titulo?.trim()) {
      Alert.alert('Erro', 'O título é obrigatório.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const updatedCase = {
      ...cases.find((c) => c._id === caseId),
      ...caseData,
      _id: caseId,
    } as ICase;

    setCases(cases.map((c) => (c._id === caseId ? updatedCase : c)));
    Alert.alert('Sucesso', 'Caso atualizado com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          router.back();
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        },
      },
    ]);
  };

  if (authLoading || loading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-gray-600 mt-4`}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (authError || error) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-[${theme.colors.error}] text-center px-5`}>{authError || error}</Text>
      </SafeAreaView>
    );
  }

  // Uncomment when auth is implemented
  // if (!user || !['admin', 'perito', 'assistente'].includes(user.perfil.toLowerCase())) {
  //   return (
  //     <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
  //       <Text style={tw`text-[${theme.colors.error}] text-center px-5`}>Acesso não autorizado.</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={tw`flex-1 bg-[${theme.colors.background}]`}>
      <Header title="EDITAR CASO" />
      <View style={tw`flex-1 mx-4 mt-4`}>
        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Título</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
          value={caseData.titulo}
          onChangeText={(text) => setCaseData({ ...caseData, titulo: text })}
          placeholder="Digite o título do caso"
        />

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Descrição</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4 h-24`}
          value={caseData.descricao}
          onChangeText={(text) => setCaseData({ ...caseData, descricao: text })}
          placeholder="Digite a descrição do caso"
          multiline
        />

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Status</Text>
        <View style={tw`bg-white rounded-xl border border-gray-200 mb-4`}>
          <Picker
            selectedValue={caseData.status}
            onValueChange={(value) => setCaseData({ ...caseData, status: value })}
            style={tw`text-[${theme.colors.text}] text-sm`}
          >
            {statusOptions.map((status) => (
              <Picker.Item key={status} label={status} value={status} />
            ))}
          </Picker>
        </View>

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Cidade</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
          value={caseData.cidade}
          onChangeText={(text) => setCaseData({ ...caseData, cidade: text })}
          placeholder="Digite a cidade"
        />

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Estado</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
          value={caseData.estado}
          onChangeText={(text) => setCaseData({ ...caseData, estado: text })}
          placeholder="Digite o estado (ex.: SP)"
          maxLength={2}
        />

        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw`bg-gray-400 py-3 px-6 rounded-xl flex-1 mr-2`}
            onPress={() => router.back()}
          >
            <Text style={tw`text-white text-center font-semibold`}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-[${theme.colors.primary}] py-3 px-6 rounded-xl flex-1`}
            onPress={handleUpdate}
          >
            <Text style={tw`text-white text-center font-semibold`}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditarCasoScreen;