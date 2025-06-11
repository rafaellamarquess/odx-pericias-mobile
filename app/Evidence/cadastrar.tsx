import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmSaveModal from '../../components/Evidence/NovaEvidenciasScreen/Modals/ConfirmSaveModal';
import AddImageModal from '../../components/Evidence/NovaEvidenciasScreen/Modals/AddImageModal';
import { Input, Textarea, Select, PrimaryButton } from '../../components/Evidence/FormComponents';
import { IEvidence, EvidenceListResponse } from '../../types/Evidence';
import { IVitima, VitimaListResponse } from '../../types/Vitima';
import { FilterOptions } from '../../types/FilterOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import StepIndicator from '@/components/StepIndicator/StepIndicator';

const NovaEvidenciaScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [etapa, setEtapa] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Evidence states
  const [casoReferencia, setCasoReferencia] = useState('');
  const [tipo, setTipo] = useState<'imagem' | 'texto'>('texto');
  const [categoria, setCategoria] = useState('');
  const [coletadoPor, setColetadoPor] = useState('');
  const [texto, setTexto] = useState('');
  const [imagemUri, setImagemUri] = useState('');

  // Victim states
  const [vitimas, setVitimas] = useState<IVitima[]>([]);
  const [selectedVitimaId, setSelectedVitimaId] = useState('');
  const [createNewVitima, setCreateNewVitima] = useState(false);
  const [vitimaNome, setVitimaNome] = useState('');
  const [vitimaDataNascimento, setVitimaDataNascimento] = useState('');
  const [vitimaIdadeAproximada, setVitimaIdadeAproximada] = useState('');
  const [vitimaNacionalidade, setVitimaNacionalidade] = useState('');
  const [vitimaCidade, setVitimaCidade] = useState('');
  const [vitimaSexo, setVitimaSexo] = useState<'masculino' | 'feminino' | 'indeterminado'>('masculino');
  const [vitimaEstadoCorpo, setVitimaEstadoCorpo] = useState<
    'inteiro' | 'fragmentado' | 'carbonizado' | 'putrefacto' | 'esqueleto'
  >('inteiro');
  const [vitimaLesoes, setVitimaLesoes] = useState('');
  const [vitimaIdentificada, setVitimaIdentificada] = useState(false);
  const [existingEvidences, setExistingEvidences] = useState<IEvidence[]>([]);

  // Filter options
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    coletadoPor: [],
    casos: [],
    cidades: [],
    lesoes: [],
    sexos: [],
  });

  // Form validation
  const isFormValid =
    casoReferencia &&
    categoria &&
    coletadoPor &&
    (tipo === 'texto' ? texto : imagemUri) &&
    (createNewVitima ? vitimaSexo && vitimaEstadoCorpo : selectedVitimaId);

  // Fetch victims and filter options
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch victims
        const vitimaResponse = await axios.get<VitimaListResponse>('YOUR_API_URL/api/vitima', config);
        setVitimas(vitimaResponse.data.data || []);

        // Fetch filter options
        const filterResponse = await axios.get<FilterOptions>('YOUR_API_URL/api/evidence/filters', config);
        setFilterOptions({
          coletadoPor: Array.isArray(filterResponse.data.coletadoPor) ? filterResponse.data.coletadoPor : [],
          casos: Array.isArray(filterResponse.data.casos) ? filterResponse.data.casos : [],
          cidades: Array.isArray(filterResponse.data.cidades) ? filterResponse.data.cidades : [],
          lesoes: Array.isArray(filterResponse.data.lesoes) ? filterResponse.data.lesoes : [],
          sexos: Array.isArray(filterResponse.data.sexos) ? filterResponse.data.sexos : [],
        });

        setError('');
      } catch (err: any) {
        setError(err.response?.data?.msg || 'Erro ao buscar dados.');
        setVitimas([]);
        setFilterOptions({ coletadoPor: [], casos: [], cidades: [], lesoes: [], sexos: [] });
      } finally {
        setIsLoading(false);
      }
    };

    if (user && !authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  // Fetch existing evidences for selected victim
  useEffect(() => {
    const fetchEvidences = async () => {
      if (selectedVitimaId && !createNewVitima) {
        setIsLoading(true);
        try {
          const token = await AsyncStorage.getItem('authToken');
          const response = await axios.get<EvidenceListResponse>('YOUR_API_URL/api/evidence', {
            headers: { Authorization: `Bearer ${token}` },
            params: { vitima: selectedVitimaId },
          });
          setExistingEvidences(response.data.evidencias || []);
          setError('');
        } catch (err: any) {
          setError(err.response?.data?.msg || 'Erro ao buscar evidências existentes.');
          setExistingEvidences([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setExistingEvidences([]);
      }
    };
    fetchEvidences();
  }, [selectedVitimaId, createNewVitima]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('casoReferencia', casoReferencia);
      formData.append('tipo', tipo);
      formData.append('categoria', categoria);
      formData.append('coletadoPor', coletadoPor);
      if (tipo === 'texto' && texto) formData.append('texto', texto);
      if (tipo === 'imagem' && imagemUri) {
        formData.append('file', {
          uri: imagemUri,
          name: 'evidence.jpg',
          type: 'image/jpeg',
        } as any);
      }

      if (createNewVitima) {
        if (vitimaNome) formData.append('nome', vitimaNome);
        if (vitimaDataNascimento) formData.append('dataNascimento', vitimaDataNascimento);
        if (vitimaIdadeAproximada) formData.append('idadeAproximada', vitimaIdadeAproximada);
        if (vitimaNacionalidade) formData.append('nacionalidade', vitimaNacionalidade);
        if (vitimaCidade) formData.append('cidade', vitimaCidade);
        formData.append('sexo', vitimaSexo);
        formData.append('estadoCorpo', vitimaEstadoCorpo);
        if (vitimaLesoes) formData.append('lesoes', vitimaLesoes);
        formData.append('identificada', vitimaIdentificada.toString());
      } else {
        formData.append('vitimaId', selectedVitimaId);
      }

      const token = await AsyncStorage.getItem('authToken');
      await axios.post('YOUR_API_URL/api/evidence', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Evidência cadastrada com sucesso!');
      setError('');
      setShowConfirmModal(true);
      // Reset form
      setCasoReferencia('');
      setTipo('texto');
      setCategoria('');
      setColetadoPor('');
      setTexto('');
      setImagemUri('');
      setSelectedVitimaId('');
      setCreateNewVitima(false);
      setVitimaNome('');
      setVitimaDataNascimento('');
      setVitimaIdadeAproximada('');
      setVitimaNacionalidade('');
      setVitimaCidade('');
      setVitimaSexo('masculino');
      setVitimaEstadoCorpo('inteiro');
      setVitimaLesoes('');
      setVitimaIdentificada(false);
      setExistingEvidences([]);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Erro ao cadastrar evidência.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (etapa < 3) {
      setEtapa(etapa + 1);
    } else {
      handleSubmit();
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    router.back();
  };

  // Render form steps
  const renderConteudoEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <View style={tw`mx-5 mt-5`}>
            <Text style={tw`text-lg font-bold text-gray-800 text-center mb-4`}>Informações da Evidência</Text>
            <Select
              label="Tipo de Evidência *"
              value={tipo}
              onChange={(value) => setTipo(value as 'imagem' | 'texto')}
              options={['texto', 'imagem']}
              disabled={isLoading}
            />
            <Select
              label="Caso (Referência) *"
              value={casoReferencia}
              onChange={setCasoReferencia}
              options={filterOptions.casos}
              disabled={isLoading || filterOptions.casos.length === 0}
            />
            <Input
              label="Categoria *"
              value={categoria}
              placeholder="Ex: Radiografia Panorâmica"
              onChange={setCategoria}
              disabled={isLoading}
            />
            <Select
              label="Coletado por (Nome) *"
              value={coletadoPor}
              onChange={setColetadoPor}
              options={filterOptions.coletadoPor}
              disabled={isLoading}
            />
            {tipo === 'texto' && (
              <Textarea
                label="Texto *"
                value={texto}
                placeholder="Relatório textual sobre a arcada dentária"
                onChange={setTexto}
                disabled={isLoading}
              />
            )}
            {tipo === 'imagem' && (
              <View style={tw`mb-4`}>
                <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Arquivo (Imagem) *</Text>
                <TouchableOpacity
                  style={tw`bg-[#4A8481] py-3 rounded-md items-center`}
                  onPress={() => setShowImageModal(true)}
                  disabled={isLoading}
                >
                  <Text style={tw`text-white font-medium`}>Selecionar Imagem</Text>
                </TouchableOpacity>
                {imagemUri && (
                  <View style={tw`mt-4`}>
                    <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Prévia da Imagem</Text>
                    <Image
                      source={{ uri: imagemUri }}
                      style={tw`w-full max-w-xs h-48 rounded-md`}
                      resizeMode="cover"
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        );

      case 2:
        return (
          <View style={tw`mx-5 mt-5`}>
            <Text style={tw`text-lg font-bold text-gray-800 text-center mb-4`}>Dados da Vítima</Text>
            <View style={tw`mb-4 flex-row items-center justify-between`}>
              <Text style={tw`text-sm font-medium text-gray-700`}>Criar nova vítima</Text>
              <Switch
                value={createNewVitima}
                onValueChange={(value) => {
                  setCreateNewVitima(value);
                  if (!value) {
                    setVitimaNome('');
                    setVitimaDataNascimento('');
                    setVitimaIdadeAproximada('');
                    setVitimaNacionalidade('');
                    setVitimaCidade('');
                    setVitimaSexo('masculino');
                    setVitimaEstadoCorpo('inteiro');
                    setVitimaLesoes('');
                    setVitimaIdentificada(false);
                  }
                }}
                disabled={isLoading}
              />
            </View>
            {!createNewVitima && (
              <Select
                label="Selecionar Vítima Existente *"
                value={selectedVitimaId}
                onChange={(value) => {
                  setSelectedVitimaId(value);
                  const vitima = vitimas.find((v) => v._id === value);
                  if (vitima) {
                    setVitimaNome(vitima.nome || '');
                    setVitimaDataNascimento(vitima.dataNascimento || '');
                    setVitimaIdadeAproximada(vitima.idadeAproximada ? vitima.idadeAproximada.toString() : '');
                    setVitimaNacionalidade(vitima.nacionalidade || '');
                    setVitimaCidade(vitima.cidade || '');
                    setVitimaSexo(vitima.sexo || 'masculino');
                    setVitimaEstadoCorpo(vitima.estadoCorpo || 'inteiro');
                    setVitimaLesoes(vitima.lesoes || '');
                    setVitimaIdentificada(vitima.identificada || false);
                  }
                }}
                options={vitimas.map((v) => v._id ? `${v.nome || 'Não identificada'} (${v.estadoCorpo || 'Inteiro'})` : '')}
                disabled={isLoading || vitimas.length === 0}
              />
            )}
            {createNewVitima && (
              <>
                <Input
                  label="Nome da Vítima"
                  value={vitimaNome}
                  placeholder="Ex: João Silva"
                  onChange={setVitimaNome}
                  disabled={isLoading}
                />
                <Input
                  label="Data de Nascimento"
                  value={vitimaDataNascimento}
                  type="date"
                  onChange={setVitimaDataNascimento}
                  disabled={isLoading}
                />
                <Input
                  label="Idade Aproximada"
                  value={vitimaIdadeAproximada}
                  type="number"
                  placeholder="Ex: 30"
                  onChange={setVitimaIdadeAproximada}
                  disabled={isLoading}
                />
                <Input
                  label="Nacionalidade"
                  value={vitimaNacionalidade}
                  placeholder="Ex: Brasileira"
                  onChange={setVitimaNacionalidade}
                  disabled={isLoading}
                />
                <Input
                  label="Cidade"
                  value={vitimaCidade}
                  placeholder="Ex: São Paulo"
                  onChange={setVitimaCidade}
                  disabled={isLoading}
                />
                <Select
                  label="Sexo *"
                  value={vitimaSexo}
                  onChange={(value) => setVitimaSexo(value as 'masculino' | 'feminino' | 'indeterminado')}
                  options={['masculino', 'feminino', 'indeterminado']}
                  disabled={isLoading}
                />
                <Select
                  label="Estado do Corpo *"
                  value={vitimaEstadoCorpo}
                  onChange={(value) =>
                    setVitimaEstadoCorpo(value as 'inteiro' | 'fragmentado' | 'carbonizado' | 'putrefacto' | 'esqueleto')
                  }
                  options={['inteiro', 'fragmentado', 'carbonizado', 'putrefacto', 'esqueleto']}
                  disabled={isLoading}
                />
                <Input
                  label="Lesões"
                  value={vitimaLesoes}
                  placeholder="Ex: Fratura no osso maxilar"
                  onChange={setVitimaLesoes}
                  disabled={isLoading}
                />
                <View style={tw`mb-4 flex-row items-center justify-between`}>
                  <Text style={tw`text-sm font-medium text-gray-700`}>Identificada</Text>
                  <Switch
                    value={vitimaIdentificada}
                    onValueChange={setVitimaIdentificada}
                    disabled={isLoading}
                  />
                </View>
              </>
            )}
          </View>
        );

      case 3:
        const evidenceData = {
          categoria: categoria || 'Não especificado',
          tipo: tipo || 'Não especificado',
          coletadoPor: coletadoPor || 'Não especificado',
          casoReferencia: casoReferencia || 'Não especificado',
          nome: vitimaNome || 'Não especificado',
          sexo: vitimaSexo || 'Não especificado',
          estadoCorpo: vitimaEstadoCorpo || 'Não especificado',
          idadeAproximada: vitimaIdadeAproximada || 'Não especificado',
          nacionalidade: vitimaNacionalidade || 'Não especificado',
          cidade: vitimaCidade || 'Não especificado',
          lesoes: vitimaLesoes || 'Não especificado',
          identificada: vitimaIdentificada ? 'Sim' : 'Não',
          conteudo: texto || 'N/A',
          imagemUri: imagemUri ? 'Imagem selecionada' : 'Nenhuma imagem',
        };

        return (
          <ScrollView style={tw`flex-1`}>
            <View style={tw`mx-5 mt-5`}>
              <Text style={tw`text-lg font-bold text-gray-800 mb-4 text-center`}>Revisão Final da Evidência</Text>
              <View style={tw`bg-white rounded-xl p-5 mb-5 shadow-lg border border-gray-200`}>
                <Text style={tw`text-base font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2`}>Informações da Evidência</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Categoria:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.categoria}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Tipo:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.tipo}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Coletado Por:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.coletadoPor}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Caso Referência:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.casoReferencia}</Text>
                </View>
                {tipo === 'texto' && (
                  <View style={tw`mb-3`}>
                    <Text style={tw`text-sm font-semibold text-gray-800`}>Conteúdo:</Text>
                    <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.conteudo}</Text>
                  </View>
                )}
                {tipo === 'imagem' && (
                  <View style={tw`mb-3`}>
                    <Text style={tw`text-sm font-semibold text-gray-800`}>Imagem:</Text>
                    <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.imagemUri}</Text>
                    <TouchableOpacity
                      style={tw`bg-[#4A8481] rounded-md py-2 mt-2 items-center`}
                      onPress={() => setShowImageModal(true)}
                    >
                      <Text style={tw`text-white text-sm font-bold`}>Alterar Imagem</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={tw`bg-white rounded-xl p-5 mb-5 shadow-lg border border-gray-200`}>
                <Text style={tw`text-base font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2`}>Informações da Vítima</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Nome:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.nome}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Sexo:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.sexo}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Estado do Corpo:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.estadoCorpo}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Idade Aproximada:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.idadeAproximada}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Nacionalidade:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.nacionalidade}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Cidade:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.cidade}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Lesões:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.lesoes}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>Identificada:</Text>
                  <Text style={tw`text-sm text-gray-600 mt-1`}>{evidenceData.identificada}</Text>
                </View>
              </View>
              {selectedVitimaId && existingEvidences.length > 0 && (
                <View style={tw`bg-white rounded-xl p-5 mb-5 shadow-lg border border-gray-200`}>
                  <Text style={tw`text-base font-bold text-gray-800 mb-3`}>Evidências Existentes</Text>
                  {existingEvidences.map((evidencia) => (
                    <Text key={evidencia._id} style={tw`text-sm text-gray-600 mb-2`}>
                      {evidencia.categoria} ({evidencia.tipo}, {evidencia.texto || evidencia.imagem || 'N/A'}) - Coletado por: {evidencia.coletadoPor}
                    </Text>
                  ))}
                </View>
              )}
              {error && <Text style={tw`text-red-500 text-sm mb-4 text-center`}>{error}</Text>}
              {success && <Text style={tw`text-green-600 text-sm mb-4 text-center`}>{success}</Text>}
              <View style={tw`flex-row justify-between mx-10 mb-5`}>
                <PrimaryButton text="Início" onPress={() => router.back()} disabled={isLoading} />
                <PrimaryButton text="Ir para Gerar Laudo" onPress={() => router.push('/Laudo/cadastrar')} disabled={isLoading} />
                <PrimaryButton
                  text={isLoading ? 'Carregando...' : 'Cadastrar Evidência'}
                  onPress={handleSubmit}
                  disabled={isLoading || !isFormValid}
                />
              </View>
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <ActivityIndicator size="large" color="#4A8481" />
        <Text style={tw`text-gray-600 mt-4`}>Carregando...</Text>
      </View>
    );
  }

  if (authError) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <Text style={tw`text-red-500 text-center`}>Erro de autenticação: {authError}. Tente fazer login novamente.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <Header title="Nova Evidência" />
      <StepIndicator activeStep={etapa} setEtapa={setEtapa} totalSteps={3} />
      {renderConteudoEtapa()}
      {etapa < 3 && (
        <TouchableOpacity
          style={tw`bg-[#679AA3] rounded-md py-3 mx-10 mt-5 shadow-lg`}
          onPress={handleNext}
          disabled={isLoading}
        >
          <Text style={tw`text-white text-center font-bold`}>Próximo</Text>
        </TouchableOpacity>
      )}
      <ConfirmSaveModal visible={showConfirmModal} onClose={handleCloseConfirmModal} />
      <AddImageModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImageSelect={setImagemUri}
      />
      {isLoading && (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50`}>
          <ActivityIndicator size="large" color="#4A8481" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NovaEvidenciaScreen;