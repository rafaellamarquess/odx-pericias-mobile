<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import Header from '../../components/case/NovoCasoScreen/Header';
import FormContainer from '../../components/case/NovoCasoScreen/FormContainer';
import FormSection from '../../components/case/NovoCasoScreen/FormSection';
import StepIndicator from '../../components/case/NovoCasoScreen/StepIndicator';
import ConfirmSaveModal from '../../components/evidence/NovaEvidenciaScreen/Modals/ConfirmSaveModal';
import AddImageModal from '../../components/evidence/NovaEvidenciaScreen/Modals/AddImageModal';
import axios from 'axios';

const NovaEvidenciaScreen = () => {
  const router = useRouter();
  const [etapa, setEtapa] = useState(1);
  const [formData, setFormData] = useState<{
    categoria: string;
    tipo: string;
    coletadoPor: string;
    casoReferencia: string;
    nome: string;
    sexo: string;
    estadoCorpo: string;
    idadeAproximada: string;
    nacionalidade: string;
    cidade: string;
    lesoes: string;
    identificada: boolean;
    conteudo: string;
    imagemUri: string;
  }>({
    categoria: '',
    tipo: '',
    coletadoPor: '',
    casoReferencia: '',
    nome: '',
    sexo: '',
    estadoCorpo: '',
    idadeAproximada: '',
    nacionalidade: '',
    cidade: '',
    lesoes: '',
    identificada: false,
    conteudo: '',
    imagemUri: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (etapa < 3) {
      setEtapa(etapa + 1);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('tipo', formData.tipo);
      formDataToSend.append('coletadoPor', formData.coletadoPor);
      formDataToSend.append('casoReferencia', formData.casoReferencia);
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('sexo', formData.sexo);
      formDataToSend.append('estadoCorpo', formData.estadoCorpo);
      formDataToSend.append('idadeAproximada', formData.idadeAproximada);
      formDataToSend.append('nacionalidade', formData.nacionalidade);
      formDataToSend.append('cidade', formData.cidade);
      formDataToSend.append('lesoes', formData.lesoes);
      formDataToSend.append('identificada', formData.identificada.toString());

      if (formData.tipo === 'texto') {
        formDataToSend.append('conteudo', formData.conteudo);
      } else if (formData.tipo === 'imagem' && formData.imagemUri) {
        formDataToSend.append('imagem', {
          uri: formData.imagemUri,
          name: 'evidence.jpg',
          type: 'image/jpeg',
        } as any);
      }

      const response = await axios.post('YOUR_API_URL/api/evidences', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add authorization token if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      setShowConfirmModal(true);
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao registrar evidência:', error);
      alert('Erro ao registrar evidência. Tente novamente.');
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    router.back();
  };

  const renderConteudoEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <Text style={tw`text-[18px] text-[#333] mt-[20px] mb-0 font-bold text-center`}>
              Informações da Evidência
            </Text>
            <FormContainer>
              <FormSection
                fields={[
                  { label: 'Categoria', placeholder: 'Ex: Digital, Física', name: 'categoria' },
                  {
                    label: 'Tipo',
                    placeholder: 'Selecione o tipo',
                    name: 'tipo',
                    type: 'select',
                    options: [
                      { label: 'Imagem', value: 'imagem' },
                      { label: 'Texto', value: 'texto' },
                    ],
                  },
                  { label: 'Coletado Por', placeholder: 'Nome ou ID do coletador', name: 'coletadoPor' },
                  { label: 'Caso Referência', placeholder: 'Ex: CASO-001', name: 'casoReferencia' },
                ]}
                onChange={handleInputChange}
              />
            </FormContainer>
          </>
        );

      case 2:
        return (
          <>
            <Text style={tw`text-[18px] text-[#333] mt-[20px] mb-0 font-bold text-center`}>
              Informações da Vítima
            </Text>
            <FormContainer>
              <FormSection
                fields={[
                  { label: 'Nome', placeholder: 'Nome da vítima (opcional)', name: 'nome' },
                  {
                    label: 'Sexo',
                    placeholder: 'Selecione o sexo',
                    name: 'sexo',
                    type: 'select',
                    options: [
                      { label: 'Masculino', value: 'masculino' },
                      { label: 'Feminino', value: 'feminino' },
                      { label: 'Indeterminado', value: 'indeterminado' },
                    ],
                  },
                  {
                    label: 'Estado do Corpo',
                    placeholder: 'Selecione o estado',
                    name: 'estadoCorpo',
                    type: 'select',
                    options: [
                      { label: 'Inteiro', value: 'inteiro' },
                      { label: 'Fragmentado', value: 'fragmentado' },
                      { label: 'Carbonizado', value: 'carbonizado' },
                      { label: 'Putrefacto', value: 'putrefacto' },
                      { label: 'Esqueleto', value: 'esqueleto' },
                    ],
                  },
                  { label: 'Idade Aproximada', placeholder: 'Ex: 30', name: 'idadeAproximada', keyboardType: 'numeric' },
                  { label: 'Nacionalidade', placeholder: 'Ex: Brasileira', name: 'nacionalidade' },
                  { label: 'Cidade', placeholder: 'Ex: São Paulo', name: 'cidade' },
                  { label: 'Lesões', placeholder: 'Descreva lesões (opcional)', name: 'lesoes', multiline: true },
                  {
                    label: 'Identificada',
                    name: 'identificada',
                    type: 'toggle',
                    value: formData.identificada,
                  },
                ]}
                onChange={handleInputChange}
              />
            </FormContainer>
          </>
        );

      case 3:
        const evidenceData = {
          categoria: formData.categoria || 'Não especificado',
          tipo: formData.tipo || 'Não especificado',
          coletadoPor: formData.coletadoPor || 'Não especificado',
          casoReferencia: formData.casoReferencia || 'Não especificado',
          nome: formData.nome || 'Não especificado',
          sexo: formData.sexo || 'Não especificado',
          estadoCorpo: formData.estadoCorpo || 'Não especificado',
          idadeAproximada: formData.idadeAproximada || 'Não especificado',
          nacionalidade: formData.nacionalidade || 'Não especificado',
          cidade: formData.cidade || 'Não especificado',
          lesoes: formData.lesoes || 'Não especificado',
          identificada: formData.identificada ? 'Sim' : 'Não',
          conteudo: formData.conteudo || 'N/A',
          imagemUri: formData.imagemUri ? 'Imagem selecionada' : 'Nenhuma imagem',
        };

        return (
          <ScrollView style={tw`flex-1`}>
            <View style={tw`mx-5 mt-5`}>
              <Text style={tw`text-[18px] text-[#333] font-bold mb-4 text-center`}>Revisão Final da Evidência</Text>
              {/* Cartão: Informações da Evidência */}
              <View style={tw`bg-white rounded-[15px] p-5 mb-5 shadow-lg elevation-8 border border-gray-200`}>
                <Text style={tw`text-[16px] text-[#333] font-bold mb-3 border-b border-gray-200 pb-2`}>Informações da Evidência</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Categoria:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.categoria}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Tipo:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.tipo}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Coletado Por:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.coletadoPor}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Caso Referência:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.casoReferencia}</Text>
                </View>
                {formData.tipo === 'texto' && (
                  <View style={tw`mb-3`}>
                    <Text style={tw`text-[14px] text-[#333] font-semibold`}>Conteúdo:</Text>
                    <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.conteudo}</Text>
                  </View>
                )}
                {formData.tipo === 'imagem' && (
                  <View style={tw`mb-3`}>
                    <Text style={tw`text-[14px] text-[#333] font-semibold`}>Imagem:</Text>
                    <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.imagemUri}</Text>
                    <TouchableOpacity
                      style={tw`bg-[#4A8481] rounded-[8px] py-2 mt-2 items-center`}
                      onPress={() => setShowImageModal(true)}
                    >
                      <Text style={tw`text-white text-[14px] font-bold`}>Selecionar Imagem</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* Cartão: Informações da Vítima */}
              <View style={tw`bg-white rounded-[15px] p-5 mb-5 shadow-lg elevation-8 border border-gray-200`}>
                <Text style={tw`text-[16px] text-[#333] font-bold mb-3 border-b border-gray-200 pb-2`}>Informações da Vítima</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Nome:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.nome}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Sexo:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.sexo}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Estado do Corpo:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.estadoCorpo}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Idade Aproximada:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.idadeAproximada}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Nacionalidade:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.nacionalidade}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Cidade:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.cidade}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Lesões:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.lesoes}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Identificada:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{evidenceData.identificada}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={tw`bg-[#4A8481] rounded-[8px] py-3.75 items-center mx-10 mt-5 mb-5`}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={tw`text-white text-[16px] font-bold`}>Registrar</Text>
              </TouchableOpacity>
              {isLoading && (
                <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50`}>
                  <ActivityIndicator size="large" color="#4A8481" />
                </View>
              )}
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <Header title="Nova Evidência" />
      <StepIndicator activeStep={etapa} setEtapa={setEtapa} />
      {renderConteudoEtapa()}
      {etapa < 3 && (
        <TouchableOpacity
          style={tw`bg-[#679AA3] rounded-[10px] py-3 mx-10 mt-5 shadow-lg elevation-5`}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={tw`text-white text-[16px] font-bold text-center`}>Próximo</Text>
        </TouchableOpacity>
      )}
      <ConfirmSaveModal
        visible={showConfirmModal}
        onClose={handleCloseConfirmModal}
      />
      <AddImageModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImageSelect={(uri) => handleInputChange('imagemUri', uri)}
      />
    </SafeAreaView>
  );
};

export default NovaEvidenciaScreen;
=======
import React from 'react';
import { View, Text } from 'react-native';

const DetalhesCasoScreen: React.FC = () => {
  return (
    <View>
      <Text>Detalhes do Caso</Text>
    </View>
  );
};

export default DetalhesCasoScreen;
>>>>>>> Lucas
