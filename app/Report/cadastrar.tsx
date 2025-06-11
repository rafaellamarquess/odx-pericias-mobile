import { useRouter } from 'expo-router';
import React, { useState, useEffect, FormEvent } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Header from '../../components/Header';
import FormContainer from '../../components/Forms/FormContainer';
import FormSection from '../../components/Forms/FormSection';
import StepIndicator from '../../components/StepIndicator/StepIndicator';

// Mock data
const MOCK_CASOS = [
  { _id: 'case1', titulo: 'Caso Mock 1' },
  { _id: 'case2', titulo: 'Caso Mock 2' },
];
const MOCK_EVIDENCIAS = [
  { _id: 'ev1', categoria: 'Categoria Mock A', tipo: 'Tipo Mock X' },
  { _id: 'ev2', categoria: 'Categoria Mock B', tipo: 'Tipo Mock Y' },
];
const MOCK_VITIMAS = [
  { _id: 'vit1', nome: 'Vítima Mock 1' },
  { _id: 'vit2', nome: 'Vítima Mock 2' },
];
const MOCK_LAUDOS = [
  { _id: 'la1', descricao: 'Laudo Mock 1' },
  { _id: 'la2', descricao: 'Laudo Mock 2' },
];
const MOCK_PDF_BASE64 = 'JVBERi0xLjQKJeLjz9MK...';

export default function ElaborarRelatorio() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    casoReferencia: '',
    titulo: '',
    descricao: '',
    objetoPericia: '',
    analiseTecnica: '',
    metodoUtilizado: '',
    destinatario: '',
    materiaisUtilizados: '',
    examesRealizados: '',
    consideracoesTecnicoPericiais: '',
    conclusaoTecnica: '',
    observacaoTexto: '',
  });
  const [pdfUrl, setPdfUrl] = useState('');
  const [reportId, setReportId] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [signed, setSigned] = useState(false);
  const [casosDisponiveis, setCasosDisponiveis] = useState<{ _id: string; titulo: string }[]>(MOCK_CASOS);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [observacaoId, setObservacaoId] = useState<string | null>(null);
  const [gravando, setGravando] = useState(false);
  const [gravador, setGravador] = useState<Audio.Recording | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const iniciarGravacao = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária para gravar áudio.');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setGravador(recording);
      setGravando(true);
    } catch (err) {
      console.error('Erro ao iniciar gravação:', err);
    }
  };

  const pararGravacao = async () => {
    try {
      if (!gravador) return;
      await gravador.stopAndUnloadAsync();
      const uri = gravador.getURI();
      setAudioUri(uri);
      setGravador(null);
      setGravando(false);
    } catch (err) {
      console.error('Erro ao parar gravação:', err);
    }
  };

  const criarObservacao = async () => {
    if (audioUri) {
      try {
        const response = await fetch(audioUri);
        const blob = await response.blob();
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
        reader.readAsDataURL(blob);
        const base64Audio = await base64Promise;
        const observacaoPayload = {
          tipo: 'audio',
          conteudo: base64Audio,
          descricao: 'Observação em áudio',
        };
        const simulatedResponse = { _id: 'simulatedObservacaoId123' };
        setObservacaoId(simulatedResponse._id);
      } catch (err) {
        console.error('Erro ao criar observação de áudio:', err);
      }
    } else if (formData.observacaoTexto.trim()) {
      const observacaoPayload = {
        tipo: 'texto',
        conteudo: formData.observacaoTexto.trim(),
        descricao: 'Observação textual',
      };
      const simulatedResponse = { _id: 'simulatedObservacaoIdTexto123' };
      setObservacaoId(simulatedResponse._id);
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/(tabs)/home');
    }
  };

  const handleLogout = () => {
    console.log('Logout realizado');
    router.push('/Login');
  };

  useEffect(() => {
    setCasosDisponiveis(MOCK_CASOS);
  }, []);

  // Mock fetching evidências, vítimas, laudos (unchanged logic)
  useEffect(() => {
    async function buscarEvidencias() {
      if (!formData.casoReferencia) return;
      try {
        // Simulated API call
      } catch (error) {
        setError('Erro ao buscar evidências do caso.');
        console.error('Erro ao buscar evidências:', error);
      }
    }
    buscarEvidencias();
  }, [formData.casoReferencia]);

  useEffect(() => {
    async function buscarVitima() {
      if (!formData.casoReferencia) return;
      try {
        // Simulated API call
      } catch (error) {
        setError('Erro ao buscar vítima do caso.');
        console.error('Erro ao buscar vítima:', error);
      }
    }
    buscarVitima();
  }, [formData.casoReferencia]);

  useEffect(() => {
    async function buscarLaudo() {
      if (!formData.casoReferencia) return;
      try {
        // Simulated API call
      } catch (error) {
        setError('Erro ao buscar laudo do caso.');
        console.error('Erro ao buscar laudo:', error);
      }
    }
    buscarLaudo();
  }, [formData.casoReferencia]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const trimmedPayload = {
        ...formData,
        observacaoId,
        casoReferencia: formData.casoReferencia.trim(),
        titulo: formData.titulo.trim(),
        descricao: formData.descricao.trim(),
        objetoPericia: formData.objetoPericia.trim(),
        analiseTecnica: formData.analiseTecnica.trim(),
        metodoUtilizado: formData.metodoUtilizado.trim(),
        destinatario: formData.destinatario.trim(),
        materiaisUtilizados: formData.materiaisUtilizados.trim(),
        examesRealizados: formData.examesRealizados.trim(),
        consideracoesTecnicoPericiais: formData.consideracoesTecnicoPericiais.trim(),
        conclusaoTecnica: formData.conclusaoTecnica.trim(),
      };
      const simulatedReport = { _id: 'simulatedReportId123' };
      const simulatedPdfBase64 = MOCK_PDF_BASE64;
      setReportId(simulatedReport._id);
      const byteCharacters = atob(simulatedPdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setSubmitted(true);
    } catch (err) {
      setError('Erro simulado ao gerar o relatório.');
      console.error(err);
    }
  };

  const handleSign = async () => {
    if (!reportId) {
      setError('Nenhum relatório gerado para assinar.');
      return;
    }
    try {
      const simulatedPdfBase64 = MOCK_PDF_BASE64;
      const byteCharacters = atob(simulatedPdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setSigned(true);
      setError('');
    } catch (err) {
      setError('Erro simulado ao assinar o relatório.');
      console.error(err);
    }
  };

  const tituloEtapa: Record<number, string> = {
    1: 'Informações Básicas',
    2: 'Dados Periciais',
    3: 'Análise e Observações',
    4: 'Revisão dos Dados',
    5: 'Finalização',
  };

  const renderConteudoEtapa = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={tw`text-[18px] text-[#2C3E50] mt-5 mb-2 font-bold text-center`}>{tituloEtapa[1]}</Text>
            <FormContainer>
              <FormSection
                fields={[
                  {
                    label: 'Caso',
                    placeholder: 'Selecione um Caso',
                    name: 'casoReferencia',
                    type: 'select',
                    options: casosDisponiveis.map((c) => ({ label: c.titulo, value: c._id })),
                    value: formData.casoReferencia,
                  },
                  { label: 'Título', placeholder: 'Título', name: 'titulo', value: formData.titulo },
                  {
                    label: 'Descrição',
                    placeholder: 'Descrição',
                    name: 'descricao',
                    multiline: true,
                    value: formData.descricao,
                  },
                ]}
                onChange={handleChange}
              />
            </FormContainer>
          </>
        );

      case 2:
        return (
          <>
            <Text style={tw`text-[18px] text-[#2C3E50] mt-5 mb-2 font-bold text-center`}>{tituloEtapa[2]}</Text>
            <FormContainer>
              <FormSection
                fields={[
                  {
                    label: 'Objeto da Perícia',
                    placeholder: 'Objeto da Perícia',
                    name: 'objetoPericia',
                    multiline: true,
                    value: formData.objetoPericia,
                  },
                  {
                    label: 'Análise Técnica',
                    placeholder: 'Análise Técnica',
                    name: 'analiseTecnica',
                    multiline: true,
                    value: formData.analiseTecnica,
                  },
                  {
                    label: 'Método Utilizado',
                    placeholder: 'Método Utilizado',
                    name: 'metodoUtilizado',
                    multiline: true,
                    value: formData.metodoUtilizado,
                  },
                  {
                    label: 'Destinatário',
                    placeholder: 'Destinatário',
                    name: 'destinatario',
                    multiline: true,
                    value: formData.destinatario,
                  },
                  {
                    label: 'Materiais Utilizados',
                    placeholder: 'Materiais Utilizados',
                    name: 'materiaisUtilizados',
                    multiline: true,
                    value: formData.materiaisUtilizados,
                  },
                  {
                    label: 'Exames Realizados',
                    placeholder: 'Exames Realizados',
                    name: 'examesRealizados',
                    multiline: true,
                    value: formData.examesRealizados,
                  },
                ]}
                onChange={handleChange}
              />
            </FormContainer>
          </>
        );

      case 3:
        return (
          <>
            <Text style={tw`text-[18px] text-[#2C3E50] mt-5 mb-2 font-bold text-center`}>{tituloEtapa[3]}</Text>
            <FormContainer>
              <FormSection
                fields={[
                  {
                    label: 'Considerações Técnico-Periciais',
                    placeholder: 'Considerações Técnico-Periciais',
                    name: 'consideracoesTecnicoPericiais',
                    multiline: true,
                    value: formData.consideracoesTecnicoPericiais,
                  },
                  {
                    label: 'Conclusão Técnica',
                    placeholder: 'Conclusão Técnica',
                    name: 'conclusaoTecnica',
                    multiline: true,
                    value: formData.conclusaoTecnica,
                  },
                  {
                    label: 'Observação (Texto)',
                    placeholder: 'Digite a observação (opcional)',
                    name: 'observacaoTexto',
                    value: formData.observacaoTexto,
                  },
                ]}
                onChange={handleChange}
              />
              <View style={tw`mt-4`}>
                <TouchableOpacity
                  style={tw`bg-[#679AA3] rounded-[8px] py-3 items-center shadow-sm`}
                  onPress={gravando ? pararGravacao : iniciarGravacao}
                >
                  <Text style={tw`text-white text-[16px] font-semibold`}>
                    {gravando ? 'Parar Gravação' : 'Gravar Observação em Áudio'}
                  </Text>
                </TouchableOpacity>
                {audioUri && (
                  <Text style={tw`mt-2 text-green-600 text-center`}>Áudio gravado com sucesso!</Text>
                )}
              </View>
            </FormContainer>
          </>
        );

      case 4:
        return (
          <>
            <Text style={tw`text-[18px] text-[#2C3E50] mt-5 mb-2 font-bold text-center`}>{tituloEtapa[4]}</Text>
            <FormContainer>
              <View style={tw`space-y-3`}>
                <Text style={tw`text-[16px] text-[#2C3E50] font-bold mb-2 border-b border-gray-200 pb-2`}>Revisão dos Dados</Text>
                {Object.entries(formData).map(([key, value]) => {
                  if (key === 'observacaoTexto') {
                    return (
                      <View key={key} style={tw`mb-2`}>
                        <Text style={tw`text-[14px] text-[#2C3E50] font-semibold`}>Observação (Texto):</Text>
                        <Text style={tw`text-[14px] text-[#666] mt-1`}>{value || '—'}</Text>
                      </View>
                    );
                  }
                  if (['casoReferencia', 'titulo', 'descricao', 'objetoPericia', 'analiseTecnica', 'metodoUtilizado', 'destinatario', 'materiaisUtilizados', 'examesRealizados', 'consideracoesTecnicoPericiais', 'conclusaoTecnica'].includes(key)) {
                    return (
                      <View key={key} style={tw`mb-2`}>
                        <Text style={tw`text-[14px] text-[#2C3E50] font-semibold`}>{tituloEtapa[Number(key)] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</Text>
                        <Text style={tw`text-[14px] text-[#666] mt-1`}>{key === 'casoReferencia' ? casosDisponiveis.find(c => c._id === value)?.titulo || '—' : value || '—'}</Text>
                      </View>
                    );
                  }
                  return null;
                })}
                <View style={tw`mb-2`}>
                  <Text style={tw`text-[14px] text-[#2C3E50] font-semibold`}>Áudio Gravado:</Text>
                  <Text style={tw`text-[14px] text-[#666] mt-1`}>{audioUri ? 'Sim' : 'Não'}</Text>
                </View>
              </View>
            </FormContainer>
          </>
        );

      case 5:
        return (
          <View style={tw`flex-1 items-center justify-center mx-5 mt-10`}>
            <Text style={tw`text-[18px] text-[#2C3E50] font-bold mb-2 text-center`}>{tituloEtapa[5]}</Text>
            <Text style={tw`text-[16px] text-[#666] text-center mb-6`}>
              Você finalizou a elaboração do relatório com sucesso!
            </Text>
            {error && <Text style={tw`text-red-600 mb-4 text-center`}>{error}</Text>}
            {submitted && pdfUrl ? (
              <>
                {!signed && (
                  <TouchableOpacity
                    style={tw`bg-[#4A8481] rounded-[8px] py-3 px-6 mb-3 w-3/4 items-center shadow-sm`}
                    onPress={handleSign}
                  >
                    <Text style={tw`text-white text-[16px] font-semibold`}>Assinar Digitalmente</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={tw`bg-[#679AA3] rounded-[8px] py-3 px-6 mb-3 w-3/4 items-center shadow-sm`}
                  onPress={() => Linking.openURL(pdfUrl)}
                >
                  <Text style={tw`text-white text-[16px] font-semibold`}>Visualizar PDF</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={tw`text-red-600 mb-4 text-center`}>O relatório ainda não foi gerado corretamente.</Text>
            )}
            <TouchableOpacity
              style={tw`bg-[#E0E0E0] rounded-[8px] py-3 px-6 w-3/4 items-center shadow-sm`}
              onPress={() => router.push('/Report/gerenciar')}
            >
              <Text style={tw`text-[16px] text-[#2C3E50] font-semibold`}>Ver Lista de Relatórios</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (step === 1 && (!formData.casoReferencia || !formData.titulo)) {
      Alert.alert('Preencha caso e título.');
      return;
    }
    if (step === 4) {
      await criarObservacao();
      await handleSubmit({ preventDefault: () => {} } as FormEvent);
    }
    setStep(step + 1);
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-[#F5F5F5]`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Elaborar Relatório" />
      <ScrollView contentContainerStyle={tw`pb-20`}>
        <StepIndicator
          activeStep={step}
          setEtapa={setStep}
          totalSteps={5}
          stepLabels={Object.values(tituloEtapa)}
        />
        {renderConteudoEtapa()}
        {step < 5 && (
          <TouchableOpacity
            style={tw`bg-[#679AA3] rounded-[8px] py-3 mx-10 mt-5 items-center shadow-lg elevation-5`}
            onPress={handleNext}
          >
            <Text style={tw`text-white text-[16px] font-semibold`}>{step < 4 ? 'Próximo' : 'Finalizar'}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}