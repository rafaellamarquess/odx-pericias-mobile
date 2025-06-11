import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import LaudoForm from '@/components/Laudo/GerarLaudoScreen/LaudoForm';
import { IVitima } from '@/types/Vitima';
import { ILaudo } from '@/types/Laudo';

interface FormData {
  vitimaId: string;
  dadosAntemortem: string;
  dadosPostmortem: string;
}

const GerarLaudoScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [vitimas, setVitimas] = useState<IVitima[]>([]);
  const [formData, setFormData] = useState<FormData>({
    vitimaId: '',
    dadosAntemortem: '',
    dadosPostmortem: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock victims
  useEffect(() => {
    const mockVitimas: IVitima[] = [
      {
        _id: 'v1',
        nome: 'João Doe',
        sexo: 'masculino',
        estadoCorpo: 'inteiro',
        identificada: true,
        idadeAproximada: 35,
        nacionalidade: 'Brasileira',
        cidade: 'São Paulo',
        lesoes: 'Fratura no maxilar',
        caso: 'CASO-001',
      },
      {
        _id: 'v2',
        nome: 'Não Identificada',
        sexo: 'feminino',
        estadoCorpo: 'fragmentado',
        identificada: false,
        idadeAproximada: 30,
        nacionalidade: 'Desconhecida',
        cidade: 'Rio de Janeiro',
        lesoes: 'Lesões no crânio',
        caso: 'CASO-002',
      },
    ];
    setVitimas(mockVitimas);
  }, []);

  // Clear messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const isFormValid = !!(formData.vitimaId && formData.dadosAntemortem && formData.dadosPostmortem);

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API response
      const mockResponse: { msg: string; laudo: ILaudo; pdf: string } = {
        msg: 'Laudo criado com sucesso.',
        laudo: {
          _id: 'laudo-1',
          vitima: formData.vitimaId,
          perito: user?._id || 'perito-1',
          caso: vitimas.find((v) => v._id === formData.vitimaId)?.caso || 'CASO-001',
          evidencias: ['ev1', 'ev2'],
          dadosAntemortem: formData.dadosAntemortem,
          dadosPostmortem: formData.dadosPostmortem,
          analiseLesoes: 'Lesões consistentes com trauma contuso.',
          conclusao: 'Identificação confirmada por arcada dentária.',
          dataCriacao: new Date().toISOString(),
          assinaturaDigital: 'mock-signature',
        },
        pdf: 'data:application/pdf;base64,' + btoa('Mock PDF content'),
      };

      // Save PDF
      const pdfBase64 = mockResponse.pdf.replace('data:application/pdf;base64,', '');
      const fileUri = `${FileSystem.documentDirectory}laudo-${mockResponse.laudo._id}-${new Date().toISOString().slice(0, 10)}.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share or notify
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Sucesso', `PDF salvo em ${fileUri}`);
      }

      setSuccess('Laudo criado e PDF gerado com sucesso.');
      setFormData({ vitimaId: '', dadosAntemortem: '', dadosPostmortem: '' });
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (err) {
      setError('Erro ao criar o laudo.');
      console.error(err);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <ActivityIndicator size="large" color="#4A8481" />
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

  // DESCOMENTAR QUANDO FOR IMPLEMENTADO O CONTEXTO DE AUTENTICAÇÃO
  // if (!user || !['Admin', 'Perito'].includes(user.perfil)) {
  //   router.push('/(tabs)/home');
  //   return null;
  // }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <View style={tw`flex-1`}>
        <Header title="Novo Laudo" />
        {error && <Text style={tw`text-red-500 text-sm mx-5 mb-4 text-center`}>{error}</Text>}
        {success && <Text style={tw`text-green-600 text-sm mx-5 mb-4 text-center`}>{success}</Text>}
        {isLoading && (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#4A8481" />
            <Text style={tw`text-gray-600 mt-4`}>Criando laudo...</Text>
          </View>
        )}
        {!isLoading && (
          <LaudoForm
            formData={formData}
            setFormData={setFormData}
            vitimas={vitimas}
            isFormValid={isFormValid}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={() => router.back()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default GerarLaudoScreen;